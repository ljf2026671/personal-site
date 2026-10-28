// =============================================================
// 站点内容数据 —— 修改这里即可更换个人信息
// 提示：把 "林一" 换成你的真实姓名/昵称，把邮箱换成你的邮箱。
// =============================================================

export const profile = {
  name: '刘金凤',
  enName: 'LIU JINFENG',
  role: '物联网工程 · 学生',
  tagline: '让传感器、硬件与云端真正互联，做有温度的物联网产品。',
  location: '辽宁 · 辽阳',
  email: 'hello@example.com',
  // 头像：这里是字母 monogram，可替换成图片 URL
  avatarLetter: '刘',
  socials: {
    github: 'https://github.com/ljf2026671',
    gitee: 'https://gitee.com/ljf2026671',
    csdn: 'https://blog.csdn.net/ljf2026671',
    email: 'mailto:hello@example.com',
  },
}

export const stats = [
  { label: '项目实践', value: '12+' },
  { label: '技术栈', value: '10+' },
  { label: '竞赛/证书', value: '6+' },
  { label: '持续学习', value: '∞' },
]

export const heroTerminal = [
  { prompt: '$ whoami', out: '电子信息工程专业学生 · 嵌入式与 Web 开发者' },
  { prompt: '$ cat stack.txt', out: 'C · Keil · Java · Spring Boot · React · Python' },
  { prompt: '$ echo motto', out: '「先跑通 MVP，再逐步迭代」' },
]

export interface TimelineItem {
  period: string
  title: string
  desc: string
}

export const timeline: TimelineItem[] = [
  {
    period: '2022 — 今',
    title: '电子信息工程 · 本科',
    desc: '系统学习电路、数字逻辑、单片机、信号处理与计算机网络，参与多个课程与竞赛项目。',
  },
  {
    period: '2023',
    title: '嵌入式开发入门',
    desc: '基于 51 单片机与 Proteus 完成流水灯、数码管、蜂鸣器、定时器与外部中断系列实验。',
  },
  {
    period: '2024',
    title: 'Java Web 全栈实践',
    desc: '使用 Spring Boot + Vue 开发 Web 项目，掌握 Maven、接口调试与数据库设计。',
  },
  {
    period: '2025',
    title: 'AI 应用探索',
    desc: '接触大模型训练与 AI 辅助开发，学习用 AI 从需求到部署完成产品闭环。',
  },
]

export interface SkillGroup {
  name: string
  skills: { name: string; level: number }[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: '硬件 / 嵌入式',
    skills: [
      { name: '51 单片机 / Keil', level: 88 },
      { name: 'Proteus / 仿真', level: 85 },
      { name: '数字电路 / 原理图', level: 82 },
    ],
  },
  {
    name: '后端 / 服务',
    skills: [
      { name: 'Java / Spring Boot', level: 80 },
      { name: 'MySQL / 数据库', level: 78 },
      { name: 'Python', level: 72 },
    ],
  },
  {
    name: '前端 / 工具',
    skills: [
      { name: 'React / TypeScript', level: 75 },
      { name: 'Vue', level: 70 },
      { name: 'Git / 部署', level: 80 },
    ],
  },
]

export interface Project {
  title: string
  desc: string
  tags: string[]
  link: string
  highlight?: string
}

export const projects: Project[] = [
  {
    title: '物联网设备管理系统',
    desc: '前端 + 后端完整 Web 系统，实现设备接入、状态监控与数据管理。',
    tags: ['Spring Boot', 'Vue', 'MySQL'],
    link: '#',
    highlight: '主力课程项目',
  },
  {
    title: '电商图片提取下载插件',
    desc: 'Chrome 浏览器扩展，一键提取电商详情页图片并批量下载为 PNG。',
    tags: ['Chrome MV3', 'React', 'TypeScript'],
    link: '#',
  },
  {
    title: '智能电子书阅读器',
    desc: 'AI 辅助从 0 到 1 开发的桌面应用，支持 TXT 阅读与进度记忆。',
    tags: ['Electron', 'React', 'AI 开发'],
    link: '#',
  },
  {
    title: '单片机多功能实验箱',
    desc: '整合数码管、蜂鸣器、按键与中断实验，附完整 Proteus 仿真与报告。',
    tags: ['Keil C51', 'Proteus', '硬件'],
    link: '#',
  },
]

export interface BlogPost {
  title: string
  date: string
  summary: string
  tags: string[]
  content: string
}

export const posts: BlogPost[] = [
  {
    title: '用 AI 从 0 到 1 完成一个项目',
    date: '2026-10-20',
    summary: '记录需求分析 → PRD → 技术设计 → AGENTS.md → 实现 → 部署的完整 AI 开发工作流。',
    tags: ['AI 开发', '方法论'],
    content:
      '一套清晰的项目开发流程能避免项目失控、提升开发效率。核心是：先做需求研究，再写 PRD，然后确定技术栈写 TECH_DESIGN，最后用 AGENTS.md 约束 AI 的开发规范。\n\n实现时先跑通 MVP，再分步迭代核心功能，最后打磨细节。每个功能完成后及时测试，并用 Git 管理代码，出了问题可以快速回退。',
  },
  {
    title: '51 单片机外部中断实验详解',
    date: '2026-09-18',
    summary: '从寄存器配置到中断服务函数，讲清外部中断的触发逻辑与调试方法。',
    tags: ['单片机', 'Keil'],
    content:
      '外部中断的关键在于正确配置中断允许寄存器（IE）与中断触发方式（IT0/IT1）。\n\n在 Keil 调试时，可以用 Memory 窗口观察寄存器数值变化，用 F5/F10 单步运行追踪中断响应流程。',
  },
  {
    title: 'Spring Boot 项目部署踩坑记录',
    date: '2026-08-30',
    summary: '端口占用、Mapper 扫描失败、依赖冲突等常见问题的排查思路。',
    tags: ['Java', '部署'],
    content:
      '排查 Bug 的核心思路：发现 → 收集报错 → 交给 AI。先定位是前端还是后端问题，再看请求状态码与日志。\n\n常见坑：8080 端口占用、@Mapper 未扫描、Maven 依赖版本冲突。用控制变量法与二分排查法快速缩小范围。',
  },
]

export const navLinks = [
  { label: '首页', href: '#home' },
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '博客', href: '#blog' },
  { label: '联系', href: '#contact' },
]
