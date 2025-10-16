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
import { ValidationPipe } from '@nestjs/common';
import type { AppConfig, SwaggerConfig } from './env/config.types';
import { useSwagger } from './utils/useSwagger';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
// 应用启动函数
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const appConfig = config.get<AppConfig>('app', {} as AppConfig);
  console.log('app-config', appConfig);
  // 配置全局前缀
  app.setGlobalPrefix(appConfig.api.prefix);
  // 配置全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 配置全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局启用 ValidationPipe 加上参数校验。
  // transform 指定为 true，这样会自动把参数的 js 对象转换为 dto 类型对象。
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // 配置 swagger
  const swaggerConfig = config.get<SwaggerConfig>(
    'swagger',
    {} as SwaggerConfig,
  );
  useSwagger(app, swaggerConfig);
  await app.listen(appConfig.http.port ?? 3000);
  return { appConfig, swaggerConfig };
}

// 应用启动
bootstrap()
  .then(({ appConfig, swaggerConfig }) => {
    // 打印应用信息
    // 添加彩色符号
    const color = '\x1b[34m'; // 蓝色
    const reset = '\x1b[0m'; // 重置颜色
    console.log(
      `${color}Application ${appConfig.name} is running on  http://${appConfig.http.host}:${appConfig.http.port}${appConfig.api.prefix}${reset}`,
    );
    console.log(
      `${color}Swagger is running on  http://${appConfig.http.host}:${appConfig.http.port}${swaggerConfig.path}${reset}`,
    );
    console.log(
      `${color}Swagger JSON document is available at http://${appConfig.http.host}:${appConfig.http.port}${swaggerConfig.jsonDocumentUrl}${reset}`,
    );
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
