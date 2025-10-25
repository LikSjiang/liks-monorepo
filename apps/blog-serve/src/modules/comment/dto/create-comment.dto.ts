import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '评论内容' })
  @IsNotEmpty({ message: '评论内容不能为空' })
  @IsString({ message: '评论内容必须是字符串' })
  @MaxLength(200, { message: '评论内容最多 200 个字符' })
  content: string;

  @ApiProperty({ description: '文章ID' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsString({ message: '文章ID必须是字符串' })
  articleId: string;

  @ApiProperty({ description: '作者ID' })
  @IsNotEmpty({ message: '作者ID不能为空' })
  @IsString({ message: '作者ID必须是字符串' })
  authorId?: string;

  // 游客评论字段
  @IsOptional()
  @IsString({ message: '作者名称必须是字符串' })
  authorName?: string;

  @ApiProperty({ description: '父评论ID' })
  @IsString({ message: '父评论ID必须是字符串' })
  parentId?: string;
}
