import React, { useState } from 'react';

interface GroupFormProps {
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
}

export const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Group name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Group
      </button>
    </form>
  );
};
