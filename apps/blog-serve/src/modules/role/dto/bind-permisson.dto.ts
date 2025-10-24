/*
 * @Description: 角色绑定权限DTO
 * @Author: liks
 * @Date: 2025-10-24 12:00:00
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 12:00:00
 */
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BindPermissonDto {
  @ApiProperty({
    description: '权限ID列表',
    example: ['uuid1', 'uuid2', 'uuid3'],
    required: true,
  })
  @IsNotEmpty({ message: '权限ID列表不能为空' })
  @IsArray({ message: '权限ID列表必须是数组格式' })
  @IsUUID('all', { each: true, message: '每个权限ID必须是有效的UUID格式' })
  permissonIds: string[];
}
