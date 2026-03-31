import React from 'react';

interface SectionTitleBarProps {
  title: string;
}

const SectionTitleBar: React.FC<SectionTitleBarProps> = ({ title }) => (
  <p
    style={{
      fontWeight: 'bold',
      fontSize: '12px',
      textAlign: 'center',
      backgroundColor: '#DBEAFE',
      margin: 0,
      marginBottom: '-1px',
    }}
  >
    {title}
  </p>
);

export default SectionTitleBar;
