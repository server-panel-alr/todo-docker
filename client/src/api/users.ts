import axios, { AxiosResponse } from 'axios';
import { IO } from 'moneo-ts';
import urlcat from 'urlcat';
import { ErrorResponse, SuccessResponse, User } from '../types';

/**
 * Sign up user with credentails.
 *
 * @param user credentials
 * @returns async io of axios response
 */
const signUp = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signup');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse, ErrorResponse>,
    typeof user
  >(url, user);
});

/**
 * Sign in user with credentials.
 *
 * @param user credentials (optional)
 * @returns async io of axios response including an access token
 */
const signIn = IO.async(
  async (user?: Pick<User, 'username' | 'password'> | undefined) => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signin');
    return axios.post<
      never,
      AxiosResponse<SuccessResponse<{ accessToken: string }>, ErrorResponse>,
      typeof user
    >(url, user);
  },
);

/**
 * Refresh user session.
 *
 * @returns async io of axios response including an access token
 */
const refresh = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/refresh');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse<{ accessToken: string }>, ErrorResponse>
  >(url);
});

/**
 * Sign out user.
 *
 * @returns async io of axios response
 */
const signOut = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signout');
  return axios.post<never, AxiosResponse<SuccessResponse, ErrorResponse>>(url);
});

export { signUp, signIn, refresh, signOut };
