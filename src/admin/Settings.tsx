import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { changePassword } from './auth'
import { Field, Input, Card, SectionTitle, Btn } from './ui'

export default function Settings() {
  const { reset } = useSiteData()
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const submitPwd = (e: React.FormEvent) => {
    e.preventDefault()
    if (changePassword(oldPwd, newPwd)) {
      setMsg({ ok: true, text: '密码已修改，下次登录请用新密码。' })
      setOldPwd('')
      setNewPwd('')
    } else {
      setMsg({ ok: false, text: '旧密码错误，或新密码过短（至少 4 位）。' })
    }
  }

  const doReset = () => {
    if (window.confirm('确定要把网站内容重置为默认数据吗？当前改动将丢失。')) {
      reset()
      setMsg({ ok: true, text: '已重置为默认数据。' })
    }
  }

  return (
    <div>
      <SectionTitle>设置</SectionTitle>
      <div className="max-w-xl space-y-4">
        <Card title="修改登录密码">
          <form onSubmit={submitPwd} className="space-y-3">
            <Field label="旧密码">
              <Input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
            </Field>
            <Field label="新密码（至少 4 位）">
              <Input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
            </Field>
            <Btn type="submit">修改密码</Btn>
          </form>
        </Card>

        <Card title="数据管理">
          <p className="text-sm text-slate-400 mb-3">
            将个人网站内容恢复到最初默认值（删除本地保存的所有修改）。
          </p>
          <Btn variant="ghost" danger onClick={doReset}>
            重置为默认数据
          </Btn>
        </Card>

        {msg && (
          <p className={`text-sm ${msg.ok ? 'text-green-400' : 'text-red-400'}`}>{msg.text}</p>
        )}
      </div>
    </div>
  )
}
