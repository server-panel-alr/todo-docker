import { ReactNode } from 'react';

type TitleProps = {
  size?: 1 | 2 | 3;
  children: ReactNode;
};

const Title = ({ size = 1, children }: TitleProps) => {
  return (
    <>
      {size === 1 ? (
        <h1 className='text-3xl font-bold leading-8 text-gray-700'>
          {children}
        </h1>
      ) : size === 2 ? (
        <h1 className='text-2xl font-semibold leading-6 text-gray-700'>
          {children}
        </h1>
      ) : size === 3 ? (
        <h1 className='text-base font-semibold leading-6 text-gray-700'>
          {children}
        </h1>
      ) : null}
    </>
  );
};

export { Title };
export type { TitleProps };
