import 'react-i18next';
import de from '../locales/de.json';
import en from '../locales/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      de: typeof de;
    };
  }
}
