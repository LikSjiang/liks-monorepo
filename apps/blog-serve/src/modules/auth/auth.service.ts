import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginToken } from './interface/login-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //  登录
  async login(username: string, password: string): Promise<LoginToken> {
    const user: User | null = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '48h' }),
    };
  }
}
