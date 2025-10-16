/*
 * @Description: app 根模块
 * @Author: liks
 * @Date: 2025-10-16 09:48:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-16 18:01:50
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，其他模块可以直接注入 ConfigService
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host', 'localhost'),
        port: configService.get('db.mysql.port', 3306),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        autoLoadEntities: true,
        synchronize: configService.get('db.mysql.synchronize', false),
      }),
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get<string>('multer.dest', '../uploads'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
