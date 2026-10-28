import { skillGroups } from '../content'

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-[#070a13]/60">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="sec-head font-mono-tech text-2xl font-bold mb-4 text-slate-100">
          02 · 技能
        </h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          软硬件双修的技能树，从寄存器到数据库，再到前端界面。
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.name} className="glass glow-card p-6">
              <h3 className="font-mono-tech text-cyan-300 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                {group.name}
              </h3>
              <div className="space-y-5">
                {group.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-200">{s.name}</span>
                      <span className="font-mono-tech text-slate-500">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                      <div
                        className="bar-fill h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
