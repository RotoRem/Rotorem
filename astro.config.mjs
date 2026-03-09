import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rotorem.bg',
  integrations: [
    tailwind({
      // Using a simple config without requiring daisyui directly 
      // (it will be loaded via the tailwind.config.cjs file)
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (entry) => {
        const candidate =
          typeof entry === 'string' ? entry : entry?.pathname ?? '';
        if (candidate.startsWith('/en/')) {
          return false;
        }

        return !candidate.startsWith('/thankyou/') && !candidate.startsWith('/book/');
      },
      serialize(item) {
        if (
          item.url.endsWith('/') ||
          item.url.includes('/services') ||
          item.url.includes('/contact')
        ) {
          item.priority = 0.9;
        }
        return item;
      },
    }),
  ],
  build: {
    // Force inlining of stylesheets to prevent loading issues
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
            utils: ['./src/i18n/utils.ts'],
            components: ['./src/components/Hero.astro', './src/components/Services.astro']
          },
          // Ensure assets are properly named
          assetFileNames: 'assets/[name].[hash][extname]'
        },
      },
      // Increase asset inline limit to ensure critical CSS is inlined
      assetsInlineLimit: 8192,
    },
    ssr: {
      noExternal: ['three', 'astro-seo']
    }
  },
});
