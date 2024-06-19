import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/environments';
import { JwtUserDto } from 'src/auth/dto/jwt-user.dto';
import { UserService } from 'src/user/user.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header not provided');
    }

    const tokenString = authorizationHeader.replace('Bearer ', '');

    if (!tokenString) {
      throw new UnauthorizedException('Token not provided');
    }
    const userData: JwtUserDto = this.jwtService.verify(tokenString, {
      secret: JWT_SECRET,
    });
    const user = await this.userService.findById(userData.id);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    req.user = user;
    next();
  }
}
