/*
 * @Description: 创建权限DTO
 * @Author: liks
 * @Date: 2025-10-24 11:05:24
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 11:25:22
 */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 创建权限DTO
 */
export class CreatePermissonDto {
  /**
   * 权限名称
   */
  @ApiProperty({
    description: '权限名称',
    example: 'user:read',
  })
  @IsNotEmpty({ message: '权限名称不能为空' })
  @IsString({ message: '权限名称必须是字符串' })
  @MaxLength(255, { message: '权限名称最多255个字符' })
  name: string;

  /**
   * 权限编码
   */
  @ApiProperty({
    description: '权限编码',
    example: 'user_read',
  })
  @IsNotEmpty({ message: '权限编码不能为空' })
  @IsString({ message: '权限编码必须是字符串' })
  @MaxLength(255, { message: '权限编码最多255个字符' })
  code: string;

  /**
   * 权限描述
   */
  @ApiProperty({
    description: '权限描述',
    example: '允许读取用户信息',
  })
  @IsNotEmpty({ message: '权限描述不能为空' })
  @IsString({ message: '权限描述必须是字符串' })
  @MaxLength(255, { message: '权限描述最多255个字符' })
  description: string;
}
