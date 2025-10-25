import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from 'src/modules/category/entities/category.entity';

export enum ArticleStatus {
  DRAFT = 'draft', // 草稿
  PUBLISHED = 'published', // 发布
  ARCHIVED = 'archived', // 归档
  PENDING = 'pending', // 待审核
}

export enum ArticleVisibility {
  PUBLIC = 'public', // 公开
  PRIVATE = 'private', // 私有
  PASSWORD = 'password', // 密码保护
}

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid', { comment: '文章ID' })
  id: string;

  @Column({ type: 'varchar', length: 255, comment: '文章标题' })
  title: string;

  @Column({ type: 'text', nullable: true, comment: '文章摘要' })
  excerpt?: string; // 文章摘要

  @Column({ type: 'longtext', nullable: true, comment: '文章内容（Markdown或HTML）' })
  content: string;

  @Column({ type: 'varchar', nullable: true, length: 255, comment: '封面图' })
  cover?: string;

  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'SET NULL', nullable: true })
  author?: User;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '作者ID' })
  authorId: string;

  @Column({ type: 'enum', enum: ArticleStatus, nullable: true, comment: '文章状态。draft草稿，published发布，archived归档，pending待审核', default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Column({ type: 'enum', enum: ArticleVisibility, nullable: true, comment: '文章可见性。public公开，private私有，password密码保护', default: ArticleVisibility.PUBLIC })
  visibility: ArticleVisibility;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '密码保护的文章密码' })
  password?: string;

  @Column({ type: 'tinyint', name: 'is_top', default: 0, comment: '是否置顶' })
  isTop: number;

  @Column({
    type: 'int',
    name: 'view_count',
    default: 0,
    nullable: true,
    comment: '浏览次数',
  })
  viewCount: number;

  @Column({
    type: 'int',
    name: 'like_count',
    default: 0,
    nullable: true,
    comment: '点赞次数',
  })
  likeCount: number;

  @Column({
    type: 'int',
    name: 'comment_count',
    default: 0,
    nullable: true,
    comment: '评论次数',
  })
  commentCount: number;

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

  @Column({ type: 'timestamp', nullable: true, name: 'published_at', comment: '发布时间' })
  publishedAt?: Date;

  @ManyToOne(() => Category, (category) => category.articles, { onDelete: 'SET NULL', nullable: true })
  category?: Category;
  @Column({ nullable: true, comment: '分类ID' })
  categoryId?: string;

  @ManyToMany(() => Tag, (tag) => tag.articles, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[];
}
