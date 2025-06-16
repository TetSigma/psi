import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
export const GroupChat = ({ groupId, user }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    useEffect(() => {
        socket.emit('join', groupId.toString());
        socket.on('chat-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => {
            socket.off('chat-message');
        };
    }, [groupId]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('chat-message', {
                groupId: groupId.toString(),
                user,
                message: input.trim(),
            });
            setInput('');
        }
    };
    return (<div className="border mt-4 rounded p-4 max-w-lg mx-auto">
      <h3 className="font-bold mb-2">Group Chat</h3>
      <div className="h-64 overflow-y-scroll border p-2 bg-gray-50 rounded space-y-1">
        {messages.map((msg, idx) => (<div key={idx} className="text-sm">
            <strong>{msg.user.name}:</strong> {msg.message}
          </div>))}
        <div ref={messagesEndRef}/>
      </div>
      <div className="flex gap-2 mt-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 p-2 border rounded" placeholder="Type a message"/>
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>);
};
