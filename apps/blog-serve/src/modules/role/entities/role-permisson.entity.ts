/*
 * @Description: 角色权限关联实体
 * @Author: liks
 * @Date: 2025-10-24 12:00:00
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 11:41:32
 */
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permisson } from '../../permisson/entities/permisson.entity';

@Entity('role_permisson')
export class RolePermisson {
  @PrimaryColumn({ type: 'uuid', name: 'role_id', comment: '角色ID' })
  roleId: string;

  @PrimaryColumn({ type: 'uuid', name: 'permisson_id', comment: '权限ID' })
  permissonId: string;

  @ManyToOne(() => Role, (role) => role.permissons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permisson, (permisson) => permisson.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permisson_id' })
  permisson: Permisson;
}
