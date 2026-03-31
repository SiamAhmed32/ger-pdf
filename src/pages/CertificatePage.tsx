import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateRenderer from '../components/CertificateRenderer';
import { generateRandomCertificateData } from '../lib/randomData';

const CertificatePage: React.FC = () => {
  const navigate = useNavigate();
  // Generate fresh random data on every visit to this route
  const data = useMemo(() => generateRandomCertificateData(), []);

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

      <CertificateRenderer data={data} />
    </div>
  );
};

export default CertificatePage;
