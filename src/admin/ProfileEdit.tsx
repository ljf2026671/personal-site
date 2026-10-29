import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { Field, Input, Card, SectionTitle, SaveBar } from './ui'
import type { Profile, Stat } from '../api/siteData'

export default function ProfileEdit() {
  const { data, updateSection } = useSiteData()
  const [profile, setProfile] = useState<Profile>({ ...data.profile, socials: { ...data.profile.socials } })
  const [stats, setStats] = useState<Stat[]>(data.stats.map((s) => ({ ...s })))
  const [saved, setSaved] = useState(false)

  const set = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }))
  const setSocial = (k: keyof Profile['socials'], v: string) =>
    setProfile((p) => ({ ...p, socials: { ...p.socials, [k]: v } }))
  const setStat = (i: number, k: 'label' | 'value', v: string) =>
    setStats((arr) => arr.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)))

  const save = () => {
    updateSection('profile', profile)
    updateSection('stats', stats)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>个人信息</SectionTitle>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="基础信息">
          <div className="space-y-3">
            <Field label="姓名">
              <Input value={profile.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="英文名（页脚署名用）">
              <Input value={profile.enName} onChange={(e) => set({ enName: e.target.value })} />
            </Field>
            <Field label="职位 / 身份">
              <Input value={profile.role} onChange={(e) => set({ role: e.target.value })} />
            </Field>
            <Field label="一句话介绍">
              <Input value={profile.tagline} onChange={(e) => set({ tagline: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="所在地">
                <Input value={profile.location} onChange={(e) => set({ location: e.target.value })} />
              </Field>
              <Field label="头像字母">
                <Input value={profile.avatarLetter} onChange={(e) => set({ avatarLetter: e.target.value })} />
              </Field>
            </div>
          </div>
        </Card>

        <Card title="联系方式">
          <div className="space-y-3">
            <Field label="邮箱">
              <Input value={profile.email} onChange={(e) => set({ email: e.target.value })} />
            </Field>
            <Field label="GitHub 链接">
              <Input value={profile.socials.github} onChange={(e) => setSocial('github', e.target.value)} />
            </Field>
            <Field label="Gitee 链接">
              <Input value={profile.socials.gitee} onChange={(e) => setSocial('gitee', e.target.value)} />
            </Field>
            <Field label="CSDN 链接">
              <Input value={profile.socials.csdn} onChange={(e) => setSocial('csdn', e.target.value)} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="首页数据统计">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <Field label={`数值 ${i + 1}`}>
                  <Input value={s.value} onChange={(e) => setStat(i, 'value', e.target.value)} />
                </Field>
                <Field label="名称">
                  <Input value={s.label} onChange={(e) => setStat(i, 'label', e.target.value)} />
                </Field>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
