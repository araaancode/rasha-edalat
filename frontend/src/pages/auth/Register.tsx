// frontend/src/pages/auth/Register.tsx
import React, { forwardRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCallOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
  IoScaleOutline,
} from 'react-icons/io5';
import { FaRegHandshake, FaRegStar } from 'react-icons/fa';
import type { AppDispatch } from '../../store';
import { register as registerUser } from '../../store/slices/authSlice';

// ============================================
// 1. Zod Schema
// ============================================
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'نام و نام خانوادگی حداقل ۳ کاراکتر است')
      .max(50, 'نام و نام خانوادگی حداکثر ۵۰ کاراکتر است')
      .regex(/^[\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی استفاده کنید'),
    email: z.string().min(1, 'ایمیل الزامی است').email('ایمیل نامعتبر است'),
    phone: z.string().regex(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است'),
    password: z
      .string()
      .min(8, 'رمز عبور حداقل ۸ کاراکتر است')
      .regex(/[A-Z]/, 'حداقل یک حرف بزرگ داشته باشد')
      .regex(/[a-z]/, 'حداقل یک حرف کوچک داشته باشد')
      .regex(/[0-9]/, 'حداقل یک عدد داشته باشد'),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'LAWYER']),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, 'باید قوانین را بپذیرید'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن مطابقت ندارند',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ============================================
// 2. FormField
// ============================================
interface FormFieldProps {
  label: string;
  htmlFor?: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  icon,
  error,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-1.5"
  >
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-medium text-gray-700"
    >
      <span className="text-[#1A4B6D]" aria-hidden>
        {icon}
      </span>
      {label}
    </label>

    <div className="relative">{children}</div>

    <AnimatePresence mode="wait" initial={false}>
      {error && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1 text-xs text-red-500"
        >
          <IoWarningOutline className="text-xs shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

// ============================================
// 3. InputField (با forwardRef)
// ============================================
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { error, icon, rightIcon, onRightIconClick, className = '', ...rest },
    ref,
  ) {
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
            rightIcon ? 'pl-11' : 'pl-4',
            error
              ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500'
              : 'border-gray-200 hover:border-gray-300',
            className,
          ].join(' ')}
          {...rest}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4B6D] transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>
    );
  },
);

// ============================================
// 4. RoleSelector
// ============================================
interface RoleSelectorProps {
  value: 'USER' | 'LAWYER';
  onChange: (value: 'USER' | 'LAWYER') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  const roles = [
    {
      value: 'USER' as const,
      label: 'کاربر عادی',
      icon: <IoPersonOutline className="text-lg" />,
    },
    {
      value: 'LAWYER' as const,
      label: 'وکیل',
      icon: <IoScaleOutline className="text-lg" />,
    },
  ];

  return (
    <fieldset className="space-y-1.5">
      <legend className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
        <span className="text-[#1A4B6D]" aria-hidden>
          {value === 'LAWYER' ? <IoScaleOutline /> : <IoPersonOutline />}
        </span>
        نقش خود را انتخاب کنید
      </legend>

      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => {
          const active = value === role.value;
          return (
            <motion.button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={active}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(role.value)}
              className={[
                'relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200',
                active
                  ? 'border-[#1A4B6D] bg-[#1A4B6D]/5 text-[#1A4B6D] shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              <span className={active ? 'text-[#1A4B6D]' : 'text-gray-400'}>
                {role.icon}
              </span>
              <span className="text-sm font-medium">{role.label}</span>
              {active && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#1A4B6D] rounded-full flex items-center justify-center">
                  <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-white" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
};

// ============================================
// 5. RegisterInfo (پنل سمت چپ) — با تصویر ثابت
// ============================================
const RegisterInfo: React.FC = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] rounded-3xl text-white relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A8AB5]/10 rounded-full blur-3xl"
        aria-hidden
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <IoScaleOutline className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">راشا عدالت</h2>
            <p className="text-sm text-white/60">سامانه حقوقی هوشمند</p>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            به جمع حقوق‌دانان
            <br />
            <span className="text-[#4A8AB5]">بپیوندید</span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            با ثبت‌نام در راشا عدالت، از خدمات حقوقی حرفه‌ای و مشاوره تخصصی
            بهره‌مند شوید
          </p>
        </div>
      </div>

      {/* 🖼️ تصویر ثابت — بدون قاب و بدون انیمیشن */}
      <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
        <img
          src="/images/auth/1.jpg"
          alt=""
          role="presentation"
          loading="eager"
          decoding="async"
          draggable={false}
          className="w-full max-w-md h-auto max-h-[280px] object-contain select-none pointer-events-none"
        />
      </div>

  
    </motion.aside>
  );
};

// ============================================
// 6. کامپوننت اصلی Register
// ============================================
export const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
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

  const role = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('ثبت‌نام با موفقیت انجام شد', {
        icon: '✅',
        duration: 4000,
        style: {
          direction: 'rtl',
          padding: '16px',
          borderRadius: '12px',
          background: '#0A1A2B',
          color: '#fff',
        },
      });
      navigate('/login');
    } catch (error) {
      toast.error((error as Error)?.message ?? 'خطا در ثبت‌نام', {
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
        className="w-full max-w-6xl relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <RegisterInfo />

          <motion.main
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50"
          >
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] rounded-2xl shadow-lg mb-3">
                <IoScaleOutline className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#0A1A2B]">
                ثبت‌نام در <span className="text-[#1A4B6D]">راشا عدالت</span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link
                  to="/login"
                  className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] hover:underline underline-offset-2"
                >
                  وارد شوید
                </Link>
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Full Name */}
              <FormField
                label="نام و نام خانوادگی"
                htmlFor="fullName"
                icon={<IoPersonOutline className="text-base" />}
                error={errors.fullName?.message}
              >
                <InputField
                  id="fullName"
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  autoComplete="name"
                  icon={<IoPersonOutline className="text-base" />}
                  error={!!errors.fullName}
                  {...register('fullName')}
                />
              </FormField>

              {/* Email — تمام عرض در ستون جداگانه */}
              <FormField
                label="ایمیل"
                htmlFor="email"
                icon={<IoMailOutline className="text-base" />}
                error={errors.email?.message}
              >
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
              </FormField>

              {/* Phone — تمام عرض در ستون جداگانه */}
              <FormField
                label="شماره موبایل"
                htmlFor="phone"
                icon={<IoCallOutline className="text-base" />}
                error={errors.phone?.message}
              >
                <InputField
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  autoComplete="tel"
                  inputMode="tel"
                  icon={<IoCallOutline className="text-base" />}
                  error={!!errors.phone}
                  className="font-mono"
                  {...register('phone')}
                />
              </FormField>

              {/* Password & Confirm — کنار هم */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="رمز عبور"
                  htmlFor="password"
                  icon={<IoLockClosedOutline className="text-base" />}
                  error={errors.password?.message}
                >
                  <InputField
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<IoLockClosedOutline className="text-base" />}
                    rightIcon={
                      showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />
                    }
                    onRightIconClick={() => setShowPassword((v) => !v)}
                    error={!!errors.password}
                    {...register('password')}
                  />
                </FormField>

                <FormField
                  label="تکرار رمز عبور"
                  htmlFor="confirmPassword"
                  icon={<IoLockClosedOutline className="text-base" />}
                  error={errors.confirmPassword?.message}
                >
                  <InputField
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<IoLockClosedOutline className="text-base" />}
                    rightIcon={
                      showConfirmPassword ? (
                        <IoEyeOffOutline />
                      ) : (
                        <IoEyeOutline />
                      )
                    }
                    onRightIconClick={() =>
                      setShowConfirmPassword((v) => !v)
                    }
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />
                </FormField>
              </div>

              {/* Role */}
              <RoleSelector
                value={role}
                onChange={(v) =>
                  setValue('role', v, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
              <input type="hidden" {...register('role')} />

              {/* Terms */}
              <div className="pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 text-[#1A4B6D] focus:ring-4 focus:ring-[#1A4B6D]/20 transition-all"
                    {...register('acceptTerms')}
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    <Link
                      to="/terms"
                      className="text-[#1A4B6D] hover:text-[#2A6A8D] font-medium hover:underline underline-offset-2"
                    >
                      قوانین و مقررات
                    </Link>{' '}
                    را می‌پذیرم
                  </label>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {errors.acceptTerms && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 text-xs text-red-500 mt-1.5"
                    >
                      <IoWarningOutline className="text-xs shrink-0" />
                      {errors.acceptTerms.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={[
                  'w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white',
                  'transition-all duration-300 relative overflow-hidden',
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] hover:shadow-2xl hover:shadow-[#1A4B6D]/20',
                ].join(' ')}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      در حال ثبت‌نام...
                    </>
                  ) : (
                    'ثبت‌نام'
                  )}
                </span>
              </motion.button>

              {/* Login link - Mobile */}
              <p className="lg:hidden text-center text-sm text-gray-500">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link
                  to="/login"
                  className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D]"
                >
                  وارد شوید
                </Link>
              </p>
            </form>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
};