import { expect, test } from '@playwright/test'

test('locale routes and metadata assets respond', async ({ request }) => {
  const root = await request.get('/', { maxRedirects: 0 })
  expect([307, 308]).toContain(root.status())
  expect(root.headers().location).toBe('/en')

  for (const path of [
    '/en',
    '/en/features',
    '/en/pricing',
    '/en/about',
    '/en/docs',
    '/en/status',
    '/en/contact',
    '/en/privacy',
    '/en/cookies',
    '/en/terms',
    '/en/blog',
    '/robots.txt',
    '/sitemap.xml',
    '/llms.txt',
    '/humans.txt',
  ]) {
    const response = await request.get(path)
    expect(response.ok(), path).toBeTruthy()
  }
})

test('api validation and health endpoints respond predictably', async ({ request }) => {
  const invalidEvent = await request.post('/api/events', { data: {} })
  expect(invalidEvent.status()).toBe(400)

  const event = await request.post('/api/events', {
    data: { eventName: 'smoke.test', path: '/en', locale: 'en' },
  })
  expect(event.ok()).toBeTruthy()
  const eventJson = await event.json()
  expect(eventJson.ok).toBe(true)

  const invalidContact = await request.post('/api/contact', {
    data: { name: 'A', email: 'bad', message: 'short' },
  })
  expect(invalidContact.status()).toBe(400)

  const honeypotContact = await request.post('/api/contact', {
    data: {
      name: 'Smoke Test',
      email: 'smoke@example.com',
      message: 'This is a smoke test contact payload.',
      locale: 'en',
      company: 'bot-filled-honeypot',
    },
  })
  expect(honeypotContact.ok()).toBeTruthy()

  const health = await request.get('/api/health')
  expect([200, 503]).toContain(health.status())
  const healthJson = await health.json()
  expect(['ok', 'degraded', 'fail']).toContain(healthJson.status)
})
