export interface PasswordClass {
  id: string;
  label: string;
  test: (s: string) => boolean;
}

export const PASSWORD_CLASSES: PasswordClass[] = [
  { id: 'lowercase', label: 'lowercase letter', test: (s: string) => /[a-z]/.test(s) },
  { id: 'uppercase', label: 'uppercase letter', test: (s: string) => /[A-Z]/.test(s) },
  { id: 'digit', label: 'number', test: (s: string) => /[0-9]/.test(s) },
  { id: 'symbol', label: 'symbol', test: (s: string) => /[^A-Za-z0-9]/.test(s) },
];

export function countClasses(value: string): number {
  return PASSWORD_CLASSES.filter((c) => c.test(value)).length;
}

export interface PasswordAnalysis {
  score: number;
  meets: boolean;
  label: string;
  detail?: string;
  missing: string[];
}

export function readPassword(value: string, minLength: number = 8, minClasses: number = 3): PasswordAnalysis {
  if (!value) {
    return {
      score: 0,
      meets: false,
      label: 'Enter a password',
      missing: PASSWORD_CLASSES.map((c) => c.label),
    };
  }

  const lengthOk = value.length >= minLength;
  const classesMet = PASSWORD_CLASSES.filter((c) => c.test(value));
  const missing = PASSWORD_CLASSES.filter((c) => !c.test(value)).map((c) => c.label);
  const classCount = classesMet.length;
  const meets = lengthOk && classCount >= minClasses;

  let score = 1;
  if (value.length >= minLength) score += 1;
  if (classCount >= minClasses) score += 1;
  if (value.length >= minLength + 4 && classCount >= 3) score += 1;
  score = Math.min(score, 4);

  let label = 'Weak';
  if (score === 2) label = 'Fair';
  if (score === 3) label = 'Good';
  if (score === 4) label = 'Strong';

  return {
    score,
    meets,
    label,
    missing: meets ? [] : missing,
  };
}
