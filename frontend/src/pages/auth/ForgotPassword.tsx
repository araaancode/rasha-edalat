// frontend/src/pages/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoMailOutline, IoArrowBackOutline } from 'react-icons/io5';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('لطفاً ایمیل خود را وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setIsSent(true);
      toast.success('لینک بازیابی به ایمیل شما ارسال شد');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'خطا در ارسال لینک بازیابی';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
          <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <IoMailOutline className="text-green-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">✅ ایمیل ارسال شد</h2>
          <p className="text-white/60 text-sm mb-6">
            لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8AB5] text-white rounded-xl hover:bg-[#2A6A8D] transition-all duration-300"
          >
            <IoArrowBackOutline />
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">بازیابی رمز عبور</h2>
          <p className="mt-2 text-sm text-white/60">
            ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              ایمیل
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A8AB5]/50 focus:border-[#4A8AB5] transition-all duration-300"
                placeholder="example@email.com"
              />
              <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                در حال ارسال...
              </>
            ) : (
              'ارسال لینک بازیابی'
            )}
          </button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <IoArrowBackOutline />
              بازگشت به صفحه ورود
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};