import { useMutation, UseMutationOptions } from 'react-query';
import { addTodo } from '../api';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

const useAddTodo = (
  options?: UseMutationOptions<
    SuccessResponse,
    ErrorResponse,
    Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  >,
) => {
  const mutation = useMutation<
    SuccessResponse,
    ErrorResponse,
    Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
    { previousState?: SuccessResponse<Todo[]> }
  >({
    ...options,
    mutationKey: [MutationKey.ADD_TODO],
    mutationFn: (todo) => addTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (newTodo) => {
      options?.onMutate?.(newTodo);
      await queryClient.cancelQueries(QueryKey.GET_TODOS);
      const previousState = queryClient.getQueryData<SuccessResponse<Todo[]>>(
        QueryKey.GET_TODOS,
      );
      queryClient.setQueryData<SuccessResponse<Todo[]>>(
        QueryKey.GET_TODOS,
        (state) => {
          const todos = state?.data;
          return {
            ...state,
            data: [newTodo, ...(todos ?? [])],
          } as SuccessResponse<Todo[]>;
        },
      );
      return { previousState };
    },
    onError: (error, newTodo, context) => {
      options?.onError?.(error, newTodo, context);
      queryClient.setQueryData(QueryKey.GET_TODOS, context?.previousState);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
      queryClient.invalidateQueries(QueryKey.GET_TODOS);
    },
  });

  return mutation;
};

export { useAddTodo };
