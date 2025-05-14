import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../database';
import { Session } from '../services';
import { parseAuthHeader } from '../utils';

/**
 * Verify authentication with help of the access token
 * and hydrate the user on the request object.
 *
 * @param request
 * @param response
 * @param next
 * @returns promise void
 */
const verifyAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { error } = response;
  try {
    const { value: accessToken } = parseAuthHeader(
      request.headers.authorization,
    );
    const isValidAccessToken = Session.verifyAccessToken(accessToken!);
    if (isValidAccessToken) {
      const { id } = Session.decodeAccessToken(accessToken!) as JwtPayload;
      const user = await prisma.user.findUnique({ where: { id } });
      request.user = user ? user : undefined;
      next();
    } else {
      error({ message: request.t('error_message.authentication_failed') });
    }
  } catch (e) {
    error({ message: request.t('error_message.authentication_failed') });
  }
};

export { verifyAuthentication };
