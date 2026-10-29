// 后台管理通用 UI 组件（深色科技风，与前台风格一致）
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const inputCls =
  'w-full px-3 py-2 rounded-lg bg-[#0a0f1e] border border-[#1483ff33] text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none text-sm'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-slate-400 mb-1">{label}</span>
      {children}
    </label>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} resize-none`} />
}

export function Btn({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  danger,
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  type?: 'button' | 'submit'
  danger?: boolean
}) {
  const base =
    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90'
      : danger
        ? 'border border-red-400/50 text-red-300 hover:bg-red-400/10'
        : 'border border-slate-500 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}

export function Card({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono-tech text-cyan-300">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="sec-head font-mono-tech text-xl font-bold mb-6 text-slate-100">
      {children}
    </h2>
  )
}

export function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="sticky bottom-4 mt-6 flex items-center gap-4 justify-end">
      {saved && <span className="text-green-400 text-sm">✓ 已保存</span>}
      <Btn onClick={onSave}>保存更改</Btn>
    </div>
  )
}
