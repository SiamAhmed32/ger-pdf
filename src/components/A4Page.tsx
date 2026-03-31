import React from 'react';

interface A4PageProps {
  children: React.ReactNode;
  breakAfter?: boolean;
}

const basePageStyle: React.CSSProperties = {
  width: '210mm',
  minHeight: '297mm',
  margin: '0 auto',
  padding: '20mm 15mm',
  backgroundColor: '#fff',
  boxShadow: '0 0 20px rgba(0,0,0,0.15)',
  boxSizing: 'border-box',
  overflow: 'hidden',
  fontFamily: 'Arial, sans-serif',
};

const A4Page: React.FC<A4PageProps> = ({ children, breakAfter = false }) => {
  return (
    <div
      className="certificate-print-page"
      data-break-after={breakAfter ? 'page' : undefined}
      style={{
        ...basePageStyle,
        ...(breakAfter ? { pageBreakAfter: 'always' } : null),
      }}
    >
      {children}
    </div>
  );
};

export default A4Page;
