import { useMutation, UseMutationOptions } from 'react-query';
import { removeTodo } from '../api';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

const useRemoveTodo = (
  options?: UseMutationOptions<SuccessResponse, ErrorResponse, Todo>,
) => {
  const mutation = useMutation<
    SuccessResponse,
    ErrorResponse,
    Todo,
    { previousState?: SuccessResponse<Todo[]> }
  >({
    ...options,
    mutationKey: [MutationKey.REMOVE_TODO],
    mutationFn: (todo) => removeTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (removeTodo) => {
      options?.onMutate?.(removeTodo);
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
            data: todos?.filter((todo) => todo.id !== removeTodo.id) ?? [],
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

export { useRemoveTodo };
