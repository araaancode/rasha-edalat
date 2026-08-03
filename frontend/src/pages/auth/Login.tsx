// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../../store/slices/authSlice';
import type { AppDispatch, RootState } from '../../store';
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoWarningOutline,
  IoLogInOutline,
  IoReloadOutline
} from 'react-icons/io5';
import { MdOutlineLogin } from 'react-icons/md';

const schema = z.object({
  identifier: z.string().min(1, 'ایمیل یا شماره موبایل را وارد کنید'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});

type FormData = z.infer<typeof schema>;

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('ورود موفقیت‌آمیز بود');
      navigate('/dashboard');
    } catch (error) {
      toast.error('ورود ناموفق. لطفاً اطلاعات خود را بررسی کنید.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#EAE7E2] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>
      
      {/* Decorative Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-[#1A4B6D]/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-[#4A8AB5]/10 rounded-full blur-2xl animate-float-delay"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
         
          <h2 className="text-3xl font-bold text-[#0A1A2B]">
            ورود به <span className="text-[#1A4B6D]">راشا عدالت</span>
          </h2>
          <p className="mt-2 text-sm text-[#4A5A6E]">
            حساب کاربری ندارید؟{' '}
            <Link to="/register" className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300 hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-5 border border-gray-100/50">
            {/* Identifier (Email or Phone) */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoPersonOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                ایمیل یا شماره موبایل
              </label>
              <div className="relative">
                <input
                  {...register('identifier')}
                  type="text"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.identifier ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="example@email.com یا 09123456789"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoMailOutline className="text-lg" />
                </div>
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoLockClosedOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                رمز عبور
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4B6D] transition-all duration-300"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-lg" />
                  ) : (
                    <IoEyeOutline className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1A4B6D] border-2 border-gray-300 rounded focus:ring-[#1A4B6D] focus:ring-2 transition-all duration-300"
                />
                <span className="text-sm text-[#4A5A6E] group-hover:text-[#0A1A2B] transition-all duration-300">
                  مرا به خاطر بسپار
                </span>
              </label>
              
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300 hover:underline"
              >
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <IoReloadOutline className="animate-spin text-lg" />
                  در حال ورود...
                </>
              ) : (
                <>
                  <MdOutlineLogin className="text-lg" />
                  ورود
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {/* Register Link (Mobile) */}
          <div className="text-center text-sm text-[#4A5A6E] md:hidden">
            حساب کاربری ندارید؟{' '}
            <Link to="/register" className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300">
              ثبت‌نام کنید
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 5s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
};