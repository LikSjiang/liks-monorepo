import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @IsNotEmpty({ message: '选项名称不能为空' })
  @IsString({ message: '选项名称必须是字符串' })
  @ApiProperty({ description: '选项名称' })
  name: string;

  @IsOptional()
  @IsString({ message: '选项值必须是字符串' })
  @ApiProperty({ description: '选项值' })
  value: string;

  @IsOptional()
  @IsString({ message: '选项描述必须是字符串' })
  @ApiProperty({ description: '选项描述' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: '排序必须是数字' })
  @ApiProperty({ description: '排序' })
  sort?: number;
}
