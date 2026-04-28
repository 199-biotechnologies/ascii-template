import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const initial = site.name.charAt(0).toUpperCase()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#faf7f1',
          color: '#1d1815',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 22,
            right: 22,
            display: 'flex',
            justifyContent: 'space-between',
            color: '#6b635a',
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: 2,
          }}
        >
          <span>$ ¢ J</span>
          <span>0 1</span>
        </div>

        <div
          style={{
            fontSize: 120,
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: -6,
            color: '#1d1815',
          }}
        >
          {initial}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 18,
            left: 22,
            right: 22,
            display: 'flex',
            justifyContent: 'space-between',
            color: '#6b635a',
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: 2,
          }}
        >
          <span>→ ▲</span>
          <span>+ ·</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
