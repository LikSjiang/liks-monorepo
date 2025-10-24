import { Module } from '@nestjs/common';
import { PermissonService } from './permisson.service';
import { PermissonController } from './permisson.controller';

@Module({
  controllers: [PermissonController],
  providers: [PermissonService],
})
export class PermissonModule {}
