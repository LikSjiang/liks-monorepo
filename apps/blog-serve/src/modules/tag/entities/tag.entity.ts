/*
 * @Description:
 * @Author: liks
 * @Date: 2025-10-23 16:53:38
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 10:59:56
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid', { comment: '标签ID' })
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '标签名称' })
  name: string;

  @Column({ type: 'int', nullable: true, comment: '排序' })
  sort: number;

  @Column({ type: 'int', default: 0, comment: '文章数量' })
  postCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '标签链接' })
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
}
