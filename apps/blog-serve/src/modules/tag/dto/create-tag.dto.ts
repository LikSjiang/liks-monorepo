/*
 * @Description: 创建标签 DTO
 * @Author: liks
 * @Date: 2025-10-23 16:55:52
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 17:12:47
 */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTagDto {
  @ApiProperty({ description: '标签名称', example: 'JavaScript' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  @IsString({ message: '标签名称必须是字符串' })
  @MaxLength(50, { message: '标签名称最多 50 个字符' })
  name: string;

  @ApiProperty({ description: '标签链接', example: 'javascript' })
  @IsOptional()
  @IsString({ message: '标签链接必须是字符串' })
  @MaxLength(255, { message: '标签链接最多 255 个字符' })
  link?: string;

  @ApiProperty({ description: '关键词', example: 'JavaScript,前端,编程语言' })
  @IsOptional()
  @IsString({ message: '关键词必须是字符串' })
  @MaxLength(255, { message: '关键词最多 255 个字符' })
  keywords?: string;

  @ApiProperty({ description: '描述', example: 'JavaScript编程语言相关标签' })
  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  @MaxLength(255, { message: '描述最多 255 个字符' })
  description?: string;
}
