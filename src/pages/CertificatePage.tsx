import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateRenderer from '../components/CertificateRenderer';
import { downloadCertificatePdf } from '../lib/downloadCertificatePdf';
import { generateRandomCertificateData } from '../lib/randomData';

const CertificatePage: React.FC = () => {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  // Generate fresh random data on every visit to this route
  const data = useMemo(() => generateRandomCertificateData(), []);

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) {
      window.alert('Certificate is not ready yet. Please try again.');
      return;
    }

    setIsDownloading(true);

    try {
      await downloadCertificatePdf(certificateRef.current);
    } catch (error) {
      console.error(error);
      window.alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#e5e7eb', minHeight: '100vh', padding: '24px 0' }}>
      {/* Top bar */}
      <div
        style={{
          width: '210mm',
          margin: '0 auto 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#374151',
          }}
        >
          ← Zurück
        </button>
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          style={{
            backgroundColor: isDownloading ? '#93c5fd' : '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: isDownloading ? 'wait' : 'pointer',
          }}
        >
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
        <button
          onClick={() => {
            // Navigate to the same route but force remount by using a key trick via navigate
            navigate('/certificate', { replace: true, state: { ts: Date.now() } });
            window.location.reload();
          }}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Neu generieren
        </button>
      </div>

      <CertificateRenderer ref={certificateRef} data={data} />
    </div>
  );
};

export default CertificatePage;
