// frontend/src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
// جایگزینی آیکون‌های react-icons/fa با کتابخانه‌های دیگر
import { 
  IoLogOutOutline, 
  IoPersonOutline, 
  IoChevronDown, 
  IoCallOutline, 
  IoMailOutline, 
  IoTimeOutline, 
  // IoBalanceScaleOutline, 
  IoPersonAddOutline, 
  IoCardOutline 
} from 'react-icons/io5';
// برای آیکون Scale می‌توانیم از کتابخانه دیگری هم استفاده کنیم
import { GiScales } from 'react-icons/gi';

interface HeaderProps {
  scrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled: propScrolled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // گرفتن user از Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(propScrolled || false);

  // دیباگ - چاپ وضعیت کاربر در کنسول
  useEffect(() => {
    console.log('🔍 Header Debug:');
    console.log('  - user:', user);
    console.log('  - isAuthenticated:', isAuthenticated);
    console.log('  - token:', localStorage.getItem('accessToken') ? '✅ موجود' : '❌');
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (propScrolled !== undefined) {
      setScrolled(propScrolled);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propScrolled]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('خروج موفقیت‌آمیز بود');
      navigate('/login');
    } catch (error) {
      toast.error('خطا در خروج از حساب');
    }
  };

  const navLinks = [
    { href: '/', label: 'خانه' },
    { href: '#ai-section', label: 'مشاوره هوش مصنوعی' },
    { href: '#faq', label: 'سوالات متداول' },
  ];

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="bg-[#0A1A2B] text-white text-sm py-2 border-b border-[#1A4B6D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1 hover:text-[#4A8AB5] transition-colors cursor-pointer">
              <IoCallOutline className="text-[#4A8AB5] text-xs sm:text-sm" />
              <span className="hidden sm:inline">۰۲۱-۱۲۳۴-۵۶۷۸</span>
              <span className="sm:hidden">۰۲۱-۱۲۳۴</span>
            </span>
            <span className="flex items-center gap-1 hover:text-[#4A8AB5] transition-colors cursor-pointer">
              <IoMailOutline className="text-[#4A8AB5] text-xs sm:text-sm" />
              <span className="hidden sm:inline">info@rasha-adalat.ir</span>
              <span className="sm:hidden">info@rasha</span>
            </span>
            <span className="flex items-center gap-1 hover:text-[#4A8AB5] transition-colors cursor-pointer">
              <IoTimeOutline className="text-[#4A8AB5] text-xs sm:text-sm" />
              <span className="hidden md:inline">شنبه - پنجشنبه ۹:۰۰ - ۱۸:۰۰</span>
              <span className="md:hidden">۹-۱۸</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {/* بررسی مستقیم user */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 hover:text-[#4A8AB5] transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A8AB5] to-[#2A6A8D] flex items-center justify-center text-white text-xs font-bold">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                  <span className="hidden sm:inline">{user?.fullName || 'کاربر'}</span>
                  <IoChevronDown className="text-xs" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-[#0A1A2B] border border-[#1A4B6D] rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-medium">{user?.fullName}</p>
                      <p className="text-white/40 text-xs">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <IoPersonOutline className="text-sm" />
                      <span>داشبورد</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <IoCardOutline className="text-sm" />
                      <span>پروفایل</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full text-right border-t border-white/5"
                    >
                      <IoLogOutOutline className="text-sm" />
                      <span>خروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#4A8AB5] transition-colors px-2 py-1 relative group">
                  ورود
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4A8AB5] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/register" className="bg-[#4A8AB5] text-white px-3 sm:px-4 py-1 rounded-md hover:bg-[#2A6A8D] transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg hover:shadow-xl">
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0A1A2B]/95 backdrop-blur-xl shadow-2xl border-b border-white/5' 
            : 'bg-[#0A1A2B] backdrop-blur-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to={user ? "/dashboard" : "/"} 
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#1A4B6D] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1A4B6D] to-[#0A1A2B] rounded-xl flex items-center justify-center text-white text-lg md:text-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
                  <GiScales />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-white tracking-tight">
                  راشا <span className="text-[#4A8AB5]">عدالت</span>
                </span>
                <span className="text-[8px] md:text-[10px] text-white/40 tracking-wider uppercase">
                  مشاوره حقوقی هوشمند
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 gap-2 mx-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#4A8AB5] to-[#6AA8C5] transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"></span>
                  <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-gradient-to-l from-[#4A8AB5] to-[#6AA8C5] transition-all duration-300 group-hover:w-1/2 group-hover:right-1/4"></span>
                  <span className="absolute inset-0 bg-[#4A8AB5]/0 rounded-lg transition-all duration-300 group-hover:bg-[#4A8AB5]/5"></span>
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20 relative overflow-hidden group"
                  >
                    <IoPersonOutline className="relative z-10 text-sm" />
                    <span className="relative z-10">داشبورد</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/register"
                  className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20 relative overflow-hidden group"
                >
                  <IoPersonAddOutline className="relative z-10 text-sm" />
                  <span className="relative z-10">ثبت‌نام</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                aria-label="منو"
              >
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed top-[72px] left-0 right-0 bg-[#0A1A2B]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 space-y-2">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A8AB5] to-[#2A6A8D] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{user?.fullName}</p>
                  <p className="text-white/40 text-xs">{user?.email}</p>
                </div>
              </div>
            )}
            
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 border-r-2 border-transparent hover:border-[#4A8AB5]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/5">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <IoPersonOutline />
                    داشبورد
                  </Link>
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  >
                    <IoLogOutOutline />
                    خروج
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <IoPersonAddOutline />
                  ثبت‌نام
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[104px] md:h-[112px]"></div>

      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};