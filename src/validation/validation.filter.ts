import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    response.status(400).json({
      code: 400,
      error: exception.issues,
    });
  }
}
