import CommentOptimisticExample from '@/app/_components/use/use-comment';
import UseHookExample from '../../_components/use';
import UseContextExample from '../../_components/use/use-context-example';
import styles from './page.module.css';

export default function UseExamplePage() {
  return (
    <div className={styles.page}>
      <h1>React 19 use 훅 예제</h1>
      <p className={styles.description}>
        React 19의 새로운 use 훅을 사용해서 API 데이터를 가져오는 예제입니다.
      </p>

      <section className={styles.section}>
        <h2>Promise와 함께 사용 (API 데이터 페칭)</h2>
        <UseHookExample />
      </section>

      <section className={styles.section}>
        <h2>Context와 함께 사용 (테마 관리)</h2>
        <UseContextExample />
      </section>

      <section className={styles.section}>
        <h2>낙관적 업데이트 (댓글 추가)</h2>
        <CommentOptimisticExample />
      </section>
    </div>
  );
}
