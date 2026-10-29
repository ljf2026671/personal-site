import { useState } from 'react'
import { login } from './auth'
import { Field, Input, Btn } from './ui'

export default function Login() {
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(pwd)) {
      setErr(false)
      window.location.reload()
    } else {
      setErr(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="glass p-8 w-full max-w-sm"
        style={{ animation: 'fadeUp 0.5s ease both' }}
      >
        <div className="font-mono-tech text-cyan-300 mb-6 text-center text-xl">
          [ EE·LAB ADMIN ]
        </div>
        <div className="space-y-4">
          <Field label="管理员密码">
            <Input
              type="password"
              autoFocus
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value)
                setErr(false)
              }}
              placeholder="请输入密码"
            />
          </Field>
          {err && <p className="text-red-400 text-sm">密码错误，请重试。</p>}
          <Btn type="submit" variant="primary">
            登 录
          </Btn>
        </div>
        <div className="mt-6 text-center text-xs text-slate-500">
          默认密码：admin123（可在「设置」中修改）
        </div>
        <div className="mt-3 text-center">
          <a href="#home" className="text-cyan-300 text-sm hover:underline">
            ← 返回前台
          </a>
        </div>
      </form>
    </div>
  )
}
