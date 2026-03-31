import { renderToStaticMarkup } from 'react-dom/server';
import { chromium } from 'playwright';
import CertificateRenderer from '../components/CertificateRenderer';
import type { RlpCertificateData } from '../lib/types';

function reviveCertificateData(raw: RlpCertificateData): RlpCertificateData {
  return {
    ...raw,
    schoolYearFrom: new Date(raw.schoolYearFrom),
    schoolYearTo: new Date(raw.schoolYearTo),
    issuedDate: new Date(raw.issuedDate),
  };
}

function renderCertificateHtml(data: RlpCertificateData, origin: string): string {
  const markup = renderToStaticMarkup(<CertificateRenderer data={data} />);
  const withAbsoluteLogo = markup.replaceAll(
    'src="/Certificate_logo.png"',
    `src="${origin}/Certificate_logo.png"`,
  );

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>Certificate</title>
    <style>
      @page {
        size: A4;
        margin: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        font-family: Arial, sans-serif;
      }

      .certificate-print-root {
        gap: 0 !important;
      }

      .certificate-print-page {
        box-shadow: none !important;
        margin: 0 auto !important;
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .certificate-print-page[data-break-after="page"] {
        break-after: page;
        page-break-after: always;
      }
    </style>
  </head>
  <body>
    ${withAbsoluteLogo}
  </body>
</html>`;
}

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
      Array.from(document.images).every((img) => (img as any).complete),
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
