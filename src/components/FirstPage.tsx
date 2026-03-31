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
    fontSize: '12px',
    fontWeight: 400,
    color: '#000',
    textAlign: 'right',
    width: '86px',
    lineHeight: '1.05',
  };

  const valueStyle: React.CSSProperties = {
    display: 'inline-block',
    borderBottom: '0.5pt solid #000',
    paddingBottom: '1px',
    paddingRight: '8px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#000',
    lineHeight: '1.1',
    textAlign: 'left',
    boxSizing: 'border-box',
  };

  const traineeInfoGridStyle: React.CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '86px auto',
    columnGap: '10px',
    rowGap: '4px',
    alignItems: 'baseline',
  };

  const topIntroBlockStyle: React.CSSProperties = {
    width: '344px',
    margin: '0 auto',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}>
      {/* Header - Pixel Perfect Symmetric Composition */}
      <section
        style={{
          backgroundColor: '#e5e7eb',
          height: '96px',
          marginBottom: '16px',
          padding: '0 10px 0 32px', // Tightened right margin for logo, balanced left
          display: 'grid',
          gridTemplateColumns: '150px 1fr 150px', // Symmetric outer columns for dead-centering
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Left spacer for grid symmetry */}
        <div />

        {/* School info centered block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: '1.2',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px', lineHeight: '1.3' }}>
            {schoolName}
          </p>
          <p style={{ margin: 0, fontSize: '12.5px' }}>{school.street || 'Liebigstraße 14-16'}</p>
          <p style={{ margin: '1px 0 0', fontSize: '12.5px' }}>
            {school.postalCode || '35390'} {school.city || 'Gießen'}
          </p>
        </div>

        {/* Logo anchored tight to the right margin (matches Pic 2) */}
        <img
          style={{
            width: '138px',
            height: '64px', // Larger for vertical presence
            justifySelf: 'end',
            objectFit: 'contain',
          }}
          src="/Certificate_logo.png"
          alt="Logo"
        />
      </section>

      {/* Trainee Info */}
      <section style={{ marginBottom: '13px' }}>
        <div style={topIntroBlockStyle}>
          <div
            style={{
              width: 'fit-content',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '0.025em',
              lineHeight: '1',
              textAlign: 'left',
              color: '#000',
              marginBottom: '32px',
              marginLeft: '80px',
            }}
          >
            {CERTIFICATE_TYPE_LABELS[certificateType].toUpperCase()}
          </div>

          <div style={{ ...traineeInfoGridStyle, marginLeft: '65px' }}>
            <span style={labelStyle}>Vor-/ Zuname</span>
            <span style={{ ...valueStyle, width: '128px' }}>{traineeName || ''}</span>

            <span style={labelStyle}>Geburtstag</span>
            <span style={{ ...valueStyle, width: '114px' }}>
              {trainee.dateOfBirth
                ? format(new Date(trainee.dateOfBirth), 'yyyy-MM-dd', { locale: de })
                : ''}
            </span>

            <span style={labelStyle}>Anschrift</span>
            <span style={{ ...valueStyle, width: '248px' }}>{traineeAddress || ''}</span>
          </div>
        </div>

        <p style={{ fontSize: '13px', lineHeight: '1.625', marginTop: '22px', textAlign: 'left' }}>
          Hat im Schuljahr{' '}
          <span style={{ fontWeight: 'bold' }}>
            {schoolYearFrom && schoolYearTo
              ? `${format(schoolYearFrom, 'dd.MM.yyyy')} bis ${format(schoolYearTo, 'dd.MM.yyyy')}`
              : '[Schuljahr]'}
          </span>{' '}
          das {trainingYear}. Ausbildungsjahr an der o.a. Pflegeschule besucht.
        </p>
        <p style={{ fontSize: '13px', lineHeight: '1.625', textAlign: 'left', ...addFont }}>
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
            // padding: '0 0',
            backgroundColor: '#DBEAFE',
            margin: 0,
            marginBottom: '-1px',
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
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '30px',
                }}
              >
                Kompetenzbereich
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '8px' }}>
                Note
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '8px' }}>
                Faktor
              </th>
              <th style={{ ...cellStyle, fontSize: '13px', width: '14.3%', textAlign: 'left', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '8px' }}>
                Ʃ-Wert¹
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  width: '15%',
                  borderRight: '0.5pt solid #000',
                  textAlign: 'left',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '8px',
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
                              padding: '1px 0 0 4px',
                            }}
                          >
                            {kb.num}.
                          </td>
                          <td style={{ padding: '5px 10px  5px 10px', verticalAlign: 'middle', fontSize: '13px' }}>
                            {kb.desc}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      fontSize: '13px',
                      borderBottom: bottomBorder,
                      textAlign: 'left',
                      paddingLeft: '34px',
                    }}
                  >
                    {kbData?.grade !== null ? formatGrade(kbData.grade) : ''}
                  </td>
                  <td
                    style={{
                      ...cellStyle,
                      fontSize: '13px',
                      borderBottom: bottomBorder,
                      textAlign: 'left',
                      paddingLeft: '40px',
                    }}
                  >
                    {kbData?.factor !== null ? kbData.factor.toFixed(1) : ''}
                  </td>
                  <td
                    style={{
                      ...cellStyle,
                      fontSize: '13px',
                      borderBottom: bottomBorder,
                      textAlign: 'left',
                      paddingLeft: '30px',
                    }}
                  >
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

        <div style={{ marginTop: '5px', fontSize: '12px', textAlign: 'left' }}>
          <p style={{ margin: '1px 0 -7px' }}>
            ¹ Note und Faktor müssen multipliziert werden, daraus ergibt sich der Ʃ Wert.
          </p>
          <p style={{}}>
            ² Alle Ʃ Wert von I-V. müssen addiert werden, daraus ergibt sich die Gesamt-Ʃ.
          </p>
        </div>
      </section>

      {/* Summary Table */}
      <section style={{ marginTop: '16px' }}>
        <table style={{ width: '55%', marginLeft: '45%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead style={{ backgroundColor: '#DBEAFE' }}>
            <tr>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  width: '10.5%',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  // paddingLeft: '3px',
                  // paddingRight: '3px',
                }}
              >
                Übertragene
                <br />
                Gesamt-Ʃ
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                   width: '6%',
                  whiteSpace: 'nowrap',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  paddingLeft: '2px',
                  // paddingRight: '2px',
                }}
              >
                Division
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: '14px',
                  borderRight: '0.5pt solid #000',
                    width: '14.5%',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  paddingLeft: '3px',
                  paddingRight: '3px',
                }}
              >
                Gesamtnote für den
                <br />
                schulischen
                <br />
                Unterricht
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  ...cellStyle,
                  fontSize: '12px',
                  width: '36.5%',
                  borderBottom: '0.5pt solid #000',
                  paddingTop: '3px',
                  paddingBottom: '2.5px',
                  paddingLeft: '2.5px',
                  paddingRight: '3px',
                }}
              >
                {theoryGrades.totalWeightedSum?.toFixed(2) || ''}
              </td>
              <td
                style={{
                  ...cellStyle,
                  fontSize: '13px',
                  width: '21%',
                  borderBottom: '0.5pt solid #000',
                  paddingTop: '2.5px',
                  paddingBottom: '2.5px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                }}
              >
                {theoryGrades.factorSum?.toFixed(1) || ''}
              </td>
              <td
                style={{
                   ...cellStyle,
                   fontSize: '13px',
                   fontWeight: 'bold',
                    width: '42.5%',
                    borderBottom: '0.5pt solid #000',
                  paddingTop: '2.5px',
                  paddingBottom: '2.5px',
                  borderRight: '0.5pt solid #000',
                  paddingLeft: '3px',
                  paddingRight: '3px',
                }}
              >
                {theoryGrades.overallGrade !== null ? formatGrade(theoryGrades.overallGrade) : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: '50px' }}>
        <p style={{ fontSize: '11px', ...addFont, textAlign: 'left', marginLeft: '20px' }}>
          * Bei den Kompetenzbereichen und Einsatzbereichen, die in diesem Jahr nicht unterrichtet
          bzw. absolviert wurden, stehen keine Noten.
        </p>
      </footer>
    </div>
  );
};

export default FirstPage;
