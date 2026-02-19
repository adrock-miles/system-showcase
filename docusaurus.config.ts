import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Token Showcase',
  tagline: 'Design tokens transformed for every platform',
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment — update these to match your repo
  url: 'https://adrock-miles.github.io',
  baseUrl: '/system-showcase/',

  organizationName: 'adrock-miles',
  projectName: 'system-showcase',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Token Showcase',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tokensSidebar',
          position: 'left',
          label: 'Token Reference',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Platform Guides',
        },
        {
          href: 'https://github.com/adrock-miles/system-showcase',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Token Reference',
          items: [
            { label: 'Colors', to: '/tokens/colors' },
            { label: 'Typography', to: '/tokens/typography' },
            { label: 'Spacing', to: '/tokens/spacing' },
          ],
        },
        {
          title: 'Platform Guides',
          items: [
            { label: 'CSS', to: '/guides/css' },
            { label: 'SCSS', to: '/guides/scss' },
            { label: 'TypeScript', to: '/guides/typescript' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Style Dictionary', href: 'https://styledictionary.com' },
            { label: 'W3C DTCG Spec', href: 'https://tr.designtokens.org/format/' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Token Showcase. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['swift', 'kotlin', 'markup', 'scss'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
