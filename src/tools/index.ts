/**
 * MCP 工具统一导出和配置
 */

import type { ToolResponse } from '../types/response/tool.js';
import { sxSkill, sxSkillDefinition, type SxSkillParams } from './skills/index.js';
import { sxConfig, sxConfigDefinition, type SxConfigParams } from './configs/index.js';
import { sxHelp, sxHelpDefinition, type SxHelpParams } from './helps/index.js';

// 导出工具函数和类型
export { sxSkill, sxSkillDefinition, type SxSkillParams } from './skills/index.js';
export { sxConfig, sxConfigDefinition, type SxConfigParams } from './configs/index.js';
export { sxHelp, sxHelpDefinition, type SxHelpParams } from './helps/index.js';

/**
 * 工具配置接口
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
  };
  handler: (args: any) => ToolResponse;
}

/**
 * 工具配置列表
 * 
 * 复用各工具的 definition，添加 handler
 */
export const toolDefinitions: ToolDefinition[] = [
  {
    ...sxSkillDefinition,
    handler: (args) => sxSkill(args as SxSkillParams),
  },
  {
    ...sxConfigDefinition,
    handler: (args) => sxConfig(args as SxConfigParams),
  },
  {
    ...sxHelpDefinition,
    handler: (args) => sxHelp(args as SxHelpParams),
  },
];

/**
 * 获取所有可用工具名称
 */
export function getToolNames(): string[] {
  return toolDefinitions.map(t => t.name);
}
