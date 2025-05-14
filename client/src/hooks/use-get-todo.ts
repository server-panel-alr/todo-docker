import { useQuery, UseQueryOptions } from 'react-query';
import { getTodo } from '../api';
import { QueryKey } from '../constants';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

const useGetTodo = (
  id: string,
  options?: UseQueryOptions<SuccessResponse<Todo>, ErrorResponse>,
) => {
  const query = useQuery<SuccessResponse<Todo>, ErrorResponse>({
    ...options,
    queryKey: [QueryKey.GET_TODO, id],
    queryFn: () => getTodo.map((r) => r.data).run(id),
  });

  return query;
};

export { useGetTodo };
