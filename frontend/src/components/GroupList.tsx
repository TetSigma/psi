import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  members: User[];
  posts: Post[];
}

export const GroupList = () => {
  const { token } = useContext(AuthContext);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get<Group[]>('http://localhost:3000/api/groups', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroups(res.data);
      } catch {
        setError('Failed to fetch groups');
      }
    };
    fetchGroups();
  }, [token]);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl mb-4">Groups</h2>
      {groups.length === 0 ? <p>No groups found.</p> : (
        <ul>
          {groups.map(g => (
            <li key={g.id} className="mb-3 border-b pb-2">
              <h3 className="font-semibold">{g.name}</h3>
              <p>{g.description}</p>
              <small>Members: {g.members.length}, Posts: {g.posts.length}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
