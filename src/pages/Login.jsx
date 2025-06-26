// src/pages/Login.jsx
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import '../styles/AuthForm.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            <h3>Admin Login</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoComplete="off"
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="new-password" 
            />
            <button disabled={isLoading} className="btn btn-primary">{isLoading ? 'Logging in...' : 'Log in'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Login;