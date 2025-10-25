import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFileDto {
  @IsNotEmpty({ message: '文件名称不能为空' })
  @IsString({ message: '文件名称必须是字符串' })
  @ApiProperty({ description: '文件名称' })
  name: string;

  @IsNotEmpty({ message: '文件原名称不能为空' })
  @IsString({ message: '文件原名称必须是字符串' })
  @ApiProperty({ description: '文件原名称' })
  @ApiProperty({ description: '文件原名称' })
  originalname: string;

  @IsNotEmpty({ message: '文件哈希值不能为空' })
  @IsString({ message: '文件哈希值必须是字符串' })
  @ApiProperty({ description: '文件哈希值' })
  hash: string;

  @IsNotEmpty({ message: '文件大小不能为空' })
  @IsString({ message: '文件大小必须是字符串' })
  @ApiProperty({ description: '文件大小' })
  size: string;

  @IsNotEmpty({ message: '文件路径不能为空' })
  @IsString({ message: '文件路径必须是字符串' })
  @ApiProperty({ description: '文件路径' })
  url: string;

  @IsNotEmpty({ message: 'MIME不能为空' })
  @IsString({ message: 'MIME必须是字符串' })
  @ApiProperty({ description: 'MIME' })
  mime: string;
}
