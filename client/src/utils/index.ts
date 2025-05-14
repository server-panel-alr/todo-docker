/**
 * Returns true if given value is null or undefined otherwise false.
 *
 * @param value
 * @returns boolean
 */
const isNil = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

/**
 * Replaces a value at given array position.
 *
 * @param array
 * @param index
 * @param value new value which will replace the current
 * @returns new array
 */
const replaceAt = <T>(array: T[], index: number, value: T) => {
  if (isNil(array) || (isNil(index) && index !== -1) || isNil(value)) {
    return array;
  } else {
    return Object.assign([], array, { [index]: value });
  }
};

/**
 * Decodes a json web token to get the payload.
 *
 * @param token
 * @returns token payload
 */
const decodeJWT = <T extends Record<string, any>>(
  token: string,
): Partial<T> => {
  if (!token) return {} as Partial<T>;
  const [, base64Url] = token.split('.');
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload) as Partial<T>;
};

export { isNil, replaceAt, decodeJWT };
