import { useTranslation as useI18n } from 'react-i18next';
import { platformNow } from '@/config/clock';
import { DEFAULT_LANGUAGE, localeOf, readingLanguage, type LanguageCode } from '@/i18n/languages';
import { digitsFor, usesDevanagariDigits } from '@/lib/numerals';
/**
 * Formatting for the interface. Deliberately built on the platform's own Intl
 * rather than a date library: the app shell ships on every public route, and a
 * formatting dependency there would cost more than it is worth. The mock API
 * still uses date-fns for arithmetic, and it lives in a separate chunk.
 */

/* ------------------------------------------------------------- the language
 *
 * Every formatter below is a plain function called from a couple of hundred
 * places. Threading the reader's language through all of them as an argument
 * was never realistic, and the product is only ever in one language at a time,
 * so it is held here and set once when the language changes.
 *
 * Both the locale AND the numeral system follow the reader. A Marathi date is
 * "८ ऑग", not "8 ऑग" — a page that sets every word in Devanagari and every
 * figure in Latin reads like a translation that ran out halfway.
 *
 * What does NOT follow the reader is an identifier: a case number, an error
 * reference, a checksum, a GSTIN. Those never reach a formatter here; they are
 * printed as issued, because they are strings a person copies, quotes and
 * searches for. See `src/lib/numerals.ts` for where that line is drawn.
 */
let reading: LanguageCode = DEFAULT_LANGUAGE;

/**
 * The Intl tag, with the numbering system attached as a Unicode extension.
 *
 * `-u-nu-deva` rather than the `numberingSystem` option: the extension is
 * understood by every engine that has Intl at all, and by every version of the
 * TypeScript DOM lib, where the option is newer than both.
 */
function tag(): string {
  const base = localeOf(reading);
  return usesDevanagariDigits(reading) ? `${base}-u-nu-deva` : base;
}

/** Indian digit grouping. ₹18,00,000 — never 1,800,000. */
let inr = money0();
let inrPrecise = money2();
let plain = plainNumber();

/** 12 Aug 2026 — never 12/08/2026. */
let dayFormat = dayFormatter();
let dayShortFormat = dayShortFormatter();
let timeFormat = timeFormatter();

function money0() {
  return new Intl.NumberFormat(tag(), { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
}
function money2() {
  return new Intl.NumberFormat(tag(), {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function plainNumber() {
  return new Intl.NumberFormat(tag());
}
function dayFormatter() {
  return new Intl.DateTimeFormat(tag(), { day: 'numeric', month: 'short', year: 'numeric' });
}
function dayShortFormatter() {
  return new Intl.DateTimeFormat(tag(), { day: 'numeric', month: 'short' });
}
function timeFormatter() {
  return new Intl.DateTimeFormat(tag(), { hour: 'numeric', minute: '2-digit' });
}

/** Called by the language switch. Nothing else should set this. */
export function setFormatLanguage(lang: string): void {
  reading = readingLanguage(lang);
  inr = money0();
  inrPrecise = money2();
  plain = plainNumber();
  dayFormat = dayFormatter();
  dayShortFormat = dayShortFormatter();
  timeFormat = timeFormatter();
}

function toDate(value: string | Date | undefined): Date | null {
  if (!value) return null;
  const d = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Money is held in paise everywhere so no float ever touches a rupee. */
export function money(paise: number): string {
  return inr.format(Math.round(paise / 100));
}

export function moneyPrecise(paise: number): string {
  return inrPrecise.format(paise / 100);
}

/**
 * The Indian scale words, per language.
 *
 * Crore and lakh are the units this product counts money in, and they are words
 * — so they translate, while the grouping does not. They live here rather than
 * in the i18next bundles because `moneyScaled` is a plain function called from
 * dozens of places, and threading a hook through all of them to localise two
 * words would be worse than a three-entry table.
 */
const SCALE: Readonly<Record<string, { crore: string; lakh: string }>> = {
  en: { crore: 'crore', lakh: 'lakh' },
  hi: { crore: 'करोड़', lakh: 'लाख' },
  mr: { crore: 'कोटी', lakh: 'लाख' },
};

/**
 * For headline sentences: ₹14.2 crore, ₹18 lakh, ₹१४.२ कोटी.
 *
 * Without a `lang`, it uses whatever language the product is being read in —
 * so the fifteen existing call sites say "₹४.७ कोटी" in Marathi and
 * "₹4.7 crore" in English without any of them being touched.
 */
export function moneyScaled(paise: number, lang?: string): string {
  const code = lang ? readingLanguage(lang) : reading;
  const words = SCALE[code] ?? SCALE.en!;
  const rupees = paise / 100;
  if (rupees >= 10000000) {
    const cr = rupees / 10000000;
    return `₹${digitsFor(cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1), code)} ${words.crore}`;
  }
  if (rupees >= 100000) {
    const lakh = rupees / 100000;
    return `₹${digitsFor(lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1), code)} ${words.lakh}`;
  }
  return inr.format(rupees);
}

/** `moneyScaled` bound to the reader's language. */
export function useMoneyScaled(): (paise: number) => string {
  const { i18n } = useI18n();
  return (paise) => moneyScaled(paise, i18n.language);
}

export function num(value: number, fractionDigits = 0): string {
  return plain.format(Number(value.toFixed(fractionDigits)));
}

export function percent(value: number, fractionDigits = 1): string {
  return `${plain.format(Number(value.toFixed(fractionDigits)))}%`;
}

export function day(iso: string | Date | undefined): string {
  const d = toDate(iso);
  return d ? dayFormat.format(d) : '—';
}

/** Day and month, for a register where the year is already established. */
export function dayShort(iso: string | Date | undefined): string {
  const d = toDate(iso);
  return d ? dayShortFormat.format(d) : '—';
}

export function dayTime(iso: string | Date | undefined): string {
  const d = toDate(iso);
  return d ? `${dayFormat.format(d)}, ${timeFormat.format(d)}` : '—';
}

export function clockTime(iso: string | Date | undefined): string {
  const d = toDate(iso);
  return d ? timeFormat.format(d) : '—';
}

const MS_PER_DAY = 86_400_000;

/** Whole calendar days between two instants, ignoring the time of day. */
export function daysBetween(from: string | Date, to: string | Date = platformNow()): number {
  const a = toDate(from);
  const b = toDate(to);
  if (!a || !b) return 0;
  const aUtc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUtc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bUtc - aUtc) / MS_PER_DAY);
}

/**
 * The duration words, per language.
 *
 * A whole phrase rather than a unit, because the three languages do not agree
 * on where the number goes or on how the noun inflects: Marathi says एक आठवडा
 * for one and आठवडे for several, and "1 आठवडा" assembled from parts would be
 * wrong in both directions.
 */
const DURATION: Readonly<Record<string, { today: string; day: string; days: string; week: string; weeks: string; month: string; months: string }>> = {
  en: { today: 'today', day: 'day', days: 'days', week: 'week', weeks: 'weeks', month: 'month', months: 'months' },
  hi: { today: 'आज', day: 'दिन', days: 'दिन', week: 'सप्ताह', weeks: 'सप्ताह', month: 'माह', months: 'माह' },
  mr: { today: 'आज', day: 'दिवस', days: 'दिवस', week: 'आठवडा', weeks: 'आठवडे', month: 'महिना', months: 'महिने' },
};

/** Words, always. "Due in 4 days", never "4d". */
export function durationWords(days: number): string {
  const w = DURATION[reading] ?? DURATION.en!;
  const n = Math.abs(days);
  const figure = (v: number) => digitsFor(String(v), reading);
  if (n === 0) return w.today;
  if (n === 1) return `${figure(1)} ${w.day}`;
  if (n < 14) return `${figure(n)} ${w.days}`;
  if (n < 60) {
    const weeks = Math.round(n / 7);
    return `${figure(weeks)} ${weeks === 1 ? w.week : w.weeks}`;
  }
  const months = Math.round(n / 30);
  return `${figure(months)} ${months === 1 ? w.month : w.months}`;
}

/** The size units. KB and MB are written as issued in every language. */
const BYTES: Readonly<Record<string, string>> = { en: 'bytes', hi: 'बाइट', mr: 'बाइट' };

export function fileSize(bytes: number): string {
  const unit = BYTES[reading] ?? BYTES.en!;
  if (bytes < 1024) return `${digitsFor(String(bytes), reading)} ${unit}`;
  if (bytes < 1024 * 1024) return `${digitsFor((bytes / 1024).toFixed(0), reading)} KB`;
  return `${digitsFor((bytes / (1024 * 1024)).toFixed(1), reading)} MB`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

/** Short display checksum. The full value stays available for the audit trail. */
export function shortHash(hash: string): string {
  return hash.length > 16 ? `${hash.slice(0, 8)}…${hash.slice(-4)}` : hash;
}

const CONJUNCTION: Readonly<Record<string, string>> = { en: 'and', hi: 'और', mr: 'आणि' };

export function sentence(list: string[], conjunction?: string): string {
  const join = conjunction ?? CONJUNCTION[reading] ?? CONJUNCTION.en!;
  if (list.length === 0) return '';
  if (list.length === 1) return list[0]!;
  return `${list.slice(0, -1).join(', ')} ${join} ${list[list.length - 1]}`;
}

/**
 * The nouns `countOf` is actually called with, in each language.
 *
 * A short closed list rather than a general dictionary: these are the seven
 * words the product counts things in, they inflect differently in each
 * language, and a noun with no entry falls back to the English the caller
 * passed — readable, and visibly the thing still to translate.
 */
const COUNT_NOUNS: Readonly<Record<string, Readonly<Record<string, [string, string]>>>> = {
  hi: {
    row: ['पंक्ति', 'पंक्तियाँ'],
    result: ['परिणाम', 'परिणाम'],
    entry: ['प्रविष्टि', 'प्रविष्टियाँ'],
    challenge: ['चुनौती', 'चुनौतियाँ'],
    district: ['ज़िला', 'ज़िले'],
    field: ['क्षेत्र', 'क्षेत्र'],
    reading: ['पाठ', 'पाठ'],
  },
  mr: {
    row: ['ओळ', 'ओळी'],
    result: ['निकाल', 'निकाल'],
    entry: ['नोंद', 'नोंदी'],
    challenge: ['आव्हान', 'आव्हाने'],
    district: ['जिल्हा', 'जिल्हे'],
    field: ['क्षेत्र', 'क्षेत्रे'],
    reading: ['नोंद', 'नोंदी'],
  },
};

/**
 * Count plus a noun that agrees with it. "1 payment is", "3 payments are".
 * Interface counts are written inline rather than through i18next, so this is
 * the one place the agreement rule lives.
 */
export function countOf(count: number, singular: string, plural?: string): string {
  const table = COUNT_NOUNS[reading];
  const pair = table?.[singular];
  const noun = pair ? (count === 1 ? pair[0] : pair[1]) : count === 1 ? singular : (plural ?? `${singular}s`);
  return `${plain.format(count)} ${noun}`;
}
