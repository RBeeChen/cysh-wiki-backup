import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '旭陵維基備份',
  tagline: '嘉義高中維基百科存檔',
  url: 'https://rbeechen.github.io', 
  baseUrl: '/cysh-wiki-backup/', 
  organizationName: 'RBeeChen', // 確保大小寫與 GitHub 帳號一致
  projectName: 'cysh-wiki-backup', 
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  onBrokenLinks: 'ignore', 
  onBrokenMarkdownLinks: 'ignore',
  onBrokenAnchors: 'ignore',

  // ...其餘設定保持不變...
  
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          // 這裡建議用相對路徑，Docusaurus 會自動幫你補完
          editUrl: 'https://github.com/RBeeChen/cysh-wiki-backup/tree/main/',
        },
        // ...
      }),
    ],
  ],
  
  // ...
};

export default config;