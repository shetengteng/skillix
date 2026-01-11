/**
 * 技能完整内容类型定义
 */

import type { SkillMetadata } from './metadata.js';
import type { SkillScope } from './scope.js';

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
