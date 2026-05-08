import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';

const REPO = 'RBeeChen/cysh-wiki-backup';
const WORKFLOW_ID = 'sync-single.yml';

export default function SyncButton() {
  const location = useLocation();
  const [step, setStep] = useState('idle'); // idle | confirm | token | loading | done | not_found | error
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // 從 URL 路徑取得條目名稱（去掉開頭的 /）
  const pageTitle = decodeURIComponent(location.pathname.replace(/^\//, '').replace(/\/$/, ''));

  async function handleSync() {
    if (!token.trim()) {
      setMessage('請輸入 GitHub Token。');
      return;
    }
    setStep('loading');

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
            inputs: {
              page_title: pageTitle,
              triggered_by: username,
            },
          }),
        }
      );

      if (res.status === 204) {
        // 等待 workflow 啟動後查詢結果（簡單等待 30 秒後讓使用者自行查看）
        setStep('done');
        setMessage(`同步請求已送出！系統正在處理「${pageTitle}」，若找不到對應頁面將不會建立 PR。`);
      } else {
        const err = await res.json().catch(() => ({}));
        setStep('error');
        setMessage(`觸發失敗（${res.status}）：${err.message || '請確認 Token 權限。'}`);
      }
    } catch (e) {
      setStep('error');
      setMessage(`網路錯誤：${e.message}`);
    }
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle = {
    background: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '480px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  };

  const btnPrimary = {
    background: '#2563eb', color: '#fff', border: 'none',
    padding: '0.6rem 1.5rem', borderRadius: '4px',
    fontSize: '0.95rem', cursor: 'pointer', margin: '0.4rem',
  };
  const btnDanger = {
    background: '#dc2626', color: '#fff', border: 'none',
    padding: '0.6rem 1.5rem', borderRadius: '4px',
    fontSize: '0.95rem', cursor: 'pointer', margin: '0.4rem',
  };
  const btnSecondary = {
    background: '#6b7280', color: '#fff', border: 'none',
    padding: '0.6rem 1.5rem', borderRadius: '4px',
    fontSize: '0.95rem', cursor: 'pointer', margin: '0.4rem',
  };

  function closeModal() {
    setStep('idle');
    setToken('');
    setMessage('');
  }

  return (
    <>
      {/* 觸發按鈕 */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        marginTop: '2rem',
        paddingTop: '1rem',
        textAlign: 'right',
      }}>
        <button
          style={{
            background: 'transparent',
            border: '1px solid #c8ccd1',
            borderRadius: '4px',
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            color: '#6b7280',
            cursor: 'pointer',
          }}
          onClick={() => setStep('confirm')}
        >
          🔄 讓本頁與旭陵維基同步
        </button>
      </div>

      {/* Modal */}
      {step !== 'idle' && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div style={modalStyle}>

            {/* 確認 */}
            {step === 'confirm' && (
              <>
                <h3 style={{ color: '#7c2d12', marginTop: 0 }}>⚠️ 確認同步</h3>
                <div style={{
                  background: '#fef2f2', border: '1px solid #fca5a5',
                  borderRadius: '4px', padding: '1rem', marginBottom: '1rem', textAlign: 'left',
                }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>本動作將導致本網頁中所有的編輯失效</p>
                  <p style={{ margin: '0.3rem 0 0', color: '#6b7280', fontSize: '0.85rem' }}>
                    ＊需管理員審核後方可更新
                  </p>
                </div>
                <p style={{ color: '#374151', fontSize: '0.9rem' }}>
                  將同步條目：<strong>「{pageTitle}」</strong>
                </p>
                <div>
                  <button style={btnDanger} onClick={() => setStep('token')}>確定</button>
                  <button style={btnSecondary} onClick={closeModal}>取消</button>
                </div>
              </>
            )}

            {/* 輸入 Token */}
            {step === 'token' && (
              <>
                <h3 style={{ marginTop: 0 }}>輸入 GitHub Token</h3>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={{
                    width: '100%', padding: '0.6rem', fontSize: '0.95rem',
                    border: '1px solid #c8ccd1', borderRadius: '4px',
                    marginBottom: '0.75rem', boxSizing: 'border-box',
                  }}
                />
                {message && <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>{message}</p>}
                <div>
                  <button style={btnPrimary} onClick={handleSync}>開始同步</button>
                  <button style={btnSecondary} onClick={() => { setStep('confirm'); setMessage(''); }}>返回</button>
                </div>
              </>
            )}

            {/* 執行中 */}
            {step === 'loading' && (
              <>
                <h3 style={{ marginTop: 0 }}>正在送出同步請求…</h3>
                <p style={{ color: '#6b7280' }}>請稍候</p>
              </>
            )}

            {/* 完成 */}
            {step === 'done' && (
              <>
                <h3 style={{ color: '#15803d', marginTop: 0 }}>✅ 同步請求已送出</h3>
                <p style={{ color: '#374151', fontSize: '0.9rem' }}>{message}</p>
                <a
                  href={`https://github.com/${REPO}/actions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...btnPrimary, display: 'inline-block', textDecoration: 'none' }}
                >
                  查看執行狀態
                </a>
                <br />
                <button style={{ ...btnSecondary, marginTop: '0.5rem' }} onClick={closeModal}>關閉</button>
              </>
            )}

            {/* 找不到頁面 */}
            {step === 'not_found' && (
              <>
                <h3 style={{ color: '#dc2626', marginTop: 0 }}>❌ 錯誤</h3>
                <p>無找到相關介面，請重試或手動新增</p>
                <div>
                  <button style={btnPrimary} onClick={() => setStep('token')}>繼續</button>
                  <button style={btnSecondary} onClick={closeModal}>關閉</button>
                </div>
              </>
            )}

            {/* 錯誤 */}
            {step === 'error' && (
              <>
                <h3 style={{ color: '#dc2626', marginTop: 0 }}>❌ 發生錯誤</h3>
                <p style={{ fontSize: '0.9rem' }}>{message}</p>
                <div>
                  <button style={btnPrimary} onClick={() => { setStep('token'); setMessage(''); }}>重試</button>
                  <button style={btnSecondary} onClick={closeModal}>關閉</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
