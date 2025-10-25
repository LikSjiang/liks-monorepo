/*
 * @Description: 用户实体
 * @Author: liks
 * @Date: 2025-10-23 14:56:35
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 10:53:42
 */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { Article } from '../../article/entities/article.entity';
// export enum UserRole {
//   ADMIN = 'admin', // 管理员
//   EDITOR = 'editor', // 编辑
//   AUTHOR = 'author', // 作者
//   SUBSCRIBER = 'subscriber', // 订阅者
// }

export enum UserStatus {
  ACTIVE = 'active', // 活跃
  INACTIVE = 'inactive', // 不活跃
  BANNED = 'banned', // 被封禁
}

export enum UserGender {
  MALE = '1', // 男
  FEMALE = '0', // 女
  UNKNOWN = '2', // 未知
}

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
    type: 'enum',
    enum: UserGender,
    comment: '性别',
    default: UserGender.UNKNOWN, // 1: 男, 0: 女, 2: 未知
  })
  gender: UserGender;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '生日' })
  birthday: string;

  @Column({ type: 'text', nullable: true, comment: '个人简介' })
  bio: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserRole,
  //   default: UserRole.AUTHOR,
  // })
  // role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

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

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at', comment: '最后登录时间' })
  lastLoginAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '最后登录IP' })
  lastLoginIp: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
