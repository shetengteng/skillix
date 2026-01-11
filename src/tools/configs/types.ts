/**
 * sx_config 工具类型定义
 */

import type { SourceConfig } from '../../types/config.js';

/**
 * sx_config 工具参数
 */
export interface SxConfigParams {
  action: 'get' | 'set' | 'init' | 'sources';
  scope?: 'global' | 'project';
  projectRoot?: string;
  key?: string;
  value?: any;
  sourceAction?: 'list' | 'add' | 'remove';
  source?: SourceConfig;
  sourceName?: string;
}
