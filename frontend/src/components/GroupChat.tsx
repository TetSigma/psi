import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');

interface ChatProps {
  groupId: number;
  user: { id: number; name: string };
}

interface ChatMessage {
  user: { id: number; name: string };
  message: string;
  timestamp: string;
}

export const GroupChat: React.FC<ChatProps> = ({ groupId, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.emit('join', groupId.toString());

    socket.on('chat-message', (msg: ChatMessage) => {
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

  return (
    <div className="border mt-4 rounded p-4 max-w-lg mx-auto">
      <h3 className="font-bold mb-2">Group Chat</h3>
      <div className="h-64 overflow-y-scroll border p-2 bg-gray-50 rounded space-y-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm">
            <strong>{msg.user.name}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};
