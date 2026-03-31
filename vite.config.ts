import type { IncomingMessage } from 'node:http'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateCertificatePdfBuffer } from './src/server/certificatePdf'

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return JSON.parse(raw)
}

function certificatePdfPlugin() {
  const handler = async (req: IncomingMessage, res: any, next: () => void) => {
    if (req.method !== 'POST' || req.url !== '/api/certificate-pdf') {
      next()
      return
    }

    try {
      const payload = await readJsonBody(req)
      const origin = `http://${req.headers.host}`
      const pdfBuffer = await generateCertificatePdfBuffer(payload, origin)

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"')
      res.setHeader('Cache-Control', 'no-store')
      res.end(pdfBuffer)
    } catch (error) {
      console.error('Failed to generate certificate PDF:', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message: 'Failed to generate certificate PDF' }))
    }
  }

  return {
    name: 'certificate-pdf-plugin',
    configureServer(server: any) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(handler)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), certificatePdfPlugin()],
})
