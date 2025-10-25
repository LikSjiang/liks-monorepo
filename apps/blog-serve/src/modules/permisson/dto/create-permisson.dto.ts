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
   * 父权限ID
   */
  @ApiProperty({
    description: '父权限ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: '父权限ID必须是字符串' })
  @MaxLength(50, { message: '父权限ID最多50个字符' })
  parentId?: string;

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
  @IsString({ message: '权限描述必须是字符串' })
  @MaxLength(255, { message: '权限描述最多255个字符' })
  description: string;

  /**
   * 资源路径
   */
  @ApiProperty({
    description: '资源路径',
    example: '/user/:id',
  })
  @IsString({ message: '资源路径必须是字符串' })
  @MaxLength(255, { message: '资源路径最多255个字符' })
  url: string;
}
