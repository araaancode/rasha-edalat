// frontend/src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getMe } from '../store/slices/authSlice';
import { ProgressBar } from '../components/layout/ProgressBar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { AIConsultation } from '../components/sections/AIConsultation';
import { FAQ } from '../components/sections/FAQ';
import { IoArrowUpOutline } from 'react-icons/io5';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out',
      once: false,
      mirror: true,
      offset: 30,
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
      setShowBackToTop(scrollTop > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A1A2B] font-sans overflow-x-hidden">
      <ProgressBar progress={progress} />
      
      <main>
        <Hero />
        <AIConsultation />
        <FAQ />
      </main>

      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-[#1A4B6D] to-[#4A8AB5] text-white rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(26,75,109,0.4)] hover:scale-110 hover:translate-y-[-4px] transition-all duration-500 z-50 flex items-center justify-center group ${
          showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-8'
        }`}
        aria-label="بازگشت به بالا"
      >
        <IoArrowUpOutline className="text-xl group-hover:animate-bounce-slow" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A4B6D] to-[#4A8AB5] rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      </button>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};