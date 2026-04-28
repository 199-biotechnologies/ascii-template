# i18n addon

Locale-prefixed routes, cookie persistence, Accept-Language detection,
RTL flag, redirect-loop protection. Adapted from clinic-starter,
de-coupled from Supabase.

## What's in this folder

```
addons/i18n/
├── config.ts        # locales array, defaultLocale, RTL list, cookie name
├── middleware.ts    # locale detection + routing
├── locales/         # JSON translation files (en, fr scaffolded)
└── README.md        # this file
```

## Wiring (5 steps)

1. **Move config**: `mv addons/i18n/config.ts i18n/config.ts`
2. **Move middleware to project root**: `mv addons/i18n/middleware.ts middleware.ts`
3. **Move translations**: `mv addons/i18n/locales i18n/locales`
4. **Wrap pages in `[locale]`**:
   ```
   app/[locale]/page.tsx        # was app/page.tsx
   app/[locale]/layout.tsx      # was app/layout.tsx
   app/[locale]/blog/page.tsx   # was app/blog/page.tsx
   ```
5. **Use locale in layout**:
   ```tsx
   import { getDirection, type Locale } from '@/i18n/config'

   export default async function LocaleLayout({
     children,
     params,
   }: {
     children: React.ReactNode
     params: Promise<{ locale: Locale }>
   }) {
     const { locale } = await params
     return (
       <html lang={locale} dir={getDirection(locale)}>
         <body>{children}</body>
       </html>
     )
   }
   ```

## Reading translations

A minimal helper (write your own in `lib/t.ts`):

```ts
import en from '@/i18n/locales/en.json'
import fr from '@/i18n/locales/fr.json'

const dict = { en, fr }

export function t(locale: keyof typeof dict, key: string): string {
  return key.split('.').reduce<any>((o, k) => o?.[k], dict[locale]) ?? key
}
```

Then in components: `t(locale, 'hero.title')`.

## What's NOT included

Deliberately omitted to keep it lean:

- No `i18next` / `react-intl` runtime — JSON + dot-path lookup is enough for marketing sites.
- No Supabase coupling — clinic-starter's middleware mixed locale routing with auth; this version is locale-only.
- No locale switcher component — write a 30-line `<Select>` against the `locales` array.

## Sitemap + alternates

When you wrap routes in `[locale]`, update `app/sitemap.ts` to emit one entry
per `(locale, route)` pair, and add `alternates.languages` to each page's
metadata for `hreflang` tags.

## Why I scaffolded it but didn't wire it

i18n is the highest-friction thing to retrofit. Having the middleware ready
to drop in is 80% of the work; the other 20% is project-specific (which
routes localize, which copy translates).
