/*
 * @Description: 应用入口文件
 * @Author: liks
 * @Date: 2025-10-16 09:48:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-16 17:43:59
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from './env/config.types';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const appConfig = config.get<AppConfig>('app', {} as AppConfig);
  console.log('app-config', appConfig);
  // 配置全局前缀
  app.setGlobalPrefix(appConfig.api.prefix);
  await app.listen(appConfig.http.port ?? 3000);
  return appConfig;
}
bootstrap()
  .then((appConfig) => {
    console.log(
      `Application ${appConfig.name} is running on  http://${appConfig.http.host}:${appConfig.http.port}${appConfig.api.prefix}`,
    );
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
