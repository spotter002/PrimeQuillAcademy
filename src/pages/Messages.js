import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { messageAPI } from '../services/api';
import useSocket from '../hooks/useSocket';
import { Search, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

const Messages = () => {
  const { user } = useAuth();
  const socket = useSocket(user);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (user?.role === 'client') {
      // Client can only message the freelancer
      const freelancerChat = {
        id: 'freelancer',
        name: 'Elijah Potter',
        avatar: 'EP',
        lastMessage: 'Hi! How can I help you with your project?',
        timestamp: 'Online',
        unread: 0,
        jobTitle: 'Full Stack Developer'
      };
      setChats([freelancerChat]);
      setSelectedChat(freelancerChat);
    } else if (user?.role === 'freelancer') {
      // Freelancer sees all client conversations
      const mockChats = [
        {
          id: 1,
          name: 'John Kamau',
          avatar: 'JK',
          lastMessage: 'Thanks for the great work on the e-commerce project!',
          timestamp: '2 min ago',
          unread: 2,
          jobTitle: 'E-Commerce Platform'
        },
        {
          id: 2,
          name: 'Sarah Wanjiku',
          avatar: 'SW',
          lastMessage: 'When can we start the mobile app project?',
          timestamp: '1 hour ago',
          unread: 0,
          jobTitle: 'Mobile Banking App'
        }
      ];
      setChats(mockChats);
    }
  }, [user]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Mock messages for selected chat
    const mockMessages = [
      {
        id: 1,
        senderId: chat.id,
        text: 'Hi! I saw your portfolio and I\'m interested in working with you.',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: 2,
        senderId: user.id,
        text: 'Hello! Thank you for reaching out. I\'d be happy to discuss your project.',
        timestamp: '10:32 AM',
        isOwn: true
      },
      {
        id: 3,
        senderId: chat.id,
        text: chat.lastMessage,
        timestamp: '10:35 AM',
        isOwn: false
      }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !user) return;
    
    const message = {
      id: Date.now(),
      senderId: user.id || user._id,
      senderName: user.name,
      senderRole: user.role,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    // Send to socket
    socket.emit('send-message', message);
    
    // Add to local messages
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on('receive-message', (message) => {
      setMessages(prev => [...prev, {
        ...message,
        isOwn: message.senderId === (user?.id || user?._id)
      }]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [socket, user?.id]);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex">
        {/* Chat List */}
        <div className={`${user?.role === 'client' ? 'hidden' : 'w-1/3'} border-r border-gray-200 flex flex-col`}>
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-charcoal mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-teal"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-accent-teal bg-opacity-10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{chat.jobTitle}</p>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-accent-teal rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-semibold">{chat.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className={`${user?.role === 'client' ? 'w-full' : 'flex-1'} flex flex-col`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500">{selectedChat.jobTitle}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-accent-teal text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-teal-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-teal"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                      <Smile className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-accent-teal text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;