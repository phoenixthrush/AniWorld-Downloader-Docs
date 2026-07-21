import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/AniWorld-Downloader-Docs/',
  title: 'AniWorld Downloader',
  description: 'Install, configure, and use AniWorld Downloader.',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/AniWorld-Downloader-Docs/logo.png' }],
    ['meta', { name: 'theme-color', content: '#111118' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/quick-start' },
      { text: 'Web UI', link: '/web-ui' },
      { text: 'CLI', link: '/usage' },
      { text: 'GitHub', link: 'https://github.com/phoenixthrush/AniWorld-Downloader' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/quick-start' },
          { text: 'Web UI', link: '/web-ui' },
          { text: 'Command Line', link: '/usage' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Docker', link: '/docker' },
          { text: 'Python API', link: '/python-api' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/phoenixthrush/AniWorld-Downloader' }
    ],
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/phoenixthrush/AniWorld-Downloader-Docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'AniWorld Downloader is open source.',
      copyright: 'Released under the MIT License.'
    },
    outline: { level: [2, 3] },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  }
})
