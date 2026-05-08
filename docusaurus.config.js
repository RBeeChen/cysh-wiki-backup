import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '旭陵維基備份',
  tagline: '嘉義高中維基百科存檔',
  url: 'https://rbeechen.github.io',
  baseUrl: '/cysh-wiki-backup/',
  organizationName: 'RBeeChen',
  projectName: 'cysh-wiki-backup',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  markdown: {
    format: 'mdx',
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    mermaid: true,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', 
          editUrl: 'https://github.com/RBeeChen/cysh-wiki-backup/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '旭陵維基 (備份)',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '所有條目',
          },
          // 新增：嘉中老師選單
          {
            type: 'docSidebar',
            sidebarId: 'teacherSidebar',
            position: 'left',
            label: '嘉中老師',
          },
          // 新增：嘉中社團選單
          {
            type: 'docSidebar',
            sidebarId: 'clubSidebar',
            position: 'left',
            label: '嘉中社團',
          },
          {
            href: 'https://github.com/RBeeChen/cysh-wiki-backup',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // ... 其餘設定保持不變
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;