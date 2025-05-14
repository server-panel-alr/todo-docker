import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text, Textarea, Title } from '../../../components';
import { isRequired } from '../../../validation';

type TodoFormFields = {
  title: string;
  description: string;
};

type TodoFormProps = {
  title: string;
  text: string;
  form: UseFormReturn<TodoFormFields>;
};

const TodoForm = ({ title, text, form }: TodoFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Title size={2}>{title}</Title>
      </div>
      <div className='mt-2'>
        <Text>{text}</Text>
      </div>

      <div className='mt-6'>
        <Controller
          control={form.control}
          name='title'
          rules={{
            validate: {
              isRequired,
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              ref={field.ref}
              label={t('form.label.title')}
              value={field.value}
              error={fieldState.error?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>
      <div className='mt-2'>
        <Controller
          control={form.control}
          name='description'
          rules={{
            validate: {
              isRequired,
            },
          }}
          render={({ field, fieldState }) => (
            <Textarea
              ref={field.ref}
              label={t('form.label.description')}
              value={field.value}
              error={fieldState.error?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>
    </>
  );
};

export { TodoForm };
export type { TodoFormFields };
