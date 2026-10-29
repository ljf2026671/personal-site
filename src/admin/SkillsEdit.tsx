import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { Field, Input, Card, SectionTitle, SaveBar, Btn } from './ui'
import type { SkillGroup, Skill } from '../api/siteData'

export default function SkillsEdit() {
  const { data, updateSection } = useSiteData()
  const [groups, setGroups] = useState<SkillGroup[]>(
    data.skillGroups.map((g) => ({ ...g, skills: g.skills.map((s) => ({ ...s })) })),
  )
  const [saved, setSaved] = useState(false)

  const patch = (next: SkillGroup[]) => setGroups(next)

  const setName = (gi: number, v: string) =>
    patch(groups.map((g, i) => (i === gi ? { ...g, name: v } : g)))
  const setSkill = (gi: number, si: number, k: keyof Skill, v: string) =>
    patch(
      groups.map((g, i) =>
        i === gi
          ? {
              ...g,
              skills: g.skills.map((s, j) =>
                j === si ? { ...s, [k]: k === 'level' ? Number(v) || 0 : v } : s,
              ),
            }
          : g,
      ),
    )
  const addGroup = () => patch([...groups, { name: '新分类', skills: [{ name: '新技能', level: 60 }] }])
  const delGroup = (gi: number) => patch(groups.filter((_, i) => i !== gi))
  const addSkill = (gi: number) =>
    patch(groups.map((g, i) => (i === gi ? { ...g, skills: [...g.skills, { name: '新技能', level: 60 }] } : g)))
  const delSkill = (gi: number, si: number) =>
    patch(groups.map((g, i) => (i === gi ? { ...g, skills: g.skills.filter((_, j) => j !== si) } : g)))

  const save = () => {
    updateSection('skillGroups', groups)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>技能</SectionTitle>
      <div className="space-y-4">
        {groups.map((g, gi) => (
          <Card
            key={gi}
            title={`分类 ${gi + 1}`}
            action={
              <Btn variant="ghost" danger onClick={() => delGroup(gi)}>
                删除分类
              </Btn>
            }
          >
            <div className="space-y-3">
              <Field label="分类名称">
                <Input value={g.name} onChange={(e) => setName(gi, e.target.value)} />
              </Field>
              {g.skills.map((s, si) => (
                <div key={si} className="flex items-end gap-3">
                  <div className="flex-1">
                    <Field label="技能">
                      <Input value={s.name} onChange={(e) => setSkill(gi, si, 'name', e.target.value)} />
                    </Field>
                  </div>
                  <div className="w-28">
                    <Field label="熟练度 %">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={s.level}
                        onChange={(e) => setSkill(gi, si, 'level', e.target.value)}
                      />
                    </Field>
                  </div>
                  <Btn variant="ghost" danger onClick={() => delSkill(gi, si)}>
                    删
                  </Btn>
                </div>
              ))}
              <Btn variant="ghost" onClick={() => addSkill(gi)}>
                + 添加技能
              </Btn>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Btn variant="ghost" onClick={addGroup}>
          + 添加分类
        </Btn>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
