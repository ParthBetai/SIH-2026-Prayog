import { useTranslation } from 'react-i18next';
import { contentDictionary } from '@/content/dictionary';
import type { LanguageCode } from '@/i18n/languages';

export function useSay(): (text?: string | null) => string {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en') as LanguageCode;
  const dict = contentDictionary(lang);

  return (text?: string | null): string => {
    if (!text) return '';
    return dict[text] ?? text;
  };
}
