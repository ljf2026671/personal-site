# AGENTS.md

> 给 AI 开发代理的项目规范说明。Codex / Copilot / Cursor 等工具均可读取。

## 项目简介

EE·Lab 是一个深色电路科技风的个人作品集网站，展示个人介绍、技能、项目与博客。前端静态项目（部署到 GitHub Pages），并内置 `/#/admin` 后台管理（localStorage 模拟后端）可在线编辑内容。

## 如何运行

```bash
npm install      # 安装依赖
npm run dev      # 开发：http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 后台管理（新增）

- 后台入口：浏览器访问 `/#/admin`（或前台页脚「管理」链接）
- 默认登录密码：`admin123`（可在后台「设置」中修改）
- 数据层：`src/api/siteData.ts` 用 localStorage（key=`ee-lab-site-data-v1`）模拟后端，默认数据来自 `src/content.tsx`
- 全局状态：`src/context/SiteDataContext.tsx` 提供 `data / setData / updateSection / reset`
- 前台组件一律通过 `useSiteData()` 读取数据，不得再直接从 `content.tsx` 取个人信息/技能/项目/博客

## 硬性约定

### 技术栈（不得擅自更换）
- React 18 + TypeScript（严格模式 `strict: true`）
- Vite 6 构建，`@vitejs/plugin-react`
- Tailwind CSS v4（`@tailwindcss/vite` 插件，`@import "tailwindcss"`）
- 背景动画使用原生 Canvas，不引入动画库

### 目录结构
- 组件放 `src/components/`（前台）/ `src/admin/`（后台），每个组件一个文件
- 站点内容默认值在 `src/content.tsx`，组件中不得硬编码个人信息/项目/博客文案（一律经 `useSiteData()` 读取）
- 数据层在 `src/api/`，全局状态在 `src/context/`
- 全局样式在 `src/index.css`

### 代码风格
- 使用函数式组件 + Hooks，不用 class 组件
- 组件默认导出（`export default function Xxx()`）
- 变量命名清晰，含义明确
- 尽量保持 Tailwind 原子类优先，复杂样式写入 `index.css`

### 视觉规范（务必保持统一）
- 深色背景 #05070d；主色 青 #22d3ee；辅色 紫 #a78bfa、品红 #f472b6
- 毛玻璃面板 `.glass`、渐变文字 `.text-gradient`、发光卡片 `.glow-card`
- 字体：正文系统无衬线；代码/标题用 `.font-mono-tech`
- 保持响应式（375px 无横向滚动）

### 测试与质量要求
- 每次修改后运行 `npm run build`，确保 TypeScript 无类型错误、构建通过
- 不得引入未使用的导入/变量
- 保证无控制台报错

### 注意事项
- 这是静态站，后台为 localStorage 模拟后端（不涉及真实网络/数据库）；联系表单为前端演示
- 不收集、不发送任何用户数据
- 动画尊重 `prefers-reduced-motion`

## 修改指引
- 改默认内容：编辑 `src/content.tsx`（前台用户可通过后台 `/#/admin` 在线改）
- 改页面结构：编辑对应 `src/components/*.tsx`
- 改后台：编辑 `src/admin/*.tsx`
- 加新模块：新建组件 + 在 `App.tsx` 中挂载 + 更新导航
