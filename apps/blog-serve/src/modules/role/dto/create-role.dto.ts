import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString({ message: '角色名称必须是字符串' })
  @MaxLength(50, { message: '角色名称最多 50 个字符' })
  @ApiProperty({ description: '角色名称' })
  name: string;

  @IsNotEmpty({ message: '角色编码不能为空' })
  @IsString({ message: '角色编码必须是字符串' })
  @ApiProperty({ description: '角色编码' })
  @MaxLength(255, { message: '角色编码最多 255 个字符' })
  code: string;

  @IsString({ message: '角色描述必须是字符串' })
  @MaxLength(255, { message: '角色描述最多 255 个字符' })
  @ApiProperty({ description: '角色描述' })
  description?: string;
}
