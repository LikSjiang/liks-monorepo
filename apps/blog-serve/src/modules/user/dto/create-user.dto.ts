import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名，用于登录和唯一标识',
    required: true,
    minLength: 3,
    example: 'zhangsan',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: '用户密码，必须包含大小写字母、数字和特殊字符',
    required: true,
    minLength: 6,
    example: 'Pass123!',
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: '密码必须包含大小写字母、数字和特殊字符',
  })
  password: string;

  @ApiProperty({
    description: '用户邮箱地址',
    required: true,
    example: 'zhangsan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '用户昵称，显示名称',
    required: true,
    example: '张三',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: '手机号码，格式为11位数字',
    required: true,
    minLength: 11,
    example: '13800138000',
  })
  @IsString()
  @MinLength(11)
  @Matches(/^1[3456789]\d{9}$/, {
    message: '手机号格式错误',
  })
  tel: string;

  @ApiProperty({
    description: '性别，0表示男，1表示女，2表示未知',
    required: true,
    enum: ['0', '1', '2'],
    example: '0',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: '生日，格式为YYYY-MM-DD',
    required: true,
    example: '1990-01-01',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '生日格式错误',
  })
  birthday: string;
}
