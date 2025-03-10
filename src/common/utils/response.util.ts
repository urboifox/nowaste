import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ApiResponse, Meta } from '../types/responses.types';

export class ResponseUtil {
    static success<T>(data: T, statusCode: number, message: string, meta?: Meta): ApiResponse<T> {
        return { status: 'success', statusCode, data, meta, message };
    }

    static error(statusCode: number, message: string, data = null): ApiResponse<null> {
        return { status: 'error', statusCode, data, message };
    }

    static transform<T, R>(
        response: ApiResponse<T>,
        dtoClass: new () => R,
        options?: ClassTransformOptions,
    ): ApiResponse<R | R[]> {
        return {
            ...response,
            data: response.data
                ? plainToInstance(dtoClass, response.data, {
                      excludeExtraneousValues: true,
                      ...options,
                  })
                : null,
        };
    }
}
