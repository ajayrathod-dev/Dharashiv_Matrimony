import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, Send, Search, ArrowLeft } from 'lucide-react';
import { getConversations, getMessages, sendMessage, updateConversation, getUserById } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Inbox() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [convProfiles, setConvProfiles] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    getConversations()
      .then(async res => {
        const convs = res.data.filter(c => c.participants && c.participants.includes(user.id));
        setConversations(convs);
        const profiles = {};
        for (const conv of convs) {
          const partnerId = conv.participants.find(p => p !== user.id);
          if (partnerId && !profiles[partnerId]) {
            try {
              const pRes = await getUserById(partnerId);
              profiles[partnerId] = pRes.data;
            } catch (e) {
              console.error(e);
            }
          }
        }
        setConvProfiles(profiles);
        if (convs.length > 0 && !activeConv) {
          setActiveConv(convs[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!activeConv) return;
    getMessages({ conversationId: activeConv.id })
      .then(res => setMessages(res.data))
      .catch(console.error);
  }, [activeConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeConv || sending) return;
    setSending(true);
    const partnerId = activeConv.participants.find(p => p !== user.id);
    try {
      const msgData = {
        conversationId: activeConv.id,
        senderId: user.id,
        receiverId: partnerId,
        text: newMsg.trim(),
        isRead: false,
        createdAt: new Date().toISOString()
      };
      const res = await sendMessage(msgData);
      setMessages(prev => [...prev, res.data]);
      await updateConversation(activeConv.id, { lastMessage: newMsg.trim(), lastMessageAt: new Date().toISOString() });
      setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, lastMessage: newMsg.trim(), lastMessageAt: new Date().toISOString() } : c));
      setNewMsg('');
    } catch {
      toast.error('Could not send message');
    } finally {
      setSending(false);
    }
  };

  const getPartner = (conv) => {
    if (!conv) return null;
    const partnerId = conv.participants.find(p => p !== user?.id);
    return convProfiles[partnerId];
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-red-700" /> Messages & Chat
      </h1>

      <div className="card h-[600px] flex overflow-hidden border border-gray-200">
        {/* Conversations list */}
        <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col bg-white ${activeConv ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {conversations.length === 0 ? (
              <div className="text-center py-16 px-4">
                <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">No conversations yet</p>
                <p className="text-xs text-gray-400 mt-1">Connect with matches to start messaging</p>
              </div>
            ) : (
              conversations.map(conv => {
                const partner = getPartner(conv);
                const isSelected = activeConv?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${isSelected ? 'bg-red-50/70 border-l-4 border-red-700' : ''}`}
                  >
                    <img
                      src={partner?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner?.name || 'User')}&background=c0392b&color=fff`}
                      alt={partner?.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="font-semibold text-gray-800 text-sm truncate">{partner?.name || 'Match'}</p>
                        {conv.lastMessageAt && (
                          <span className="text-[11px] text-gray-400 shrink-0 ml-1">
                            {new Date(conv.lastMessageAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage || 'Start conversation...'}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col bg-gray-50 ${!activeConv ? 'hidden md:flex' : 'flex'}`}>
          {!activeConv ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Select a Conversation</h3>
              <p className="text-sm text-gray-500 mt-1">Choose a conversation from the sidebar to chat</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
                <button onClick={() => setActiveConv(null)} className="md:hidden p-1 mr-1 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                {(() => {
                  const partner = getPartner(activeConv);
                  return (
                    <>
                      <img
                        src={partner?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner?.name || 'User')}&background=c0392b&color=fff`}
                        alt={partner?.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{partner?.name || 'Member'}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          {partner?.isOnline ? (
                            <><span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online now</>
                          ) : (
                            <span>{partner?.city ? `${partner.city}, ${partner.occupation || ''}` : 'Member'}</span>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Messages display */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-10">No messages yet. Say hello!</p>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isMe
                            ? 'bg-red-700 text-white rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                        }`}>
                          <p className="leading-relaxed">{msg.text}</p>
                          <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-red-200' : 'text-gray-400'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Send message form */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                <input
                  type="text"
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  disabled={!newMsg.trim() || sending}
                  className="bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-800 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

