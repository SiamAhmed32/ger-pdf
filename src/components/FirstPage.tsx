import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { RlpCertificateData } from '../lib/types';
import { CERTIFICATE_TYPE_LABELS, formatGrade } from '../lib/types';

interface FirstPageProps {
  data: RlpCertificateData;
}

const FirstPage: React.FC<FirstPageProps> = ({ data }) => {
  const {
    trainee,
    school,
    theoryGrades,
    schoolYearFrom,
    schoolYearTo,
    trainingYear,
    certificateType,
  } = data;

  const theoryKbs = [
    {
      num: 'I',
      key: 1,
      desc: 'Pflegeprozesse und Pflegediagnostik in akuten und dauerhaften\nPflegesituationen verantwortlich planen, organisieren, gestalten, durchführen, steuern und evaluieren',
    },
    {
      num: 'II',
      key: 2,
      desc: 'Kommunikation und Beratung personen- und situationsbezogen gestalten',
    },
    {
      num: 'III',
      key: 3,
      desc: 'Intra- und interprofessionelles Handeln in unterschiedlichen systemischen Kontexten verantwortlich gestalten und mitgestalten',
    },
    {
      num: 'IV',
      key: 4,
      desc: 'Das eigene Handeln auf der Grundlage von Gesetzen, Verordnungen und ethischen Leitlinien reflektieren und begründen',
    },
    {
      num: 'V',
      key: 5,
      desc: 'Das eigene Handeln auf der Grundlage von wissenschaftlichen Erkenntnissen und berufsethischen Werthaltungen und Einstellungen reflektieren und begründen',
    },
  ];

  const traineeName = `${trainee.firstName || ''} ${trainee.lastName || ''}`.trim();
  const traineeAddress = [trainee.street, trainee.postalCode, trainee.city]
    .filter(Boolean)
    .join(', ');
  const schoolName = school.name || 'Lernwerkstatt-Pflege GmbH';

  const cellStyle: React.CSSProperties = {
    borderTop: '0.5pt solid #000',
    borderLeft: '0.5pt solid #000',
    borderRight: 'none',
    borderBottom: 'none',
    paddingTop: '0px',
    paddingBottom: '12px',
    paddingLeft: '5px',
    paddingRight: '0px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '1.1',
    fontSize: '12px',
    boxSizing: 'border-box',
  };

  const addFont: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
  };

  const labelStyle: React.CSSProperties = {
    ...addFont,
    fontWeight: 400,
    color: '#000',
    textAlign: 'right',
    width: '112px',
  };

  const valueStyle: React.CSSProperties = {
    display: 'inline-block',
    borderBottom: '0.5pt solid #000',
    paddingBottom: '2px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#000',
    lineHeight: '1.1',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}>
      {/* Header */}
      <section
        style={{
          backgroundColor: '#e5e7eb',
          height: '96px',
          marginBottom: '56px',
          padding: '0 30px',
          display: 'grid',
          gridTemplateColumns: '144px 1fr 144px',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: '1.2',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14.5px', lineHeight: '1.25' }}>
            {schoolName}
          </p>
          <p style={{ margin: 0, fontSize: '12px' }}>{school.street || 'Liebigstraße 14-16'}</p>
          <p style={{ margin: '2px 0 0', fontSize: '12px', lineHeight: '1.2' }}>
            {school.postalCode || '35390'} {school.city || 'Giessen'}
          </p>
        </div>
        <img
          style={{
            width: '132px',
            height: '56px',
            justifySelf: 'end',
            objectFit: 'contain',
          }}
          src="/Certificate_logo.png"
          alt="Logo"
        />
      </section>

      {/* Title */}
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          letterSpacing: '0.15em',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        {CERTIFICATE_TYPE_LABELS[certificateType].toUpperCase()}
      </div>

      {/* Trainee Info */}
      <section style={{ marginBottom: '13px' }}>
        {/* Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '25% 75%' }}>
          <div />
          <div style={{ display: 'flex', fontSize: '13px', alignItems: 'baseline' }}>
            <span style={labelStyle}>
              Vor-/ Zuname
            </span>
            <div style={{ flex: 1, marginLeft: '16px' }}>
              <span style={valueStyle}>
                {traineeName || ''}
              </span>
            </div>
          </div>
        </div>

        {/* Birthday */}
        <div
          style={{ display: 'grid', marginTop: '-5px', gridTemplateColumns: '25% 75%' }}
        >
          <div />
          <div
            style={{
              display: 'flex',
              fontSize: '13px',
              width: '384px',
              alignItems: 'baseline',
            }}
          >
            <span style={labelStyle}>
              Geburtstag
            </span>
            <div style={{ flex: 1, marginLeft: '16px' }}>
              <span style={valueStyle}>
                {trainee.dateOfBirth
                  ? format(new Date(trainee.dateOfBirth), 'dd.MM.yyyy', { locale: de })
                  : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div
          style={{ display: 'grid', marginTop: '-5px', gridTemplateColumns: '25% 75%' }}
        >
          <div />
          <div style={{ display: 'flex', fontSize: '13px', alignItems: 'baseline' }}>
            <span style={labelStyle}>
              Anschrift
            </span>
            <div style={{ flex: 1, marginLeft: '16px' }}>
              <span style={valueStyle}>
                {traineeAddress || ''}
              </span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', lineHeight: '1.625', marginTop: '30px' }}>
          Hat im Schuljahr{' '}
          <span style={{ fontWeight: 'bold' }}>
            {schoolYearFrom && schoolYearTo
              ? `${format(schoolYearFrom, 'dd.MM.yyyy')} bis ${format(schoolYearTo, 'dd.MM.yyyy')}`
              : '[Schuljahr]'}
          </span>{' '}
          das {trainingYear}. Ausbildungsjahr an der o.a. Pflegeschule besucht.
        </p>
        <p style={{ fontSize: '13px', lineHeight: '1.625', ...addFont }}>
          Die Leistungen in den einzelnen Ausbildungsbereichen werden wie folgt beurteilt:
        </p>
      </section>

      {/* Theory Table */}
      <section>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '12px',
            textAlign: 'center',
            padding: '0 0 8px 0',
            backgroundColor: '#DBEAFE',
            margin: 0,
          }}
        >
          Theoretischer und praktischer Unterricht
        </p>

        <table
          style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
        >
          <thead style={{ backgroundColor: '#DBEAFE' }}>
            <tr>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '13px',
                  width: '41%',
                  textAlign: 'left',
                  paddingLeft: '30px',
                }}
              >
                Kompetenzbereich
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingLeft: '5px' }}>
                Note
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingLeft: '5px' }}>
                Faktor
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingLeft: '5px' }}>
                Ʃ-Wert¹
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  width: '15%',
                  borderRight: '0.5pt solid #000',
                  textAlign: 'left',
                  paddingLeft: '5px',
                }}
              >
                Gesamt-Ʃ²
              </th>
            </tr>
          </thead>
          <tbody>
            {theoryKbs.map((kb, index) => {
              const kbData = theoryGrades.kbGrades[kb.key];
              const isLastRow = index === theoryKbs.length - 1;
              const bottomBorder = isLastRow ? '0.5pt solid #000' : 'none';

              return (
                <tr key={kb.key}>
                  <td
                    style={{ ...cellStyle, borderBottom: bottomBorder, textAlign: 'left', padding: 0 }}
                  >
                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: '30px',
                              borderRight: '0.5pt solid #000',
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              padding: '1px 0 4px',
                            }}
                          >
                            {kb.num}.
                          </td>
                          <td style={{ padding: '0px 4px 10px', verticalAlign: 'middle', fontSize: '13px' }}>
                            {kb.desc}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td style={{ ...cellStyle, fontSize: '13px', borderBottom: bottomBorder }}>
                    {kbData?.grade !== null ? formatGrade(kbData.grade) : ''}
                  </td>
                  <td style={{ ...cellStyle, fontSize: '13px', borderBottom: bottomBorder }}>
                    {kbData?.factor !== null ? kbData.factor.toFixed(1) : ''}
                  </td>
                  <td style={{ ...cellStyle, fontSize: '13px', borderBottom: bottomBorder }}>
                    {kbData?.weightedValue !== null
                      ? kbData.weightedValue!.toFixed(2)
                      : ''}
                  </td>

                  {index === 0 && (
                    <td
                      rowSpan={theoryKbs.length}
                      style={{
                        ...cellStyle,
                        fontSize: '13px',
                        verticalAlign: 'middle',
                        borderRight: '0.5pt solid #000',
                        borderBottom: '0.5pt solid #000',
                        height: '100%',
                      }}
                    >
                      {theoryGrades.totalWeightedSum?.toFixed(2) || ''}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: '5px', fontSize: '12px' }}>
          <p style={{ margin: '2px 0' }}>
            ¹ Note und Faktor müssen multipliziert werden, daraus ergibt sich der Ʃ Wert.
          </p>
          <p style={{ margin: '2px 0' }}>
            ² Alle Ʃ Wert von I-V. müssen addiert werden, daraus ergibt sich die Gesamt-Ʃ.
          </p>
        </div>
      </section>

      {/* Summary Table */}
      <section style={{ marginTop: '16px' }}>
        <table style={{ width: '55%', marginLeft: '45%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#DBEAFE' }}>
            <tr>
              <th style={{ ...cellStyle, fontSize: '14px', width: '45%' }}>Übertragene Gesamt-Ʃ</th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  width: 'auto',
                  whiteSpace: 'nowrap',
                  paddingRight: '5px',
                }}
              >
                Division
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  borderRight: '0.5pt solid #000',
                  width: '45%',
                }}
              >
                Gesamtnote für den schulischen Unterricht
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, fontSize: '12px', borderBottom: '0.5pt solid #000' }}>
                {theoryGrades.totalWeightedSum?.toFixed(2) || ''}
              </td>
              <td style={{ ...cellStyle, fontSize: '13px', borderBottom: '0.5pt solid #000' }}>
                {theoryGrades.factorSum?.toFixed(1) || ''}
              </td>
              <td
                style={{
                  ...cellStyle,
                  fontSize: '13px',
                  fontWeight: 'bold',
                  borderBottom: '0.5pt solid #000',
                  borderRight: '0.5pt solid #000',
                }}
              >
                {theoryGrades.overallGrade !== null ? formatGrade(theoryGrades.overallGrade) : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: '50px' }}>
        <p style={{ fontSize: '11px', ...addFont, textAlign: 'left' }}>
          * Bei den Kompetenzbereichen und Einsatzbereichen, die in diesem Jahr nicht unterrichtet
          bzw. absolviert wurden, stehen keine Noten.
        </p>
      </footer>
    </div>
  );
};

export default FirstPage;
