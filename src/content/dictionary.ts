import type { LanguageCode } from '@/i18n/languages';
import { toDevanagariDigits, usesDevanagariDigits } from '@/lib/numerals';
import { HINDI } from './hindi';
import { MARATHI } from './marathi';

/**
 * Which content dictionary answers for which language.
 *
 * Before this there was one dictionary and one caller, and both said "Hindi" in
 * their own names — `localise.ts` imported `HINDI`, `contentText.ts` imported
 * `HINDI`, and each decided for itself whether the reader was reading it by
 * asking `language.startsWith('hi')`. Adding Marathi to that shape would have
 * meant a second import and a second branch in every one of those files, with
 * nothing failing if one was missed.
 *
 * So the lookup is declared once here and every caller asks the same question:
 * given a language, what does this English string read as? English has no
 * dictionary, which is the point — it is the language the fixtures are written
 * in, so it answers with the string itself.
 */

/**
 * Figures in the seeded prose, in the reader's numerals.
 *
 * Done once at module load rather than per lookup. The localiser walks every
 * string of every response, so converting on the way out would re-scan the same
 * two hundred sentences on every request for the same answer every time.
 *
 * Applied to the VALUES only. The keys are the English source strings the store
 * actually holds, and rewriting their digits would mean nothing ever matched.
 */
function inReadersDigits(
  table: Readonly<Record<string, string>>,
  lang: LanguageCode,
): Readonly<Record<string, string>> {
  if (!usesDevanagariDigits(lang)) return table;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(table)) out[k] = toDevanagariDigits(v);
  return Object.freeze(out);
}

const TABLES: Partial<Record<LanguageCode, Readonly<Record<string, string>>>> = {
  hi: inReadersDigits(HINDI, 'hi'),
  mr: inReadersDigits(MARATHI, 'mr'),
};

/** Nothing to look up: this is the language the fixtures are authored in. */
const NONE: Readonly<Record<string, string>> = Object.freeze({});

/**
 * The dictionary for a language, or an empty one where the language needs none.
 *
 * Never null, so no caller has to branch on whether translation applies. A
 * miss returns the English string, which is the right failure — an untranslated
 * sentence is legible, and a blank one is not.
 */
export function contentDictionary(lang: LanguageCode): Readonly<Record<string, string>> {
  return TABLES[lang] ?? NONE;
}

/** Whether this language has content of its own to serve. */
export function hasContentDictionary(lang: LanguageCode): boolean {
  return TABLES[lang] !== undefined;
}
