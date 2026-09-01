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

/**
 * Inyecta <link rel="preload" as="font"> para las fuentes latin autocontenidas
 * (Manrope Variable + IBM Plex Mono) tras el build, cuando los nombres ya
 * tienen hash. Esto adelanta la descarga de la fuente del hero (LCP) sin
 * depender del orden de la hoja CSS.
 */
function injectFontPreloads(): Plugin {
  return {
    name: 'tecservi-font-preloads',
    apply: 'build',
    enforce: 'post',
    async transformIndexHtml(_html, ctx) {
      if (!ctx || !ctx.bundle) return
      const entries = Object.values(ctx.bundle).filter(
        (m) => 'fileName' in m,
      ) as Array<{ fileName: string }>
      const pick = (re: RegExp) => entries.find((e) => re.test(e.fileName))?.fileName
      const manrope = pick(/manrope-latin-wght-normal-.*\.woff2$/)
      const mono = pick(/ibm-plex-mono-latin-(400|600)-normal-.*\.woff2$/)
      const fonts = [manrope, mono].filter(Boolean) as string[]
      if (!fonts.length) return
      return {
        html: _html,
        tags: fonts.map((f) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: `/${f}`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: true,
          },
          injectTo: 'head',
        })),
      }
    },
  }
}

/**
 * Elimina el request de CSS render-blocking: inlinea la hoja de estilos
 * completa dentro del <head> de index.html (el sitio es una landing de una
 * sola hoja, ~44 kB) y borra el archivo .css del dist.
 *
 * ACTIVADO SOLO con VITE_INLINE_CSS=1. Por defecto OFF para que el deploy
 * sea a prueba de fallos: si por cualquier motivo el inline rompe los estilos,
 * basta con no definir la variable. Habilítalo en el entorno de build/CI
 * (donde sí hay memoria para correr vite build y verificar) para quitar el
 * último recurso render-blocking.
 */
function inlineCss(): Plugin {
  if (process.env.VITE_INLINE_CSS !== '1') {
    return {
      name: 'tecservi-inline-css',
      apply: 'build',
      closeBundle() {},
    }
  }
  return {
    name: 'tecservi-inline-css',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const { readFile, writeFile, unlink } = await import('node:fs/promises')
      const { join } = await import('node:path')
      const dist = join(process.cwd(), 'dist')
      const indexPath = join(dist, 'index.html')
      let html: string
      try {
        html = await readFile(indexPath, 'utf-8')
      } catch {
        return
      }
      const m = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
      if (!m) return
      let css: string
      try {
        css = await readFile(join(dist, m[1].replace(/^\//, '')), 'utf-8')
      } catch {
        return
      }
      html = html.replace(m[0], `<style>\n${css}\n</style>`)
      await writeFile(indexPath, html, 'utf-8')
      try {
        await unlink(join(dist, m[1].replace(/^\//, '')))
      } catch {
        /* noop: el css ya no existe */
      }
      this.info('CSS inlineado en index.html (sin request render-blocking)')
    },
  }
}

export default defineConfig({
  plugins: [vue(), staticSiteFiles(), injectFontPreloads(), inlineCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
  },
})