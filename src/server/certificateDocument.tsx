import { renderToStaticMarkup } from 'react-dom/server';
import CertificateRenderer from '../components/CertificateRenderer';
import type { RlpCertificateData } from '../lib/types';

export function reviveCertificateData(raw: RlpCertificateData): RlpCertificateData {
  return {
    ...raw,
    schoolYearFrom: new Date(raw.schoolYearFrom),
    schoolYearTo: new Date(raw.schoolYearTo),
    issuedDate: new Date(raw.issuedDate),
  };
}

export function renderCertificateHtml(data: RlpCertificateData, origin: string): string {
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
