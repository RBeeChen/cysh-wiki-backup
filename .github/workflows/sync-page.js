import React, { useState } from 'react';
import Layout from '@theme/Layout';

const REPO = 'RBeeChen/cysh-wiki-backup';
const WORKFLOW_ID = 'sync.yml';

export default function SyncPage() {
  const [token, setToken] = useState('');
  const [step, setStep] = useState('confirm'); // confirm | token | loading | done | error
  const [message, setMessage] = useState('');

  function handleConfirm() {
    setStep('token');
  }

  async function handleSync() {
    if (!token.trim()) {
      setMessage('請輸入您的 GitHub Personal Access Token。');
      return;
    }
    setStep('loading');

    // 取得目前登入的 GitHub 使用者名稱
    let username = 'unknown';
    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        username = userData.login;
      }
    } catch (_) {}

    // 觸發 GitHub Actions workflow_dispatch
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: { triggered_by: username },
          }),
        }
      );

      if (res.status === 204) {
        setStep('done');
        setMessage(`同步請求已成功送出！GitHub Actions 正在執行，完成後將自動建立 PR 等待管理員審核。`);
      } else {
        const err = await res.json().catch(() => ({}));
        setStep('error');
        setMessage(`觸發失敗（${res.status}）：${err.message || '請確認 Token 權限是否包含 workflow。'}`);
      }
    } catch (e) {
      setStep('error');
      setMessage(`網路錯誤：${e.message}`);
    }
  }

  const boxStyle = {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #c8ccd1',
    borderRadius: '6px',
    background: '#f8f9fa',
    textAlign: 'center',
  };

  const btnPrimary = {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '0.5rem',
  };

  const btnDanger = {
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '0.5rem',
  };

  const btnSecondary = {
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '0.5rem',
  };

  return (
    <Layout title="與旭陵維基同步" description="將旭陵維基的最新內容同步至備份站">
      <main style={{ padding: '1rem' }}>

        {/* 確認對話框 */}
        {step === 'confirm' && (
          <div style={boxStyle}>
            <h2 style={{ color: '#7c2d12', marginTop: 0 }}>⚠️ 確認同步</h2>
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}>
              <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>本動作將導致網站中所有的編輯失效</p>
              <p style={{ marginBottom: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                ＊需管理員審核後方可更新
              </p>
            </div>
            <p style={{ color: '#374151', marginBottom: '1.5rem' }}>
              系統將從旭陵維基抓取最新內容，覆蓋本站已有的條目（本站獨有的條目會保留）。
              完成後自動建立 Pull Request，等待管理員審核。
            </p>
            <div>
              <button style={btnDanger} onClick={handleConfirm}>確定</button>
              <button style={btnSecondary} onClick={() => window.history.back()}>取消</button>
            </div>
          </div>
        )}

        {/* 輸入 Token */}
        {step === 'token' && (
          <div style={boxStyle}>
            <h2 style={{ marginTop: 0 }}>輸入 GitHub Token</h2>
            <p style={{ color: '#374151', textAlign: 'left' }}>
              請輸入您的 GitHub Personal Access Token（需要有 <code>workflow</code> 權限）。
              不知道如何申請？請參考{' '}
              <a href="/edit-guide#register" target="_blank">編輯教學</a>。
            </p>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                fontSize: '1rem',
                border: '1px solid #c8ccd1',
                borderRadius: '4px',
                marginBottom: '1rem',
                boxSizing: 'border-box',
              }}
            />
            {message && <p style={{ color: '#dc2626' }}>{message}</p>}
            <div>
              <button style={btnPrimary} onClick={handleSync}>開始同步</button>
              <button style={btnSecondary} onClick={() => { setStep('confirm'); setMessage(''); }}>返回</button>
            </div>
          </div>
        )}

        {/* 執行中 */}
        {step === 'loading' && (
          <div style={boxStyle}>
            <h2 style={{ marginTop: 0 }}>正在送出同步請求…</h2>
            <p style={{ color: '#6b7280' }}>請稍候</p>
          </div>
        )}

        {/* 完成 */}
        {step === 'done' && (
          <div style={{ ...boxStyle, borderColor: '#86efac', background: '#f0fdf4' }}>
            <h2 style={{ color: '#15803d', marginTop: 0 }}>✅ 同步請求已送出</h2>
            <p style={{ color: '#374151' }}>{message}</p>
            <a
              href={`https://github.com/${REPO}/pulls`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnPrimary, display: 'inline-block', textDecoration: 'none' }}
            >
              查看 Pull Request 狀態
            </a>
            <br />
            <button style={{ ...btnSecondary, marginTop: '0.5rem' }} onClick={() => window.history.back()}>
              返回上一頁
            </button>
          </div>
        )}

        {/* 錯誤 */}
        {step === 'error' && (
          <div style={{ ...boxStyle, borderColor: '#fca5a5', background: '#fef2f2' }}>
            <h2 style={{ color: '#dc2626', marginTop: 0 }}>❌ 發生錯誤</h2>
            <p style={{ color: '#374151' }}>{message}</p>
            <button style={btnPrimary} onClick={() => { setStep('token'); setMessage(''); }}>
              重試
            </button>
            <button style={btnSecondary} onClick={() => window.history.back()}>
              返回
            </button>
          </div>
        )}

      </main>
    </Layout>
  );
}
