/*
 * @Description: app 根模块
 * @Author: liks
 * @Date: 2025-10-16 09:48:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-16 10:45:34
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，其他模块可以直接注入 ConfigService
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
