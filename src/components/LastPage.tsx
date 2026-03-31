import React from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { RlpCertificateData } from "../lib/types";
import { formatPracticeGrade } from "../lib/types";

interface LastPageProps {
  data: RlpCertificateData;
}

const LastPage: React.FC<LastPageProps> = ({ data }) => {
  const {
    trainee,
    school,
    practiceGrades,
    theoryAbsenceHours,
    practiceAbsenceHours,
    issuedDate,
  } = data;

  const addFont: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
  };

  const tightValueStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "-18px",
    marginBottom: "-18px",
    lineHeight: "0.8",
  };

  const practicePhases = [
    { num: "I", desc: "Orientierungseinsatz 400 Stunden", index: 0 },
    {
      num: "II",
      desc: "Pflichteinsätze in den drei allgmeinen Versorgungsbereichen",
      index: null,
    },
    { num: "", desc: "Stationäre Langezeitpflege 400 Stunden", index: 1 },
    { num: "", desc: "Ambulante Langzeitpflege 400 Stunden", index: 2 },
    { num: "", desc: "Stationäre Akut-Pflege Krankenhaus", index: 3 },
    { num: "III", desc: "Pädiatrischer Einsatz", index: 4 },
  ];

  const traineeName =
    `${trainee.firstName || ""} ${trainee.lastName || ""}`.trim();
  const principalName = school.principalName || "Stephan Ronneburg";
  const cityDate = `${school.city || "Gießen"}, ${
    issuedDate ? format(issuedDate, "dd.MM.yyyy", { locale: de }) : "[Date]"
  }`;

  return (
    <div
      style={{
        color: "#000",
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <section style={{ color: "#000" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            textAlign: "center",
            backgroundColor: "#DBEAFE",
            margin: 0,
            marginBottom: "-1px",
          }}
        >
          Praktische Ausbildung*
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderSpacing: "0",
          }}
        >
          <thead style={{ backgroundColor: "#DBEAFE" }}>
            <tr>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "35px",
                  width: "43%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  lineHeight: "1.1",
                }}
              >
                Einsatzbereich
              </th>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "8px",
                  width: "14.25%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  lineHeight: "1.1",
                }}
              >
                Note
              </th>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "8px",
                  width: "14.25%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  lineHeight: "1.1",
                }}
              >
                Faktor
              </th>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "8px",
                  width: "14.25%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  lineHeight: "1.1",
                }}
              >
                Ʃ-Wert¹
              </th>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "0.5pt solid #000",
                  borderBottom: "none",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "8px",
                  width: "14.25%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  lineHeight: "1.1",
                }}
              >
                Gesamt-Ʃ²
              </th>
            </tr>
          </thead>

          <tbody>
            {practicePhases.map((phase, idx) => {
              const phaseData =
                phase.index !== null
                  ? practiceGrades.phases[phase.index]
                  : null;
              const grade = phaseData ? phaseData.grade : null;
              const factor = phaseData ? phaseData.factor : null;
              const sumValue =
                grade !== null && factor !== null ? grade * factor : null;
              const isLastRow = idx === practicePhases.length - 1;
              const bottomBorder = isLastRow ? "0.5pt solid #000" : "none";

              return (
                <tr key={idx}>
                  <td
                    style={{
                      borderTop: "0.5pt solid #000",
                      borderLeft: "0.5pt solid #000",
                      borderBottom: bottomBorder,
                      padding: 0,
                      verticalAlign: "top",
                    }}
                  >
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "30px",
                              borderRight: "0.5pt solid #000",
                              textAlign: "center",
                              verticalAlign: "middle",
                              padding: "0.5px 0 0.5px 4px",
                              fontSize: "12px",
                              color: "#000",
                              lineHeight: "0.9",
                            }}
                          >
                            {phase.num ? `${phase.num}.` : ""}
                          </td>
                          <td
                            style={{
                              padding: "2.5px 10px 2.5px 10px",
                              verticalAlign: "middle",
                              fontSize: "13px",
                              lineHeight: "0.92",
                              color: "#000",
                              textAlign: "left",
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
                      fontSize: "13px",
                      color: "#000",
                      borderTop: "0.5pt solid #000",
                      borderLeft: "0.5pt solid #000",
                      borderBottom: bottomBorder,
                      paddingTop: "0.5px",
                      paddingBottom: "0.5px",
                      paddingLeft: "34px",
                      textAlign: "left",
                      verticalAlign: "middle",
                      lineHeight: "0.9",
                    }}
                  >
                    <span style={tightValueStyle}>
                      {grade !== null ? formatPracticeGrade(grade) : ""}
                    </span>
                  </td>

                  <td
                    style={{
                      fontSize: "13px",
                      color: "#000",
                      borderTop: "0.5pt solid #000",
                      borderLeft: "0.5pt solid #000",
                      borderBottom: bottomBorder,
                      paddingTop: "0.5px",
                      paddingBottom: "0.5px",
                      paddingLeft: "40px",
                      textAlign: "left",
                      verticalAlign: "middle",
                      lineHeight: "0.9",
                    }}
                  >
                    <span style={tightValueStyle}>
                      {factor !== null ? factor.toFixed(1) : ""}
                    </span>
                  </td>

                  <td
                    style={{
                      fontSize: "13px",
                      color: "#000",
                      borderTop: "0.5pt solid #000",
                      borderLeft: "0.5pt solid #000",
                      borderBottom: bottomBorder,
                      paddingTop: "0.5px",
                      paddingBottom: "0.5px",
                      paddingLeft: "30px",
                      textAlign: "left",
                      verticalAlign: "middle",
                      lineHeight: "0.9",
                    }}
                  >
                    <span style={tightValueStyle}>
                      {sumValue !== null ? sumValue.toFixed(2) : ""}
                    </span>
                  </td>

                  {idx === 0 && (
                    <td
                      rowSpan={practicePhases.length}
                      style={{
                        fontSize: "13px",
                        color: "#000",
                        borderTop: "0.5pt solid #000",
                        borderLeft: "0.5pt solid #000",
                        borderRight: "0.5pt solid #000",
                        borderBottom: "0.5pt solid #000",
                        paddingTop: "0.5px",
                        paddingBottom: "0.5px",
                        paddingLeft: "24px",
                        textAlign: "left",
                        verticalAlign: "middle",
                        lineHeight: "0.9",
                      }}
                    >
                      <span style={{ ...tightValueStyle, marginBottom: "1px" }}>
                        {practiceGrades.totalWeightedSum !== null
                          ? practiceGrades.totalWeightedSum.toFixed(2)
                          : ""}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: "4px", textAlign: "left" }}>
          <p style={{ fontSize: "12px", margin: "1px 0 -7px" }}>
            ¹ Note und Faktor müssen multipliziert werden, daraus ergibt sich
            der Ʃ Wert.
          </p>
          <p style={{ fontSize: "12px" }}>
            ² Alle Ʃ Wert von I-V. müssen addiert werden, daraus ergibt sich die
            Gesamt-Ʃ.
          </p>
        </div>
      </section>

      <section
        style={{ marginTop: "16px", marginBottom: "16px", color: "#000" }}
      >
        <table
          style={{
            width: "55%",
            marginLeft: "45%",
            borderCollapse: "collapse",
            borderSpacing: "0",
            tableLayout: "fixed",
          }}
        >
          <thead style={{ backgroundColor: "#DBEAFE" }}>
            <tr>
              <th
                style={{
                  fontSize: "14px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "8.5px",
                  paddingBottom: "8.5px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "1",
                  width: "34%",
                }}
              >
                Übertragene
                <br />
                Gesamt-Ʃ
              </th>
              <th
                style={{
                  fontSize: "14px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "none",
                  paddingTop: "6.5px",
                  paddingBottom: "6.5px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "1",
                  whiteSpace: "nowrap",
                  width: "17%",
                }}
              >
                Division
              </th>
              <th
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "0.5pt solid #000",
                  borderBottom: "none",
                  paddingTop: "6.5px",
                  paddingBottom: "6.5px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "0.95",
                  width: "49%",
                }}
              >
                Gesamtnote für die
                <br />
                praktische Ausbildung
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  fontSize: "12px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "0.5pt solid #000",
                  paddingTop: "2.5px",
                  paddingBottom: "2.5px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  width: "34%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "0.9",
                }}
              >
                {practiceGrades.totalWeightedSum !== null
                  ? practiceGrades.totalWeightedSum.toFixed(2)
                  : ""}
              </td>
              <td
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "none",
                  borderBottom: "0.5pt solid #000",
                  paddingTop: "2.5px",
                  paddingBottom: "2.5px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  width: "17%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "0.9",
                }}
              >
                {practiceGrades.factorSum
                  ? practiceGrades.factorSum.toFixed(1)
                  : ""}
              </td>
              <td
                style={{
                  fontSize: "13px",
                  color: "#000",
                  borderTop: "0.5pt solid #000",
                  borderLeft: "0.5pt solid #000",
                  borderRight: "0.5pt solid #000",
                  borderBottom: "0.5pt solid #000",
                  paddingTop: "2.5px",
                  paddingBottom: "2.5px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  width: "49%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "bold",
                  lineHeight: "0.9",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "-3px",
                    marginBottom: "-3px",
                  }}
                >
                  {practiceGrades.overallGrade !== null
                    ? formatPracticeGrade(practiceGrades.overallGrade)
                    : ""}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section
        style={{ marginTop: "15px", marginBottom: "20px", fontSize: "14px" }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "70%",
                border: "1px solid #000",
                borderRight: "none",
                padding: "0",
                color: "#000",
                textAlign: "left",
                lineHeight: "1.4",
                fontSize: "13px",
              }}
            >
              Im Rahmen der Benehmenregelung gemäß § 6 Abs. 3 der Ausbildungs-
              und Prüfungsverordnung für die Pflegeberufe (PflAPrV) kann die
              oben ermittelte Note für die praktische Ausbildung anhand der im
              Beurteilungszeitraum während der praktischen Ausbildung insgesamt
              festgestellten praktischen Leistungen maximal eine Notenstufe nach
              oben oder unten angepasst werden.
            </div>
            <div
              style={{
                width: "30%",
                borderLeft: "1px solid #000",
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "70%",
                borderLeft: "1px solid #000",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                padding: "0",
                color: "#000",
                textAlign: "left",
                lineHeight: "1.4",
                fontSize: "13px",
              }}
            >
              Die oben ermittelte Gesamtnote für die praktische Ausbildung soll
              um eine Notenstufe angehoben / herabgesetzt werden. Somit ergibt
              sich folgende Gesamtnote für die praktische Ausbildung:
            </div>
            <div
              style={{
                width: "30%",
                border: "1px solid #000",
                padding: "0",
                textAlign: "center",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "64px",
                  height: "30px",
                  textAlign: "center",
                  backgroundColor: "#e0e0e0",
                  lineHeight: "30px",
                }}
              >
                {practiceGrades.adjustedGrade !== null
                  ? formatPracticeGrade(practiceGrades.adjustedGrade)
                  : ""}
              </span>
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: "8px",
            width: "100%",
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            textAlign: "left",
            ...addFont,
          }}
        >
          {traineeName || "[Trainee Name]"} hat in diesem Ausbildungsjahr
          folgende Fehlzeiten:
        </p>

        <table
          style={{
            width: "78%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            fontSize: "13px",
            marginTop: "8px",
            marginLeft: "18px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "52%",
                  padding: "0 0 6px 0",
                  textAlign: "left",
                  lineHeight: "1.02",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                Theoretischer und praktischer
                <br />
                Unterricht
              </td>
              <td
                style={{
                  width: "22%",
                  padding: "0 6px 6px 0",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                {`${String(theoryAbsenceHours ?? 0).padStart(2, "0")}:00:00h`}
              </td>
              <td
                style={{
                  width: "26%",
                  padding: "0 0 6px 0",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                Stunden
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "52%",
                  padding: "0",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                Praktische Ausbildung
              </td>
              <td
                style={{
                  width: "22%",
                  padding: "0 6px 0 0",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                {`${String(practiceAbsenceHours ?? 0).padStart(2, "0")}:00:00h`}
              </td>
              <td
                style={{
                  width: "26%",
                  padding: "0",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  ...addFont,
                }}
              >
                Stunden
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "52px",
          }}
        >
          <div style={{ width: "28%" }}>
            <div
              style={{
                marginBottom: "2px",
                fontSize: "15px",
                fontWeight: "bold",
                borderBottom: "1px solid #333",
                paddingBottom: "4px",
                textAlign: "left",
                ...addFont,
              }}
            >
              {cityDate}
            </div>
            <div
              style={{
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                ...addFont,
              }}
            >
              Ort/Datum
            </div>
            <div
              style={{
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                ...addFont,
              }}
            >
              (Schulstempel)
            </div>
          </div>

          <div style={{ width: "38%" }}>
            <div
              style={{
                borderBottom: "1px solid #333",
                height: "14px",
                marginBottom: "4px",
              }}
            />
            <div
              style={{
                fontSize: "9px",
                color: "#000",
                lineHeight: "0.8",
                ...addFont,
              }}
            >
              .
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#000",
                lineHeight: "0.8",
                marginBottom: "4px",
                ...addFont,
              }}
            >
              .
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: "2px",
                ...addFont,
              }}
            >
              {principalName}
            </div>
            <div
              style={{
                borderBottom: "1px solid #333",
                height: "10px",
                marginBottom: "6px",
              }}
            />
            <div
              style={{
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                ...addFont,
              }}
            >
              Schulleitung (Name)
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "28%" }}>
            <div
              style={{
                marginBottom: "2px",
                fontSize: "15px",
                fontWeight: "bold",
                borderBottom: "1px solid #333",
                paddingBottom: "4px",
                textAlign: "left",
                ...addFont,
              }}
            >
              {cityDate}
            </div>
            <div
              style={{
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                ...addFont,
              }}
            >
              Ort/Datum
            </div>
          </div>

          <div style={{ width: "38%", marginTop: "10px" }}>
            <div
              style={{
                borderBottom: "1px solid #333",
                height: "10px",
                marginBottom: "6px",
              }}
            />
            <div
              style={{
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                ...addFont,
              }}
            >
              Auszubildende/r bzw. erziehungsb. Person
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "54px",
            textAlign: "center",
            ...addFont,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontStyle: "italic",
              color: "#000",
              fontWeight: 500,
              lineHeight: "1.2",
            }}
          >
            Notenstufen: 1=sehr gut, 2=gut, 3=befriedigend, 4=ausreichend,
            5=mangelhaft, 6=ungenügend
          </p>
          <p
            style={{
              margin: "42px 0 0",
              fontSize: "11px",
              color: "#000",
              fontWeight: 500,
              lineHeight: "1.2",
            }}
          >
            * Bei den Kompetenzbereichen und Einsatzbereichen, die in diesem
            Jahr nicht unterrichtet bzw. absolviert wurden, stehen keine Noten.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LastPage;
