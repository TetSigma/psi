import React, { useState } from 'react';

interface PostFormProps {
  groupId: number;
  onSubmit: (data: { title: string; content: string; groupId: number }) => Promise<void>;
}

export const PostForm: React.FC<PostFormProps> = ({ groupId, onSubmit }) => {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, groupId });
    setForm({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
};
