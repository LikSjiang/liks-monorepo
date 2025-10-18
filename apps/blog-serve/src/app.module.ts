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
import { UserModule } from './modules/user/user.module';
import type { MysqlConfig } from './config/config.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，其他模块可以直接注入 ConfigService
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host = 'localhost', port = 3306, username, password, database, synchronize = false } = configService.get<MysqlConfig>('db.mysql', {} as MysqlConfig);
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize,
        };
      },
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get<string>('multer.dest', '../uploads'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
