// frontend/src/components/sections/Hero.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  IoArrowBackOutline,
  IoChevronBackOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoChevronDown,
  IoPersonAddOutline,
  IoCardOutline,
} from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';
import { GiScales } from 'react-icons/gi';

export const Hero: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          setIsUserMenuOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
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
    { href: '#services', label: 'خدمات' },
    { href: '#lawyers', label: 'وکلای ما' },
    { href: '#ai-section', label: 'مشاوره AI' },
    { href: '#about', label: 'درباره ما' },
    { href: '#contact', label: 'تماس با ما' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden p-4 rounded-md" 
      id="home"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('./images/hero/5.jpg')`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2B]/70 via-[#0A1A2B]/50 to-[#0A1A2B]/30"></div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A8AB5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="absolute top-20 right-10 w-64 h-64 bg-[#4A8AB5]/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 w-full">
        <header 
          className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-700
            ${scrolled 
              ? 'py-3 bg-[#0A1A2B]/95 backdrop-blur-2xl shadow-2xl border-b border-white/5' 
              : 'py-5 bg-transparent'
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link 
                to={user ? "/dashboard" : "/"} 
                className="flex items-center gap-3 group flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1A4B6D] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1A4B6D] to-[#0A1A2B] rounded-xl flex items-center justify-center text-white text-lg md:text-xl shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(74,138,181,0.3)] border border-white/5">
                    <GiScales className="text-[#4A8AB5] text-xl md:text-2xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg md:text-xl text-white tracking-tight">
                    راشا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8AB5] to-[#8AC8E5]">عدالت</span>
                  </span>
                  <span className="text-[8px] md:text-[10px] text-white/30 tracking-[0.2em] uppercase">
                    مشاوره حقوقی هوشمند
                  </span>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-6 py-3 text-base font-medium text-white/70 hover:text-white transition-all duration-300 rounded-xl group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#4A8AB5] to-[#8AC8E5] group-hover:w-3/4 transition-all duration-300 -translate-x-1/2"></span>
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3 flex-shrink-0">
                {user ? (
                  <div className="relative user-menu-container hidden md:block">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A8AB5] to-[#2A6A8D] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {user?.fullName?.charAt(0) || 'U'}
                      </div>
                      <span className="text-white/80 text-sm font-medium hidden xl:inline">{user?.fullName}</span>
                      <IoChevronDown className={`text-white/40 text-xs transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-[#0A1A2B]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                        <div className="px-4 py-4 border-b border-white/5 bg-white/5">
                          <p className="text-white text-sm font-semibold">{user?.fullName}</p>
                          <p className="text-white/40 text-xs mt-1">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                          <IoPersonOutline className="text-[#4A8AB5]" />
                          <span>داشبورد</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                          <IoCardOutline className="text-[#4A8AB5]" />
                          <span>پروفایل</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full text-right border-t border-white/5"
                        >
                          <IoLogOutOutline className="text-red-400" />
                          <span>خروج</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                 
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20 relative overflow-hidden group"
                    >
                      <IoPersonAddOutline className="relative z-10" />
                      <span className="relative z-10">ورود/ثبت‌نام</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Link>
                  </div>
                )}

                <button
                  onClick={toggleMenu}
                  className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/5 transition-all duration-300 group"
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

          <div className={`lg:hidden fixed top-[76px] left-0 right-0 bg-[#0A1A2B]/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-400 overflow-hidden ${
            isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 py-6 space-y-2 overflow-y-auto max-h-[calc(80vh-20px)]">
              {user && (
                <div className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl mb-4 border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A8AB5] to-[#2A6A8D] flex items-center justify-center text-white font-bold text-lg shadow-xl">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user?.fullName}</p>
                    <p className="text-white/40 text-sm">{user?.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-4 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 border-r-2 border-transparent hover:border-[#4A8AB5] text-lg"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-white/5 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-lg"
                    >
                      <IoPersonOutline />
                      داشبورد
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center gap-3 w-full px-4 py-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 text-lg"
                    >
                      <IoLogOutOutline />
                      خروج
                    </button>
                  </>
                ) : (
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-lg"
                  >
                    <IoPersonAddOutline />
                    ثبت‌نام
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="relative z-20 w-full min-h-[calc(100vh-80px)] flex items-center pt-16 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-end lg:justify-start">
              <div className="w-full lg:w-3/5 xl:w-1/2 text-right lg:mr-[-40px] xl:mr-[-80px] mt-[-40px] md:mt-[-60px] lg:mt-[-80px]">
                <div className="mb-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] animate-fade-in-up">
                    <span className="block mb-2">مشاوره حقوقی</span>
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-[#4A8AB5] via-[#6AA8C5] to-[#8AC8E5] bg-clip-text text-transparent">
                        هوشمند
                      </span>
                      <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4A8AB5] to-[#8AC8E5] rounded-full opacity-50"></span>
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl text-white/30 mt-4 font-light tracking-[0.2em]">
                      با <span className="text-white/60 font-semibold">راشا عدالت</span>
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-lg mr-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-100">
                  دریافت مشاوره تخصصی با بهترین وکلای کشور،
                  <span className="block">به صورت آنلاین و حضوری</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center sm:items-end animate-fade-in-up delay-200">
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(26,75,109,0.5)] hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 hover:border-white/20 w-full sm:w-auto min-w-[120px] sm:min-w-[140px] lg:min-w-[160px]"
                  >
                    <span className="relative z-10">شروع کنید</span>
                    <IoArrowBackOutline className="relative z-10 text-sm sm:text-base group-hover:translate-x-[-4px] transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <a
                    href="#ai-section"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#ai-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 border-2 border-white/20 text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl w-full sm:w-auto min-w-[120px] sm:min-w-[140px] lg:min-w-[160px]"
                  >
                    <MdOutlineSmartToy className="group-hover:animate-spin-slow text-xl sm:text-2xl flex-shrink-0" />
                    <span className="whitespace-nowrap">مشاوره با AI</span>
                    <IoChevronBackOutline className="text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
};