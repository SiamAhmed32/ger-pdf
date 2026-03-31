import type { RlpCertificateData, TheoryGradeResult, PracticeGradeResult } from './types';
import { KB_FACTORS, roundToTwo } from './types';

const FIRST_NAMES = [
  'Anna', 'Lena', 'Maria', 'Sophie', 'Julia',
  'Thomas', 'Michael', 'Stefan', 'Daniel', 'Markus',
  'Laura', 'Sarah', 'Katharina', 'Lisa', 'Nina',
  'Felix', 'Jonas', 'Tobias', 'Christian', 'Patrick',
];

const LAST_NAMES = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber',
  'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schulz',
  'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
  'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun',
];

const CITIES = ['Frankfurt', 'Gießen', 'Marburg', 'Wetzlar', 'Laubach'];
const STREETS = [
  'Hauptstraße 12', 'Gartenweg 5', 'Birkenallee 23',
  'Rosenweg 8', 'Kastanienweg 3', 'Lindenstraße 17',
];
const POSTAL_CODES = ['35390', '35392', '35037', '35578', '35321'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomGrade(min = 1.0, max = 3.5): number {
  const raw = min + Math.random() * (max - min);
  return roundToTwo(Math.round(raw * 10) / 10);
}

function randomDateOfBirth(): string {
  const year = 1990 + Math.floor(Math.random() * 10);
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildTheoryGrades(): TheoryGradeResult {
  const kbGrades: TheoryGradeResult['kbGrades'] = {};
  let totalWeightedSum = 0;
  let factorSum = 0;

  for (let kb = 1; kb <= 5; kb++) {
    const grade = randomGrade(1.0, 4.0);
    const factor = KB_FACTORS[kb];
    const weightedValue = roundToTwo(grade * factor);
    kbGrades[kb] = { grade, weightedValue, factor };
    totalWeightedSum += grade * factor;
    factorSum += factor;
  }

  const overallGrade = factorSum > 0 ? roundToTwo(totalWeightedSum / factorSum) : null;

  return {
    kbGrades,
    totalWeightedSum: roundToTwo(totalWeightedSum),
    overallGrade,
    factorSum,
  };
}

// Practice phase factors per RLP template
const PRACTICE_PHASE_FACTORS = [3, 3, 3, 3, 1];

function buildPracticeGrades(): PracticeGradeResult {
  const phases = PRACTICE_PHASE_FACTORS.map((factor) => ({
    grade: randomGrade(1.0, 4.0),
    factor,
  }));

  let totalWeightedSum = 0;
  let factorSum = 0;

  for (const p of phases) {
    if (p.grade !== null) {
      totalWeightedSum += p.grade * p.factor;
      factorSum += p.factor;
    }
  }

  const overallGrade = factorSum > 0 ? roundToTwo(totalWeightedSum / factorSum) : null;

  return {
    phases,
    totalWeightedSum: roundToTwo(totalWeightedSum),
    overallGrade,
    factorSum,
    adjustedGrade: null,
  };
}

export function generateRandomCertificateData(): RlpCertificateData {
  const schoolYearFrom = new Date(2025, 8, 1); // Sept 1, 2025
  const schoolYearTo = new Date(2026, 6, 31);   // July 31, 2026
  const issuedDate = new Date(2026, 6, 15);

  return {
    certificateType: 'jahreszeugnis',
    trainingYear: 1,
    schoolYearFrom,
    schoolYearTo,
    issuedDate,

    trainee: {
      id: crypto.randomUUID(),
      firstName: randomFrom(FIRST_NAMES),
      lastName: randomFrom(LAST_NAMES),
      dateOfBirth: randomDateOfBirth(),
      street: randomFrom(STREETS),
      postalCode: randomFrom(POSTAL_CODES),
      city: randomFrom(CITIES),
    },

    school: {
      name: 'Lernwerkstatt-Pflege GmbH',
      street: 'Liebigstraße 14-16',
      postalCode: '35390',
      city: 'Gießen',
      principalName: 'Stephan Ronneburg',
      principalTitle: 'Schulleitung',
    },

    course: {
      name: 'Generalistik 2025',
      program: 'Pflegeausbildung nach PflBG',
    },

    theoryGrades: buildTheoryGrades(),
    practiceGrades: buildPracticeGrades(),

    theoryAbsenceHours: Math.floor(Math.random() * 20),
    practiceAbsenceHours: Math.floor(Math.random() * 16),
  };
}
