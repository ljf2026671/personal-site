import { useEffect, useState } from 'react'
import { profile, heroTerminal, stats } from '../content'

/** 打字机效果 */
function useTypewriter(lines: { prompt: string; out: string }[]) {
  const [output, setOutput] = useState<{ prompt: string; out: string }[]>([])
  const [typing, setTyping] = useState('')

  useEffect(() => {
    let cancelled = false
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

    async function run() {
      const shown: { prompt: string; out: string }[] = []
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        shown.push({ prompt: lines[i].prompt, out: '' })
        setOutput([...shown])
        const out = lines[i].out
        for (let c = 0; c <= out.length; c++) {
          if (cancelled) return
          const snapshot = [...shown]
          snapshot[i] = { prompt: lines[i].prompt, out: out.slice(0, c) }
          setOutput(snapshot)
          await delay(35)
        }
        await delay(200)
      }
      if (!cancelled) setTyping(lines[lines.length - 1].prompt)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [lines])

  return { output, typing }
}

export default function Hero() {
  const { output } = useTypewriter(heroTerminal)
  const lastPrompt = heroTerminal[heroTerminal.length - 1].prompt

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-5 w-full grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* 左侧文字 */}
        <div className="fade-up">
          <p className="font-mono-tech text-cyan-300 text-sm tracking-widest mb-3">
            &gt; system boot ok — welcome to my lab_
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
            你好，我是{' '}
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-200 mb-6">
            {profile.role}
          </p>
          <p className="text-slate-400 max-w-xl mb-8">{profile.tagline}</p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
            >
              查看项目
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-slate-500 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              联系我
            </a>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass px-4 py-3 text-center">
                <div className="text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧终端窗口 */}
        <div className="glass overflow-hidden fade-up">
          {/* 标题栏 */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1483ff1f]">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono-tech text-xs text-slate-400">
              ~/about-me.sh
            </span>
          </div>
          {/* 终端内容 */}
          <div className="p-5 font-mono-tech text-sm space-y-3 min-h-[280px]">
            {output.map((line, i) => (
              <div key={i}>
                <div className="text-cyan-300">
                  {line.prompt}
                  <span className="caret" style={{ opacity: i === output.length - 1 ? 1 : 0 }} />
                </div>
                {line.out && <div className="text-slate-300">{line.out}</div>}
              </div>
            ))}
            {output.length >= heroTerminal.length && (
              <div className="text-cyan-300">
                {lastPrompt}
                <span className="caret" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
