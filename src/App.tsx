import { useEffect, useState } from 'react'
import CircuitField from './components/CircuitField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminApp from './admin/AdminApp'

export default function App() {
  // 通过 #/admin 进入后台管理，其余 hash 为前台锚点
  const [isAdmin, setIsAdmin] = useState(() =>
    window.location.hash.startsWith('#/admin'),
  )

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#/admin'))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (isAdmin) return <AdminApp />

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* 背景：电路网络粒子 */}
      <CircuitField />

      {/* 柔和流光光斑 */}
      <div
        className="blob w-[420px] h-[420px] top-[-80px] left-[-100px]"
        style={{ background: '#22d3ee' }}
      />
      <div
        className="blob w-[480px] h-[480px] bottom-[-120px] right-[-140px]"
        style={{ background: '#a78bfa' }}
      />

      {/* 内容层 */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
