import axios from 'axios';
import { MutationKey } from '../constants';
import { queryClient } from './react-query';

const configureAxios = () => {
  axios.interceptors.request.use((config) => {
    const cache = queryClient.getMutationCache();
    const signInCache = cache.find<{ data?: { accessToken?: string } }>({
      mutationKey: MutationKey.SIGN_IN,
    });
    const accessToken = signInCache?.state?.data?.data?.accessToken;

    return {
      ...config,
      withCredentials: true,
      headers: {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
  });

  axios.interceptors.response.use((config) => {
    return config;
  });
};

export { configureAxios };
