import { Article } from '../../article/entities/article.entity';
import { User } from '../../user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum CommentStatus {
  APPROVED = 'approved', // 已审核
  PENDING = 'pending', // 待审核
  SPAM = 'spam', // 垃圾评论
  TRASH = 'trash', // 回收站
}

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid', { comment: '评论ID' })
  id: string;

  @Column({ nullable: true })
  parentId?: string;
  @ManyToOne(() => Comment, (comment) => comment.replies, { onDelete: 'CASCADE', nullable: true })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @Column({ type: 'text', name: 'content', comment: '评论内容' })
  content: string;

  @Column({ type: 'uuid', name: 'article_id', comment: '文章ID' })
  articleId?: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'SET NULL', nullable: true })
  author?: User;

  @Column({ type: 'uuid', name: 'author_id', comment: '作者ID' })
  authorId?: string;

  @Column({ type: 'varchar', name: 'author_name', comment: '作者名称' })
  authorName?: string;

  @Column({ type: 'varchar', name: 'ip_address', comment: 'IP地址' })
  ipAddress: string;

  @Column({ type: 'varchar', name: 'user_agent', comment: '用户代理' })
  userAgent?: string;

  @Column({ type: 'enum', name: 'status', enum: CommentStatus, default: CommentStatus.PENDING, comment: '评论状态' })
  status: CommentStatus;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
  article: Article;
}
