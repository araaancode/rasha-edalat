// frontend/src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AppDispatch, RootState } from '../store';
import { getConversations } from '../store/slices/chatSlice';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  IoChatbubbleOutline,
  IoPersonOutline,
  IoArrowBackOutline,
  IoHomeOutline,
  IoDocumentTextOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoAddOutline,
  IoChevronBackOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoSparklesOutline,
} from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiRobot2Line } from 'react-icons/ri';

// ============================================
// Animation Variants
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ============================================
// Icon Style — یکدست برای همه
// ============================================
const ICON_STYLE = {
  bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
  icon: 'text-indigo-600 dark:text-indigo-400',
} as const;

// ============================================
// Navigation
// ============================================
const navItems = [
  { id: 'dashboard', label: 'داشبورد', icon: IoHomeOutline, to: '/dashboard' },
  { id: 'chats', label: 'گفتگوها', icon: IoChatbubbleOutline, to: '/chats' },
  { id: 'lawyers', label: 'وکلا', icon: HiOutlineUserGroup, to: '/lawyers' },
  { id: 'cases', label: 'پرونده‌ها', icon: IoDocumentTextOutline, to: '/cases' },
  { id: 'profile', label: 'پروفایل', icon: IoPersonOutline, to: '/profile' },
];

// ============================================
// Stats Data
// ============================================
interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'neutral' | 'down';
  icon: React.ElementType;
  spark: number[];
}

const stats: Stat[] = [
  {
    id: 'chats',
    label: 'گفتگوهای فعال',
    value: '۱۲',
    change: '+۳ این هفته',
    trend: 'up',
    icon: IoChatbubbleOutline,
    spark: [4, 6, 5, 8, 7, 10, 12],
  },
  {
    id: 'cases',
    label: 'پرونده‌های باز',
    value: '۵',
    change: '+۱ این ماه',
    trend: 'up',
    icon: IoDocumentTextOutline,
    spark: [2, 3, 3, 4, 4, 5, 5],
  },
  {
    id: 'lawyers',
    label: 'وکلای در دسترس',
    value: '۳',
    change: 'آماده مشاوره',
    trend: 'neutral',
    icon: HiOutlineUserGroup,
    spark: [3, 3, 3, 3, 3, 3, 3],
  },
  {
    id: 'satisfaction',
    label: 'رضایت شما',
    value: '۹۸٪',
    change: '+۲٪ بهبود',
    trend: 'up',
    icon: IoTrendingUpOutline,
    spark: [88, 90, 89, 92, 94, 96, 98],
  },
];

// ============================================
// Recent Conversations (Mock)
// ============================================
const recentChats = [
  {
    id: 1,
    title: 'مشاوره قرارداد اجاره',
    preview: 'سوال من در مورد مدت اجاره و شرایط فسخ...',
    time: '۱۰ دقیقه پیش',
    status: 'active' as const,
  },
  {
    id: 2,
    title: 'دعوای مطالبه وجه',
    preview: 'برای طرح دعوا چه مدارکی لازم است؟',
    time: '۲ ساعت پیش',
    status: 'active' as const,
  },
  {
    id: 3,
    title: 'مشاوره حقوق کار',
    preview: 'در مورد حق سنوات و بیمه سوال داشتم...',
    time: 'دیروز',
    status: 'closed' as const,
  },
];

// ============================================
// Quick Actions
// ============================================
const quickActions = [
  {
    id: 'ai',
    title: 'گفتگو با AI',
    icon: RiRobot2Line,
    to: '/chat/new',
  },
  {
    id: 'lawyer',
    title: 'مشاوره با وکیل',
    icon: HiOutlineUserGroup,
    to: '/lawyers',
  },
  {
    id: 'case',
    title: 'پرونده جدید',
    icon: IoAddOutline,
    to: '/cases/new',
  },
];

// ============================================
// Sidebar
// ============================================
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, currentPath }) => (
  <aside
    className={[
      'fixed inset-y-0 right-0 z-40 w-64',
      'lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 lg:translate-x-0',
      'bg-slate-50 dark:bg-slate-950',
      'border-l border-slate-200 dark:border-slate-800',
      'flex flex-col',
      'transition-transform duration-300 ease-out',
      open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
    ].join(' ')}
    aria-label="منوی اصلی"
  >
    {/* ---------- Logo ---------- */}
    <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
        style={{
          background:
            'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-hover) 100%)',
        }}
      >
        <IoSparklesOutline className="w-5 h-5 text-white" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="font-bold text-slate-900 dark:text-white text-sm truncate">
          راشا عدالت
        </h1>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          سامانه حقوقی
        </p>
      </div>
      <button
        onClick={onClose}
        className="lg:hidden p-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        aria-label="بستن منو"
      >
        <IoChevronBackOutline className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </button>
    </div>

    {/* ---------- Navigation ---------- */}
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      {/* Section label */}
      <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        منوی اصلی
      </p>

      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentPath === item.to;
        return (
          <Link
            key={item.id}
            to={item.to}
            aria-current={active ? 'page' : undefined}
            className={[
              'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
              'transition-all duration-200',
              active
                ? 'bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white',
            ].join(' ')}
          >
            {/* Right active indicator bar */}
            {active && (
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-indigo-600 dark:bg-indigo-400"
                aria-hidden
              />
            )}

            <span
              className={[
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                active
                  ? 'bg-indigo-500/15 dark:bg-indigo-500/20'
                  : 'bg-slate-200/60 dark:bg-slate-800/60 group-hover:bg-slate-200 dark:group-hover:bg-slate-800',
              ].join(' ')}
            >
              <Icon
                className={[
                  'transition-colors',
                  active
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200',
                ].join(' ')}
                style={{ width: '1.125rem', height: '1.125rem' }}
                aria-hidden
              />
            </span>

            <span className="flex-1">{item.label}</span>

            {/* Count badge for chats */}
            {item.id === 'chats' && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                ۱۲
              </span>
            )}
          </Link>
        );
      })}

      {/* Section label */}
      <p className="px-3 pt-4 pb-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        حساب کاربری
      </p>

      <Link
        to="/settings"
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
      >
        <span className="w-8 h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 flex items-center justify-center flex-shrink-0 transition-colors">
          <IoSettingsOutline
            className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
            aria-hidden
          />
        </span>
        <span className="flex-1">تنظیمات</span>
      </Link>

      <button
        type="button"
        className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
      >
        <span className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
          <IoLogOutOutline
            className="w-4 h-4 text-rose-600 dark:text-rose-400"
            aria-hidden
          />
        </span>
        <span className="flex-1 text-right">خروج</span>
      </button>
    </nav>

    {/* ---------- Upgrade Card (Pro) ---------- */}
    <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
      <div
        className="rounded-xl p-3 text-white relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-hover) 100%)',
        }}
      >
        <div
          className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-1">
            <IoSparklesOutline
              className="w-3.5 h-3.5 text-amber-300"
              aria-hidden
            />
            <span className="text-[10px] font-semibold text-amber-200">
              نسخه حرفه‌ای
            </span>
          </div>
          <p className="text-xs font-medium leading-snug mb-2.5">
            از مشاوره نامحدود و امکانات ویژه بهره‌مند شوید
          </p>
          <button className="w-full text-[11px] font-semibold bg-white text-[var(--brand-primary)] rounded-lg py-1.5 hover:bg-white/90 transition-colors">
            ارتقاء حساب
          </button>
        </div>
      </div>
    </div>
  </aside>
);

// ============================================
// Topbar
// ============================================
interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => (
  <header className="sticky top-0 z-20 h-16 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 px-4 sm:px-6">
    <button
      onClick={onMenuClick}
      className="lg:hidden p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
      aria-label="باز کردن منو"
    >
      <IoArrowBackOutline className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    </button>

    <div className="flex-1 max-w-md relative hidden sm:block">
      <IoSearchOutline
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
        aria-hidden
      />
      <input
        type="search"
        placeholder="جستجو در گفتگوها، پرونده‌ها و وکلا..."
        aria-label="جستجو"
        className="w-full pr-10 pl-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-white/5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
      />
    </div>

    <div className="flex-1 sm:hidden" />

    <button
      type="button"
      className="relative p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
      aria-label="اعلان‌ها"
    >
      <IoNotificationsOutline className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      <span
        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-50 dark:ring-slate-950"
        aria-hidden
      />
    </button>

    <div className="flex items-center gap-3 pr-3 border-r border-slate-200 dark:border-slate-800">
      <div className="hidden sm:block text-left">
        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
          علی محمدی
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">کاربر عادی</p>
      </div>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
        style={{
          background:
            'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)',
        }}
        aria-hidden
      >
        ع
      </div>
    </div>
  </header>
);

// ============================================
// Stat Card — استایل حرفه‌ای
// ============================================
const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const Icon = stat.icon;
  const isUp = stat.trend === 'up';
  const isNeutral = stat.trend === 'neutral';

  // نرمال‌سازی داده‌ها برای sparkline
  const max = Math.max(...stat.spark);
  const min = Math.min(...stat.spark);
  const range = max - min || 1;
  const sparkHeights = stat.spark.map(
    (v) => 30 + ((v - min) / range) * 70, // بین ۳۰٪ تا ۱۰۰٪
  );

  return (
    <div
      className={[
        'group relative overflow-hidden',
        'bg-white dark:bg-slate-900',
        'rounded-2xl border border-slate-200 dark:border-slate-800',
        'p-5',
        'transition-all duration-300',
        'hover:border-indigo-500/40 dark:hover:border-indigo-500/40',
        'hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-black/30',
        'hover:-translate-y-1',
      ].join(' ')}
    >
      {/* Gradient overlay ظریف */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative">
        {/* Top: Icon + Trend Badge */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div
            className={[
              'relative w-12 h-12 rounded-xl flex items-center justify-center',
              'bg-indigo-500/10 dark:bg-indigo-500/15',
              'transition-all duration-300',
              'group-hover:scale-110 group-hover:rotate-3',
            ].join(' ')}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <Icon
              className="relative w-6 h-6 text-indigo-600 dark:text-indigo-400"
              aria-hidden
            />
          </div>

          {/* Trend Badge */}
          <span
            className={[
              'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full',
              isUp &&
                'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
              !isUp &&
                !isNeutral &&
                'bg-rose-500/10 text-rose-700 dark:text-rose-400',
              isNeutral &&
                'bg-slate-500/10 text-slate-600 dark:text-slate-400',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isUp && (
              <IoTrendingUpOutline className="w-3 h-3" aria-hidden />
            )}
            {isNeutral && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-current"
                aria-hidden
              />
            )}
            {stat.change.split(' ')[0]}
          </span>
        </div>

        {/* Label */}
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          {stat.label}
        </p>

        {/* Value + Sparkline */}
        <div className="flex items-end justify-between gap-3 mb-3">
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
            {stat.value}
          </p>

          {/* Sparkline */}
          <div
            className="flex items-end gap-0.5 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden
          >
            {sparkHeights.map((h, i) => (
              <span
                key={i}
                className={[
                  'w-1 rounded-full transition-all duration-500',
                  i === sparkHeights.length - 1
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-indigo-500/40 dark:bg-indigo-400/40',
                ].join(' ')}
                style={{
                  height: `${h}%`,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Change Description */}
        <p
          className={[
            'text-[11px] leading-relaxed',
            isUp
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400',
          ].join(' ')}
        >
          {stat.change}
        </p>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 right-0 left-0 h-0.5 bg-indigo-500/0 group-hover:bg-indigo-500/40 transition-colors duration-300 rounded-b-2xl"
          aria-hidden
        />
      </div>
    </div>
  );
};

// ============================================
// Recent Chats
// ============================================
const RecentChats: React.FC = () => (
  <motion.section
    variants={itemVariants}
    className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    aria-labelledby="recent-chats-title"
  >
    <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
      <div>
        <h2
          id="recent-chats-title"
          className="font-bold text-slate-900 dark:text-white"
        >
          آخرین گفتگوها
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          پیگیری و ادامه مشاوره‌های اخیر
        </p>
      </div>
      <Link
        to="/chats"
        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
      >
        مشاهده همه
      </Link>
    </div>

    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {recentChats.map((chat) => (
        <li key={chat.id}>
          <Link
            to={`/chat/${chat.id}`}
            className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            {/* آیکون یکدست */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${ICON_STYLE.bg}`}
            >
              <IoChatbubbleOutline
                className={`w-5 h-5 ${ICON_STYLE.icon}`}
                aria-hidden
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                  {chat.title}
                </h3>
                {chat.status === 'active' ? (
                  <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
                    فعال
                  </span>
                ) : (
                  <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    بسته
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {chat.preview}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 text-xs text-slate-400">
              <IoTimeOutline className="w-3.5 h-3.5" aria-hidden />
              <span>{chat.time}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </motion.section>
);

// ============================================
// Quick Actions
// ============================================
const QuickActions: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
    <h2 className="font-bold text-slate-900 dark:text-white mb-1">
      اقدامات سریع
    </h2>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
      دسترسی سریع به بخش‌های پرکاربرد
    </p>

    <div className="space-y-2">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.id}
            to={action.to}
            className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-indigo-500/20 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all group"
          >
            {/* آیکون یکدست */}
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLE.bg}`}
            >
              <Icon className={`w-4 h-4 ${ICON_STYLE.icon}`} aria-hidden />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white flex-1">
              {action.title}
            </span>
            <IoArrowBackOutline
              className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:-translate-x-0.5 transition-all"
              aria-hidden
            />
          </Link>
        );
      })}
    </div>
  </div>
);

// ============================================
// Status Card
// ============================================
const StatusCard: React.FC = () => (
  <div
    className="rounded-2xl p-5 text-white overflow-hidden relative shadow-lg shadow-indigo-500/10"
    style={{
      background:
        'linear-gradient(135deg, var(--brand-deep) 0%, var(--brand-primary) 100%)',
    }}
  >
    <div
      className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"
      aria-hidden
    />
    <div
      className="absolute -bottom-12 -right-12 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl"
      aria-hidden
    />
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        <IoCheckmarkCircle className="w-4 h-4 text-emerald-400" aria-hidden />
        <span className="text-xs font-medium text-white/70">وضعیت حساب</span>
      </div>
      <h3 className="font-bold text-lg mb-1">همه چیز مرتبه!</h3>
      <p className="text-white/70 text-xs leading-relaxed mb-4">
        حساب شما تأیید شده و آماده استفاده از تمام امکانات است.
      </p>
      <Link
        to="/profile"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors"
      >
        مشاهده پروفایل
        <IoArrowBackOutline className="w-3 h-3" aria-hidden />
      </Link>
    </div>
  </div>
);

// ============================================
// Dashboard Component
// ============================================
export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isLoading } = useSelector((state: RootState) => state.chat);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getConversations({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex" dir="rtl">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={location.pathname}
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          aria-hidden
        />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 lg:p-8 space-y-6"
        >
          {/* Welcome Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                سلام، علی 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                خلاصه فعالیت‌های شما در راشا عدالت
              </p>
            </div>

            <Link
              to="/chat/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 hover:-translate-y-0.5 transition-all self-start sm:self-auto"
            >
              <IoAddOutline className="w-4 h-4" aria-hidden />
              گفتگوی جدید
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentChats />

            <motion.section
              variants={itemVariants}
              className="space-y-4"
              aria-label="اقدامات و وضعیت"
            >
              <QuickActions />
              <StatusCard />
            </motion.section>
          </div>
        </motion.main>
      </div>
    </div>
  );
};