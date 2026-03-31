import { chromium } from 'playwright';
import type { RlpCertificateData } from '../lib/types';
import { renderCertificateHtml, reviveCertificateData } from './certificateDocument';

export async function generateCertificatePdfBuffer(
  rawData: RlpCertificateData,
  origin: string,
): Promise<Buffer> {
  const data = reviveCertificateData(rawData);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: {
        width: 794,
        height: 1123,
      },
      deviceScaleFactor: 2,
    });

    await page.setContent(renderCertificateHtml(data, origin), {
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

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
