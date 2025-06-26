// src/pages/Register.jsx
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import '../styles/AuthForm.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, isLoading } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, password);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Create Admin User</h3>
            <p>Note: You can only create one admin user.</p>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading} className="btn btn-primary">{isLoading ? 'Registering...' : 'Register'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Register;