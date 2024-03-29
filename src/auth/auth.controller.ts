import { Controller, Post, Body, ValidationPipe, BadRequestException, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../core/services/users.service';
import { UserRegisterDTO } from '../models/users/user-register.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { UserLoginDTO } from '../models/users/user-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('users')
  async register(@Body(new ValidationPipe({ whitelist: true, transform: true })) user: UserRegisterDTO): Promise<ShowUserDTO> {

    if (!!(await this.authService.validateIfUserExists(user.email))) {
      throw new BadRequestException('User with such email already exists!');
    }

    return await this.usersService.register(user);
  }

  @Post('session')
  async login(@Body() user: UserLoginDTO): Promise<{user: ShowUserDTO, token: string}> {
    const authObject = await this.authService.login(user);

    if (!(await this.authService.validateIfUserExists(user.email))) {
      throw new BadRequestException('User with such email does not exist!');
    }

    if (!(await this.authService.validateUserPassword(user))) {
      throw new BadRequestException('Invalid password!');
    }

    return authObject;
  }

  @Delete('session')
  @UseGuards(AuthGuard())
  async logoutUser() {
    return 'Successful logout!';
  }
}
