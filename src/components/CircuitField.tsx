import { useEffect, useRef } from 'react'

/**
 * CircuitField —— 动态"电路网络"粒子背景
 * 相比普通星空，用青色节点 + 连线 + 流动光点，营造电路/网络的科技感。
 */
export default function CircuitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // 移动端降粒子数
    const isMobile = width < 768
    const count = isMobile ? 45 : 90
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }))

    // 流动光点
    const sparks = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
    }))

    const LINK_DIST = 150

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 连线
      ctx.lineWidth = 0.6
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.35
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(34,211,238,${alpha})`)
            grad.addColorStop(1, `rgba(167,139,250,${alpha})`)
            ctx.strokeStyle = grad
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // 节点
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,211,238,0.7)'
        ctx.fill()
      }

      // 流动光点（只在非降级模式）
      if (!reduceMotion) {
        for (const s of sparks) {
          s.x += s.vx
          s.y += s.vy
          if (s.x < 0 || s.x > width) s.vx *= -1
          if (s.y < 0 || s.y > height) s.vy *= -1
          ctx.beginPath()
          ctx.arc(s.x, s.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(244,114,182,0.9)'
          ctx.shadowColor = '#f472b6'
          ctx.shadowBlur = 12
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      raf = requestAnimationFrame(draw)
    }

    if (reduceMotion) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
