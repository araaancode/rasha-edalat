// frontend/src/pages/auth/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AppDispatch } from '../../store';
import { register as registerUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import { 
  IoPersonOutline,
  IoMailOutline, 
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCallOutline,
  IoWarningOutline
} from 'react-icons/io5';

const registerSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی حداقل ۳ کاراکتر است'),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().regex(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر است'),
  confirmPassword: z.string(),
  role: z.enum(['USER', 'LAWYER']),
  acceptTerms: z.boolean().refine(val => val === true, 'باید قوانین را بپذیرید'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن مطابقت ندارند',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'USER',
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('ثبت‌نام با موفقیت انجام شد');
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.message || 'خطا در ثبت‌نام');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#EAE7E2] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0A1A2B]">
            ثبت‌نام در <span className="text-[#1A4B6D]">راشا عدالت</span>
          </h2>
          <p className="mt-2 text-sm text-[#4A5A6E]">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link to="/login" className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300 hover:underline">
              وارد شوید
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-5 border border-gray-100/50">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoPersonOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                نام و نام خانوادگی
              </label>
              <div className="relative">
                <input
                  {...register('fullName')}
                  type="text"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="نام و نام خانوادگی"
                />
                <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoMailOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                ایمیل
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoCallOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                شماره موبایل
              </label>
              <div className="relative">
                <input
                  {...register('phone')}
                  type="text"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="09123456789"
                />
                <IoCallOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.phone.message}
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
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                <IoLockClosedOutline className="inline ml-2 text-[#1A4B6D] text-base" />
                تکرار رمز عبور
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4B6D] transition-all duration-300"
                >
                  {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <IoWarningOutline className="text-xs" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                نقش
              </label>
              <select
                {...register('role')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 bg-white text-[#0A1A2B]"
              >
                <option value="USER">کاربر عادی</option>
                <option value="LAWYER">وکیل</option>
              </select>
            </div>

            {/* Accept Terms */}
            <div className="flex items-center gap-2 pt-2">
              <input
                {...register('acceptTerms')}
                type="checkbox"
                className="w-4 h-4 text-[#1A4B6D] border-2 border-gray-300 rounded focus:ring-[#1A4B6D] focus:ring-2 transition-all duration-300"
              />
              <label className="text-sm text-[#4A5A6E]">
                <Link to="/terms" className="text-[#1A4B6D] hover:text-[#2A6A8D] transition-colors font-medium">
                  قوانین و مقررات
                </Link>
                {' '}را می‌پذیرم
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <IoWarningOutline className="text-xs" />
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ثبت‌نام...
                </>
              ) : (
                'ثبت‌نام'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          <div className="text-center text-sm text-[#4A5A6E] md:hidden">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link to="/login" className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300">
              وارد شوید
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};