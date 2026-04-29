import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=')
    return [key, rest.join('=') || 'true']
  }),
)

const root = process.cwd()
const sitePath = join(root, 'lib/site.ts')
const i18nPath = join(root, 'lib/i18n/config.ts')

function required(name, fallback = '') {
  return String(args[name] || fallback).trim()
}

function replaceLiteral(source, key, value) {
  if (!value) return source
  const escaped = value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
  return source.replace(new RegExp(`${key}: '[^']*'`), `${key}: '${escaped}'`)
}

function replaceDescription(source, value) {
  if (!value) return source
  const escaped = value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
  return source.replace(/description:\n\s+'[^']*'/, `description:\n    '${escaped}'`)
}

function replaceLocales(source, value) {
  if (!value) return source
  const locales = value
    .split(',')
    .map((locale) => locale.trim())
    .filter(Boolean)
  if (!locales.length) return source
  const rendered = locales.map((locale) => `'${locale}'`).join(', ')
  return source
    .replace(/export const locales = \[[^\]]+\] as const/, `export const locales = [${rendered}] as const`)
    .replace(/export const defaultLocale: Locale = '[^']+'/, `export const defaultLocale: Locale = '${locales[0]}'`)
}

if (!existsSync(sitePath)) {
  console.error('Missing lib/site.ts. Run this from the project root.')
  process.exit(1)
}

let site = readFileSync(sitePath, 'utf8')
site = replaceLiteral(site, 'name', required('name'))
site = replaceLiteral(site, 'tagline', required('tagline'))
site = replaceDescription(site, required('description'))
site = replaceLiteral(site, 'email', required('email'))
writeFileSync(sitePath, site)

if (existsSync(i18nPath)) {
  let i18n = readFileSync(i18nPath, 'utf8')
  i18n = replaceLocales(i18n, required('locales'))
  writeFileSync(i18nPath, i18n)
}

console.log('ASCII Template bootstrap complete.')
console.log('')
console.log('Next steps:')
console.log('1. Fill .env.local from .env.example or `vercel env pull .env.local`.')
console.log('2. Run `npm run db:push` to apply Supabase migrations.')
console.log('3. Add ADMIN_EMAILS and Resend settings in Vercel.')
console.log('4. Run `npm run doctor` and `npm run check`.')
console.log('')
console.log('Example:')
console.log(
  'npm run bootstrap -- --name="New Site" --tagline="Fast multilingual site" --email="hello@example.com" --locales=en,fr,es',
)
