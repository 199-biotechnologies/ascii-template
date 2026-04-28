import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

/**
 * IndexNow ping route. POST a URL (or array of URLs) to /api/indexnow and
 * we forward to api.indexnow.org so participating engines (Bing, Yandex,
 * Seznam) re-crawl quickly.
 *
 * Setup:
 * 1. Generate a 32-char alphanumeric key:  openssl rand -hex 16
 * 2. Set INDEXNOW_KEY in your env (also expose it via NEXT_PUBLIC_BASE_URL).
 * 3. Create /public/<key>.txt containing only the key, so engines can
 *    verify ownership at https://yoursite.com/<key>.txt
 *
 * Usage from a deploy hook, build step, or admin UI:
 *   curl -X POST https://yoursite.com/api/indexnow \
 *        -H 'content-type: application/json' \
 *        -d '{"urls":["/","/blog/welcome-to-ascii-template"]}'
 */

const ENDPOINT = 'https://api.indexnow.org/indexnow'

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    return NextResponse.json({ error: 'INDEXNOW_KEY not configured' }, { status: 503 })
  }

  let body: { urls?: string | string[]; url?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const list = body.urls ?? body.url
  const urls = Array.isArray(list) ? list : list ? [list] : []
  if (urls.length === 0) {
    return NextResponse.json({ error: 'no urls provided' }, { status: 400 })
  }

  const host = new URL(site.url).host
  const fullUrls = urls.map((u) => (u.startsWith('http') ? u : `${site.url}${u.startsWith('/') ? u : `/${u}`}`))

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${site.url}/${key}.txt`,
      urlList: fullUrls,
    }),
  })

  return NextResponse.json(
    { ok: res.ok, status: res.status, count: fullUrls.length },
    { status: res.ok ? 200 : 502 },
  )
}
