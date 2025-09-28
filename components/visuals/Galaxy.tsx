"use client"

import { useEffect, useRef } from "react"

type GalaxyProps = {
  mouseRepulsion?: boolean
  mouseInteraction?: boolean
  density?: number
  glowIntensity?: number
  saturation?: number
  hueShift?: number
}

type Star = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
}

export default function Galaxy({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.2,
  glowIntensity = 0.6,
  saturation = 0.7,
  hueShift = 330,
}: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouse = useRef({ x: 0, y: 0, active: false })
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      const width = containerRef.current?.clientWidth ?? window.innerWidth
      const height = containerRef.current?.clientHeight ?? window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // re-seed stars proportionally
      const area = width * height
      const baseCount = Math.max(120, Math.floor((area / 12000) * density))
      starsRef.current = new Array(baseCount).fill(0).map(() => newStar(width, height))
    }

    const newStar = (w: number, h: number): Star => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.05 + Math.random() * 0.25
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.6 + Math.random() * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 0.6 + Math.random() * 1.6,
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
      mouse.current.active = true
    }
    const onLeave = () => (mouse.current.active = false)

    const step = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      // soft glow background
      const grd = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        10,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.8
      )
      grd.addColorStop(0, `hsla(${hueShift}, ${Math.round(saturation * 100)}%, 85%, ${glowIntensity * 0.35})`)
      grd.addColorStop(1, "transparent")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)

      for (const s of starsRef.current) {
        // mouse interaction
        if (mouseInteraction && mouse.current.active) {
          const dx = s.x - mouse.current.x
          const dy = s.y - mouse.current.y
          const dist2 = dx * dx + dy * dy
          const radius = 120
          if (dist2 < radius * radius) {
            const force = (mouseRepulsion ? 1 : -1) * (radius / Math.max(24, Math.sqrt(dist2))) * 0.25
            s.vx += (dx / Math.sqrt(dist2)) * force
            s.vy += (dy / Math.sqrt(dist2)) * force
          }
        }

        s.x += s.vx * s.z
        s.y += s.vy * s.z

        // wrap around edges
        if (s.x < -10) s.x = width + 10
        if (s.x > width + 10) s.x = -10
        if (s.y < -10) s.y = height + 10
        if (s.y > height + 10) s.y = -10

        const pinkHue = hueShift // around 330 defaults to pink
        const alpha = 0.6 + Math.random() * 0.4
        ctx.fillStyle = `hsla(${pinkHue}, ${Math.round(saturation * 100)}%, ${70 + Math.random() * 20}%, ${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()

        // glow
        ctx.shadowBlur = 6
        ctx.shadowColor = `hsla(${pinkHue}, ${Math.round(saturation * 100)}%, 75%, ${glowIntensity})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafRef.current = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener("resize", resize)
    if (mouseInteraction) {
      canvas.addEventListener("mousemove", onMove)
      canvas.addEventListener("mouseleave", onLeave)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", onMove)
        canvas.removeEventListener("mouseleave", onLeave)
      }
    }
  }, [density, glowIntensity, saturation, hueShift, mouseInteraction, mouseRepulsion])

  return (
    <div ref={containerRef} className="galaxy-container">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}


