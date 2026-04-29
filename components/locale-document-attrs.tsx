'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getDirection, getLocaleFromPathname } from '@/lib/i18n/config'

export function LocaleDocumentAttrs() {
  const pathname = usePathname()

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname || '/')
    document.documentElement.lang = locale
    document.documentElement.dir = getDirection(locale)
  }, [pathname])

  return null
}
