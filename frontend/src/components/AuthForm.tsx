import React, { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (formData: { name?: string; email: string; password: string }) => Promise<void>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded space-y-4">
      <h2 className="text-xl font-semibold">{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500">{error}</p>}

      {type === 'register' && (
        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};
