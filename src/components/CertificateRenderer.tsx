import React from 'react';
import type { RlpCertificateData } from '../lib/types';
import A4Page from './A4Page';
import FirstPage from './FirstPage';
import LastPage from './LastPage';

interface CertificateRendererProps {
  data: RlpCertificateData;
}

const CertificateRenderer = React.forwardRef<HTMLDivElement, CertificateRendererProps>(
  ({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="certificate-print-root"
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      <A4Page breakAfter>
        <FirstPage data={data} />
      </A4Page>

      <A4Page>
        <LastPage data={data} />
      </A4Page>
    </div>
  );
  },
);

CertificateRenderer.displayName = 'CertificateRenderer';

export default CertificateRenderer;
