import React from 'react';
import Layout from '@theme/Layout';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '0.4rem',
      color: '#1e3a5f',
    }}>{title}</h2>
    {children}
  </div>
);

const Step = ({ num, title, children }) => (
  <div style={{
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-start',
  }}>
    <div style={{
      minWidth: '2rem',
      height: '2rem',
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1rem',
      flexShrink: 0,
      marginTop: '0.15rem',
    }}>{num}</div>
    <div>
      <b style={{ fontSize: '1.05rem' }}>{title}</b>
      <div style={{ marginTop: '0.4rem', color: '#374151', lineHeight: '1.75' }}>{children}</div>
    </div>
  </div>
);

const Note = ({ children }) => (
  <div style={{
    background: '#eff6ff',
    border: '1px solid #93c5fd',
    borderRadius: '4px',
    padding: '1rem 1.25rem',
    marginBottom: '1.25rem',
    color: '#1e40af',
    lineHeight: '1.75',
  }}>
    💡 {children}
  </div>
);

const Warn = ({ children }) => (
  <div style={{
    background: '#fffaf0',
    border: '1px solid #f0ad4e',
    borderRadius: '4px',
    padding: '1rem 1.25rem',
    marginBottom: '1.25rem',
    color: '#7c4a00',
    lineHeight: '1.75',
  }}>
    ⚠️ {children}
  </div>
);

export default function EditGuide() {
  return (
    <Layout title="編輯教學" description="如何在旭陵維基備份新增或修改條目">
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1rem' }}>

        {/* 標題 */}
        <div style={{
          background: '#1e3a5f',
          color: '#fff',
          borderRadius: '6px',
          padding: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}>
          <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>旭陵維基備份 — 編輯教學</h1>
          <p style={{ color: '#93c5fd', marginBottom: 0 }}>
            本教學將帶您從零開始，完成帳號申請、Fork、新增或修改條目，直到送出 Pull Request。
          </p>
        </div>

        {/* 目錄 */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #c8ccd1',
          borderRadius: '4px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
        }}>
          <b>目錄</b>
          <ol style={{ marginBottom: 0, marginTop: '0.5rem', lineHeight: '2' }}>
            <li><a href="#register">註冊 GitHub 帳號</a></li>
            <li><a href="#fork">Fork 本專案</a></li>
            <li><a href="#add">線上新增條目</a></li>
            <li><a href="#edit">修改現有條目</a></li>
            <li><a href="#markdown">Markdown 撰寫基礎</a></li>
            <li><a href="#pr">送出 Pull Request</a></li>
            <li><a href="#faq">常見問題</a></li>
          </ol>
        </div>

        {/* 第一節：註冊 GitHub */}
        <Section title="① 註冊 GitHub 帳號" id="register">
          <p>GitHub 是一個免費的程式碼與文件託管平台，旭陵維基備份的所有內容都放在上面。要參與編輯，您必須先擁有一個 GitHub 帳號。</p>

          <Step num="1" title="前往 GitHub 註冊頁面">
            點擊下方連結，進入 GitHub 官方註冊頁面：
            <br /><br />
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#24292f',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              前往 GitHub 註冊頁面
            </a>
          </Step>

          <Step num="2" title="填入基本資料">
            依序填入：
            <ul style={{ marginTop: '0.5rem' }}>
              <li><b>Email address</b>：您的電子郵件</li>
              <li><b>Password</b>：至少 8 字元，包含數字與字母</li>
              <li><b>Username</b>：您在 GitHub 上的公開名稱（只能用英文、數字、連字號）</li>
              <li><b>Email preferences</b>：是否接受 GitHub 電子報，可以選 n</li>
            </ul>
          </Step>

          <Step num="3" title="完成人機驗證">
            頁面會出現拼圖或圖片選擇的驗證，按照指示完成即可。
          </Step>

          <Step num="4" title="驗證電子郵件">
            GitHub 會寄送一封驗證信到您填入的 Email，點擊信件中的驗證連結，帳號即完成啟用。
          </Step>

          <Note>已有 GitHub 帳號的話，直接跳到下一節。</Note>
        </Section>

        {/* 第二節：Fork */}
        <Section title="② Fork 本專案" id="fork">
          <p>
            「Fork」是將本專案複製一份到您自己的 GitHub 帳號底下，讓您可以自由修改，
            而不影響原本的備份站。修改完成後再透過 Pull Request 提交給管理員審核。
          </p>

          <Step num="1" title="前往本專案的 GitHub 頁面">
            點擊右上角的「GitHub」連結，或直接前往：
            <br /><br />
            <a
              href="https://github.com/RBeeChen/cysh-wiki-backup"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/RBeeChen/cysh-wiki-backup
            </a>
          </Step>

          <Step num="2" title="點擊右上角的 Fork 按鈕">
            在頁面右上角找到「<b>Fork</b>」按鈕（在 Star 旁邊），點擊它。
          </Step>

          <Step num="3" title="建立 Fork">
            頁面會跳到「Create a new fork」，保持預設值，直接點擊「<b>Create fork</b>」即可。
            完成後您的帳號底下會出現一個 <code>cysh-wiki-backup</code> 的副本。
          </Step>

          <Note>
            Fork 只需要做一次。之後每次要新增或修改條目，都在您自己 Fork 的副本上操作即可。
          </Note>
        </Section>

        {/* 第三節：線上新增條目 */}
        <Section title="③ 線上新增條目" id="add">
          <p>GitHub 提供網頁版的編輯器，不需要安裝任何軟體，直接在瀏覽器中新增 <code>.md</code> 檔案。</p>

          <Step num="1" title="進入您的 Fork 副本">
            前往 <code>https://github.com/您的帳號/cysh-wiki-backup</code>
          </Step>

          <Step num="2" title="進入 docs 資料夾">
            點擊專案中的 <b>docs</b> 資料夾，所有條目的 Markdown 檔案都放在這裡。
          </Step>

          <Step num="3" title="點擊「Add file」>「Create new file」">
            在 docs 資料夾頁面右上角，找到「<b>Add file</b>」下拉選單，選擇「<b>Create new file</b>」。
          </Step>

          <Step num="4" title="填入檔案名稱">
            在頂部的輸入框中填入檔名，例如：<br />
            <code>熱音社.md</code>　或　<code>王小明老師.md</code>
            <br /><br />
            <Warn>
              檔名即為條目標題，請盡量使用中文正式名稱，不要加入特殊符號。
              老師條目請在名稱後面加上「老師」兩字，社團條目請加上社團類型（如「○○社」）。
            </Warn>
          </Step>

          <Step num="5" title="撰寫內容">
            在下方的編輯區輸入條目內容，請使用 Markdown 格式（詳見第五節）。
            建議開頭先用 <code># 條目名稱</code> 作為標題。
          </Step>

          <Step num="6" title="送出變更">
            滾到頁面最下方，在「Commit changes」區塊填入簡短說明（例如：新增熱音社條目），
            然後點擊「<b>Commit changes</b>」。
          </Step>
        </Section>

        {/* 第四節：修改現有條目 */}
        <Section title="④ 修改現有條目" id="edit">
          <Step num="1" title="在網站上找到條目">
            在本備份站使用右上角的搜尋功能找到要修改的條目，進入頁面後，
            點擊頁面頂部的「<b>編輯此頁</b>」連結。
          </Step>

          <Step num="2" title="GitHub 會自動帶您到編輯介面">
            若您已登入 GitHub，頁面會跳到該條目對應的 <code>.md</code> 檔案，
            點擊右上角的鉛筆圖示（✏️ Edit this file）。
          </Step>

          <Step num="3" title="修改內容並送出">
            修改完成後，滾到底部，填入修改說明，點擊「<b>Commit changes</b>」。
          </Step>
        </Section>

        {/* 第五節：Markdown 基礎 */}
        <Section title="⑤ Markdown 撰寫基礎" id="markdown">
          <p>Markdown 是一種簡單的標記語言，讓純文字也能有格式。以下是常用語法：</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#1e3a5f', color: '#fff' }}>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>效果</th>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>語法</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['大標題', '# 標題文字'],
                ['中標題', '## 標題文字'],
                ['小標題', '### 標題文字'],
                ['粗體', '**粗體文字**'],
                ['斜體', '*斜體文字*'],
                ['超連結', '[顯示文字](https://網址)'],
                ['無序清單', '- 項目一\n- 項目二'],
                ['有序清單', '1. 第一項\n2. 第二項'],
                ['引用', '> 引用文字'],
                ['程式碼', '`程式碼`'],
                ['分隔線', '---'],
              ].map(([effect, syntax], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{effect}</td>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                    <code style={{ whiteSpace: 'pre' }}>{syntax}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Note>
            建議每篇條目最上方都用 <code># 條目名稱</code> 開頭，並在下面簡短介紹這個條目是什麼。
          </Note>
        </Section>

        {/* 第六節：Pull Request */}
        <Section title="⑥ 送出 Pull Request" id="pr">
          <p>
            完成新增或修改後，您的變更只在自己的 Fork 副本中，
            必須透過「Pull Request」通知管理員，才能讓內容出現在正式備份站上。
          </p>

          <Step num="1" title="前往您的 Fork 副本頁面">
            前往 <code>https://github.com/您的帳號/cysh-wiki-backup</code>
          </Step>

          <Step num="2" title="點擊「Contribute」>「Open pull request」">
            頁面頂部會出現黃色提示欄，說明您的 Fork 比原版多了幾個 commit，
            點擊「<b>Contribute</b>」，再點「<b>Open pull request</b>」。
          </Step>

          <Step num="3" title="填寫 Pull Request 說明">
            填入標題（例如：新增熱音社條目）和說明，讓管理員知道您做了什麼修改。
          </Step>

          <Step num="4" title="送出">
            點擊「<b>Create pull request</b>」，管理員會收到通知並進行審核。
            審核通過後，您的條目就會正式出現在旭陵維基備份！
          </Step>

          <Note>
            Pull Request 送出後，請耐心等待管理員審核。若有問題，管理員會在 PR 頁面留言與您溝通。
          </Note>
        </Section>

        {/* 第七節：常見問題 */}
        <Section title="⑦ 常見問題" id="faq">
          {[
            {
              q: '我沒有 GitHub 帳號，可以直接提交內容嗎？',
              a: '不行，GitHub 需要帳號才能進行任何修改。請依照第一節的步驟完成註冊，整個流程只需約 5 分鐘。',
            },
            {
              q: '我的 Fork 已經很久了，內容和原版不同步怎麼辦？',
              a: '前往您的 Fork 頁面，點擊「Sync fork」>「Update branch」，即可將原版的最新變更同步到您的副本。',
            },
            {
              q: '我可以上傳圖片嗎？',
              a: '可以，在 GitHub 的檔案編輯頁面，直接將圖片拖拉到編輯區即可上傳，系統會自動產生圖片連結。',
            },
            {
              q: '條目名稱有什麼規則嗎？',
              a: '沒有硬性規定，但建議老師條目以「姓名老師」命名（如：王小明老師），社團條目以社團正式名稱命名（如：熱音社）。',
            },
            {
              q: '我送出 Pull Request 後多久會被審核？',
              a: '視管理員的空閒時間而定，沒有固定時程。若超過一週未獲回應，可以在 PR 頁面底部留言詢問。',
            },
          ].map(({ q, a }, i) => (
            <div key={i} style={{
              marginBottom: '1.25rem',
              background: '#f8f9fa',
              border: '1px solid #c8ccd1',
              borderRadius: '4px',
              padding: '1rem 1.25rem',
            }}>
              <b style={{ color: '#1e3a5f' }}>Q：{q}</b>
              <p style={{ marginBottom: 0, marginTop: '0.5rem', color: '#374151' }}>A：{a}</p>
            </div>
          ))}
        </Section>

        {/* 底部快速連結 */}
        <div style={{
          background: '#1e3a5f',
          color: '#fff',
          borderRadius: '6px',
          padding: '1.5rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{ marginBottom: '1rem', color: '#93c5fd' }}>準備好了嗎？</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#fff',
                color: '#1e3a5f',
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              註冊 GitHub
            </a>
            <a
              href="/contribute"
              style={{
                background: '#3b82f6',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              申請加入新介面
            </a>
            <a
              href="https://github.com/RBeeChen/cysh-wiki-backup"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#24292f',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              前往 GitHub 專案
            </a>
          </div>
        </div>

      </main>
    </Layout>
  );
}
