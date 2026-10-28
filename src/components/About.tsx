import { profile, timeline } from '../content'

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="sec-head font-mono-tech text-2xl font-bold mb-4 text-slate-100">
          01 · 关于我
        </h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          一位专注嵌入式与 Web 开发的电子信息工程学生，喜欢从原理出发理解每一个细节，
          也喜欢用 AI 把想法快速变成可运行的产品。
        </p>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10">
          {/* 名片 */}
          <div className="glass p-6 h-fit">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/80 to-violet-500/80 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">
                {profile.avatarLetter}
              </div>
              <div>
                <div className="text-lg font-bold">{profile.name}</div>
                <div className="text-sm text-slate-400">{profile.role}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">所在</span>
                <span>{profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">邮箱</span>
                <span className="text-cyan-300">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">方向</span>
                <span>嵌入式 / Web / AI</span>
              </div>
            </div>
          </div>

          {/* 时间线 */}
          <div>
            <ol className="relative border-l border-[#1483ff2b] ml-3 space-y-8">
              {timeline.map((t) => (
                <li key={t.period} className="pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  <div className="font-mono-tech text-cyan-300 text-xs mb-1">
                    {t.period}
                  </div>
                  <div className="font-semibold text-slate-100">{t.title}</div>
                  <p className="text-sm text-slate-400 mt-1">{t.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
