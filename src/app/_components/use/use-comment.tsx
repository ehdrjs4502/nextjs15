'use client';

import { useOptimistic, useState } from 'react';
import styles from './use-comment.module.css';

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
  pending?: boolean;
}

async function addComment(text: string, author: string): Promise<Comment> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    id: Date.now(),
    text,
    author,
    timestamp: new Date().toISOString(),
  };
}

export default function CommentOptimisticExample() {
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 추가 낙관적 업데이트
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments, // comments 값이 바뀌면 optimisticComments도 바뀜
    (state, newComment: Comment) => {
      return [...state, { ...newComment, pending: true }];
    },
  );

  const handleAddComment = async (formData: FormData) => {
    const text = formData.get('text') as string;
    const author = formData.get('author') as string;

    const newComment: Comment = {
      id: Date.now(),
      text,
      author,
      timestamp: new Date().toISOString(),
    };

    // 낙관적 업데이트
    addOptimisticComment(newComment);

    try {
      const result = await addComment(text, author);
      setComments((prev) => [...prev, result]);
    } catch (error) {
      console.error('댓글 추가 실패:', error);
      // 에러 시 원래 상태로 되돌리기
      setComments((prev) =>
        prev.filter((comment) => comment.id !== newComment.id),
      );
    }
  };

  console.log(optimisticComments);

  return (
    <div className={styles.container}>
      <h2>useOptimistic 댓글 예제</h2>
      <form action={handleAddComment} className={styles.commentForm}>
        <input
          name="author"
          placeholder="이름"
          className={styles.authorInput}
          required
        />
        <textarea
          name="text"
          placeholder="댓글을 입력하세요..."
          className={styles.commentInput}
          required
        />
        <button type="submit" className={styles.submitButton}>
          댓글 작성
        </button>
      </form>

      <div className={styles.commentList}>
        {optimisticComments.map((comment) => (
          <div
            key={comment.id}
            className={`${styles.commentItem} ${
              comment.pending ? styles.pending : ''
            }`}
          >
            <div className={styles.commentHeader}>
              <strong>{comment.author}</strong>
              <span className={styles.timestamp}>
                {new Date(comment.timestamp).toLocaleString()}
              </span>
              {comment.pending && (
                <span className={styles.pendingIndicator}>⏳</span>
              )}
            </div>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
