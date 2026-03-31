import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { RlpCertificateData } from '../lib/types';
import { formatPracticeGrade } from '../lib/types';

interface LastPageProps {
  data: RlpCertificateData;
}

const LastPage: React.FC<LastPageProps> = ({ data }) => {
  const { trainee, school, practiceGrades, theoryAbsenceHours, practiceAbsenceHours, issuedDate } =
    data;

  const addFont: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
  };

  const practicePhases = [
    { num: 'I', desc: 'Orientierungseinsatz 400 Stunden', index: 0 },
    {
      num: 'II',
      desc: 'Pflichteinsätze in den drei allgmeinen Versorgungsbereichen',
      index: null,
    },
    { num: '', desc: 'Stationäre Langezeitpflege 400 Stunden', index: 1 },
    { num: '', desc: 'Ambulante Langzeitpflege 400 Stunden', index: 2 },
    { num: '', desc: 'Stationäre Akut-Pflege Krankenhaus', index: 3 },
    { num: 'III', desc: 'Pädiatrischer Einsatz', index: 4 },
  ];

  const traineeName = `${trainee.firstName || ''} ${trainee.lastName || ''}`.trim();
  const principalName = school.principalName || 'Stephan Ronneburg';
  const cityDate = `${school.city || 'Gießen'}, ${
    issuedDate ? format(issuedDate, 'dd.MM.yyyy', { locale: de }) : '[Date]'
  }`;

  return (
    <>
      {/* Practical Training Section */}
      <section>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '12px',
            textAlign: 'center',
            padding: '0 0 8px 0',
            backgroundColor: '#DBEAFE',
          }}
        >
          Praktische Ausbildung*
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
          <thead style={{ backgroundColor: '#DBEAFE' }}>
            <tr>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingTop: '0px',
                  paddingBottom: '10px',
                  paddingLeft: '35px',
                  width: '43%',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                  lineHeight: '0.7',
                }}
              >
                Einsatzbereich
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingTop: '0px',
                  paddingBottom: '10px',
                  paddingLeft: '5px',
                  width: '14.25%',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                  lineHeight: '0.7',
                }}
              >
                Note
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingTop: '0px',
                  paddingBottom: '10px',
                  paddingLeft: '5px',
                  width: '14.25%',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                  lineHeight: '0.7',
                }}
              >
                Faktor
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingTop: '0px',
                  paddingBottom: '10px',
                  paddingLeft: '5px',
                  width: '14.25%',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                  lineHeight: '0.7',
                }}
              >
                Ʃ-Wert¹
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: '0.5pt solid #000',
                  borderBottom: 'none',
                  paddingTop: '0px',
                  paddingBottom: '10px',
                  paddingLeft: '5px',
                  width: '14.25%',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                  lineHeight: '0.7',
                }}
              >
                Gesamt-Ʃ²
              </th>
            </tr>
          </thead>

          <tbody>
            {practicePhases.map((phase, idx) => {
              const phaseData =
                phase.index !== null ? practiceGrades.phases[phase.index] : null;
              const grade = phaseData ? phaseData.grade : null;
              const factor = phaseData ? phaseData.factor : null;
              const sumValue =
                grade !== null && factor !== null ? grade * factor : null;
              const isLastRow = idx === practicePhases.length - 1;
              const bottomBorder = isLastRow ? '0.5pt solid #000' : 'none';

              return (
                <tr key={idx}>
                  <td
                    style={{
                      borderTop: '0.5pt solid #000',
                      borderLeft: '0.5pt solid #000',
                      borderBottom: bottomBorder,
                      padding: 0,
                      verticalAlign: 'top',
                    }}
                  >
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: '30px',
                              borderRight: '0.5pt solid #000',
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              paddingTop: '0px',
                              paddingBottom: '10px',
                              fontSize: '12px',
                            }}
                          >
                            {phase.num ? `${phase.num}.` : ''}
                          </td>
                          <td
                            style={{
                              padding: '0px 4px 8px',
                              verticalAlign: 'top',
                              fontSize: '13px',
                              lineHeight: '1',
                            }}
                          >
                            {phase.desc}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td
                    style={{
                      fontSize: '13px',
                      borderTop: '0.5pt solid #000',
                      borderLeft: '0.5pt solid #000',
                      borderBottom: bottomBorder,
                      paddingTop: '0px',
                      paddingBottom: '10px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      lineHeight: '1',
                    }}
                  >
                    {grade !== null ? formatPracticeGrade(grade) : ''}
                  </td>

                  <td
                    style={{
                      fontSize: '13px',
                      borderTop: '0.5pt solid #000',
                      borderLeft: '0.5pt solid #000',
                      borderBottom: bottomBorder,
                      paddingTop: '0px',
                      paddingBottom: '10px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      lineHeight: '1',
                    }}
                  >
                    {factor !== null ? factor.toFixed(1) : ''}
                  </td>

                  <td
                    style={{
                      fontSize: '13px',
                      borderTop: '0.5pt solid #000',
                      borderLeft: '0.5pt solid #000',
                      borderBottom: bottomBorder,
                      paddingTop: '0px',
                      paddingBottom: '10px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      lineHeight: '1',
                    }}
                  >
                    {sumValue !== null ? sumValue.toFixed(2) : ''}
                  </td>

                  {idx === 0 && (
                    <td
                      rowSpan={practicePhases.length}
                      style={{
                        fontSize: '13px',
                        borderTop: '0.5pt solid #000',
                        borderLeft: '0.5pt solid #000',
                        borderRight: '0.5pt solid #000',
                        borderBottom: '0.5pt solid #000',
                        paddingTop: '0px',
                        paddingBottom: '10px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        lineHeight: '1',
                      }}
                    >
                      <span style={{ display: 'inline-block', marginBottom: '2px' }}>
                        {practiceGrades.totalWeightedSum !== null
                          ? practiceGrades.totalWeightedSum.toFixed(2)
                          : ''}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: '4px' }}>
          <p style={{ fontSize: '12px' }}>
            ¹ Note und Faktor müssen multipliziert werden, daraus ergibt sich der Ʃ Wert.
          </p>
          <p style={{ fontSize: '12px' }}>
            ² Alle Ʃ Wert von I-V. müssen addiert werden, daraus ergibt sich die Gesamt-Ʃ.
          </p>
        </div>
      </section>

      {/* Practice Summary Table */}
      <section style={{ marginTop: '16px', marginBottom: '16px' }}>
        <table
          style={{
            width: '55%',
            marginLeft: '45%',
            borderCollapse: 'collapse',
            borderSpacing: '0',
          }}
        >
          <thead style={{ backgroundColor: '#DBEAFE' }}>
            <tr>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  lineHeight: '1',
                  width: '35%',
                }}
              >
                Übertragene Gesamt-Ʃ
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: 'none',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  lineHeight: '1',
                  whiteSpace: 'nowrap',
                  padding: '0px 5px',
                }}
              >
                Division
              </th>
              <th
                style={{
                  fontSize: '13px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: '0.5pt solid #000',
                  borderBottom: 'none',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  lineHeight: '1',
                  width: '65%',
                }}
              >
                Gesamtnote für die praktische Ausbildung
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  fontSize: '12px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: '0.5pt solid #000',
                  paddingTop: '4px',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                {practiceGrades.totalWeightedSum !== null
                  ? practiceGrades.totalWeightedSum.toFixed(2)
                  : ''}
              </td>
              <td
                style={{
                  fontSize: '12px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: 'none',
                  borderBottom: '0.5pt solid #000',
                  paddingTop: '4px',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                {practiceGrades.factorSum ? practiceGrades.factorSum.toFixed(1) : ''}
              </td>
              <td
                style={{
                  fontSize: '12px',
                  borderTop: '0.5pt solid #000',
                  borderLeft: '0.5pt solid #000',
                  borderRight: '0.5pt solid #000',
                  borderBottom: '0.5pt solid #000',
                  paddingTop: '4px',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontWeight: 'bold',
                }}
              >
                <span style={{ display: 'inline-block', marginBottom: '2px' }}>
                  {practiceGrades.overallGrade !== null
                    ? formatPracticeGrade(practiceGrades.overallGrade)
                    : ''}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Benehmensregelung */}
      <section style={{ marginTop: '15px', marginBottom: '20px', fontSize: '14px' }}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                border: '1px solid #000',
                width: '70%',
                padding: '0px',
                paddingBottom: '5px',
              }}
            >
              Im Rahmen der Benehmenregelung gemäß § 6 Abs. 3 der Ausbildungs- und
              Prüfungsverordnung für die Pflegeberufe (PflAPrV) kann die oben ermittelte Note für
              die praktische Ausbildung anhand der im Beurteilungszeitraum während der praktischen
              Ausbildung insgesamt festgestellten praktischen Leistungen maximal eine Notenstufe
              nach oben oder unten angepasst werden.
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div
              style={{
                border: '1px solid #000',
                borderTop: 'none',
                width: '70%',
                padding: '0px',
                paddingBottom: '5px',
              }}
            >
              Die oben ermittelte Gesamtnote für die praktische Ausbildung soll um eine Notenstufe
              angehoben / herabgesetzt werden. Somit ergibt sich folgende Gesamtnote für die
              praktische Ausbildung:
            </div>
            <div
              style={{
                border: '1px solid #000',
                borderLeft: 'none',
                marginTop: '-1px',
                width: '30%',
                padding: '10px',
                paddingTop: '20px',
                textAlign: 'center',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '64px',
                  height: '16px',
                  textAlign: 'center',
                  backgroundColor: '#e0e0e0',
                  lineHeight: '16px',
                  paddingBottom: '30px',
                }}
              >
                {practiceGrades.adjustedGrade !== null
                  ? formatPracticeGrade(practiceGrades.adjustedGrade)
                  : ''}
              </span>
            </div>
          </div>
        </div>

        <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 500, ...addFont }}>
          {traineeName || '[Trainee Name]'} hat in diesem Ausbildungsjahr folgende Fehlzeiten:
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
            marginTop: '4px',
            border: '10px solid #FFFFFF',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: '3px solid #FFFFFF',
                  paddingRight: '12px',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  width: '40%',
                  ...addFont,
                }}
              >
                Theoretischer und praktischer Unterricht
              </td>
              <td
                style={{
                  border: '3px solid #FFFFFF',
                  padding: '4px 12px',
                  textAlign: 'left',
                  width: '20%',
                  ...addFont,
                }}
              >
                <span style={{ padding: '0 8px' }}>
                  {theoryAbsenceHours !== null && theoryAbsenceHours !== undefined
                    ? `${theoryAbsenceHours}h`
                    : '0h'}
                </span>
              </td>
              <td style={{ border: '3px solid #FFFFFF', padding: '4px 12px', ...addFont }}>
                Stunden
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: '3px solid #FFFFFF',
                  paddingRight: '12px',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  width: '40%',
                  ...addFont,
                }}
              >
                Praktische Ausbildung
              </td>
              <td
                style={{
                  border: '3px solid #FFFFFF',
                  padding: '4px 12px',
                  textAlign: 'left',
                  width: '20%',
                  ...addFont,
                }}
              >
                <span style={{ padding: '0 8px' }}>
                  {practiceAbsenceHours !== null && practiceAbsenceHours !== undefined
                    ? `${practiceAbsenceHours}h`
                    : '0h'}
                </span>
              </td>
              <td style={{ border: '3px solid #FFFFFF', padding: '4px 12px', ...addFont }}>
                Stunden
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Signature Section */}
      <section>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
            fontSize: '12px',
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                marginBottom: '2px',
                fontSize: '15px',
                fontWeight: 'bold',
                borderBottom: '2px solid #333',
                paddingBottom: '8px',
                ...addFont,
              }}
            >
              {cityDate}
            </div>
            <div style={{ fontSize: '8px', color: '#000', marginBottom: '60px', ...addFont }}>
              Ort/Datum
              <br />
              (Schulstempel)
            </div>
            <div style={{ paddingTop: '25px' }} />
            <div
              style={{
                marginBottom: '2px',
                borderBottom: '1px solid #333',
                paddingBottom: '4px',
                ...addFont,
              }}
            >
              {principalName}
            </div>
            <div style={{ fontSize: '8px', color: '#000', ...addFont }}>
              Schulleitung
            </div>
          </div>

          {/* Middle */}
          <div>
            <div
              style={{
                fontSize: '15px',
                borderBottom: '2px solid transparent',
                paddingBottom: '8px',
                marginBottom: '2px',
              }}
            />
            <div style={{ fontSize: '8px', marginBottom: '60px' }}></div>
            <div style={{ paddingTop: '25px' }} />
            <div
              style={{
                marginBottom: '2px',
                borderBottom: '1px solid #333',
                paddingBottom: '4px',
                ...addFont,
              }}
            >
              &nbsp;
            </div>
            <div style={{ fontSize: '8px', color: '#000', ...addFont }}>
              Klassenlehrkraft
            </div>
          </div>

          {/* Right */}
          <div>
            <div
              style={{
                fontSize: '15px',
                borderBottom: '2px solid transparent',
                paddingBottom: '8px',
                marginBottom: '2px',
              }}
            />
            <div style={{ fontSize: '8px', marginBottom: '60px' }}></div>
            <div style={{ paddingTop: '25px' }} />
            <div
              style={{
                marginBottom: '2px',
                borderBottom: '1px solid #333',
                paddingBottom: '4px',
                ...addFont,
              }}
            >
              &nbsp;
            </div>
            <div style={{ fontSize: '8px', color: '#000', ...addFont }}>
              Auszubildende/r
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LastPage;
