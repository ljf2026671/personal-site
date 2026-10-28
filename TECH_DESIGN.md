# TECH_DESIGN · EE·Lab 个人作品集网站技术设计

> 技术设计文档
> 版本：v1.0　状态：MVP

## 一、技术栈选型

| 层 | 选型 | 说明 |
|---|---|---|
| 语言 | TypeScript | 类型安全，提升可维护性 |
| 框架 | React 18 | 组件化，生态成熟 |
| 构建 | Vite 6 | 启动快；Vercel/Cloudflare 可自动识别 |
| 样式 | Tailwind CSS v4 | 原子化样式，快速开发 |
| 背景动画 | 原生 Canvas | 电路粒子网络，避免引入重依赖 |
| 部署 | Vercel / Cloudflare Pages | 免费静态托管，推送 GitHub 自动部署 |

**选型理由**：纯静态个人网站，无后端需求，React+Vite 是主流且部署成本最低的方案。Tailwind v4 通过 `@tailwindcss/vite` 插件零配置接入。

## 二、项目结构

```
personal-site/
├─ index.html              # HTML 入口
├─ vite.config.ts          # Vite 配置（React + Tailwind 插件）
├─ package.json
├─ tsconfig.json
├─ PRD.md                  # 产品需求文档
├─ TECH_DESIGN.md          # 本文件
├─ AGENTS.md               # AI 代理开发规范
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.tsx             # React 入口
   ├─ App.tsx              # 根组件，组织区块
   ├─ index.css            # 全局样式 + Tailwind + 自定义主题
   ├─ content.tsx          # 站点内容数据（个人信息/技能/项目/博客）
   └─ components/
      ├─ CircuitField.tsx  # 电路粒子背景（Canvas）
      ├─ Navbar.tsx        # 吸顶导航 + 移动端菜单
      ├─ Hero.tsx          # 首页 Hero + 终端打字机
      ├─ About.tsx         # 个人介绍 + 时间线
      ├─ Skills.tsx        # 技能进度
      ├─ Projects.tsx      # 项目卡片
      ├─ Blog.tsx          # 博客折叠列表
      ├─ Contact.tsx       # 联系表单
      └─ Footer.tsx        # 页脚
```

## 三、数据模型

内容全部集中于 `src/content.tsx`，以 TS 类型定义：

```ts
profile:   { name, enName, role, tagline, location, email, avatarLetter, socials }
stats:     { label, value }[]
timeline:  { period, title, desc }[]
skillGroups: { name, skills: { name, level }[] }[]
projects:  { title, desc, tags[], link, highlight? }[]
posts:     { title, date, summary, tags[], content }[]
navLinks:  { label, href }[]
```

## 四、关键技术点

### 4.1 Canvas 电路粒子背景（CircuitField）
- 节点随机分布 + 连线（距离 < 150px 时绘制渐变色连线）
- 节点缓慢运动，边缘反弹
- 品红流动光点增强科技感
- 移动端粒子数下调（45 vs 90）
- 尊重 `prefers-reduced-motion`，降级为静态绘制
- 使用 `requestAnimationFrame`，卸载时清理

### 4.2 打字机效果（Hero）
- 用 `useTypewriter` Hook 逐字输出终端命令
- Promise + setTimeout 控制节奏，支持卸载取消

### 4.3 Tailwind v4 接入
- `@tailwindcss/vite` 插件 + CSS 中 `@import "tailwindcss"`
- 自定义主题变量在 `index.css` 的 `:root` 中定义

### 4.4 响应式
- 网格断点：`grid-cols-1`（<640）/ `sm:grid-cols-2` / `md:grid-cols-3`
- 内容容器 `max-w-6xl`

## 五、构建与部署

- 构建命令：`npm run build`（先 `tsc -b` 类型检查，再 `vite build`）
- 输出目录：`dist/`
- 部署：GitHub 推送 → Vercel / Cloudflare Pages 导入，框架自动识别 Vite

## 六、风险与对策

| 风险 | 对策 |
|---|---|
| 内容耦合在组件中 | 集中在 content.tsx，解耦 |
| 动画性能 | 粒子降级 + rAF 清理 + 移动端降配 |
| 字体依赖外部网络 | 使用系统字体栈，离线可用 |
