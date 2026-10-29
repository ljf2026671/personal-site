import { useSiteData } from '../context/SiteDataContext'
import { SectionTitle } from './ui'

const quickLinks = [
  { label: '个人信息', desc: '姓名、身份、邮箱、社交链接、统计', page: 'profile' },
  { label: '技能', desc: '分类、技能、熟练度', page: 'skills' },
  { label: '项目', desc: '项目卡片、技术标签', page: 'projects' },
  { label: '博客', desc: '文章标题、摘要、正文', page: 'posts' },
  { label: '设置', desc: '修改登录密码、重置数据', page: 'settings' },
]

export default function Dashboard({ go }: { go: (page: string) => void }) {
  const { data } = useSiteData()
  const stats = [
    { label: '技能分类', value: data.skillGroups.length },
    { label: '项目', value: data.projects.length },
    { label: '博客文章', value: data.posts.length },
    { label: '时间线', value: data.timeline.length },
  ]

  return (
    <div>
      <SectionTitle>仪表盘</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="glass p-5 text-center">
            <div className="text-3xl font-bold text-gradient">{s.value}</div>
            <div className="text-sm text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quickLinks.map((q) => (
          <button
            key={q.page}
            onClick={() => go(q.page)}
            className="glass glow-card p-5 text-left w-full"
          >
            <div className="font-mono-tech text-cyan-300 mb-1">{q.label}</div>
            <div className="text-sm text-slate-400">{q.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-sm text-slate-500">
        <p>提示：修改后点「保存更改」，回到前台刷新即可看到新内容。</p>
        <a href="#home" className="text-cyan-300 hover:underline">
          返回前台预览 →
        </a>
      </div>
    </div>
  )
}
