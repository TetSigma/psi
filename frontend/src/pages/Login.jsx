import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        }
        catch {
            setError('Invalid credentials');
        }
    };
    return (<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-3 p-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-3 p-2 border rounded"/>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
    </form>);
};
