/**
 * Skillix MCP Server 入口
 * 
 * 提供 AI 技能管理功能的 MCP 服务器
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import {
  sxSkill,
  sxConfig,
  sxHelp,
  type SxSkillParams,
  type SxConfigParams,
  type SxHelpParams,
} from './tools/index.js';

/**
 * 创建 MCP Server
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: 'skillix-mcp',
    version: '1.0.0',
  });

  // 注册 sx-skill 工具
  server.registerTool('sx-skill', {
    description: '本地技能管理工具，支持列出、读取、创建、更新、删除技能',
    inputSchema: z.object({
      action: z.enum(['list', 'read', 'create', 'update', 'delete']).describe('操作类型'),
      name: z.string().optional().describe('技能名称（read/create/update/delete 时必需）'),
      scope: z.enum(['global', 'project']).optional().describe('技能范围（create 时使用，默认 global）'),
      projectRoot: z.string().optional().describe('项目根目录路径（项目级操作时需要）'),
      metadata: z.object({
        name: z.string(),
        description: z.string(),
        version: z.string().optional(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }).optional().describe('技能元数据（create/update 时使用）'),
      body: z.string().optional().describe('SKILL.md 正文内容（create/update 时使用）'),
    }),
  }, async (args) => {
    const result = sxSkill(args as unknown as SxSkillParams);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  });

  // 注册 sx-config 工具
  server.registerTool('sx-config', {
    description: '配置管理工具，支持获取、设置配置和管理技能源',
    inputSchema: z.object({
      action: z.enum(['get', 'set', 'init', 'sources']).describe('操作类型'),
      scope: z.enum(['global', 'project']).optional().describe('配置范围（默认 global）'),
      projectRoot: z.string().optional().describe('项目根目录路径（项目级操作时需要）'),
      key: z.string().optional().describe('配置键（get/set 时使用）'),
      value: z.any().optional().describe('配置值（set 时使用）'),
      sourceAction: z.enum(['list', 'add', 'remove']).optional().describe('源操作类型（sources 时使用）'),
      source: z.object({
        name: z.string(),
        url: z.string(),
        branch: z.string().optional(),
        default: z.boolean().optional(),
      }).optional().describe('技能源配置（sources add 时使用）'),
      sourceName: z.string().optional().describe('技能源名称（sources remove 时使用）'),
    }),
  }, async (args) => {
    const result = sxConfig(args as unknown as SxConfigParams);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  });

  // 注册 sx-help 工具
  server.registerTool('sx-help', {
    description: '帮助信息工具，提供 Skillix 使用指南',
    inputSchema: z.object({
      topic: z.enum(['overview', 'skill', 'config', 'market', 'triage', 'all']).optional().describe('帮助主题（默认 overview）'),
    }),
  }, async (args) => {
    const result = sxHelp(args as unknown as SxHelpParams);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  });

  return server;
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error('Skillix MCP Server 已启动');
}

// 启动服务器
main().catch((error) => {
  console.error('服务器启动失败:', error);
  process.exit(1);
});
