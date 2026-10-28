import { useEffect, useState } from 'react'
import { navLinks } from '../content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05070d]/80 backdrop-blur-xl border-b border-[#1483ff1f]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono-tech font-bold text-lg tracking-widest flex items-center gap-2"
        >
          <span className="text-cyan-300">[</span>
          <span className="text-gradient">EE·LAB</span>
          <span className="text-cyan-300">]</span>
        </a>

        {/* 桌面导航 */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-md border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-colors"
            >
              联系我
            </a>
          </li>
        </ul>

        {/* 移动端汉堡 */}
        <button
          className="md:hidden text-slate-200 text-2xl leading-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="切换菜单"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="md:hidden bg-[#070a12]/95 backdrop-blur-xl border-t border-[#1483ff1f] px-5 py-4">
          <ul className="flex flex-col gap-4 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-200 hover:text-cyan-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
