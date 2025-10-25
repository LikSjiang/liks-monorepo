import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus, ArticleVisibility } from '../entities/article.entity';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsString({ message: '文章标题必须是字符串' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @MaxLength(255, { message: '文章标题最多255个字符' })
  title: string;

  @ApiProperty({ description: '文章摘要' })
  @IsString({ message: '文章摘要必须是字符串' })
  @MaxLength(255, { message: '文章摘要最多255个字符' })
  excerpt?: string; // 文章摘要

  @ApiProperty({ description: '文章内容（Markdown或HTML）' })
  @IsString({ message: '文章内容必须是字符串' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;

  @ApiProperty({ description: '封面图' })
  @IsString({ message: '封面图必须是字符串' })
  @MaxLength(255, { message: '封面图最多255个字符' })
  cover?: string;

  @ApiProperty({ description: '作者ID' })
  @IsString({ message: '作者ID必须是字符串' })
  @IsNotEmpty({ message: '作者ID不能为空' })
  @MaxLength(255, { message: '作者ID最多255个字符' })
  authorId: string;

  @ApiProperty({ description: '文章状态' })
  @IsString({ message: '文章状态必须是字符串' })
  @IsNotEmpty({ message: '文章状态不能为空' })
  @MaxLength(255, { message: '文章状态最多255个字符' })
  status: ArticleStatus;

  @ApiProperty({ description: '文章可见性' })
  @IsString({ message: '文章可见性必须是字符串' })
  @IsNotEmpty({ message: '文章可见性不能为空' })
  @MaxLength(255, { message: '文章可见性最多255个字符' })
  visibility?: ArticleVisibility;

  @ApiProperty({ description: '密码保护的文章密码' })
  @IsString({ message: '密码保护的文章密码必须是字符串' })
  @MaxLength(255, { message: '密码保护的文章密码最多255个字符' })
  password?: string;

  @ApiProperty({ description: '是否置顶' })
  isTop?: number;

  @ApiProperty({ description: '浏览次数' })
  viewCount?: number;

  @ApiProperty({ description: '点赞次数' })
  likeCount?: number;

  @ApiProperty({ description: '评论次数' })
  commentCount?: number;
}
