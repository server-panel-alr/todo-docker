import { createContext, ReactNode, useState } from 'react';
import {
  _useRefresh,
  _useSignIn,
  _useSignOut,
  _useSignUp,
} from '../hooks/use-auth';
import { AccessTokenPayload } from '../types/session';
import { decodeJWT } from '../utils';

/**
 * Provider for react-query useMutation hooks to share state between components.
 *
 * @params react children
 * @returns context provider
 */
const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [timeoutId, setTimeoutId] = useState<number>();

  const signUp = _useSignUp();
  const signIn = _useSignIn({
    onMutate: () => clearTimeout(timeoutId),
    onSuccess: ({ data }) => {
      const accessToken = data?.accessToken!;
      const accessTokenPayload = decodeJWT<AccessTokenPayload>(accessToken);
      const accessTokenExpiresOn = accessTokenPayload.exp! * 1000;
      const expirationDelta = accessTokenExpiresOn - Date.now();
      const timeout = expirationDelta > 0 ? expirationDelta - 60 * 1000 : 0;

      // auto refresh token before expiration
      setTimeoutId(
        setTimeout(() => {
          refresh.mutate();
        }, timeout),
      );
    },
  });
  const signOut = _useSignOut({
    onSuccess: () => clearTimeout(timeoutId),
  });
  const refresh = _useRefresh({
    onError: () => clearTimeout(timeoutId),
    onSuccess: () => signIn?.mutate(undefined),
  });

  const accessToken = signIn.data?.data?.accessToken;
  const { id, username } = decodeJWT<AccessTokenPayload>(accessToken!);

  const user = {
    id,
    username,
    accessToken,
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        refresh,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
const AuthenticationContext = createContext<{
  signUp?: ReturnType<typeof _useSignUp>;
  signIn?: ReturnType<typeof _useSignIn>;
  signOut?: ReturnType<typeof _useSignOut>;
  refresh?: ReturnType<typeof _useRefresh>;
  user?: { id?: string; username?: string; accessToken?: string };
}>({});

export { AuthenticationContext, AuthenticationProvider };
