/**
 * Site-wide brand tokens. Change here, rebrand everywhere.
 * Pair with CSS custom properties in app/globals.css (the visual values).
 */
export const site = {
  name: 'ASCII Template',
  tagline: 'A clean editorial starter for Next.js',
  description:
    'Beautiful, fast, opinion-light starter. Editorial typography, animated ASCII hero, opt-in modules for i18n, auth, payments, and SEO.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  email: 'hello@example.com',

  // ASCII hero config — tweak charset + accents per brand.
  // Two palettes so the canvas can match the active theme.
  hero: {
    chars: ['$', '¢', 'J', 'W', '0', '1', '+', '·', '─', '→', '▲', '▼', 't', '/'] as const,
    accents: {
      light: {
        ink: '29,24,21',
        navy: '31,53,80',
        warm: '91,58,41',
        muted: '107,99,90',
      },
      dark: {
        ink: '245,239,226',
        navy: '142,180,217',
        warm: '200,154,125',
        muted: '138,129,117',
      },
    },
  },

  // Nav links — single source of truth.
  nav: [
    { href: '/#showcase', label: 'Showcase' },
    { href: '/#system', label: 'System' },
    { href: '/blog', label: 'Blog' },
    { href: '/#pricing', label: 'Pricing' },
  ],

  social: {
    github: 'https://github.com/199-biotechnologies/ascii-template',
    x: 'https://x.com',
  },
} as const

export type Site = typeof site
