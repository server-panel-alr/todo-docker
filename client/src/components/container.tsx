import { ReactNode } from 'react';

type ContainerProps = {
  width: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  children: ReactNode;
};
const Container = ({ width, children }: ContainerProps) => {
  return (
    <div className='box-border flex h-screen w-screen justify-center p-4'>
      <div
        className={`w-full ${
          width === 'sm'
            ? 'max-w-sm'
            : width === 'md'
            ? 'max-w-md'
            : width === 'lg'
            ? 'max-w-lg'
            : width === 'xl'
            ? 'max-w-xl'
            : width === '2xl'
            ? 'max-w-2xl'
            : width === '4xl'
            ? 'max-w-4xl'
            : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export { Container };
export type { ContainerProps };
