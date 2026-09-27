// frontend/src/pages/auth/ForgotPassword.tsx
import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoArrowBackOutline,
  IoMailOutline,
  IoScaleOutline,
  IoWarningOutline,
} from 'react-icons/io5';

// ============================================
// 1. Zod Schema
// ============================================
const forgotSchema = z.object({
  email: z.string().min(1, 'ایمیل الزامی است').email('ایمیل نامعتبر است'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

// ============================================
// 2. InputField (با forwardRef)
// ============================================
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ error, icon, className = '', ...rest }, ref) {
    return (
      <div className="relative">
        {icon && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          aria-invalid={!!error}
          className={[
            'w-full py-3.5 rounded-xl bg-white/90 backdrop-blur-sm border-2 transition-all duration-200',
            'focus:outline-none focus:ring-4 focus:ring-[#1A4B6D]/10 focus:border-[#1A4B6D]',
            'placeholder:text-gray-400 placeholder:text-sm',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            icon ? 'pr-11' : 'pr-4',
            'pl-4',
            error
              ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500'
              : 'border-gray-200 hover:border-gray-300',
            className,
          ].join(' ')}
          {...rest}
        />
      </div>
    );
  },
);

// ============================================
// 3. کامپوننت اصلی ForgotPassword
// ============================================
export const ForgotPassword: React.FC = () => {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormData) => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        data,
      );
      toast.success('لینک بازیابی به ایمیل شما ارسال شد', {
        duration: 4000,
        style: {
          direction: 'rtl',
          padding: '16px',
          borderRadius: '12px',
          background: '#0A1A2B',
          color: '#fff',
        },
      });
      setSentTo(data.email);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) &&
        (error.response?.data as { message?: string })?.message
          ? (error.response!.data as { message: string }).message
          : 'خطا در ارسال لینک بازیابی';
      toast.error(errorMessage, {
        duration: 4000,
        style: {
          direction: 'rtl',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#EAE7E2] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1A4B6D]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] rounded-2xl shadow-lg mb-4">
            <IoScaleOutline className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1A2B]">
            {sentTo ? 'ایمیل ارسال شد' : 'بازیابی رمز عبور'}
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {sentTo
              ? `لینک بازیابی به ${sentTo} ارسال شد. لطفاً ایمیل خود را بررسی کنید.`
              : 'ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود'}
          </p>
        </div>

        {sentTo ? (
          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] hover:shadow-2xl hover:scale-[1.01] transition-all"
            >
              <IoArrowBackOutline />
              بازگشت به صفحه ورود
            </Link>
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="w-full text-sm text-gray-500 hover:text-[#1A4B6D] transition-colors py-2"
            >
              ایمیل دیگری را امتحان کنم
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <span className="text-[#1A4B6D]" aria-hidden>
                  <IoMailOutline className="text-base" />
                </span>
                ایمیل
              </label>

              <InputField
                id="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                inputMode="email"
                icon={<IoMailOutline className="text-base" />}
                error={!!errors.email}
                {...register('email')}
              />

              <AnimatePresence mode="wait" initial={false}>
                {errors.email && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 text-xs text-red-500"
                  >
                    <IoWarningOutline className="text-xs shrink-0" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={[
                'w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white',
                'transition-all duration-300',
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] hover:shadow-2xl hover:shadow-[#1A4B6D]/20',
              ].join(' ')}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  'ارسال لینک بازیابی'
                )}
              </span>
            </motion.button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A4B6D] transition-colors"
              >
                <IoArrowBackOutline />
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};