// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AppDispatch, RootState } from '../../store';
import { register as registerUser } from '../../store/slices/authSlice';

const schema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی حداقل ۳ کاراکتر است'),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().regex(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر است'),
  confirmPassword: z.string().min(6, 'تکرار رمز عبور الزامی است'),
  role: z.enum(['USER', 'LAWYER']).default('USER'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'برای ثبت‌نام باید قوانین را بپذیرید',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن مطابقت ندارند',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'USER',
      acceptTerms: false,
    },
  });

  const userRole = watch('role');

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmPassword, acceptTerms, ...userData } = data;
      await dispatch(registerUser(userData)).unwrap();
      toast.success('ثبت‌نام موفقیت‌آمیز بود. لطفاً ایمیل خود را تایید کنید.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.message || 'ثبت‌نام ناموفق بود');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#EAE7E2] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0A1A2B]">
            ثبت‌نام در <span className="text-[#1A4B6D]">راشا عدالت</span>
          </h2>
          <p className="mt-2 text-sm text-[#4A5A6E]">
            قبلاً حساب کاربری دارید؟{' '}
            <Link to="/login" className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-all duration-300 hover:underline">
              وارد شوید
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100/50">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Right Column */}
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-user ml-2 text-[#1A4B6D]"></i>
                    نام و نام خانوادگی
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="علی محمدی"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-envelope ml-2 text-[#1A4B6D]"></i>
                    ایمیل
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-phone ml-2 text-[#1A4B6D]"></i>
                    شماره موبایل
                  </label>
                  <input
                    {...register('phone')}
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="09123456789"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Left Column */}
              <div className="space-y-5">
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-lock ml-2 text-[#1A4B6D]"></i>
                    رمز عبور
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                        errors.password ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4B6D] transition-all duration-300"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-check-circle ml-2 text-[#1A4B6D]"></i>
                    تکرار رمز عبور
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4B6D] transition-all duration-300"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <i className="fas fa-user-tag ml-2 text-[#1A4B6D]"></i>
                    نوع کاربری
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      userRole === 'USER' 
                        ? 'border-[#1A4B6D] bg-[#1A4B6D]/5 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        {...register('role')}
                        type="radio"
                        value="USER"
                        className="hidden"
                      />
                      <i className={`fas fa-user ${userRole === 'USER' ? 'text-[#1A4B6D]' : 'text-gray-400'}`}></i>
                      <span className={`text-sm font-medium ${userRole === 'USER' ? 'text-[#1A4B6D]' : 'text-gray-600'}`}>
                        کاربر عادی
                      </span>
                    </label>
                    <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      userRole === 'LAWYER' 
                        ? 'border-[#1A4B6D] bg-[#1A4B6D]/5 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        {...register('role')}
                        type="radio"
                        value="LAWYER"
                        className="hidden"
                      />
                      <i className={`fas fa-gavel ${userRole === 'LAWYER' ? 'text-[#1A4B6D]' : 'text-gray-400'}`}></i>
                      <span className={`text-sm font-medium ${userRole === 'LAWYER' ? 'text-[#1A4B6D]' : 'text-gray-600'}`}>
                        وکیل
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Section - Terms */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  id="acceptTerms"
                  className="mt-1 w-4 h-4 text-[#1A4B6D] border-2 border-gray-300 rounded focus:ring-[#1A4B6D] focus:ring-2 transition-all duration-300"
                />
                <label htmlFor="acceptTerms" className="text-sm text-[#4A5A6E] leading-relaxed">
                  <span className="font-medium text-[#0A1A2B]">قوانین و مقررات</span> را مطالعه کرده و می‌پذیرم
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs flex items-center gap-1 mt-1.5">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10">
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin ml-2"></i>
                  در حال ثبت‌نام...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus ml-2"></i>
                  ثبت‌نام
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </form>
      </div>
    </div>
  );
};