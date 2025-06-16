import { useParams } from 'react-router-dom';
import { PostList } from '../components/PostList';
import { PostForm } from '../components/PostForm';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GroupChat } from '../components/GroupChat';
export const Posts = () => {
    const { groupId } = useParams();
    const { token, user } = useContext(AuthContext);
    const numericGroupId = groupId ? parseInt(groupId, 10) : undefined;
    const handleCreate = async (data) => {
        await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    };
    return (<div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Posts {groupId ? `in Group ${groupId}` : ''}</h1>
      {numericGroupId && <PostForm groupId={numericGroupId} onSubmit={handleCreate}/>}
      <PostList groupId={numericGroupId}/>
      {numericGroupId && user && (<GroupChat groupId={numericGroupId} user={{ id: user.id, name: user.name }}/>)}
    </div>);
};
