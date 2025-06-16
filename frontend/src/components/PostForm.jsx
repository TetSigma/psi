import React, { useState } from 'react';
export const PostForm = ({ groupId, onSubmit }) => {
    const [form, setForm] = useState({ title: '', content: '' });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit({ ...form, groupId });
        setForm({ title: '', content: '' });
    };
    return (<form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>);
};
