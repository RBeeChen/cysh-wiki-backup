import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '旭陵維基備份',
  tagline: '嘉義高中維基百科存檔',
  url: 'https://rbeechen.github.io', 
  baseUrl: '/cysh-wiki-backup/', 
  organizationName: 'rbeechen', 
  projectName: 'cysh-wiki-backup', 
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  // 設置為 'ignore' 以跳過所有因為 Wiki 原始連結格式導致的編譯錯誤
  onBrokenLinks: 'ignore', 
  onBrokenMarkdownLinks: 'ignore', // 移回最外層，解決 unrecognized field 錯誤

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
          editUrl: 'https://github.com/rbeechen/cysh-wiki-backup/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 搜尋功能配置
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
            href: 'https://github.com/rbeechen/cysh-wiki-backup',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `本站內容採用 創用 CC 姓名標示-相同方式分享 授權協議。 Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;