import { useEffect, useState } from 'react';
import { Button, Input } from '.';

export default function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <main style={{ padding: 'var(--space-6)', display: 'grid', gap: 'var(--space-4)', maxWidth: 360 }}>
      <h1>Đăng nhập</h1>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Mật khẩu" type="password" error="Mật khẩu quá ngắn" />
      <Button>Đăng nhập</Button>
      <Button variant="secondary" onClick={() => setDark(!dark)}>
        Đổi theme
      </Button>
    </main>
  );
}