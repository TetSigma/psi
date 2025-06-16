import React, { useState } from 'react';
export const AuthForm = ({ type, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
        }
        catch (err) {
            setError('Authentication failed');
        }
    };
    return (<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded space-y-4">
      <h2 className="text-xl font-semibold">{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500">{error}</p>}

      {type === 'register' && (<input name="name" placeholder="Name" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange}/>)}
      <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange}/>
      <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" value={formData.password} onChange={handleChange}/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>);
};
