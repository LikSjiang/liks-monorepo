import { Module } from '@nestjs/common';
import { PermissonService } from './permisson.service';
import { PermissonController } from './permisson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisson } from './entities/permisson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permisson])],
  controllers: [PermissonController],
  providers: [PermissonService],
  exports: [PermissonService],
})
export class PermissonModule {}
