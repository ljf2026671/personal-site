import { useState } from 'react'
import { posts } from '../content'

export default function Blog() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="blog" className="relative py-24 bg-[#070a13]/60">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="sec-head font-mono-tech text-2xl font-bold mb-4 text-slate-100">
          04 · 博客
        </h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          记录学习过程中的心得、踩坑与总结。
        </p>

        <div className="space-y-4">
          {posts.map((post, idx) => {
            const open = active === idx
            return (
              <article key={post.title} className="glass glow-card overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex flex-wrap items-center justify-between gap-3"
                  onClick={() => setActive(open ? null : idx)}
                  aria-expanded={open}
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{post.summary}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono-tech text-xs text-slate-500">
                      {post.date}
                    </span>
                    <span className="text-cyan-300">{open ? '−' : '+'}</span>
                  </div>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-xs bg-cyan-400/10 text-cyan-300 border border-cyan-400/25"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-slate-300 whitespace-pre-line leading-7">
                        {post.content}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
