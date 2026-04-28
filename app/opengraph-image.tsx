import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = site.name

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#faf7f1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'serif',
          color: '#1d1815',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#6b635a',
          }}
        >
          <span>{site.name}</span>
          <span>v0.1</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: '#1d1815',
              maxWidth: 920,
              fontWeight: 500,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: '#322b25',
              marginTop: 28,
              maxWidth: 880,
              fontFamily: 'sans-serif',
              fontWeight: 400,
            }}
          >
            {site.description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: '#6b635a',
            fontFamily: 'monospace',
            letterSpacing: 1,
            borderTop: '1px solid #c9bfaa',
            paddingTop: 24,
          }}
        >
          <span>$ ¢ J W 0 1 + · ─ → ▲ ▼</span>
          <span>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
