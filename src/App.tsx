import { useEffect, useState } from 'react';
import { Button, Card, Input } from '.';

export default function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: 360 }}>
      <Card title="Đăng nhập" headingLevel={1}>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Mật khẩu" type="password" error="Mật khẩu quá ngắn" />
          <Button>Đăng nhập</Button>
          <Button variant="secondary" onClick={() => setDark(!dark)}>
            Đổi theme
          </Button>
        </div>
      </Card>
    </main>
  );
}