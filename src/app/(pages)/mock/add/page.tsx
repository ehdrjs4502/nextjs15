'use client';
import { QUERY_KEYS } from '@/app/_constants/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../_components/button';

export default function AddPage() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addUserMutation, isPending } = useMutation({
    mutationFn: () =>
      fetch(
        `https://${process.env.NEXT_PUBLIC_API_KEY}.mockapi.io/api/v1/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MOCK.users() });
      router.push('/mock');
    },
    onError: (error) => {
      console.log('추가 실패:', error);
      setErrors({
        submit: '사용자 추가에 실패했습니다. 다시 시도해주세요.',
      });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = '이름은 필수입니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    addUserMutation();
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h1>새 사용자 추가</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            이름 *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="사용자 이름"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.name ? '#dc3545' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
          {errors.name && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.name}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          color={isPending ? 'secondary' : 'primary'}
        >
          {isPending ? (
            <>
              <span>추가 중...</span>
              <span style={{ marginLeft: '10px' }}>⏳</span>
            </>
          ) : (
            '사용자 추가'
          )}
        </Button>

        {errors.submit && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
}
