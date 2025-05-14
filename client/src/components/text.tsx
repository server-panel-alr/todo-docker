import { ReactNode } from 'react';

type TextProps = {
  weight?: 'normal' | 'medium';
  children?: ReactNode;
};

const Text = ({ weight, children }: TextProps) => {
  return (
    <p
      className={`text-sm text-gray-500 ${
        weight === 'medium' ? 'font-medium' : ''
      }`}
    >
      {children}
    </p>
  );
};

export { Text };
export type { TextProps };
