import { useMutation, UseMutationOptions } from 'react-query';
import { signIn } from '../../api';
import { MutationKey } from '../../constants';
import { ErrorResponse, SuccessResponse, User } from '../../types';

/**
 * Private implementation. Do not use directly.
 * Use useAuth hook instead.
 *
 * @private
 */
const _useSignIn = (
  options?: UseMutationOptions<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse,
    Pick<User, 'username' | 'password'> | undefined
  >,
) => {
  const mutation = useMutation<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse,
    Pick<User, 'username' | 'password'> | undefined
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_IN],
    mutationFn: (user) => signIn.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignIn };
