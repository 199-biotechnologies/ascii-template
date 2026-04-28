import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const initial = site.name.charAt(0).toUpperCase()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1d1815',
          color: '#faf7f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        {initial}
      </div>
    ),
    { ...size },
  )
}
