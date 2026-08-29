import { defineConfig, devices } from '@playwright/test'

/**
 * Flujo: `npm run test:full` hace build + webserver en dist (port 4173) y
 * corre la suite en 3 viewports (móvil/tableta/escritorio).
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    // iPhone 13 trae WebKit por defecto; forzamos Chromium para usar un solo
    // navegador en los 3 viewports (mismo motor que QA correrá en CI).
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    // --host 127.0.0.1 fuerza IPv4 (vite preview enlaza solo ::1 en macOS).
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
