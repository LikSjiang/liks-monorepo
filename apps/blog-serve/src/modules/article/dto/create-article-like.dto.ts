import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 创建文章点赞DTO
 */
export class CreateArticleLikeDto {
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsString({ message: '文章ID必须是字符串' })
  @ApiProperty({ description: '文章ID' })
  articleId: string;
}
