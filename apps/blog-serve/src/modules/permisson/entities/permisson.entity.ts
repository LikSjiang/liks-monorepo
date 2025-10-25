/*
 * @Description: 权限实体
 * @Author: liks
 * @Date: 2025-10-24 11:05:24
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 12:00:00
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('permisson')
export class Permisson {
  @PrimaryGeneratedColumn('uuid', { comment: '权限ID' })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '父权限ID' })
  parentId?: string;
  // 子权限
  @OneToMany(() => Permisson, (permisson) => permisson.parentId)
  children?: Permisson[];

  @Column({ type: 'varchar', length: 50, comment: '权限名称' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, comment: '权限编码' })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '权限描述' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '资源路径' })
  url: string;

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

  // 多对多关联角色
  @ManyToMany(() => Role, (role) => role.permissons)
  roles: Role[];
}
