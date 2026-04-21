import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AegisFlow AI',
  tagline: 'Nền tảng GIS & Map & AI cho Quản lý Đô thị Thông minh',
  favicon: 'logo.png',
  url: 'https://asean-ai-dz.github.io',
  baseUrl: '/AegisFlowDocument/',
  organizationName: 'ASEAN-AI-DZ',
  projectName: 'AegisFlowDocument',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: 'gh-pages',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeConfigs: {
      vi: { label: 'Tiếng Việt', direction: 'ltr', htmlLang: 'vi' },
      en: { label: 'English', direction: 'ltr', htmlLang: 'en' },
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/ASEAN-AI-DZ/AegisFlowDocument/edit/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{ name: 'keywords', content: 'digital twin, smart city, urban management, AI prediction, urban planning, IoT, geospatial' }],
    image: 'img/Banner.png',
    navbar: {
      title: 'AegisFlow AI',
      logo: {
        alt: 'AegisFlow AI Logo',
        src: '/img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ASEAN-AI-DZ/AegisFlowDocument',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/intro',
            },
            {
              label: 'Architecture',
              to: '/Architecture',
            },
            {
              label: 'Installation',
              to: '/Installation',
            },
            {
              label: 'Services',
              to: '/Services',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ASEAN-AI-DZ/AegisFlowDocument',
            },
            {
              label: 'Issues',
              href: 'https://github.com/ASEAN-AI-DZ/AegisFlowDocument/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/ASEAN-AI-DZ/AegisFlowDocument/discussions',
            },
          ],
        },
        {
          title: 'Team',
          items: [
            {
              label: 'Nguyễn Thị Xuân Nhi',
              href: 'mailto:nguyentxuannhi2@dtu.edu.vn',
            },
            {
              label: 'Nguyễn Văn Nhân',
              href: 'mailto:vannhan130504@gmail.com',
            },
            {
              label: 'Nguyễn Thị Thanh Thúy',
              href: 'mailto:nttthuy1403@gmail.com',
            },
            {
              label: 'Phạm Ngọc Hải',
              href: 'mailto:pnh02042006@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AegisFlow AI. Developed for ASEAN Smart Cities. Built with ❤️ for Evidence-Based Urban Governance.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
