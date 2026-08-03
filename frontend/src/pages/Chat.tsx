// frontend/src/pages/Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getMessages, sendMessage, addMessage, setCurrentConversation, createConversation, resetChat } from '../store/slices/chatSlice';
import toast from 'react-hot-toast';
import { 
  MdArrowForward, 
  MdArrowBack, 
  MdHome, 
  MdAccessTime, 
  MdCheckCircle,
  MdSend
} from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import { TbUser } from 'react-icons/tb';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { LuPaperclip } from 'react-icons/lu';

export const Chat: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isLoading } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // اگر conversationId وجود نداشته باشد، یک مکالمه جدید ایجاد کن
  useEffect(() => {
    if (!conversationId || conversationId === 'new') {
      dispatch(createConversation({ type: 'AI' }))
        .unwrap()
        .then((result) => {
          navigate(`/chat/${result.id}`, { replace: true });
        })
        .catch((error) => {
          toast.error('خطا در ایجاد مکالمه');
          console.error(error);
        });
      return;
    }

    dispatch(setCurrentConversation(conversationId));
    dispatch(getMessages({ conversationId }));

    return () => {
      dispatch(resetChat());
    };
  }, [conversationId, dispatch, navigate]);

  // اسکرول به پایین
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // فوکوس روی input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !conversationId || isSending) return;

    const content = input.trim();
    setInput('');
    setIsSending(true);

    // اضافه کردن پیام کاربر به صورت محلی
    const userMessage = {
      id: Date.now().toString(),
      sender: 'USER' as const,
      content: content,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessage(userMessage));

    try {
      const result = await dispatch(sendMessage({ 
        conversationId, 
        content 
      })).unwrap();

      if (result.message) {
        // پیام AI قبلاً در slice اضافه شده است
      }
    } catch (error: any) {
      toast.error(error?.message || 'ارسال پیام ناموفق بود');
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-gradient-to-br from-[#F8F9FA] to-[#EAE7E2] rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <MdArrowBack className="text-lg" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-[#4A8AB5] to-[#2A6A8D] rounded-xl flex items-center justify-center shadow-lg">
            <RiRobot2Line className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-white font-bold">مشاوره حقوقی</h3>
            <p className="text-white/50 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span>
              چت با هوش مصنوعی
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white/40 hover:text-white transition-all duration-300 hover:rotate-90"
        >
          <MdHome className="text-lg" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#1A4B6D]/20 border-t-[#1A4B6D] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RiRobot2Line className="text-[#1A4B6D] text-2xl animate-pulse" />
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1A4B6D]/10 to-[#2A6A8D]/10 rounded-full flex items-center justify-center mb-4">
              <RiRobot2Line className="text-5xl text-[#1A4B6D] animate-float" />
            </div>
            <h3 className="text-xl font-bold text-[#0A1A2B]">سوال حقوقی خود را بپرسید</h3>
            <p className="text-[#4A5A6E] text-sm mt-1 max-w-sm">
              هوش مصنوعی راشا عدالت آماده پاسخگویی به سوالات حقوقی شماست
            </p>
            <div className="flex gap-2 mt-4">
              {['طلاق', 'قرارداد', 'کار', 'ملک'].map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-[#4A5A6E] hover:border-[#1A4B6D] hover:text-[#1A4B6D] transition-all duration-300 cursor-pointer"
                  onClick={() => setInput(`سوال درباره ${tag}`)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Date Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 px-3 py-1 bg-white rounded-full shadow-sm">
                امروز
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${
                  msg.sender === 'USER' ? 'flex-row-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    msg.sender === 'USER'
                      ? 'bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D]'
                      : 'bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D]'
                  }`}>
                    {msg.sender === 'USER' ? (
                      <TbUser className="text-white text-xs" />
                    ) : (
                      <RiRobot2Line className="text-white text-xs" />
                    )}
                  </div>
                  
                  {/* Message */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-md ${
                      msg.sender === 'USER'
                        ? 'bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white rounded-tr-none'
                        : 'bg-white text-[#0A1A2B] rounded-tl-none border border-gray-100/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                    <div className={`flex items-center gap-1 mt-1.5 ${
                      msg.sender === 'USER' ? 'text-white/50' : 'text-gray-400'
                    }`}>
                      <MdAccessTime className="text-[10px]" />
                      <span className="text-[10px]">{formatTime(msg.createdAt)}</span>
                      {msg.sender === 'USER' && (
                        <MdCheckCircle className="text-[10px] text-white/30" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* Typing Indicator */}
        {isSending && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] rounded-full flex items-center justify-center shadow-md">
                <RiRobot2Line className="text-white text-xs" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-100/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#1A4B6D] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-[#1A4B6D] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-[#1A4B6D] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                  <span className="text-sm text-[#4A5A6E]">در حال تایپ...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="سوال حقوقی خود را بنویسید..."
              className="w-full px-5 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 text-[#0A1A2B] placeholder-gray-400"
              disabled={isLoading || isSending}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IoChatbubbleEllipsesOutline className="text-lg" />
            </div>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isSending}
            className="group relative px-6 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ارسال
                </>
              ) : (
                <>
                  <MdSend className="text-sm group-hover:translate-x-[-4px] transition-transform duration-300" />
                  ارسال
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          پاسخ‌ها توسط هوش مصنوعی تولید می‌شوند و جایگزین مشاوره حضوری نیستند
        </p>
      </form>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A4B6D;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0A1A2B;
        }
      `}</style>
    </div>
  );
};