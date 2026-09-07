import type { LanguageCode } from '@/i18n/languages';

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagariDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => DEVANAGARI_DIGITS[Number(d)] ?? d);
}

export function usesDevanagariDigits(lang?: LanguageCode | string | null): boolean {
  if (!lang) return false;
  const l = lang.toLowerCase();
  return l.startsWith('hi') || l.startsWith('mr');
}

export function digitsFor(input: string | number, lang?: LanguageCode | string | null): string {
  if (usesDevanagariDigits(lang)) {
    return toDevanagariDigits(input);
  }
  return String(input);
}
