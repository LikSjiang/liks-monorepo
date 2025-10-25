import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Article } from './article.entity';

@Entity('article_likes')
@Unique(['user', 'article']) // 确保一个用户只能点赞一篇文章一次
export class ArticleLike {
  @PrimaryGeneratedColumn('uuid', { comment: '点赞记录ID' })
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', nullable: false })
  user: User;

  @Column({ type: 'varchar', nullable: false, comment: '用户ID' })
  userId: string;

  @ManyToOne(() => Article, (article) => article.id, { onDelete: 'CASCADE', nullable: false })
  article: Article;

  @Column({ type: 'varchar', nullable: false, comment: '文章ID' })
  articleId: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '点赞状态：1-已点赞，0-已取消',
  })
  isLiked: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '点赞时间',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}
