/*
 * @Description: 配置文件加载器
 * @Author: liks
 * @Date: 2025-10-16 10:39:41
 * @LastEditors: liks
 * @LastEditTime: 2025-10-16 17:34:33
 */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import type { Config } from '../env/config.types';

const YAML_CONFIG_FILENAME = '../env/config.yaml';

export default () => {
  const config = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Config;

  if (config.app.http.port < 1024 || config.app.http.port > 10000) {
    throw new Error('HTTP port must be between 1024 and 49151');
  }
  // console.log('config', config);
  return config;
};
