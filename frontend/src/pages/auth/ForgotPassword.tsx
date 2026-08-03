import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../../api/auth.api';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setIsSent(true);
      toast.success('لینک بازیابی به ایمیل شما ارسال شد');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'خطا در ارسال لینک بازیابی');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">✅ ایمیل ارسال شد</h2>
          <p className="text-gray-600">
            لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.
          </p>
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            بازیابی رمز عبور
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field mt-1"
              placeholder="example@email.com"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex justify-center"
          >
            {isLoading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
          </button>
          <div className="text-center">
            <Link to="/login" className="text-sm text-primary-600 hover:text-primary-500">
              بازگشت به صفحه ورود
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};