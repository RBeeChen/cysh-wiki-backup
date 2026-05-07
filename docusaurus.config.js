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
  // 修正：在 Docusaurus v3 中，此選項應位於頂層而非 markdown 區塊內
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
          routeBasePath: 'docs',
          editUrl: 'https://github.com/RBeeChen/cysh-wiki-backup/tree/main/',
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
        docsRouteBasePath: 'docs',
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
          {
            href: 'https://github.com/RBeeChen/cysh-wiki-backup',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '法律資訊',
            items: [
              {
                label: '創用 CC 姓名標示-相同方式分享 3.0 條款',
                href: 'https://creativecommons.org/licenses/by-sa/3.0/tw/legalcode',
              },
            ],
          },
        ],
        copyright: `本站內容主要來自「旭陵維基」，由原作者以 CC BY-SA 3.0 授權。備份站點由 RBeeChen 維護。`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;