# EE·Lab 个人作品集网站

深色电路科技风个人展示网站，包含个人介绍、技能展示、项目展示、博客与联系表单。

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Canvas 动态电路粒子背景

## 本地运行

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run preview  # 本地预览构建产物
```

## 修改个人信息

所有站点内容集中在 `src/content.tsx`，直接修改即可。

## 部署

推送到 GitHub 后用 Cloudflare Pages 或 Vercel 部署，框架自动识别为 Vite，构建命令 `npm run build`，输出目录 `dist`。
