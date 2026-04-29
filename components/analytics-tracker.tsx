'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getLocaleFromPathname } from '@/lib/i18n/config'

const SESSION_KEY = 'ascii_session_id'
const CONSENT_KEY = 'ascii_analytics_consent'

function getSessionId() {
  const existing = localStorage.getItem(SESSION_KEY)
  if (existing) return existing
  const value = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, value)
  return value
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const search = useSearchParams()
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    setConsent(localStorage.getItem(CONSENT_KEY))
    const onConsent = () => setConsent(localStorage.getItem(CONSENT_KEY))
    window.addEventListener('ascii-analytics-consent', onConsent)
    return () => window.removeEventListener('ascii-analytics-consent', onConsent)
  }, [])

  useEffect(() => {
    if (!pathname || navigator.doNotTrack === '1' || consent !== 'accepted') return

    const payload = {
      eventName: 'page.view',
      path: `${pathname}${search.toString() ? `?${search.toString()}` : ''}`,
      locale: getLocaleFromPathname(pathname),
      sessionId: getSessionId(),
      referrer: document.referrer || undefined,
      metadata: {
        title: document.title,
      },
    }

    const body = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname, search, consent])

  return null
}
