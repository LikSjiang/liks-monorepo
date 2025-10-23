/*
 * @Description: 认证模块
 * @Author: liks
 * @Date: 2025-10-23 14:56:35
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 15:38:34
 */
import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IsPublic } from '../../core/decorators/public.decorator';
import { JwtPayload } from 'jsonwebtoken';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '用户登录',
    description: '用户通过用户名和密码进行登录验证，成功后返回访问令牌和刷新令牌',
  })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          username: 'zhangsan',
          nickname: '张三',
          email: 'zhangsan@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: '用户名或密码错误' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @IsPublic()
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @ApiOperation({
    summary: '用户注册',
    description: '新用户注册账号，创建用户信息',
  })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    schema: {
      example: {
        id: 1,
        username: 'zhangsan',
        nickname: '张三',
        email: 'zhangsan@example.com',
        createdAt: '2025-10-23T14:56:35.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: '用户名已存在或参数错误' })
  @IsPublic()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.authService.register(createUserDto);
  }

  @ApiOperation({
    summary: '刷新访问令牌',
    description: '使用有效的刷新令牌获取新的访问令牌',
  })
  @ApiBody({
    description: '刷新令牌请求体',
    schema: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
          description: '有效的刷新令牌',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
      required: ['refresh_token'],
    },
  })
  @ApiResponse({
    status: 200,
    description: '令牌刷新成功',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: '无效的刷新令牌' })
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: { refresh_token: string }) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  // 获取登录用户信息
  @ApiOperation({
    summary: '获取登录用户信息',
    description: '返回当前登录用户的详细信息',
  })
  @ApiResponse({
    status: 200,
    description: '用户信息获取成功',
    schema: {
      example: {
        id: 1,
        username: 'zhangsan',
        nickname: '张三',
        email: 'zhangsan@example.com',
        createdAt: '2025-10-23T14:56:35.000Z',
      },
    },
  })
  @Post('userInfo')
  // 在request 上拿到user 信息
  getUserInfo(@Request() req: Request) {
    const userPayload = req['user'] as JwtPayload;
    return this.authService.getUserInfo(userPayload);
  }
}
