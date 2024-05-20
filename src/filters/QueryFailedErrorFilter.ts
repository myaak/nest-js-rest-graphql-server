import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { getColumnName } from '@/utils/regex';
import { errorMapping } from '@/utils/errorsMapping';
import { QueryFailedErrorDto } from '@/filters/dto/query-fail.dto';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const {
      name,
      driverError: { code, constraint, detail },
    } = exception;
    const columnName = getColumnName(constraint) as string;
    const message = errorMapping[code]?.message || detail;
    const statusCode = errorMapping[code]?.status || HttpStatus.BAD_REQUEST;
    const errorType = errorMapping[code]?.type || name;

    const errorResponse: QueryFailedErrorDto = {
      context: columnName,
      message: message,
      type: errorType,
    };

    response.status(statusCode).json(errorResponse);
  }
}
