import CircuitField from './components/CircuitField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
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
