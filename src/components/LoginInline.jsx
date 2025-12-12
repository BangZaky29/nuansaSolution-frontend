import { useState } from 'react';

const LoginInline = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await onSuccess(email, password);
      return res;
    } catch (err) {
      setError(err.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-inline">
      <form className="login-inline-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label">Email</label>
          <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="login-field">
          <label className="login-label">Password</label>
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login to Continue'}</button>
      </form>
    </div>
  );
};

export default LoginInline;
