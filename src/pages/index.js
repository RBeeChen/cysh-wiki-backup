import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// ============================================================
// ✏️  隨機清單設定區
//
// ALL_TEACHERS：所有老師條目的文件 ID（檔名不含副檔名）
// ALL_CLUBS：所有社團條目的文件 ID
// TEACHER_BLACKLIST：不想出現在隨機老師的文件 ID
// CLUB_BLACKLIST：不想出現在隨機社團的文件 ID
//
// 每次頁面載入會從中隨機抽出 4 筆顯示
// ============================================================

const ALL_TEACHERS = [
  '林進裕老師',
  '吳仁凱老師',
  '莊雅茹老師',
  '劉宏二老師',
  '龔昱銘老師',
  '劉俊志老師',
  // 繼續新增...
];

const ALL_CLUBS = [
  '便當研究社',
  '模型研究社',
  '科學研究社',
  '管樂社',
  '嘉義高中社團',
  'KUSO研究社',
  // 繼續新增...
];

const TEACHER_BLACKLIST = [
  // '某某老師',
];

const CLUB_BLACKLIST = [
  // '某某社',
];

// ============================================================
// 以下請勿修改
// ============================================================

function pickRandom(arr, blacklist, count = 4) {
  const pool = arr.filter((id) => !blacklist.includes(id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [teachers, setTeachers] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    setTeachers(pickRandom(ALL_TEACHERS, TEACHER_BLACKLIST, 4));
    setClubs(pickRandom(ALL_CLUBS, CLUB_BLACKLIST, 4));
  }, []);

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
            {/* 左側：嘉中社團（隨機） */}
            <div className="col col--6">
              <div style={{ padding: '0 1rem 2rem 1rem' }}>
                <h2 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '0.3rem' }}>
                  嘉中社團（隨機）
                </h2>
                <ul style={{ listStyleType: 'square', lineHeight: '2' }}>
                  {clubs.map((id) => (
                    <li key={id}>
                      <Link to={`/${id}`}>{id}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 右側：嘉中老師（隨機） */}
            <div className="col col--6">
              <div style={{ padding: '0 1rem 2rem 1rem' }}>
                <h2 style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: '0.3rem' }}>
                  嘉中老師（隨機）
                </h2>
                <ul style={{ listStyleType: 'square', lineHeight: '2' }}>
                  {teachers.map((id) => (
                    <li key={id}>
                      <Link to={`/${id}`}>{id}</Link>
                    </li>
                  ))}
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
            <h3 style={{ color: '#8a6d3b', marginTop: 0 }}>靜態存檔說明</h3>
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
