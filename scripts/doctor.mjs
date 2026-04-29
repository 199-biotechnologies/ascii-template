import { existsSync, readFileSync } from 'node:fs'

function loadEnvFile(path) {
  if (!existsSync(path)) return

  const lines = readFileSync(path, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const index = trimmed.indexOf('=')
    if (index === -1) continue

    const key = trimmed.slice(0, index).trim()
    let value = trimmed.slice(index + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

const required = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ADMIN_EMAILS',
  'RESEND_API_KEY',
  'RESEND_FROM',
  'CONTACT_TO_EMAIL',
]

const optional = ['INDEXNOW_KEY']
const missing = required.filter((key) => !process.env[key])
const missingOptional = optional.filter((key) => !process.env[key])

console.log('ASCII Template doctor\n')

for (const key of required) {
  console.log(`${process.env[key] ? 'ok   ' : 'miss '} ${key}`)
}

for (const key of optional) {
  console.log(`${process.env[key] ? 'ok   ' : 'skip '} ${key}`)
}

if (missingOptional.length) {
  console.log(`\nOptional not configured: ${missingOptional.join(', ')}`)
}

if (missing.length) {
  console.error(`\nMissing required env vars: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('\nDoctor passed.')
