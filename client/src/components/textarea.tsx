import { ForwardedRef, forwardRef } from 'react';
import { Text } from './text';

type TextareaProps = {
  label?: string;
  value?: string;
  error?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

const Textarea = forwardRef(
  ({ label, value, error, onChange, onBlur }: TextareaProps, ref) => {
    return (
      <>
        <label>
          <div className='text-left'>
            <Text weight='medium'>{label}</Text>
          </div>
          <textarea
            className={`relative mt-1 block h-32 w-full resize-none rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            defaultValue={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {error ? <p className='pt-2 text-sm text-red-500'>{error}</p> : null}
        </label>
      </>
    );
  },
);

export { Textarea };
export type { TextareaProps };
