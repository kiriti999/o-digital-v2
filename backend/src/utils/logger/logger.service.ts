import { Injectable } from '@nestjs/common';
import { LoggerDto } from './dto/logger.dto';

@Injectable()
export class LoggerService {
  success(message: string, data?: any): LoggerDto {
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  error(statusCode: number, message: string): LoggerDto {
    return {
      statusCode,
      message,
    };
  }
}
