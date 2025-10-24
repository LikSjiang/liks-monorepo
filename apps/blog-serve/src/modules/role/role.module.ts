/*
 * @Description: 角色模块
 * @Author: liks
 * @Date: 2025-10-24 09:46:57
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 11:52:33
 */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolePermisson } from './entities/role-permisson.entity';
import { Permisson } from '../permisson/entities/permisson.entity';
import { PermissonModule } from '../permisson/permisson.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermisson, Permisson]), PermissonModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
