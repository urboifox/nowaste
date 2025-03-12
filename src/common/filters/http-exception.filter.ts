import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { ResponseUtil } from '../utils/response.util';

@Catch(HttpException, I18nValidationException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {}

    async catch(exception: HttpException | I18nValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : 400;

        // INFO: Handle I18nValidationException (validation errors)
        if (exception instanceof I18nValidationException) {
            const errors: { [key: string]: string[] } = {};
            exception.errors.forEach((error) => {
                const property = error.property;
                const constraints = error.constraints || {};
                errors[property] = Object.values(constraints).map((message) =>
                    this.buildErrorMessage(message),
                );
            });

            const message = this.i18n.t('errors.validation_failed');
            return response.status(status).json(ResponseUtil.error(status, message, null, errors));
        }

        // INFO: Handle generic HttpException (e.g., NotFoundException)
        const message = exception.message || (await this.i18n.t('errors.unknown'));
        response.status(status).json(ResponseUtil.error(status, message));
    }

    buildErrorMessage(message: string): string {
        const [key, params] = message.split('|');
        const paramsObj = params ? JSON.parse(params) : {};
        return this.i18n.t(key, { args: { ...(paramsObj as any) } });
    }
}
