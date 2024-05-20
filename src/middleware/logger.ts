import { Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AppLoggerMiddleware {
  private logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const { ip, method, url } = req;
    const userAgent = req.headers['user-agent'] || '';

    const { statusCode } = res;
    this.logger.log(`${method} ${url} ${statusCode} - ${userAgent} ${ip}`);
    next();
  }
}
