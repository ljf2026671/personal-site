import { useState } from 'react'
import { isLoggedIn, logout } from './auth'
import Login from './Login'
import Dashboard from './Dashboard'
import ProfileEdit from './ProfileEdit'
import SkillsEdit from './SkillsEdit'
import ProjectsEdit from './ProjectsEdit'
import PostsEdit from './PostsEdit'
import Settings from './Settings'

const menu = [
  { key: 'dashboard', label: '仪表盘' },
  { key: 'profile', label: '个人信息' },
  { key: 'skills', label: '技能' },
  { key: 'projects', label: '项目' },
  { key: 'posts', label: '博客' },
  { key: 'settings', label: '设置' },
]

export default function AdminApp() {
  const [page, setPage] = useState('dashboard')

  if (!isLoggedIn()) return <Login />

  const render = () => {
    switch (page) {
      case 'profile':
        return <ProfileEdit />
      case 'skills':
        return <SkillsEdit />
      case 'projects':
        return <ProjectsEdit />
      case 'posts':
        return <PostsEdit />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard go={setPage} />
    }
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100">
      <div className="flex min-h-screen">
        {/* 侧边栏 */}
        <aside className="w-52 shrink-0 bg-[#070a12] border-r border-[#1483ff1f] p-5 flex flex-col">
          <div className="font-mono-tech text-cyan-300 font-bold tracking-widest mb-8">
            [ EE·LAB ]
          </div>
          <nav className="space-y-1 flex-1">
            {menu.map((m) => (
              <button
                key={m.key}
                onClick={() => setPage(m.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  page === m.key
                    ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/30'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </nav>
          <div className="space-y-2 text-sm">
            <a href="#home" className="block px-3 py-2 text-cyan-300 hover:underline">
              ← 查看前台
            </a>
            <button
              onClick={() => {
                logout()
                window.location.reload()
              }}
              className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg"
            >
              退出登录
            </button>
          </div>
        </aside>

        {/* 主内容 */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {render()}
        </main>
      </div>
    </div>
  )
}
