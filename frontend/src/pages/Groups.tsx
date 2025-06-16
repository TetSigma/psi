import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GroupForm } from '../components/GroupForm';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Group {
  id: number;
  name: string;
  description: string;
}

export const Groups = () => {
  const { token } = useContext(AuthContext);
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    const res = await axios.get('http://localhost:3000/api/groups', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreate = async (data: { name: string; description: string }) => {
    await axios.post('http://localhost:3000/api/groups', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchGroups();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Groups</h1>
      <GroupForm onSubmit={handleCreate} />
      <ul className="space-y-2">
        {groups.map((group) => (
          <li key={group.id}>
            <Link to={`/groups/${group.id}`} className="text-blue-600 hover:underline">
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
