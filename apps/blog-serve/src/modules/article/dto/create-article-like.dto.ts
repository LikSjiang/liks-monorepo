import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 创建文章点赞DTO
 */
export class CreateArticleLikeDto {
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsString()
  articleId: string;
}
