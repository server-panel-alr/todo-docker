import { MouseEvent, ReactNode } from 'react';
import { Spinner } from './spinner';

type ButtonProps = {
  icon?: ReactNode;
  color?: 'default' | 'gray' | 'red' | 'yellow' | 'green' | 'blue';
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Button = ({
  icon,
  color = 'default',
  isLoading,
  isDisabled,
  isFullWidth,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`inline-flex justify-center rounded-md border text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
        isFullWidth ? 'w-full sm:w-full' : 'w-full sm:w-auto'
      } ${icon ? 'px-2 py-2' : 'px-4 py-2'} ${
        isDisabled ? 'cursor-not-allowed' : ''
      } ${
        color === 'default'
          ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
          : color === 'gray'
          ? 'border-transparent bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-400'
          : color === 'red'
          ? 'border-transparent bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
          : color === 'yellow'
          ? 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400'
          : color === 'green'
          ? 'border-transparent bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
          : color === 'blue'
          ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
          : ''
      }
    `}
      onClick={onClick}
    >
      {isLoading ? (
        <div className={`${children ? 'mx-1' : ''}`}>
          <Spinner mode={color === 'default' ? 'light' : 'dark'} />
        </div>
      ) : icon ? (
        <span className={`h-5 w-5 ${children ? 'mx-1' : ''}`}>{icon}</span>
      ) : null}
      {children ? <span className={icon ? 'mx-1' : ''}>{children}</span> : null}
    </button>
  );
};

export { Button };
export type { ButtonProps };
