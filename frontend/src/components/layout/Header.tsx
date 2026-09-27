// frontend/src/components/layout/Header.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoLogOutOutline,
  IoPersonOutline,
  IoChevronDown,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
  IoPersonAddOutline,
  IoCardOutline,
  IoGridOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoArrowBackOutline,
} from 'react-icons/io5';
import { GiScales } from 'react-icons/gi';

// ============================================
// Design Tokens
// ============================================
const BRAND = {
  deep: '#0A1A2B',
  primary: '#1A4B6D',
  primaryHover: '#2A6A8D',
  accent: '#4A8AB5',
} as const;

// ============================================
// Nav Links
// ============================================
const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/#ai-section', label: 'مشاوره هوش مصنوعی' },
  { href: '/#faq', label: 'سوالات متداول' },
];

// ============================================
// Header Props
// ============================================
interface HeaderProps {
  scrolled?: boolean;
}

// ============================================
// Header Component
// ============================================
export const Header: React.FC<HeaderProps> = ({ scrolled: propScrolled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(propScrolled ?? false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // ============================================
  // Scroll Detection
  // ============================================
  useEffect(() => {
    if (propScrolled !== undefined) {
      setScrolled(propScrolled);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propScrolled]);

  // ============================================
  // Close menus on route change
  // ============================================
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // ============================================
  // Close user menu on outside click / Escape
  // ============================================
  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isUserMenuOpen]);

  // ============================================
  // Lock body scroll when mobile menu open
  // ============================================
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ============================================
  // Logout
  // ============================================
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('خروج موفقیت‌آمیز بود');
      navigate('/login');
    } catch {
      toast.error('خطا در خروج از حساب');
    }
  }, [dispatch, navigate]);

  const userInitial = user?.fullName?.charAt(0) || 'U';
  const isHome = location.pathname === '/';

  return (
    <>
      {/* ============================================
          Top Info Bar — only on home page
          ============================================ */}
      {isHome && (
        <div
          className="hidden md:block text-white text-xs border-b border-white/5"
          style={{ backgroundColor: BRAND.deep }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
            <div className="flex items-center gap-6 text-white/60">
              <a
                href="tel:02112345678"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <IoCallOutline
                  className="text-sm"
                  style={{ color: BRAND.accent }}
                />
                ۰۲۱-۱۲۳۴-۵۶۷۸
              </a>
              <a
                href="mailto:info@rasha-adalat.ir"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <IoMailOutline
                  className="text-sm"
                  style={{ color: BRAND.accent }}
                />
                info@rasha-adalat.ir
              </a>
              <span className="flex items-center gap-1.5">
                <IoTimeOutline
                  className="text-sm"
                  style={{ color: BRAND.accent }}
                />
                شنبه تا پنجشنبه ۹:۰۰ - ۱۸:۰۰
              </span>
            </div>

            <div className="flex items-center gap-3 text-white/60">
              {isAuthenticated && user ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  خوش آمدید، {user.fullName}
                </span>
              ) : (
                <span>پشتیبانی ۲۴/۷ در کنار شماست</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          Main Header
          ============================================ */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/5'
            : 'border-b border-transparent',
        ].join(' ')}
        style={{
          backgroundColor: scrolled
            ? `${BRAND.deep}F2`
            : BRAND.deep,
          marginTop: isHome ? 0 : 0,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ============================================
                Logo
                ============================================ */}
            <Link
              to={user ? '/dashboard' : '/'}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ backgroundColor: BRAND.accent }}
                />
                <div
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md transform transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.deep} 100%)`,
                  }}
                >
                  <GiScales className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base text-white tracking-tight">
                  راشا <span style={{ color: BRAND.accent }}>عدالت</span>
                </span>
                <span className="text-[9px] text-white/40 tracking-wider uppercase mt-0.5">
                  مشاوره حقوقی هوشمند
                </span>
              </div>
            </Link>

            {/* ============================================
                Desktop Navigation
                ============================================ */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center mx-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ============================================
                Desktop Right Actions
                ============================================ */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="menu"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.primaryHover} 100%)`,
                      }}
                    >
                      {userInitial}
                    </span>
                    <span className="text-sm font-medium text-white/90 hidden lg:inline max-w-[120px] truncate">
                      {user.fullName}
                    </span>
                    <IoChevronDown
                      className={[
                        'text-xs text-white/50 transition-transform duration-200',
                        isUserMenuOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        role="menu"
                        className="absolute left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl"
                        style={{ backgroundColor: `${BRAND.deep}F5` }}
                      >
                        {/* User info */}
                        <div className="px-4 py-3.5 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold shadow-md flex-shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.primaryHover} 100%)`,
                              }}
                            >
                              {userInitial}
                            </span>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-semibold truncate">
                                {user.fullName}
                              </p>
                              <p className="text-white/40 text-xs truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-1.5">
                          <Link
                            to="/dashboard"
                            role="menuitem"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <IoGridOutline className="text-base" />
                            داشبورد
                          </Link>
                          <Link
                            to="/profile"
                            role="menuitem"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <IoPersonOutline className="text-base" />
                            پروفایل
                          </Link>
                          <Link
                            to="/subscription"
                            role="menuitem"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <IoCardOutline className="text-base" />
                            اشتراک من
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-white/5 py-1.5">
                          <button
                            onClick={handleLogout}
                            role="menuitem"
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-right"
                          >
                            <IoLogOutOutline className="text-base" />
                            خروج از حساب
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    ورود
                  </Link>
                  <Link
                    to="/register"
                    className="group relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryHover} 100%)`,
                    }}
                  >
                    <IoPersonAddOutline className="text-base" />
                    ثبت‌نام
                  </Link>
                </>
              )}
            </div>

            {/* ============================================
                Mobile Menu Button
                ============================================ */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
              aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <IoCloseOutline className="w-6 h-6 text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <IoMenuOutline className="w-6 h-6 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================
          Mobile Drawer
          ============================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm md:hidden shadow-2xl"
              style={{ backgroundColor: BRAND.deep }}
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.deep} 100%)`,
                    }}
                  >
                    <GiScales className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-sm">
                    راشا <span style={{ color: BRAND.accent }}>عدالت</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="بستن"
                >
                  <IoCloseOutline className="w-5 h-5 text-white/70" />
                </button>
              </div>

              {/* Drawer content */}
              <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
                {/* User card */}
                {isAuthenticated && user && (
                  <div className="p-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                      <span
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.primaryHover} 100%)`,
                        }}
                      >
                        {userInitial}
                      </span>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {user.fullName}
                        </p>
                        <p className="text-white/40 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nav links */}
                <nav className="px-3 py-2 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <span>{link.label}</span>
                      <IoArrowBackOutline className="w-4 h-4 text-white/30" />
                    </a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="mx-4 my-2 border-t border-white/5" />

                {/* User actions */}
                {isAuthenticated && user ? (
                  <nav className="px-3 py-2 space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <IoGridOutline className="w-5 h-5 text-white/40" />
                      داشبورد
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <IoPersonOutline className="w-5 h-5 text-white/40" />
                      پروفایل
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <IoCardOutline className="w-5 h-5 text-white/40" />
                      اشتراک من
                    </Link>
                  </nav>
                ) : null}

                {/* Bottom CTA */}
                <div className="mt-auto p-4 space-y-2">
                  {isAuthenticated && user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                      خروج از حساب
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryHover} 100%)`,
                        }}
                      >
                        <IoPersonAddOutline className="w-5 h-5" />
                        ثبت‌نام
                      </Link>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white/80 bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        ورود به حساب
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================
          Spacer — matches header height
          ============================================ */}
      <div className={`${isHome ? 'h-[100px] md:h-[136px]' : 'h-16'}`} />
    </>
  );
};