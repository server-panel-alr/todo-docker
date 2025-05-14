import { useTranslation } from 'react-i18next';
import { Button, Text, Title } from '../components';

const Error = () => {
  const { t } = useTranslation();
  return (
    <div className='absolute top-0 left-0 flex h-screen w-screen items-center justify-center'>
      <div className='text-center'>
        <Title>{t('page.error.title')}</Title>
        <Text>{t('page.error.text')}</Text>
        <div className='mt-4'>
          <Button onClick={() => window.location.reload()}>
            {t('action.reload_page')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Error };
