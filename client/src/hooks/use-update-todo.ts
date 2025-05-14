import { useMutation, UseMutationOptions } from 'react-query';
import { updateTodo } from '../api';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { ErrorResponse, SuccessResponse, Todo } from '../types';
import { replaceAt } from '../utils';

const useUpdateTodo = (
  options?: UseMutationOptions<SuccessResponse, ErrorResponse, Todo>,
) => {
  const mutation = useMutation<
    SuccessResponse,
    ErrorResponse,
    Todo,
    { previousState?: SuccessResponse<Todo[]> }
  >({
    ...options,
    mutationKey: [MutationKey.UPDATE_TODO],
    mutationFn: (todo) => updateTodo.map((r) => r.data).run(todo),

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
          const index = todos?.findIndex((todo) => todo.id === newTodo.id);
          return {
            ...state,
            data: replaceAt(todos!, index!, newTodo),
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

export { useUpdateTodo };
