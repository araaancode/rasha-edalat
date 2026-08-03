import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const CTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] relative overflow-hidden" id="contact">
      <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            آماده دریافت <span className="text-[#C9A961]">مشاوره حقوقی</span> هستید؟
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8">
            همین حالا ثبت‌نام کنید و از خدمات تخصصی ما بهره‌مند شوید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-[#C9A961] text-[#0A1A2B] hover:bg-[#E8D5A3]"
              icon={<i className="fas fa-user-plus"></i>}
              href="/register"
            >
              ثبت‌نام رایگان
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#0A1A2B]"
              icon={<i className="fas fa-phone"></i>}
              href="tel:02112345678"
            >
              تماس با ما
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};