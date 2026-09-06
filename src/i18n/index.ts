import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { toDevanagariDigits, usesDevanagariDigits } from '@/lib/numerals';
import { DEFAULT_LANGUAGE, LANGUAGES, readingLanguage } from './languages';
import en from './en';
import hi from './hi';
import mr from './mr';

/**
 * Strings are never concatenated; every message is a whole sentence with named
 * interpolation, and counts use ICU-style plural keys.
 *
 * Legal text is deliberately absent from these bundles. Clause text is
 * authoritative and lives in config/templates.ts in its original language, with
 * a labelled plain-language reading aid beside it — it is never machine-translated.
 */
const BUNDLES = { en, hi, mr } as const;

void i18next.use(initReactI18next).init({
  resources: Object.fromEntries(LANGUAGES.map((l) => [l.code, { translation: BUNDLES[l.code] }])),
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  returnNull: false,
  interpolation: {
    escapeValue: false,
    /*
     * Figures inside a sentence follow the reader's language too, so
     * "{{count}} दिवस" renders as "८ दिवस" rather than "8 दिवस".
     *
     * The test is the TYPE of the value, not the shape of the text, and that
     * is the whole point. A quantity reaches interpolation as a JS number; an
     * identifier reaches it as a string. So `{{count}}`, `{{day}}` and
     * `{{limit}}` convert, while `{{reference}}` (ERR-8F2A), `{{ruleId}}`,
     * `{{version}}` and every case number stay exactly as issued — which is
     * what a person needs when they copy one into another system or read it
     * out over the phone.
     *
     * `alwaysFormat` is what makes this run for plain `{{x}}` placeholders;
     * without it i18next only calls the formatter when a format is named.
     */
    alwaysFormat: true,
    format: (value, _format, lng) => {
      if (typeof value === 'number' && usesDevanagariDigits(readingLanguage(lng))) {
        return toDevanagariDigits(String(value));
      }
      return value as string;
    },
  },
});

export default i18next;
