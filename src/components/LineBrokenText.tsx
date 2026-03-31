import React from 'react';

interface LineBrokenTextProps {
  lines: string[];
}

const LineBrokenText: React.FC<LineBrokenTextProps> = ({ lines }) => (
  <>
    {lines.map((line, index) => (
      <React.Fragment key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

export default LineBrokenText;
