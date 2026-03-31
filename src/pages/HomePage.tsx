import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '48px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          maxWidth: '480px',
          width: '90%',
        }}
      >
        <img
          src="/Certificate_logo.png"
          alt="Lernwerkstatt-Pflege Logo"
          style={{ width: '160px', marginBottom: '24px', objectFit: 'contain' }}
        />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '8px' }}>
          Zeugnis-Generator
        </h1>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '36px', lineHeight: '1.5' }}>
          Jedes Mal, wenn Sie auf „Generieren" klicken, wird ein neues Zeugnis mit zufälligen
          Schülerdaten erstellt.
        </p>
        <button
          onClick={() => navigate('/certificate')}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 40px',
            fontSize: '17px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#2563eb')}
        >
          Generieren
        </button>
      </div>
    </div>
  );
};

export default HomePage;
