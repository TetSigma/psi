import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
export const PostList = ({ groupId }) => {
    const { token } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/posts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const filtered = groupId ? res.data.filter(p => p.groupId === groupId) : res.data;
                setPosts(filtered);
            }
            catch {
                setError('Failed to fetch posts');
            }
        };
        fetchPosts();
    }, [token, groupId]);
    if (error)
        return <p className="text-red-500">{error}</p>;
    return (<div className="space-y-4 mt-4">
      <h3 className="text-lg font-bold">Posts</h3>
      {posts.length === 0 ? (<p>No posts available.</p>) : (posts.map(post => (<div key={post.id} className="border p-3 rounded">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.content}</p>
          </div>)))}
    </div>);
};
