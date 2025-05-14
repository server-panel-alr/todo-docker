import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Spinner } from './spinner';

const Auth = (props: { children: ReactNode }) => {
  const { signIn } = useAuth();

  useEffect(() => {
    signIn?.mutate(undefined);
  }, []);

  return signIn?.isLoading ? (
    <div className='absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center text-center text-gray-300'>
      <Spinner />
    </div>
  ) : signIn?.isError ? (
    <Navigate to='/signin' />
  ) : signIn?.isSuccess ? (
    <>{props.children}</>
  ) : null;
};

const withAuth = (component: ReactNode) => {
  return <Auth>{component}</Auth>;
};

export { withAuth, Auth };
