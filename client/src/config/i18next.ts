import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import de from '../locales/de.json';
import en from '../locales/en.json';

const languageDetector = new LanguageDetector();

const configureI18n = () => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      detection: {
        order: ['navigator'],
      },
      resources: {
        en: {
          translation: en,
        },
        de: {
          translation: de,
        },
      },
      fallbackLng: 'en',
    });
};

export { configureI18n };
