import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/password';
import { JWT_SECRET } from 'src/environments';
import { JwtUserDto } from './dto/jwt-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: User): Promise<any> {
    const { id, firstName } = user;
    const expiresIn = 60 * 60 * 24 * 30;
    const payload: JwtUserDto = { id, firstName };
    delete user.password;
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn,
        secret: JWT_SECRET,
      }),
      user,
      expiresIn,
    };
  }

  async validateUser(user: User, password: string): Promise<boolean> {
    if (await comparePassword(password, user.password)) {
      return true;
    }
    return false;
  }
}
