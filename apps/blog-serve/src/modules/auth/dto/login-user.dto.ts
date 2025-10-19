import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: '用户名，用于登录验证',
    required: true,
    example: 'zhangsan',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '用户密码，用于登录验证',
    required: true,
    example: 'Pass123!',
    writeOnly: true,
  })
  @IsString()
  password: string;
}
