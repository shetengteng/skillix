/**
 * 配置服务专用类型定义
 */

import type { SkillSource } from '../../types/config/source.js';

/**
 * 缓存配置
 */
export interface CacheConfig {
  enabled: boolean;
  ttl?: number;
}

/**
 * 日志配置
 */
export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  maxFiles?: number;
  maxSize?: string;
}

/**
 * 建议阈值配置
 */
export interface SuggestThreshold {
  repeatCount: number;
  stepCount: number;
}

/**
 * 反馈配置
 */
export interface FeedbackConfig {
  enabled: boolean;
  autoRecord: boolean;
}

/**
 * 全局配置 (~/.skillix/config.json)
 */
export interface GlobalConfig {
  version: string;
  sources: SkillSource[];
  defaultScope: 'global' | 'project';
  format: 'xml' | 'json';
  autoSuggest: boolean;
  suggestThreshold: SuggestThreshold;
  logging: LoggingConfig;
  cache: CacheConfig;
}

/**
 * 默认全局配置
 */
export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = {
  version: '1.0.0',
  sources: [
    {
      name: 'official',
      url: 'https://github.com/shetengteng/skillix-hub',
      branch: 'main',
      default: true,
    },
  ],
  defaultScope: 'global',
  format: 'xml',
  autoSuggest: true,
  suggestThreshold: {
    repeatCount: 3,
    stepCount: 5,
  },
  logging: {
    level: 'info',
    maxFiles: 5,
    maxSize: '10MB',
  },
  cache: {
    enabled: true,
    ttl: 3600,
  },
};

/**
 * 项目配置 (.skillix/config.json)
 */
export interface ProjectConfig {
  sources?: SkillSource[];
  format?: 'xml' | 'json';
  autoSuggest?: boolean;
  feedback?: FeedbackConfig;
}

/**
 * 默认项目配置
 */
export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  sources: [],
  format: 'xml',
  autoSuggest: true,
  feedback: {
    enabled: true,
    autoRecord: false,
  },
};
