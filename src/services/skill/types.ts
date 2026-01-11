/**
 * 技能服务专用类型定义
 */

import type { SkillMetadata } from '../../types/skill/metadata.js';
import type { SkillScope } from '../../types/skill/scope.js';

/**
 * 技能完整内容
 */
export interface Skill {
  name: string;
  description: string;
  version?: string;
  author?: string;
  tags?: string[];
  scope: SkillScope;
  path: string;
  source?: string;
  content: string;
  metadata: SkillMetadata;
  hasScripts: boolean;
  hasReferences: boolean;
  hasAssets: boolean;
}

/**
 * 列出的技能项
 */
export interface ListedSkill {
  name: string;
  description: string;
  source: string;
  path?: string;
}
