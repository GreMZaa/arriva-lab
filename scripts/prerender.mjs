import { spawn } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import puppeteer from 'puppeteer'

const DIST = path.resolve('dist')
const PORT = 4173
const URL = `http://127.0.0.1:${PORT}/`

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function waitForServer(maxMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(URL, (res) => {
          res.resume()
          if (res.statusCode && res.statusCode < 500) resolve()
          else if (Date.now() - start > maxMs) reject(new Error('preview timeout'))
          else setTimeout(tick, 300)
        })
        .on('error', () => {
          if (Date.now() - start > maxMs) reject(new Error('preview timeout'))
          else setTimeout(tick, 300)
        })
    }
    tick()
  })
}

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  stdio: 'ignore',
  shell: true,
  cwd: process.cwd(),
})

try {
  if (process.env.VERCEL === '1' && process.env.SKIP_PRERENDER === '1') {
    console.log('Prerender skipped (SKIP_PRERENDER=1)')
    process.exit(0)
  }
  await waitForServer()
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
  await wait(500)
  let html = await page.content()
  await browser.close()

  // Маркер pre-render для аудиторов (не пустой CSR-only shell)
  html = html.replace('<html lang="ru">', '<html lang="ru" data-rendered="prerender">')

  const indexPath = path.join(DIST, 'index.html')
  await writeFile(indexPath, html, 'utf8')
  console.log('Prerendered dist/index.html (' + Math.round(html.length / 1024) + ' KB)')
} catch (err) {
  console.warn('Prerender skipped:', err.message)
} finally {
  preview.kill('SIGTERM')
  await wait(300)
}
