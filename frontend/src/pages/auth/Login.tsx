// frontend/src/pages/auth/Login.tsx
import React, {
  forwardRef,
  useId,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoWarningOutline,
  IoReloadOutline,
  IoScaleOutline,
  IoArrowBackOutline,
} from 'react-icons/io5';
import { MdOutlineLogin } from 'react-icons/md';
import { FaRegHandshake, FaRegStar, FaShieldAlt } from 'react-icons/fa';
import { login } from '../../store/slices/authSlice';
import type { AppDispatch, RootState } from '../../store';

// ============================================
// Design Tokens
// ============================================
const BRAND = {
  primary: '#1A4B6D',
  primaryHover: '#2A6A8D',
  primaryDeep: '#0A1A2B',
  accent: '#4A8AB5',
  surface: '#F5F3F0',
  surfaceAlt: '#EAE7E2',
} as const;

// ============================================
// 1. Zod Schema
// ============================================
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^09[0-9]{9}$/;

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'ایمیل یا شماره موبایل را وارد کنید')
    .refine((val) => EMAIL_RE.test(val) || PHONE_RE.test(val), {
      message: 'ایمیل یا شماره موبایل معتبر وارد کنید',
    }),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type IdentifierKind = 'email' | 'phone' | null;

// ============================================
// 2. FormField
// ============================================
interface FormFieldProps {
  label: string;
  htmlFor: string;
  icon: React.ReactNode;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  icon,
  error,
  hint,
  children,
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-medium text-gray-700"
    >
      <span className="text-brand-primary" aria-hidden>
        {icon}
      </span>
      {label}
    </label>

    <div className="relative">{children}</div>

    <div className="min-h-[18px]">
      <AnimatePresence mode="wait" initial={false}>
        {error ? (
          <motion.p
            key="error"
            id={`${htmlFor}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1 text-xs text-red-500"
          >
            <IoWarningOutline className="text-xs shrink-0" aria-hidden />
            {error}
          </motion.p>
        ) : hint ? (
          <motion.p
            key="hint"
            id={`${htmlFor}-hint`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-gray-400"
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  </div>
);

// ============================================
// 3. InputField
// ============================================
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  rightIconLabel?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      hasError,
      icon,
      rightIcon,
      onRightIconClick,
      rightIconLabel,
      className = '',
      ...rest
    },
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
          aria-invalid={hasError || undefined}
          className={[
            'w-full py-3.5 rounded-xl bg-white border-2 transition-all duration-200',
            'text-gray-900 placeholder:text-gray-400 placeholder:text-sm',
            'focus:outline-none focus:ring-4',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            icon ? 'pr-11' : 'pr-4',
            rightIcon ? 'pl-11' : 'pl-4',
            hasError
              ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500'
              : 'border-gray-200 hover:border-gray-300 focus:ring-brand-primary/10 focus:border-brand-primary',
            className,
          ].join(' ')}
          {...rest}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconLabel}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-brand-primary transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            {rightIcon}
          </button>
        )}
      </div>
    );
  },
);
InputField.displayName = 'InputField';

// ============================================
// 4. LoginInfo (پنل سمت چپ) — با تصویر ثابت
// ============================================
const LoginInfo: React.FC = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] rounded-3xl text-white relative overflow-hidden min-h-[600px]"
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A8AB5]/10 rounded-full blur-3xl"
        aria-hidden
      />

      {/* Header: Logo + متن خوش‌آمد */}
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
            به حساب خود
            <br />
            <span className="text-[#4A8AB5]">وارد شوید</span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            با ورود به حساب کاربری خود، از تمام خدمات حقوقی راشا عدالت بهره‌مند
            شوید
          </p>
        </div>
      </div>

      {/* 🖼️ تصویر ثابت — بدون قاب و بدون انیمیشن */}
      <div className="relative z-10 my-8 flex-1 flex items-center justify-center">
        <img
          src="/images/auth/3.jpg"
          alt=""
          role="presentation"
          loading="eager"
          decoding="async"
          draggable={false}
          className="w-full max-w-md h-auto max-h-[320px] object-contain select-none pointer-events-none"
        />
      </div>

    
    </motion.aside>
  );
};

// ============================================
// 5. Demo Fill — فقط در DEV
// ============================================
const DemoFillButton: React.FC<{ onFill: () => void }> = ({ onFill }) => {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="pt-3 border-t border-gray-100">
      <button
        type="button"
        onClick={onFill}
        className="w-full text-xs text-gray-400 hover:text-brand-primary transition-colors py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30"
      >
        پر کردن اطلاعات دمو (محیط توسعه)
      </button>
    </div>
  );
};

// ============================================
// 6. کامپوننت اصلی Login
// ============================================
export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const identifierId = useId();
  const passwordId = useId();
  const rememberId = useId();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { identifier: '', password: '', rememberMe: false },
  });

  const identifier = watch('identifier') ?? '';

  const identifierKind: IdentifierKind = useMemo(() => {
    if (EMAIL_RE.test(identifier)) return 'email';
    if (PHONE_RE.test(identifier)) return 'phone';
    return null;
  }, [identifier]);

  const identifierHint = useMemo(() => {
    if (!identifierKind) return undefined;
    return identifierKind === 'email'
      ? 'ورود با ایمیل'
      : 'ورود با شماره موبایل';
  }, [identifierKind]);

  const busy = isLoading || isSubmitting;

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await dispatch(login(data)).unwrap();
        toast.success('ورود موفقیت‌آمیز بود', {
          icon: '✅',
          duration: 4000,
          style: {
            direction: 'rtl',
            padding: '16px',
            borderRadius: '12px',
            background: BRAND.primaryDeep,
            color: '#fff',
          },
        });
        navigate('/dashboard');
      } catch (error) {
        const errorMessage =
          error instanceof Error && error.message
            ? error.message
            : 'ورود ناموفق. لطفاً اطلاعات خود را بررسی کنید.';
        toast.error(errorMessage, {
          duration: 4000,
          style: {
            direction: 'rtl',
            padding: '16px',
            borderRadius: '12px',
          },
        });
      }
    },
    [dispatch, navigate],
  );

  const fillDemoCredentials = useCallback(() => {
    setValue('identifier', 'demo@rashaaladalat.com', {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('password', 'Demo1234', {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue]);

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
          <LoginInfo />

          <motion.main
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50"
          >
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                aria-label="بازگشت به صفحه اصلی"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoArrowBackOutline className="text-xl text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] rounded-lg flex items-center justify-center">
                  <IoScaleOutline className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-[#0A1A2B]">راشا عدالت</span>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-[#1A4B6D] rounded-full" />
                <h2 className="text-2xl font-bold text-[#0A1A2B]">ورود</h2>
              </div>
              <p className="text-sm text-gray-500">
                برای دسترسی به حساب کاربری خود وارد شوید
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Identifier */}
              <FormField
                label="ایمیل یا شماره موبایل"
                htmlFor={identifierId}
                icon={<IoPersonOutline className="text-base" />}
                error={errors.identifier?.message}
                hint={identifierHint}
              >
                <InputField
                  id={identifierId}
                  type="text"
                  placeholder="example@email.com یا 09123456789"
                  autoComplete="username"
                  inputMode="email"
                  autoFocus
                  icon={
                    identifierKind === 'email' ? (
                      <IoMailOutline className="text-base" />
                    ) : (
                      <IoPersonOutline className="text-base" />
                    )
                  }
                  hasError={!!errors.identifier}
                  aria-describedby={
                    errors.identifier
                      ? `${identifierId}-error`
                      : identifierHint
                        ? `${identifierId}-hint`
                        : undefined
                  }
                  {...register('identifier')}
                />
              </FormField>

              {/* Password */}
              <FormField
                label="رمز عبور"
                htmlFor={passwordId}
                icon={<IoLockClosedOutline className="text-base" />}
                error={errors.password?.message}
              >
                <InputField
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  icon={<IoLockClosedOutline className="text-base" />}
                  rightIcon={
                    showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />
                  }
                  rightIconLabel={
                    showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'
                  }
                  onRightIconClick={() => setShowPassword((v) => !v)}
                  hasError={!!errors.password}
                  aria-describedby={
                    errors.password ? `${passwordId}-error` : undefined
                  }
                  {...register('password')}
                />
              </FormField>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor={rememberId}
                  className="flex items-center gap-2 cursor-pointer group select-none"
                >
                  <input
                    id={rememberId}
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-gray-300 text-[#1A4B6D] focus:ring-4 focus:ring-[#1A4B6D]/20 transition-all"
                    {...register('rememberMe')}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    مرا به خاطر بسپار
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#1A4B6D] hover:text-[#2A6A8D] transition-colors hover:underline underline-offset-2"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={busy}
                whileHover={{ scale: busy ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                aria-busy={busy}
                className={[
                  'w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white',
                  'transition-all duration-300 relative overflow-hidden',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1A4B6D]/30',
                  busy
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] hover:shadow-2xl hover:shadow-[#1A4B6D]/20',
                ].join(' ')}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {busy ? (
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
              </motion.button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative px-4 text-xs text-gray-400 bg-white/80 backdrop-blur-sm">
                  یا
                </span>
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-gray-500">
                حساب کاربری ندارید؟{' '}
                <Link
                  to="/register"
                  className="font-semibold text-[#1A4B6D] hover:text-[#2A6A8D] transition-colors"
                >
                  ثبت‌نام کنید
                </Link>
              </p>

              {/* <DemoFillButton onFill={fillDemoCredentials} /> */}
            </form>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
};