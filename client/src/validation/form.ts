import { t } from 'i18next';

const isRequired = (value: any) => {
  return ['', null, undefined].includes(value)
    ? t('form.validation.required')
    : true;
};

export { isRequired };
