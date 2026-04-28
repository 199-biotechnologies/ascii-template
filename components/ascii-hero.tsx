'use client'

import { useEffect, useRef } from 'react'
import { site } from '@/lib/site'

/**
 * Animated ASCII hero — monospace grid driven by a layered 2D sine-wave field.
 *
 * Design notes
 * - Charset + accent triplets read from lib/site.ts at module load (stable
 *   references). No props: passing them as props with default values caused
 *   the parent's re-render to invalidate the effect deps, tearing down the
 *   RAF loop before any frame landed.
 * - setup() returns a boolean. If the parent measures 0×0 on initial mount
 *   (CSS layout pending), we wait for the first ResizeObserver tick to
 *   start the loop. Without this, rows/cols stay 0 and draw() paints nothing.
 *
 * Performance: canvas 2D, capped ~45fps via RAF, ResizeObserver-debounced.
 * Accessibility: aria-hidden, respects prefers-reduced-motion (one frame).
 */

const CHARS = site.hero.chars
const ACCENTS = site.hero.accents

type Cell = { ch: string; nextMutateAt: number }

export function AsciiHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cellW = 12
    let cellH = 18
    let cols = 0
    let rows = 0
    let cells: Cell[][] = []
    let raf = 0
    let lastDraw = 0
    let started = false
    const t0 = performance.now()

    const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

    const setup = (): boolean => {
      const parent = canvas.parentElement
      if (!parent) return false
      const w = Math.floor(parent.clientWidth)
      const h = Math.floor(parent.clientHeight)
      if (w === 0 || h === 0) return false

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const basis = Math.max(12, Math.min(16, Math.round(w / 110)))
      cellW = Math.round(basis * 0.78)
      cellH = Math.round(basis * 1.35)

      cols = Math.ceil(w / cellW) + 2
      rows = Math.ceil(h / cellH) + 2

      cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          ch: randomChar(),
          nextMutateAt: Math.random() * 5000 + 1500,
        })),
      )

      ctx.font = `500 ${basis}px "JetBrains Mono", ui-monospace, "SF Mono", "Fira Code", monospace`
      ctx.textBaseline = 'top'
      return true
    }

    const waveAt = (r: number, c: number, t: number) => {
      const w1 = Math.sin(r * 0.18 + t * 0.00075) * Math.cos(c * 0.12 - t * 0.00055)
      const w2 = Math.sin((r + c) * 0.095 + t * 0.00095)
      const w3 = Math.cos(r * 0.06 - c * 0.09 + t * 0.00038) * 0.6
      return (w1 + w2 * 0.85 + w3) / 2.45
    }

    const draw = (now: number) => {
      if (!ctx) return
      if (now - lastDraw < 22) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastDraw = now
      const t = now - t0

      const width = canvas.width / dpr
      const height = canvas.height / dpr
      ctx.clearRect(0, 0, width, height)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = cells[r][c]
          if (t > cell.nextMutateAt) {
            cell.ch = randomChar()
            cell.nextMutateAt = t + 1800 + Math.random() * 6500
          }

          const v = waveAt(r, c, t)
          const vN = (v + 1) / 2
          const opacity = 0.18 + vN * 0.72

          let color: string
          if (v > 0.55) {
            const mix = (v - 0.55) / 0.45
            color =
              mix > 0.6
                ? `rgba(${ACCENTS.navy}, ${(opacity * 1.1).toFixed(3)})`
                : `rgba(${ACCENTS.warm}, ${(opacity * 0.95).toFixed(3)})`
          } else if (v > 0.1) {
            color = `rgba(${ACCENTS.navy}, ${(opacity * 0.75).toFixed(3)})`
          } else {
            color = `rgba(${ACCENTS.muted}, ${(opacity * 0.9).toFixed(3)})`
          }

          const dy = v * 4.5
          ctx.fillStyle = color
          ctx.fillText(cell.ch, c * cellW, r * cellH + dy)
        }
      }

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw)
      }
    }

    const start = () => {
      if (started) return
      if (!setup()) return
      started = true
      if (prefersReducedMotion) {
        draw(performance.now())
      } else {
        raf = requestAnimationFrame(draw)
      }
    }

    start()

    let resizePending = false
    const ro = new ResizeObserver(() => {
      if (resizePending) return
      resizePending = true
      requestAnimationFrame(() => {
        resizePending = false
        if (!started) {
          start()
          return
        }
        cancelAnimationFrame(raf)
        if (setup()) {
          raf = requestAnimationFrame(draw)
        }
      })
    })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="hero-grid" aria-hidden>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
