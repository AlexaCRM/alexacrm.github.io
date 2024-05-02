import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Datapress',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.alexacrm.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AlexaCRM', // Usually your GitHub org/user name.
  projectName: 'Datapress', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          path: 'datapress',
          sidebarPath: require.resolve('./sidebars.ts'),
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
          //sidebarPath: './sidebars.ts',
          // Please change this to your repo.
        },
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'wpcrm',
        path: 'wpcrm',
        routeBasePath: 'wpcrm',
        sidebarPath: require.resolve('./sidebars.ts'),
      }, 
    ],
],
themes: [
  [
    require.resolve("docusaurus-plugin-search-local"),
    {
      indexDocs: true,
      indexPages: true,
      hashed: true,
      docsRouteBasePath: '/'
    },
  ]
],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        hideable: true,
      },
    },   
    navbar: {
      title: 'AlexaCRM',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        href: 'https://alexacrm.com/'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Datapress',
        },
        {
          to: '/wpcrm/quickstart',    
          label: 'Dynamics 365 Integration',
          position: 'left',
          activeBaseRegex: `/wpcrm/`,
        },
        {
          to: '/category/knowledge-base',
          label: 'Knowledge base v2',
          position: 'right',
        },
        {
          to: '/wpcrm/category/knowledge-base',
          label: 'Knowledge base v1',
          position: 'right',
        },
        {
          href: 'https://github.com/AlexaCRM/alexacrm.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              href: 'https://github.com/AlexaCRM/alexacrm.github.io',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Documentation v.1',
              to: '/wpcrm',
            },
            {
              label: 'Documentation v.2',
              to: '/datapress',
            },
            {
              label: 'Knowledge base for Dynamics 365 Integration',
              to: '/wpcrm/category/knowledge-base',
            },
            {
              label: 'Knowledge base for Datapress',
              to: '/category/knowledge-base',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AlexaCRM`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
