import { NextFunction, Request, Response } from 'express';
import { t } from 'i18next';

/**
 * Add helpers for error and success status messages to the response object.
 *
 * @param request
 * @param response
 * @param next
 * @returns promise void
 */
const responseStatus = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.error = (options) => {
    response.status(500).send({
      code: options?.code ?? 500,
      message: options?.message ?? t('error_message.default'),
    });
    return;
  };

  response.success = (options) => {
    response.status(200).send({
      code: options?.code ?? 200,
      message: options?.message ?? t('success_message.default'),
      data: options?.data ?? undefined,
    });
    return;
  };
  next();
};

export { responseStatus };
