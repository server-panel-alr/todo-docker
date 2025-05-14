import { useTranslation } from 'react-i18next';
import { Text, Title } from '../components';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className='absolute top-0 left-0 flex h-screen w-screen items-center justify-center'>
      <div className='text-center'>
        <Title>{t('page.not_found.title')}</Title>
        <Text>{t('page.not_found.text')}</Text>
      </div>
    </div>
  );
};

export { NotFound };
