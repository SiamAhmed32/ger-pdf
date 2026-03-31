import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export async function downloadCertificatePdf(root: HTMLDivElement): Promise<void> {
  const pages = Array.from(
    root.querySelectorAll<HTMLElement>('.certificate-print-page'),
  );

  if (pages.length === 0) {
    throw new Error('No certificate pages found for PDF export.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (const [index, page] of pages.entries()) {
    const canvas = await html2canvas(page, {
      backgroundColor: '#ffffff',
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowWidth: Math.ceil(page.scrollWidth),
      windowHeight: Math.ceil(page.scrollHeight),
    });

    const imageData = canvas.toDataURL('image/png');

    if (index > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imageData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, undefined, 'FAST');
  }

  pdf.save('certificate.pdf');
}
