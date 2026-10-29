import { useSiteData } from '../context/SiteDataContext'

export default function Projects() {
  const { data } = useSiteData()
  const projects = data.projects
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="sec-head font-mono-tech text-2xl font-bold mb-4 text-slate-100">
          03 · 项目
        </h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          从课程实验到完整产品，每一个项目都是一次从想法到落地的实践。
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="glass glow-card p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-100">{p.title}</h3>
                {p.highlight && (
                  <span className="shrink-0 ml-3 px-2 py-0.5 rounded text-xs font-mono-tech bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                    {p.highlight}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs bg-violet-400/10 text-violet-300 border border-violet-400/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
