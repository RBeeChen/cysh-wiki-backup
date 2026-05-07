import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`歡迎來到 ${siteConfig.title}`}
      description="旭陵雨豆-嘉義高中維基百科存檔">
      <main style={{ padding: '2.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 頂部歡迎區塊 */}
        <div style={{
          border: '1px solid #c8ccd1',
          background: '#f8f9fa',
          padding: '2rem',
          marginBottom: '2.5rem',
          borderRadius: '2px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#000' }}>
            歡迎來到旭陵維基
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#333' }}>
            旭陵雨豆 — <b>嘉義高中</b>
          </p>
          <hr style={{ margin: '1.5rem auto', maxWidth: '200px', border: '0', borderTop: '1px solid #a2a9b1' }} />
          <p style={{ color: '#54595d', fontSize: '0.9rem', marginBottom: 0 }}>
            本站目前存檔超過 600 個頁面，記錄嘉中校園點滴。
          </p>
        </div>

        <div className="container">
          <div className="row">
            {/* 左側：精選社團 */}
            <div className="col col--6">
              <div style={{ padding: '0 1rem 2rem 1rem' }}>
                <h2 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '0.3rem' }}>🌟 精選社團</h2>
                <ul style={{ listStyleType: 'square', lineHeight: '2' }}>
                  <li><Link to="/docs/便當研究社">便當研究社</Link></li>
                  <li><Link to="/docs/模型研究社">模型研究社</Link></li>
                  <li><Link to="/docs/科學研究社">科學研究社</Link></li>
                  <li><Link to="/docs/管樂社">管樂社</Link></li>
                </ul>
              </div>
            </div>
            
            {/* 右側：人物誌 */}
            <div className="col col--6">
              <div style={{ padding: '0 1rem 2rem 1rem' }}>
                <h2 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '0.3rem' }}>👨‍🏫 嘉中人物誌</h2>
                <ul style={{ listStyleType: 'square', lineHeight: '2' }}>
                  <li><Link to="/docs/林進裕老師">林進裕老師</Link></li>
                  <li><Link to="/docs/吳仁凱老師">吳仁凱老師</Link></li>
                  <li><Link to="/docs/莊雅茹老師">莊雅茹老師</Link></li>
                  <li><Link to="/docs/劉宏二老師">劉宏二老師</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 底部重要聲明 */}
          <div style={{
            marginTop: '2rem',
            background: '#fffaf0',
            border: '1px solid #f0ad4e',
            padding: '1.5rem',
            borderRadius: '4px'
          }}>
            <h3 style={{ color: '#8a6d3b', marginTop: 0 }}>📢 靜態存檔說明</h3>
            <p style={{ marginBottom: 0 }}>
              這是一個唯讀的備份站點。如果您想參與編輯或發現資訊錯誤，
              請使用頁面右上角的<b>搜尋功能</b>尋找條目，並透過 GitHub 的 Pull Request 進行修改建議。
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}