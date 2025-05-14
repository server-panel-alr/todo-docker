import { useQuery, UseQueryOptions } from 'react-query';
import { getTodos } from '../api';
import { QueryKey } from '../constants';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

const useGetTodos = (
  options?: UseQueryOptions<SuccessResponse<Todo[]>, ErrorResponse>,
) => {
  const query = useQuery<SuccessResponse<Todo[]>, ErrorResponse>({
    ...options,
    queryKey: QueryKey.GET_TODOS,
    queryFn: () => getTodos.map((r) => r.data).run(),
  });

  return query;
};

export { useGetTodos };
