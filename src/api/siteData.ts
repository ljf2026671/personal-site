// =============================================================
// 站点数据层（API）：统一读写，用 localStorage 模拟后端存储。
// 默认数据来自 src/content.tsx，可作为「重置为默认」的种子。
// 之后如需换成真实后端，只需替换本文件的 load/save 实现。
// =============================================================
import { profile, stats, timeline, skillGroups, projects, posts } from '../content'

export interface Socials {
  github: string
  gitee: string
  csdn: string
  email: string
}

export interface Profile {
  name: string
  enName: string
  role: string
  tagline: string
  location: string
  email: string
  avatarLetter: string
  socials: Socials
}

export interface Stat {
  label: string
  value: string
}

export interface TimelineItem {
  period: string
  title: string
  desc: string
}

export interface Skill {
  name: string
  level: number
}

export interface SkillGroup {
  name: string
  skills: Skill[]
}

export interface Project {
  title: string
  desc: string
  tags: string[]
  link: string
  highlight?: string
}

export interface Post {
  title: string
  date: string
  summary: string
  tags: string[]
  content: string
}

export interface SiteData {
  profile: Profile
  stats: Stat[]
  timeline: TimelineItem[]
  skillGroups: SkillGroup[]
  projects: Project[]
  posts: Post[]
}

// 默认数据（与 content.tsx 一致，作为初始值与重置种子）
export const defaultData: SiteData = {
  profile: { ...profile, socials: { ...profile.socials } },
  stats,
  timeline,
  skillGroups,
  projects,
  posts,
}

const STORAGE_KEY = 'ee-lab-site-data-v1'

/** 从 localStorage 读取，若没有则返回默认数据 */
export function loadSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as Partial<SiteData>
    // 与默认数据深度合并，避免新增字段时前端读取不到
    return {
      profile: { ...defaultData.profile, ...(parsed.profile || {}), socials: { ...defaultData.profile.socials, ...(parsed.profile?.socials || {}) } },
      stats: parsed.stats || defaultData.stats,
      timeline: parsed.timeline || defaultData.timeline,
      skillGroups: parsed.skillGroups || defaultData.skillGroups,
      projects: parsed.projects || defaultData.projects,
      posts: parsed.posts || defaultData.posts,
    }
  } catch {
    return defaultData
  }
}

/** 保存到 localStorage */
export function saveSiteData(data: SiteData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // 存储失败时静默（如隐私模式）
  }
}

/** 重置为默认数据 */
export function resetSiteData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
