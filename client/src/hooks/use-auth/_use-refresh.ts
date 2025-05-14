import { useMutation, UseMutationOptions } from 'react-query';
import { refresh } from '../../api';
import { MutationKey } from '../../constants';
import { ErrorResponse, SuccessResponse } from '../../types';

/**
 * Private implementation. Do not use directly.
 * Use useAuth hook instead.
 *
 * @private
 */
const _useRefresh = (
  options?: UseMutationOptions<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse
  >,
) => {
  const mutation = useMutation<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse
  >({
    ...options,
    mutationKey: [MutationKey.REFRESH],
    mutationFn: () => refresh.map((r) => r.data).run(),
  });

  return mutation;
};

export { _useRefresh };
