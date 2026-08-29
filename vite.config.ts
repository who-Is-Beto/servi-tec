import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Genera robots.txt y sitemap.xml en el build usando VITE_SITE_URL.
 * Si no hay VITE_SITE_URL, usa el placeholder de /src/data/config.ts.
 */
function staticSiteFiles(): Plugin {
  return {
    name: 'tecservi-static-site-files',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const { writeFile, rm } = await import('node:fs/promises')
      const { join } = await import('node:path')
      const dist = join(process.cwd(), 'dist')
      const siteUrl = (process.env.VITE_SITE_URL || 'https://tecservi.mx').replace(/\/$/, '')

      const pages = [
        { loc: '/', priority: '1.0', changefreq: 'weekly' },
        { loc: '/terminos-y-condiciones', priority: '0.3', changefreq: 'yearly' },
        { loc: '/aviso-de-privacidad', priority: '0.3', changefreq: 'yearly' },
      ]

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url>\n    <loc>${siteUrl}${p.loc}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`

      const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

      await rm(join(dist, 'robots.txt'), { force: true })
      await rm(join(dist, 'sitemap.xml'), { force: true })
      await writeFile(join(dist, 'robots.txt'), robots, 'utf-8')
      await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf-8')
      this.info('Generados robots.txt y sitemap.xml')
    },
  }
}

export default defineConfig({
  plugins: [vue(), staticSiteFiles()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
  },
})