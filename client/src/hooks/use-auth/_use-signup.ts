import { useMutation, UseMutationOptions } from 'react-query';
import { signUp } from '../../api';
import { MutationKey } from '../../constants';
import { ErrorResponse, SuccessResponse, User } from '../../types';

/**
 * Private implementation. Do not use directly.
 * Use useAuth hook instead.
 *
 * @private
 */
const _useSignUp = (
  options?: UseMutationOptions<
    SuccessResponse,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >,
) => {
  const mutation = useMutation<
    SuccessResponse,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_UP],
    mutationFn: (user) => signUp.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignUp };
