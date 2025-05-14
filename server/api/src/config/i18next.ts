import i18n from 'i18next';
import middleware from 'i18next-http-middleware';
import de from '../locales/de.json';
import en from '../locales/en.json';

const configureI18n = () => {
  i18n.use(middleware.LanguageDetector).init({
    detection: {
      order: ['header'],
      lookupHeader: 'accept-language',
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
