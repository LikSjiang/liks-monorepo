import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginToken } from './interface/login-token.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //  登录
  async login(username: string, password: string): Promise<LoginToken> {
    console.log('loginDto', { username, password });
    const user: User | null = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    // 生成 JWT 令牌
    const payload = { sub: user.id, username: user.username };
    console.log('payload', payload);
    const secret = this.configService.get<string>('jwt.secret', 'custom-secret-key');
    // const refreshTokenExpiresIn = this.configService.get<string>('jwt.refreshTokenExpiresIn', '48h');
    const refreshJwtSignOptions = this.configService.get<JwtSignOptions>('jwt.refreshJwtSignOptions', {
      expiresIn: '48h',
    });
    return {
      // 访问令牌
      access_token: await this.jwtService.signAsync(payload, { secret }),
      // 刷新令牌
      refresh_token: await this.jwtService.signAsync(payload, { ...refreshJwtSignOptions, secret }),
    };
  }

  // 注册
  async register(createUserDto: CreateUserDto): Promise<User | null> {
    return this.userService.create(createUserDto);
  }

  // 刷新令牌
  async refreshToken(refreshToken: string): Promise<LoginToken> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user: User | null = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }
      const newPayload = { sub: user.id, username: user.username };
      return {
        // 访问令牌
        access_token: await this.jwtService.signAsync(newPayload),
        // 刷新令牌
        refresh_token: await this.jwtService.signAsync(newPayload, { expiresIn: '48h' }),
      };
    } catch (error) {
      console.log('refreshToken-error', error);
      throw new UnauthorizedException('刷新令牌无效');
    }
  }

  // 获取登录用户信息
  async getUserInfo(userPayload: JwtPayload): Promise<User | null> {
    return this.userService.findOne(userPayload.sub as string);
  }
}
