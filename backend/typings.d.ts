import { JwtUserDto } from 'src/auth/dto/jwt-user.dto';

declare module 'express' {
  interface Request {
    user: JwtUserDto;
  }
}
