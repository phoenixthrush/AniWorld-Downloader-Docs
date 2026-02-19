import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/AniWorld-Downloader-Docs/',
  title: "AniWorld-Downloader",
  description: "Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/quick-start' },
    ],

    sidebar: [
      {
        text: 'Table of Contents',
        items: [
          { text: 'Quick Start', link: '/quick-start' },
          { text: 'Usage Guide', link: '/usage' },
          { text: 'Configuration', link: '/configuration' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/phoenixthrush/AniWorld-Downloader' }
    ]
  }
})
