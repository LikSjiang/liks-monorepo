/*
 * @Description:
 * @Author: liks
 * @Date: 2025-10-23 16:20:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 17:00:30
 */
/*
 * @Description: 创建分类dto
 * @Author: liks
 * @Date: 2025-10-23 16:20:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 16:57:18
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({ example: '前端', description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空！' })
  @IsString()
  name: string;

  @ApiProperty({ example: 0, description: '排序' })
  @IsInt()
  sort?: number;

  @ApiProperty({ example: '', description: '父级分类id' })
  @IsString()
  pId?: string;

  @ApiProperty({ example: '', description: '分类链接' })
  @IsString()
  link?: string;

  @ApiProperty({ example: '', description: '关键词' })
  @IsString()
  keywords?: string;

  @ApiProperty({ example: '', description: '描述' })
  @IsString()
  description?: string;
}
