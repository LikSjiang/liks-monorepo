// src/users/user.entity.ts
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '用户ID' })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 20, comment: '用户名' })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({ type: 'varchar', length: 100, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '手机号' })
  tel: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '头像' })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 1,
    comment: '性别',
    default: 2, // 1: 男, 0: 女, 2: 未知
  })
  gender: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '生日' })
  birthday: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    comment: '状态',
    default: 1, // 1: 正常, 0: 禁用
  })
  status: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    comment: '是否删除',
    default: 0, // 1: 已删除, 0: 未删除
  })
  deleted: number;

  @Column({ type: 'varchar', name: 'salt', comment: '盐值' })
  salt: string;

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
