// frontend/src/components/layout/Footer.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoScaleOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoPaperPlaneOutline,
  IoArrowUpOutline,
  // IoLogoTelegram,
  // IoLogoWhatsapp,
  // IoLogoInstagram,
  // IoLogoLinkedin
} from 'react-icons/io5';
// import { GrTelegram } from 'react-icons/gr';
// import { TiSocialTelegram } from 'react-icons/ti';
import { MdCopyright } from 'react-icons/md';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1A2B] text-white relative overflow-hidden">
      {/* Decorative Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1A4B6D] to-transparent"></div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 text-center sm:text-right">
            {/* Brand Section */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-3 mb-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1A4B6D] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-11 h-11 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center text-[#0A1A2B] text-lg shadow-lg transform transition-all duration-300">
                    <IoScaleOutline />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl tracking-tight">
                    راشا <span className="text-[#4A8AB5]">عدالت</span>
                  </span>
                  <p className="text-xs text-white/30 tracking-wider uppercase">مشاوره حقوقی هوشمند</p>
                </div>
              </div>
              
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                همراه با عدالت، از اولین قدم
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                <span className="text-white/30 text-sm flex items-center gap-2 hover:text-white/60 transition-all duration-300">
                  <IoCallOutline className="text-[#4A8AB5]" /> 
                  <span>۰۲۱-۱۲۳۴-۵۶۷۸</span>
                </span>
                <span className="text-white/30 text-sm flex items-center gap-2 hover:text-white/60 transition-all duration-300">
                  <IoMailOutline className="text-[#4A8AB5]" /> 
                  <span>info@rasha-adalat.ir</span>
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 relative inline-block">
                دسترسی سریع
                <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-[#4A8AB5]"></span>
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'خانه', href: '/#home' },
                  { label: 'مشاوره AI', href: '/#ai-section' },
                  { label: 'درباره ما', href: '/#about' },
                  { label: 'خدمات', href: '/#services' },
                  { label: 'تماس', href: '/#contact' },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href} 
                      className="text-white/30 hover:text-white text-sm transition-all duration-300 hover:translate-x-[-4px] inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 relative inline-block">
                خدمات
                <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-[#4A8AB5]"></span>
              </h4>
              <ul className="space-y-2.5">
                {[
                  'حقوق خانواده',
                  'حقوق قراردادها',
                  'حقوق کار',
                  'حقوق کیفری',
                  'حقوق شرکت‌ها',
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-white/30 hover:text-white text-sm transition-all duration-300 hover:translate-x-[-4px] inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 relative inline-block">
                شبکه‌های اجتماعی
                <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-[#4A8AB5]"></span>
              </h4>
              
              {/* <div className="flex gap-3 justify-center sm:justify-start mb-4">
                {[
                  { icon: TiSocialTelegram, color: '#0088cc' },
                  { icon: IoLogoWhatsapp, color: '#25D366' },
                  { icon: IoLogoInstagram, color: '#E4405F' },
                  { icon: IoLogoLinkedin, color: '#0077B5' },
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="relative group w-11 h-11 border border-white/10 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:border-white/20 hover:translate-y-[-3px] transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <social.icon className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div> */}

              {/* Newsletter */}
              <div className="mt-4">
                <p className="text-white/30 text-xs mb-2">عضویت در خبرنامه</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="ایمیل خود را وارد کنید"
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#4A8AB5] transition-all duration-300"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    <IoPaperPlaneOutline />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs flex items-center gap-1">
              <MdCopyright /> 
              {currentYear} تمام حقوق مادی و معنوی این وب‌سایت متعلق به «راشا عدالت» است.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-all duration-300">
                حریم خصوصی
              </a>
              <span className="w-px h-3 bg-white/10"></span>
              <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-all duration-300">
                شرایط استفاده
              </a>
              <span className="w-px h-3 bg-white/10"></span>
              <button 
                onClick={scrollToTop}
                className={`flex items-center gap-2 text-white/30 hover:text-white text-sm transition-all duration-300 hover:gap-3 ${
                  showScrollTop ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <IoArrowUpOutline className="text-xs" />
                </div>
                <span>بازگشت به بالا</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};