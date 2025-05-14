import { ReactNode } from 'react';

type LinkProps = {
  children?: ReactNode;
  onClick?: () => void;
};

const Link = ({ children, onClick }: LinkProps) => {
  return (
    <a
      className='cursor-pointer font-medium text-indigo-600 hover:text-indigo-500'
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export { Link };
