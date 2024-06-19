import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from 'src/utils/logger/logger.service';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';

@Controller('/auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { email } = createUserDto;
    const doesAlreadyExist = await this.userService.findByEmail(email);
    if (doesAlreadyExist)
      return res
        .status(400)
        .json(this.loggerService.error(400, 'User with email already exist'));
    const user = await this.userService.createUser(createUserDto);
    delete user.password;
    return res
      .status(200)
      .json(this.loggerService.success('User created successfully', user));
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findByEmail(email);
    if (!user) console.log('NO user');
    if (!user)
      return res
        .status(404)
        .json(this.loggerService.error(404, 'User not found'));
    const isMatch = await this.authService.validateUser(user, password);
    if (!isMatch)
      return res
        .status(401)
        .json(this.loggerService.error(401, 'Invalid credentials'));
    const payload = await this.authService.createToken(user);
    return res
      .status(200)
      .json(this.loggerService.success('Logged in successfully', payload));
  }
}
