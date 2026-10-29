import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { Field, Input, TextArea, Card, SectionTitle, SaveBar, Btn } from './ui'
import type { Post } from '../api/siteData'

export default function PostsEdit() {
  const { data, updateSection } = useSiteData()
  const [posts, setPosts] = useState<Post[]>(data.posts.map((p) => ({ ...p, tags: [...p.tags] })))
  const [saved, setSaved] = useState(false)

  const setPost = (i: number, k: keyof Post, v: string) =>
    setPosts((arr) => arr.map((p, idx) => (idx === i ? { ...p, [k]: v } : p)))
  const setTag = (i: number, ti: number, v: string) =>
    setPosts((arr) =>
      arr.map((p, idx) =>
        idx === i ? { ...p, tags: p.tags.map((t, j) => (j === ti ? v : t)) } : p,
      ),
    )
  const addTag = (i: number) =>
    setPosts((arr) => arr.map((p, idx) => (idx === i ? { ...p, tags: [...p.tags, ''] } : p)))
  const delTag = (i: number, ti: number) =>
    setPosts((arr) =>
      arr.map((p, idx) => (idx === i ? { ...p, tags: p.tags.filter((_, j) => j !== ti) } : p)),
    )
  const addPost = () =>
    setPosts((arr) => [
      ...arr,
      { title: '新文章', date: new Date().toISOString().slice(0, 10), summary: '', tags: [], content: '' },
    ])
  const delPost = (i: number) => setPosts((arr) => arr.filter((_, idx) => idx !== i))

  const save = () => {
    updateSection('posts', posts)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>博客</SectionTitle>
      <div className="space-y-4">
        {posts.map((p, i) => (
          <Card
            key={i}
            title={`文章 ${i + 1}`}
            action={
              <Btn variant="ghost" danger onClick={() => delPost(i)}>
                删除
              </Btn>
            }
          >
            <div className="space-y-3">
              <Field label="标题">
                <Input value={p.title} onChange={(e) => setPost(i, 'title', e.target.value)} />
              </Field>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="日期">
                  <Input value={p.date} onChange={(e) => setPost(i, 'date', e.target.value)} />
                </Field>
                <div>
                  <span className="block text-xs text-slate-400 mb-1">标签</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {p.tags.map((t, ti) => (
                      <div key={ti} className="flex items-center gap-1">
                        <Input value={t} onChange={(e) => setTag(i, ti, e.target.value)} className="w-28!" />
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
              <Field label="摘要">
                <TextArea rows={2} value={p.summary} onChange={(e) => setPost(i, 'summary', e.target.value)} />
              </Field>
              <Field label="正文（支持换行）">
                <TextArea rows={4} value={p.content} onChange={(e) => setPost(i, 'content', e.target.value)} />
              </Field>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Btn variant="ghost" onClick={addPost}>
          + 添加文章
        </Btn>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
