import { Token, User } from '@prisma/client';
import crypto from 'crypto';
import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import { Duration } from '../constants';

type SessionServiceOptions = {
  accessToken: {
    expiresOn: number;
  };
  refreshToken: {
    expiresOn: number;
  };
};

const createSessionService = (options: SessionServiceOptions) => {
  return {
    generateAccessToken: ({
      payload,
    }: {
      payload: Pick<User, 'id' | 'username'>;
    }) => {
      return {
        value: jwt.sign(payload, process.env.JWT_SECRET!, {
          // library expects seconds instead of milliseconds
          expiresIn: Math.round(
            (options.accessToken.expiresOn - Date.now()) / 1000,
          ),
        }),
        expiresOn: options.accessToken.expiresOn,
      };
    },

    verifyAccessToken: (token: string) => {
      return !!jwt.verify(token, process.env.JWT_SECRET!);
    },

    decodeAccessToken: (token: string) => {
      return jwt.decode(token);
    },

    generateRefreshToken: () => {
      return {
        value: crypto.randomBytes(48).toString('base64url'),
        expiresOn: options.refreshToken.expiresOn,
        cookie: {
          // secure: true,
          httpOnly: true,
          sameSite: 'strict',
          maxAge: options.refreshToken.expiresOn - Date.now(),
        } as CookieOptions,
      };
    },

    compareRefreshToken: ({
      token,
      tokenModel,
    }: {
      token: string;
      tokenModel?: Token | null;
    }) => {
      const isSameToken = token === tokenModel?.refreshToken;
      const isNotExpired =
        (tokenModel?.refreshTokenExpiresOn?.getTime() ?? 0) > Date.now();
      return isSameToken && isNotExpired;
    },
  };
};

/**
 * Session service for generating and verifying refresh tokens
 * as well as access tokens.
 *
 * @returns session service api
 */
const Session = createSessionService({
  accessToken: { expiresOn: Date.now() + Duration.ONE_HOUR },
  refreshToken: { expiresOn: Date.now() + Duration.ONE_DAY },
});

export { Session };
export type { SessionServiceOptions };
