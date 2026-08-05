import React from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function Login() {
  return (
    <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Button fullWidth style={{ marginTop: '1rem' }}>Login</Button>
      </Card>
    </div>
  );
}
