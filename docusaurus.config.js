/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '旭陵維基備份',
  tagline: '嘉義高中維基百科存檔',
  url: 'https://rbeechen.github.io', 
  baseUrl: '/cysh-wiki-backup/', 
  organizationName: 'RBeeChen', // 建議改為大寫開頭，與你的 GitHub 帳號一致
  projectName: 'cysh-wiki-backup', 
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  // onBrokenMarkdownLinks 從這裡移除

  markdown: {
    format: 'mdx',
    // 移到這裡（符合 Docusaurus v3/v4 規範）
    onBrokenMarkdownLinks: 'ignore', 
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    mermaid: true,
  },
  
  // ... 其餘部分保持不變