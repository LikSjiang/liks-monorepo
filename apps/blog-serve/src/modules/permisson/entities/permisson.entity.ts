/*
 * @Description: 权限实体
 * @Author: liks
 * @Date: 2025-10-24 11:05:24
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 11:13:28
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('permisson')
export class Permisson {
  @PrimaryGeneratedColumn('uuid', { comment: '权限ID' })
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '权限名称' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, comment: '权限编码' })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '权限描述' })
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
