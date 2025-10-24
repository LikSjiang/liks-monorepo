/*
 * @Description: 角色实体
 * @Author: liks
 * @Date: 2025-10-24 09:46:57
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 12:00:00
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permisson } from '../../permisson/entities/permisson.entity';
import { RolePermisson } from './role-permisson.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid', { comment: '角色ID' })
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '角色名称' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, comment: '角色编码' })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '角色描述' })
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

  // 多对多关联权限
  @ManyToMany(() => Permisson, (permisson) => permisson.roles, { cascade: true })
  @JoinTable({
    name: 'role_permisson',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permisson_id',
      referencedColumnName: 'id',
    },
  })
  permissons: Permisson[];

  // 中间表关联
  @ManyToMany(() => RolePermisson)
  rolePermissons: RolePermisson[];
}
