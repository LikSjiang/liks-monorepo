import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: '用户名，用于登录验证',
    required: true,
    example: 'admin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '用户密码，用于登录验证',
    required: true,
    example: '375999**@Li',
    writeOnly: true,
  })
  @IsString()
  password: string;
}
