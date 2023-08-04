import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpFiltersFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
