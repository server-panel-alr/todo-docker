import { Request, Response } from 'express';
import { prisma } from '../database';
import { Credential, Session } from '../services';
import { parseCookies } from '../utils';

/**
 * Sign up and create user if not existing.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const signUp = async (request: Request, response: Response) => {
  const {
    t,
    body: { username, password },
  } = request;
  const { error, success } = response;
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      error({ message: t('error_message.username_already_taken') });
      return;
    }

    const passwordHash = await Credential.hash(password);
    await prisma.user.create({ data: { username, password: passwordHash } });

    success({ message: t('success_message.sign_up_completed') });
  } catch (e) {
    error({ message: t('error_message.could_not_sign_up') });
  }
};

/**
 * Sign in user if not already signed in and send corresponding
 * access and refresh tokens.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const signIn = async (request: Request, response: Response) => {
  const {
    t,
    body: { username, password },
  } = request;
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);
    const user = username
      ? await prisma.user.findUnique({ where: { username } })
      : null;

    if (user && refreshToken) {
      error({ message: t('error_message.already_signed_in') });
      return;
    }

    if (user) {
      const isValidPassword = await Credential.compare({
        password,
        passwordHash: user.password,
      });

      if (isValidPassword) {
        const accessToken = Session.generateAccessToken({
          payload: { id: user.id, username },
        });
        const refreshToken = Session.generateRefreshToken();

        await prisma.token.create({
          data: {
            user: { connect: { id: user.id } },
            accessToken: accessToken.value,
            accessTokenExpiresOn: new Date(accessToken.expiresOn),
            refreshToken: refreshToken.value,
            refreshTokenExpiresOn: new Date(refreshToken.expiresOn),
          },
        });

        response.cookie(
          'refreshToken',
          refreshToken.value,
          refreshToken.cookie,
        );
        success({ data: { accessToken: accessToken.value } });
        return;
      } else {
        error({ message: t('error_message.wrong_credentials') });
        return;
      }
    }

    if (refreshToken) {
      const token = await prisma.token.findFirst({
        where: { refreshToken },
      });

      const isValidRefreshToken = Session.compareRefreshToken({
        token: refreshToken,
        tokenModel: token,
      });

      if (isValidRefreshToken) {
        success({ data: { accessToken: token?.accessToken } });
        return;
      } else {
        error({ message: t('error_message.token_expired') });
        return;
      }
    }

    error({ message: t('error_message.authentication_failed') });
    return;
  } catch (e) {
    error({ message: t('error_message.could_not_sign_in') });
  }
};

/**
 * Refresh both tokens and send them back.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const refresh = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);
    const token = await prisma.token.findFirst({ where: { refreshToken } });

    const isValidRefreshToken = Session.compareRefreshToken({
      token: refreshToken,
      tokenModel: token,
    });

    if (isValidRefreshToken) {
      const user = await prisma.user.findUnique({
        where: { id: token?.userId },
      });
      if (user) {
        const accessToken = Session.generateAccessToken({
          payload: { id: user.id, username: user.username },
        });
        const refreshToken = Session.generateRefreshToken();

        await prisma.token.update({
          where: { id: token?.id },
          data: {
            user: { connect: { id: user.id } },
            accessToken: accessToken.value,
            accessTokenExpiresOn: new Date(accessToken.expiresOn),
            refreshToken: refreshToken.value,
            refreshTokenExpiresOn: new Date(refreshToken.expiresOn),
          },
        });

        response.cookie(
          'refreshToken',
          refreshToken.value,
          refreshToken.cookie,
        );
        success({ data: { accessToken: accessToken.value } });
      } else {
        error({ message: t('error_message.user_not_found') });
        return;
      }
    } else {
      error({ message: t('error_message.token_expired') });
      return;
    }
  } catch (e) {
    error({ message: t('error_message.authentication_failed') });
  }
};

/**
 * Sign out user and remove all tokens.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const signOut = async (request: Request, response: Response) => {
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);

    if (refreshToken) {
      const token = await prisma.token.findFirst({ where: { refreshToken } });
      await prisma.token.delete({ where: { id: token?.id } });
    }

    response.cookie('refreshToken', null, { maxAge: 0 });
    success();
  } catch {
    error();
  }
};

export { signUp, signIn, refresh, signOut };
