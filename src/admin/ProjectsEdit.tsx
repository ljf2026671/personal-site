import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { Field, Input, TextArea, Card, SectionTitle, SaveBar, Btn } from './ui'
import type { Project } from '../api/siteData'

export default function ProjectsEdit() {
  const { data, updateSection } = useSiteData()
  const [projects, setProjects] = useState<Project[]>(data.projects.map((p) => ({ ...p, tags: [...p.tags] })))
  const [saved, setSaved] = useState(false)

  const setP = (i: number, k: keyof Project, v: string) =>
    setProjects((arr) => arr.map((p, idx) => (idx === i ? { ...p, [k]: v } : p)))
  const setTag = (i: number, ti: number, v: string) =>
    setProjects((arr) =>
      arr.map((p, idx) =>
        idx === i ? { ...p, tags: p.tags.map((t, j) => (j === ti ? v : t)) } : p,
      ),
    )
  const addTag = (i: number) =>
    setProjects((arr) => arr.map((p, idx) => (idx === i ? { ...p, tags: [...p.tags, ''] } : p)))
  const delTag = (i: number, ti: number) =>
    setProjects((arr) =>
      arr.map((p, idx) => (idx === i ? { ...p, tags: p.tags.filter((_, j) => j !== ti) } : p)),
    )
  const addProject = () =>
    setProjects((arr) => [...arr, { title: '新项目', desc: '', tags: [], link: '#' }])
  const delProject = (i: number) => setProjects((arr) => arr.filter((_, idx) => idx !== i))

  const save = () => {
    updateSection('projects', projects)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>项目</SectionTitle>
      <div className="space-y-4">
        {projects.map((p, i) => (
          <Card
            key={i}
            title={`项目 ${i + 1}`}
            action={
              <Btn variant="ghost" danger onClick={() => delProject(i)}>
                删除
              </Btn>
            }
          >
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="标题">
                  <Input value={p.title} onChange={(e) => setP(i, 'title', e.target.value)} />
                </Field>
                <Field label="角标（可选，如 主力课程项目）">
                  <Input value={p.highlight || ''} onChange={(e) => setP(i, 'highlight', e.target.value)} />
                </Field>
              </div>
              <Field label="描述">
                <TextArea rows={2} value={p.desc} onChange={(e) => setP(i, 'desc', e.target.value)} />
              </Field>
              <Field label="链接">
                <Input value={p.link} onChange={(e) => setP(i, 'link', e.target.value)} />
              </Field>
              <div>
                <span className="block text-xs text-slate-400 mb-1">技术标签</span>
                <div className="flex flex-wrap gap-2 items-center">
                  {p.tags.map((t, ti) => (
                    <div key={ti} className="flex items-center gap-1">
                      <Input
                        value={t}
                        onChange={(e) => setTag(i, ti, e.target.value)}
                        className="w-32!"
                      />
                      <Btn variant="ghost" danger onClick={() => delTag(i, ti)}>
                        ✕
                      </Btn>
                    </div>
                  ))}
                  <Btn variant="ghost" onClick={() => addTag(i)}>
                    + 标签
                  </Btn>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Btn variant="ghost" onClick={addProject}>
          + 添加项目
        </Btn>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
