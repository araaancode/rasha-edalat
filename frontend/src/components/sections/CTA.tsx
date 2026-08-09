// frontend/src/components/sections/CTA.tsx
import React from 'react';
import { Button } from '../common/Button';
import { IoPersonAddOutline, IoCallOutline } from 'react-icons/io5';

export const CTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] relative overflow-hidden" id="contact">
      {/* Decorative Background */}
      <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A8AB5]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A961]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/20 rounded-full border border-[#C9A961]/30 mb-4">
            <span className="w-2 h-2 bg-[#C9A961] rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm font-light">مشاوره تخصصی حقوقی</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            آماده دریافت{' '}
            <span className="bg-gradient-to-r from-[#C9A961] to-[#E8D5A3] bg-clip-text text-transparent">
              مشاوره حقوقی
            </span>
            {' '}هستید؟
          </h2>
          
          <p className="text-white/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            همین حالا ثبت‌نام کنید و از خدمات تخصصی وکلای مجرب و هوش مصنوعی پیشرفته ما بهره‌مند شوید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-gradient-to-r from-[#C9A961] to-[#E8D5A3] text-[#0A1A2B] hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#C9A961]/30"
              icon={<IoPersonAddOutline className="text-lg" />}
              href="/register"
            >
              ثبت‌نام رایگان
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              icon={<IoCallOutline className="text-lg" />}
              href="tel:02112345678"
            >
              تماس با ما
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              پاسخگویی ۲۴/۷
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              محرمانه و امن
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
              وکلای مجرب
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              بیش از ۱۰۰۰ مشاوره موفق
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};