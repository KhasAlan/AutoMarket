
import { useLanguage } from '../context/language-context';
import { getTranslation, TranslationKey } from './translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return { t, language };
}
