/*
 * @Description:
 * @Author: liks
 * @Date: 2025-10-23 16:20:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 10:57:11
 */
import { Article } from '../../article/entities/article.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { comment: '分类ID' })
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '分类名称' })
  name: string;

  @Column({ type: 'int', nullable: true, comment: '排序' })
  sort: number;

  @Column({ type: 'int', default: 0, comment: '文章数量' })
  postCount: number;

  @ManyToOne(() => Category, (category) => category.children, { onDelete: 'SET NULL', nullable: true })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @Column({
    type: 'varchar',
    name: 'parent_id',
    nullable: true,
    length: 50,
    comment: '父分类id',
  })
  parentId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '链接' })
  link: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '关键词' })
  keywords: string;

  @Column({ type: 'text', nullable: true, comment: '描述' })
  description: string;

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

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
