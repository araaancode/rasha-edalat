// frontend/src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getMe } from '../store/slices/authSlice';
import { ProgressBar } from '../components/layout/ProgressBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { AIConsultation } from '../components/sections/AIConsultation';
import { Services } from '../components/sections/Services';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { CTA } from '../components/sections/CTA';
import { IoArrowUpOutline } from 'react-icons/io5';

// Import AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // دریافت اطلاعات کاربر در صورت وجود توکن
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Initialize AOS
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
      setScrolled(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] font-sans overflow-x-hidden">
      <ProgressBar progress={progress} />
      <Header scrolled={scrolled} />
      
      <main>
        <Hero />
        <AIConsultation />
        <FAQ />
      </main>

      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:translate-y-[-4px] transition-all duration-300 z-50 flex items-center justify-center ${
          showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
        aria-label="بازگشت به بالا"
      >
        <IoArrowUpOutline className="text-xl" />
      </button>
    </div>
  );
};