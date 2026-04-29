import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3030',
  },
  webServer: {
    command: 'npm run dev -- --port 3030',
    url: 'http://127.0.0.1:3030/en',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
