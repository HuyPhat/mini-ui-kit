import { useEffect, useState } from 'react';
import { Button, Card, Input } from '.';

const themes = ['light', 'dark', 'brand'];

export default function App() {
  const [theme, setTheme] = useState(0);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themes[theme]);
  }, [theme]);

  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: 360 }}>
      <Card title="Đăng nhập" headingLevel={1}>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Mật khẩu" type="password" error="Mật khẩu quá ngắn" />
          <Button>Đăng nhập</Button>
          <Button variant="secondary" onClick={() => setTheme((theme + 1) % themes.length)}>
            Đổi theme
          </Button>
        </div>
      </Card>
    </main>
  );
}