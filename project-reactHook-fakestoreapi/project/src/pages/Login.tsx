import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { login } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      
      if (username === 'srushti' && password === 'sru$123') {
        dispatch({
          type: 'SET_USER',
          payload: { username, isAdmin: true },
        });
        navigate('/admin');
        return;
      }

      
      await login(username, password);
      dispatch({
        type: 'SET_USER',
        payload: { username, isAdmin: false },
      });
      navigate('/user');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;