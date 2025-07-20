'use client';

import { createContext, useState, use } from 'react';
import styles from './use-context.module.css';

// 테마 타입 정의
type Theme = 'light' | 'dark';

// 테마 Context 생성
const ThemeContext = createContext<Theme>('light');

// 테마 Provider 컴포넌트
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext value={theme}>
      <div className={`${styles.app} ${styles[theme]}`}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? '🌙 다크모드' : '☀️ 라이트모드'}
        </button>
        {children}
      </div>
    </ThemeContext>
  );
}

// use 훅으로 테마를 사용하는 컴포넌트
function Header() {
  const theme = use(ThemeContext);

  return (
    <header className={styles.header}>
      <h1>React 19 use 훅 + Context 예제</h1>
      <p>현재 테마: {theme === 'light' ? '라이트' : '다크'}</p>
    </header>
  );
}

function Content() {
  const theme = use(ThemeContext);

  return (
    <main className={styles.content}>
      <h2>메인 콘텐츠</h2>
      <p>이 텍스트는 {theme} 테마로 표시됩니다.</p>
      <div className={styles.card}>
        <h3>카드 제목</h3>
        <p>이 카드도 {theme} 테마의 스타일이 적용됩니다.</p>
      </div>
    </main>
  );
}

function Footer() {
  const theme = use(ThemeContext);

  return (
    <footer className={styles.footer}>
      <p>푸터 - {theme} 테마 적용됨</p>
    </footer>
  );
}

// 메인 컴포넌트
export default function UseContextExample() {
  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Header />
        <Content />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
