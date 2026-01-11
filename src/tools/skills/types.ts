/**
 * sx_skill 工具类型定义
 */

import type { SkillMetadata, SkillScope } from '../../types/skill.js';

/**
 * sx_skill 工具参数
 */
export interface SxSkillParams {
  action: 'list' | 'read' | 'create' | 'update' | 'delete';
  name?: string;
  scope?: SkillScope;
  projectRoot?: string;
  metadata?: SkillMetadata;
  body?: string;
  query?: string;
}
