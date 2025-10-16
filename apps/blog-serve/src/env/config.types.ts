/*
 * @Description: 配置文件类型定义
 * @Author: liks
 * @Date: 2025-10-16 10:46:58
 * @LastEditors: liks
 * @LastEditTime: 2025-10-16 17:37:32
 */
// 根据 config.yaml 定义配置文件类型
export type HttpConfig = {
  host: string;
  port: number;
  timeout: number;
};
export type PostgresConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
export type ApiConfig = {
  prefix: string;
  version: string;
};
export type AppConfig = {
  name: string;
  version: string;
  http: HttpConfig;
  api: ApiConfig;
};

export type Config = {
  app: AppConfig;
  db: {
    postgres: PostgresConfig;
  };
};
