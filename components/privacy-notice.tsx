'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getLocaleFromPathname, withLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

const CONSENT_KEY = 'ascii_analytics_consent'

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false)
  const [privacyHref, setPrivacyHref] = useState('/en/privacy')
  const [cookiesHref, setCookiesHref] = useState('/en/cookies')
  const [locale, setLocale] = useState(getLocaleFromPathname('/'))
  const dict = getDictionary(locale)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    const currentLocale = getLocaleFromPathname(window.location.pathname)
    setVisible(!stored)
    setLocale(currentLocale)
    setPrivacyHref(withLocale('/privacy', currentLocale))
    setCookiesHref(withLocale('/cookies', currentLocale))

    function openPreferences() {
      const nextLocale = getLocaleFromPathname(window.location.pathname)
      setLocale(nextLocale)
      setPrivacyHref(withLocale('/privacy', nextLocale))
      setCookiesHref(withLocale('/cookies', nextLocale))
      setVisible(true)
    }

    window.addEventListener('ascii-cookie-preferences', openPreferences)
    return () => window.removeEventListener('ascii-cookie-preferences', openPreferences)
  }, [])

  function choose(value: 'accepted' | 'declined') {
    localStorage.setItem(CONSENT_KEY, value)
    window.dispatchEvent(new Event('ascii-analytics-consent'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="privacy-popover" aria-label="Cookie notice">
      <p>{dict.privacyNotice.text}</p>
      <div>
        <button type="button" className="text-button" onClick={() => choose('declined')}>
          {dict.privacyNotice.decline}
        </button>
        <Link href={cookiesHref}>{dict.privacyNotice.cookies}</Link>
        <Link href={privacyHref}>{dict.privacyNotice.privacy}</Link>
        <button type="button" className="btn btn-primary" onClick={() => choose('accepted')}>
          {dict.privacyNotice.allow}
        </button>
      </div>
    </aside>
  )
}
