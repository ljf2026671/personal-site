# AGENTS.md

> 给 AI 开发代理的项目规范说明。Codex / Copilot / Cursor 等工具均可读取。

## 项目简介

EE·Lab 是一个深色电路科技风的个人作品集网站，展示个人介绍、技能、项目与博客。纯前端静态项目，部署到 Vercel / Cloudflare Pages。

## 如何运行

```bash
npm install      # 安装依赖
npm run dev      # 开发：http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 硬性约定

### 技术栈（不得擅自更换）
- React 18 + TypeScript（严格模式 `strict: true`）
- Vite 6 构建，`@vitejs/plugin-react`
- Tailwind CSS v4（`@tailwindcss/vite` 插件，`@import "tailwindcss"`）
- 背景动画使用原生 Canvas，不引入动画库

### 目录结构
- 组件放 `src/components/`，每个组件一个文件
- 站点内容统一放 `src/content.tsx`，组件中不得硬编码个人信息/项目/博客文案
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
- 这是静态站，不做真实后端；联系表单为前端演示
- 不收集、不发送任何用户数据
- 动画尊重 `prefers-reduced-motion`

## 修改指引
- 改个人信息/技能/项目/博客：编辑 `src/content.tsx`
- 改页面结构：编辑对应 `src/components/*.tsx`
- 加新模块：新建组件 + 在 `App.tsx` 中挂载 + 更新导航
