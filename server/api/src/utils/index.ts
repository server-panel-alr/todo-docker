/**
 * Parses cookie string.
 *
 * @param cookies
 * @returns json object of parsed cookies
 */
const parseCookies = (cookies?: string): Record<any, any> => {
  return cookies
    ? cookies?.split(';').reduce((acc, curr) => {
        const [key, value] = curr.trim().split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};
};

/**
 * Parses auth header.
 *
 * @param header
 * @returns type and value of auth header
 */
const parseAuthHeader = (header?: string) => {
  const [type, value] = header ? header.split(' ') : [undefined, undefined];
  return { type, value };
};

export { parseCookies, parseAuthHeader };
