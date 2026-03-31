import type { VercelRequest, VercelResponse } from '@vercel/node';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
import type { RlpCertificateData } from '../src/lib/types.js';
import {
  renderCertificateHtml,
  reviveCertificateData,
} from '../src/server/certificateDocument.js';

export const config = {
  maxDuration: 60,
};

function getOrigin(req: VercelRequest): string {
  const protocolHeader = req.headers['x-forwarded-proto'];
  const protocol = Array.isArray(protocolHeader) ? protocolHeader[0] : protocolHeader;
  const host = req.headers.host;

  return `${protocol ?? 'https'}://${host}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const rawData = req.body as RlpCertificateData;
    const data = reviveCertificateData(rawData);
    const executablePath = await chromium.executablePath();
    const browser = await playwright.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });

    try {
      const page = await browser.newPage({
        viewport: {
          width: 794,
          height: 1123,
        },
        deviceScaleFactor: 2,
      });

      await page.setContent(renderCertificateHtml(data, getOrigin(req)), {
        waitUntil: 'load',
      });

      await page.waitForFunction(() =>
        Array.from(document.images).every((img) => (img as HTMLImageElement).complete),
      );

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
        preferCSSPageSize: true,
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).send(Buffer.from(pdf));
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('Failed to generate certificate PDF:', error);
    res.status(500).json({ message: 'Failed to generate certificate PDF' });
  }
}
