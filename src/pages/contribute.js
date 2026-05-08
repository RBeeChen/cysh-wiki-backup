import React from 'react';
import Layout from '@theme/Layout';

export default function Contribute() {
  return (
    <Layout title="申請加入新介面" description="申請在旭陵維基備份新增條目">
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1rem' }}>
        <h1 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '0.5rem' }}>
          申請加入新介面
        </h1>
        <p>您可以透過 GitHub 直接在線上建立新的 Markdown 檔案，新增條目到旭陵維基備份。</p>
        <p>點擊下方按鈕，會帶您進入 GitHub 線上編輯介面。請先確認您已登入 GitHub 帳號。</p>

        <div style={{
          background: '#f8f9fa',
          border: '1px solid #c8ccd1',
          borderRadius: '4px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h3 style={{ marginTop: 0 }}>步驟說明</h3>
          <ol style={{ lineHeight: '2' }}>
            <li>點擊下方「前往新增頁面」按鈕</li>
            <li>GitHub 會自動 fork 本專案到您的帳號</li>
            <li>在編輯器中填入條目內容（Markdown 格式）</li>
            <li>填寫檔案名稱（例如：<code>我的條目.md</code>）</li>
            <li>點擊「Commit changes」送出</li>
            <li>GitHub 會自動建立 Pull Request，等待管理員審核合併</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a
            href="https://github.com/RBeeChen/cysh-wiki-backup/new/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            前往新增頁面（GitHub）
          </a>
        </div>

        <div style={{
          background: '#fffaf0',
          border: '1px solid #f0ad4e',
          borderRadius: '4px',
          padding: '1.25rem',
        }}>
          <b>注意：</b>還沒有 GitHub 帳號嗎？請先參考{' '}
          <a href="/edit-guide">編輯教學</a>，裡面有完整的註冊與操作說明。
        </div>
      </main>
    </Layout>
  );
}
