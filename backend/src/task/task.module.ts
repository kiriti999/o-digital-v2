import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { VerifyTokenMiddleware } from 'src/middleware/verifyToken.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule, JwtModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('tasks');
  }
}
