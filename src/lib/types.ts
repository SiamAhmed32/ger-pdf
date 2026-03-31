// Certificate Types and Interfaces

export type CertificateType = 'jahreszeugnis' | 'abschlusszeugnis' | 'abgangszeugnis';

export const CERTIFICATE_TYPE_LABELS: Record<CertificateType, string> = {
  jahreszeugnis: 'Jahreszeugnis',
  abschlusszeugnis: 'Abschlusszeugnis',
  abgangszeugnis: 'Abgangszeugnis',
};

export const KB_FACTORS: Record<number, number> = {
  1: 3,
  2: 2,
  3: 2,
  4: 1,
  5: 1,
};

export const KB_FACTOR_SUM = 9;

export interface KbGradeEntry {
  grade: number | null;
  weightedValue: number | null;
  factor: number;
}

export interface TheoryGradeResult {
  kbGrades: Record<number, KbGradeEntry>;
  totalWeightedSum: number | null;
  overallGrade: number | null;
  factorSum: number;
}

export interface PracticePhaseGrade {
  grade: number | null;
  factor: number;
}

export interface PracticeGradeResult {
  phases: PracticePhaseGrade[];
  totalWeightedSum: number | null;
  overallGrade: number | null;
  factorSum: number;
  adjustedGrade: number | null;
}

export interface RlpCertificateData {
  certificateType: CertificateType;
  trainingYear: number;
  schoolYearFrom: Date;
  schoolYearTo: Date;
  issuedDate: Date;

  trainee: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    street: string;
    postalCode: string;
    city: string;
  };

  school: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
    principalName: string;
    principalTitle: string;
  };

  course: {
    name: string;
    program: string;
  };

  theoryGrades: TheoryGradeResult;
  practiceGrades: PracticeGradeResult;

  theoryAbsenceHours: number;
  practiceAbsenceHours: number;
}

// Helper: round to 2 decimal places
export function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatGrade(grade: number | null): string {
  if (grade === null) return '—';
  return grade.toFixed(2);
}

export function formatPracticeGrade(grade: number | null): string {
  if (grade === null) return '—';
  return grade.toFixed(1);
}
