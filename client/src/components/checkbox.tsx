import { CheckIcon } from '@heroicons/react/solid';

type CheckboxProps = {
  label?: string;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
};

const Checkbox = ({ label, isChecked, onChange }: CheckboxProps) => {
  return (
    <div>
      <label className='group inline-block'>
        {label}
        {isChecked ? (
          <div
            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-indigo-500 align-middle'
            onClick={() => {
              onChange?.(false);
            }}
          >
            <CheckIcon className='h-3 w-3 stroke-white stroke-2 text-white' />
          </div>
        ) : (
          <div
            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border align-middle text-indigo-200'
            onClick={() => {
              onChange?.(true);
            }}
          >
            <div className='invisible h-3 w-3' />
          </div>
        )}
      </label>
    </div>
  );
};

export { Checkbox };
export type { CheckboxProps };
