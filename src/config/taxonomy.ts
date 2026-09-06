import { useTranslation } from 'react-i18next';
import { readingLanguage, type LanguageCode } from '@/i18n/languages';

/**
 * Labels for the reference vocabulary, per language.
 *
 * This is deliberately NOT in the i18next bundles, and the difference matters.
 *
 * The bundles hold *interface* — words this product authors, where a missing
 * key is a bug and `check-i18n` fails the build over it. This table holds
 * labels for *reference data*: the sector a challenge sits in, the state and
 * district it runs in, the statutory form of an applicant entity. Those values
 * are also identifiers — they are what a filter matches on and what the API
 * stores — so the English string stays canonical and this only decides how it
 * is written on screen.
 *
 * The fallback is therefore the English value, not a key. A sector added to the
 * fixtures without a line here reads as English, which is right; rendering
 * `taxonomy.someNewSector` across a card would not be.
 *
 * What is NOT here, on purpose: challenge titles, outcome statements, baselines
 * and company names. Those are free text a department or an applicant wrote,
 * and this product does not machine-translate a record somebody has to act on.
 * A real deployment captures them per language at the point they are authored.
 */
const HINDI: Readonly<Record<string, string>> = {
  /* ------------------------------------------------------------- states */
  Maharashtra: 'महाराष्ट्र',
  Karnataka: 'कर्नाटक',
  Rajasthan: 'राजस्थान',

  /* ---------------------------------------------------------- districts */
  Pune: 'पुणे',
  Nagpur: 'नागपुर',
  Nashik: 'नासिक',
  Thane: 'ठाणे',
  Aurangabad: 'औरंगाबाद',
  Solapur: 'सोलापुर',
  'Bengaluru Urban': 'बेंगलुरु शहरी',
  Mysuru: 'मैसूर',
  Belagavi: 'बेलगावी',
  'Hubballi-Dharwad': 'हुबली-धारवाड़',
  Kalaburagi: 'कलबुरगी',
  Jaipur: 'जयपुर',
  Jodhpur: 'जोधपुर',
  Kota: 'कोटा',
  Udaipur: 'उदयपुर',
  Bikaner: 'बीकानेर',
  Ajmer: 'अजमेर',

  /* ------------------------------------------------------------ sectors */
  'Water and sanitation': 'जल एवं स्वच्छता',
  'Urban transport': 'शहरी परिवहन',
  Agriculture: 'कृषि',
  'School education': 'विद्यालयी शिक्षा',
  'Solid waste': 'ठोस अपशिष्ट',
  'Revenue and taxation': 'राजस्व एवं कराधान',
  'Health services': 'स्वास्थ्य सेवाएँ',
  'Public works': 'लोक निर्माण',

  /* ------------------------------------------------------- capabilities */
  'IoT sensors': 'आईओटी सेंसर',
  'Computer vision': 'कंप्यूटर दृष्टि',
  'Satellite imagery': 'उपग्रह चित्रण',
  'Acoustic analytics': 'ध्वनि विश्लेषण',
  'Route optimisation': 'मार्ग अनुकूलन',
  'Predictive analytics': 'पूर्वानुमान विश्लेषण',
  'Natural language processing': 'प्राकृतिक भाषा संसाधन',
  'Edge computing': 'एज कंप्यूटिंग',
  'GIS mapping': 'जीआईएस मानचित्रण',
  Telemetry: 'दूरमापन',
  'Mobile field applications': 'मोबाइल क्षेत्र अनुप्रयोग',
  'Drone survey': 'ड्रोन सर्वेक्षण',
  'Machine learning': 'मशीन लर्निंग',
  'Speech recognition': 'वाक् पहचान',
  'Digital twin': 'डिजिटल ट्विन',
  'Workflow automation': 'कार्यप्रवाह स्वचालन',

  /* ------------------------------------------------------ entity forms */
  'Private limited company': 'प्राइवेट लिमिटेड कंपनी',
  'Limited liability partnership': 'सीमित दायित्व भागीदारी',
  'Registered partnership': 'पंजीकृत भागीदारी',
  'Sole proprietorship': 'एकल स्वामित्व',
};

/**
 * The same vocabulary in Marathi.
 *
 * Not derived from the Hindi above. Most of these values are Maharashtra place
 * names, and the two languages spell them differently — नागपूर not नागपुर,
 * सोलापूर not सोलापुर, म्हैसूर not मैसूर. Deriving one from the other would put a
 * Hindi spelling of a Marathi district on a Government of Maharashtra page.
 */
const MARATHI: Readonly<Record<string, string>> = {
  /* ------------------------------------------------------------- states */
  Maharashtra: 'महाराष्ट्र',
  Karnataka: 'कर्नाटक',
  Rajasthan: 'राजस्थान',

  /* ---------------------------------------------------------- districts */
  Pune: 'पुणे',
  Nagpur: 'नागपूर',
  Nashik: 'नाशिक',
  Thane: 'ठाणे',
  Aurangabad: 'छत्रपती संभाजीनगर',
  Solapur: 'सोलापूर',
  'Bengaluru Urban': 'बेंगळुरू शहरी',
  Mysuru: 'म्हैसूर',
  Belagavi: 'बेळगाव',
  'Hubballi-Dharwad': 'हुबळी-धारवाड',
  Kalaburagi: 'कलबुर्गी',
  Jaipur: 'जयपूर',
  Jodhpur: 'जोधपूर',
  Kota: 'कोटा',
  Udaipur: 'उदयपूर',
  Bikaner: 'बिकानेर',
  Ajmer: 'अजमेर',

  /* ------------------------------------------------------------ sectors */
  'Water and sanitation': 'पाणी व स्वच्छता',
  'Urban transport': 'नागरी परिवहन',
  Agriculture: 'कृषी',
  'School education': 'शालेय शिक्षण',
  'Solid waste': 'घनकचरा',
  'Revenue and taxation': 'महसूल व कर',
  'Health services': 'आरोग्य सेवा',
  'Public works': 'सार्वजनिक बांधकाम',

  /* ------------------------------------------------------- capabilities */
  'IoT sensors': 'आयओटी संवेदक',
  'Computer vision': 'संगणक दृष्टी',
  'Satellite imagery': 'उपग्रह प्रतिमा',
  'Acoustic analytics': 'ध्वनिक विश्लेषण',
  'Route optimisation': 'मार्ग अनुकूलन',
  'Predictive analytics': 'पूर्वानुमान विश्लेषण',
  'Natural language processing': 'नैसर्गिक भाषा प्रक्रिया',
  'Edge computing': 'एज संगणन',
  'GIS mapping': 'जीआयएस नकाशांकन',
  Telemetry: 'दूरमापन',
  'Mobile field applications': 'मोबाइल क्षेत्रीय अनुप्रयोग',
  'Drone survey': 'ड्रोन सर्वेक्षण',
  'Machine learning': 'मशीन लर्निंग',
  'Speech recognition': 'वाणी ओळख',
  'Digital twin': 'डिजिटल जुळे',
  'Workflow automation': 'कार्यप्रवाह स्वयंचलन',

  /* ------------------------------------------------------ entity forms */
  'Private limited company': 'प्रायव्हेट लिमिटेड कंपनी',
  'Limited liability partnership': 'मर्यादित दायित्व भागीदारी',
  'Registered partnership': 'नोंदणीकृत भागीदारी',
  'Sole proprietorship': 'एकल मालकी',
};

const LABELS: Partial<Record<LanguageCode, Readonly<Record<string, string>>>> = { hi: HINDI, mr: MARATHI };

/**
 * How a reference value should be written on screen.
 *
 * Returns the value itself in English, and in any language it has no label
 * for — so an untranslated sector degrades to something readable rather than
 * to a key.
 */
export function useTaxonomyLabel(): (value: string) => string {
  const { i18n } = useTranslation();
  const table = LABELS[readingLanguage(i18n.language)];
  return (value) => table?.[value] ?? value;
}

/** The same, for a list. */
export function useTaxonomyLabels(): (values: readonly string[]) => string[] {
  const label = useTaxonomyLabel();
  return (values) => values.map(label);
}
