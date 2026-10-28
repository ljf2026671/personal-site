import { useState } from 'react'
import { profile } from '../content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // 纯前端演示：模拟提交反馈
    if (!form.name || !form.message) {
      setStatus('err')
      return
    }
    setStatus('ok')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="sec-head font-mono-tech text-2xl font-bold mb-4 text-slate-100">
          05 · 联系
        </h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          欢迎交流技术、项目合作或考研经验，随时给我留言。
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* 联系方式 */}
          <div className="space-y-4">
            <div className="glass p-5 flex items-center gap-4">
              <span className="text-2xl text-cyan-300">✉</span>
              <div>
                <div className="text-sm text-slate-500">邮箱</div>
                <a href={profile.socials.email} className="text-slate-200 hover:text-cyan-300">
                  {profile.email}
                </a>
              </div>
            </div>
            <div className="glass p-5 flex items-center gap-4">
              <span className="text-2xl text-violet-300">⌨</span>
              <div>
                <div className="text-sm text-slate-500">GitHub</div>
                <a href={profile.socials.github} className="text-slate-200 hover:text-cyan-300">
                  github.com/{'你的用户名'}
                </a>
              </div>
            </div>
            <div className="glass p-5 flex items-center gap-4">
              <span className="text-2xl text-pink-300">📍</span>
              <div>
                <div className="text-sm text-slate-500">坐标</div>
                <span className="text-slate-200">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* 表单 */}
          <form onSubmit={submit} className="glass p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="你的名字"
                className="px-4 py-2.5 rounded-lg bg-[#0a0f1e] border border-[#1483ff33] text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="你的邮箱"
                className="px-4 py-2.5 rounded-lg bg-[#0a0f1e] border border-[#1483ff33] text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="想对我说的话…"
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1e] border border-[#1483ff33] text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
            />
            {status === 'ok' && (
              <p className="text-green-400 text-sm">✓ 已收到，我会尽快回复你！</p>
            )}
            {status === 'err' && (
              <p className="text-red-400 text-sm">请填写名字和留言内容。</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow"
            >
              发送留言
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
