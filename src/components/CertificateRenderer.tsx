import React from 'react';
import type { RlpCertificateData } from '../lib/types';
import FirstPage from './FirstPage';
import LastPage from './LastPage';

interface CertificateRendererProps {
  data: RlpCertificateData;
}

const CertificateRenderer: React.FC<CertificateRendererProps> = ({ data }) => {
  return (
    <div
      style={{
        width: '210mm',
        margin: '0 auto',
        padding: '20mm 15mm',
        backgroundColor: '#fff',
        boxShadow: '0 0 20px rgba(0,0,0,0.15)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Page 1 */}
      <div style={{ pageBreakAfter: 'always' }}>
        <FirstPage data={data} />
      </div>

      {/* Page break spacing */}
      <div style={{ height: '60px' }} />

      {/* Page 2 */}
      <div>
        <LastPage data={data} />
      </div>
    </div>
  );
};

export default CertificateRenderer;
