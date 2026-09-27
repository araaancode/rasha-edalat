// frontend/src/components/layout/Footer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCallOutline,
  IoMailOutline,
  IoPaperPlaneOutline,
  IoArrowUpOutline,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoWhatsapp,
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
// Data
// ============================================
const quickLinks = [
  { label: 'خانه', href: '/#home' },
  { label: 'مشاوره هوش مصنوعی', href: '/#ai-section' },
  { label: 'درباره ما', href: '/#about' },
  { label: 'خدمات', href: '/#services' },
  { label: 'تماس با ما', href: '/#contact' },
];

const services = [
  'حقوق خانواده',
  'حقوق قراردادها',
  'حقوق کار',
  'حقوق کیفری',
  'حقوق شرکت‌ها',
];

const socialLinks = [
  {
    label: 'اینستاگرام',
    href: 'https://instagram.com',
    icon: IoLogoInstagram,
    hoverColor: 'hover:text-pink-400',
  },
  {
    label: 'لینکدین',
    href: 'https://linkedin.com',
    icon: IoLogoLinkedin,
    hoverColor: 'hover:text-sky-400',
  },
  {
    label: 'توییتر',
    href: 'https://twitter.com',
    icon: IoLogoTwitter,
    hoverColor: 'hover:text-sky-300',
  },
  {
    label: 'واتساپ',
    href: 'https://wa.me/982112345678',
    icon: IoLogoWhatsapp,
    hoverColor: 'hover:text-emerald-400',
  },
];

// ============================================
// Newsletter Form
// ============================================
const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: call API
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        ایمیل برای عضویت در خبرنامه
      </label>

      <div className="relative">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل خود را وارد کنید"
          autoComplete="email"
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#4A8AB5]/60 focus:ring-4 focus:ring-[#4A8AB5]/10 transition-all"
        />
        <button
          type="submit"
          aria-label="عضویت در خبرنامه"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryHover} 100%)`,
          }}
        >
          <IoPaperPlaneOutline className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs text-emerald-400"
          >
            <IoCheckmarkCircle className="w-4 h-4" />
            عضویت شما با موفقیت ثبت شد
          </motion.p>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-white/30 leading-relaxed"
          >
            جدیدترین مقالات و اخبار حقوقی را دریافت کنید
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};

// ============================================
// Scroll To Top Button
// ============================================
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="بازگشت به بالای صفحه"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryHover} 100%)`,
          }}
        >
          <IoArrowUpOutline className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ============================================
// Footer Component
// ============================================
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className="text-white relative overflow-hidden"
        style={{ backgroundColor: BRAND.deep }}
        dir="rtl"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND.primary}, transparent)`,
          }}
          aria-hidden
        />

        {/* Single subtle glow */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: BRAND.primary }}
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          {/* ============================================
              Main Grid
              ============================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Brand — 4 cols */}
            <div className="lg:col-span-4 space-y-5">
              <Link
                to="/"
                className="flex items-center gap-2.5 group"
                aria-label="راشا عدالت"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.deep} 100%)`,
                  }}
                >
                  <GiScales className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-lg tracking-tight">
                    راشا{' '}
                    <span style={{ color: BRAND.accent }}>عدالت</span>
                  </span>
                  <span className="text-[10px] text-white/40 tracking-wider uppercase mt-0.5">
                    مشاوره حقوقی هوشمند
                  </span>
                </div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                همراه با عدالت، از اولین قدم. راشا عدالت با ترکیب هوش مصنوعی
                پیشرفته و تیم متخصص وکلا، در کنار شماست.
              </p>

              {/* Contact info */}
              <ul className="space-y-2.5 pt-1">
                <li>
                  <a
                    href="tel:02112345678"
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors flex-shrink-0"
                      aria-hidden
                    >
                      <IoCallOutline
                        className="w-4 h-4"
                        style={{ color: BRAND.accent }}
                      />
                    </span>
                    ۰۲۱-۱۲۳۴-۵۶۷۸
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@rasha-adalat.ir"
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors flex-shrink-0"
                      aria-hidden
                    >
                      <IoMailOutline
                        className="w-4 h-4"
                        style={{ color: BRAND.accent }}
                      />
                    </span>
                    info@rasha-adalat.ir
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-3 text-sm text-white/60">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 flex-shrink-0"
                      aria-hidden
                    >
                      <IoLocationOutline
                        className="w-4 h-4"
                        style={{ color: BRAND.accent }}
                      />
                    </span>
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links — 2 cols */}
            <nav className="lg:col-span-2" aria-label="دسترسی سریع">
              <h3 className="text-sm font-semibold text-white mb-4">
                دسترسی سریع
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: BRAND.accent }}
                        aria-hidden
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services — 2 cols */}
            <nav className="lg:col-span-2" aria-label="خدمات">
              <h3 className="text-sm font-semibold text-white mb-4">
                خدمات ما
              </h3>
              <ul className="space-y-2.5">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: BRAND.accent }}
                        aria-hidden
                      />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter + Social — 4 cols */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  خبرنامه حقوقی
                </h3>
                <NewsletterForm />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-3">
                  ما را دنبال کنید
                </h3>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={[
                          'w-9 h-9 rounded-xl flex items-center justify-center',
                          'bg-white/5 text-white/50 border border-white/5',
                          'hover:bg-white/10 hover:border-white/10 transition-all duration-200 hover:-translate-y-0.5',
                          social.hoverColor,
                        ].join(' ')}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================
              Bottom Bar
              ============================================ */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center sm:text-right">
              © {currentYear} تمام حقوق مادی و معنوی این وب‌سایت متعلق به{' '}
              <span className="text-white/60 font-medium">راشا عدالت</span> است.
            </p>

            <div className="flex items-center gap-5">
              <Link
                to="/privacy"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                حریم خصوصی
              </Link>
              <span className="w-px h-3 bg-white/10" aria-hidden />
              <Link
                to="/terms"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                شرایط استفاده
              </Link>
              <span className="w-px h-3 bg-white/10" aria-hidden />
              <Link
                to="/contact"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top — fixed */}
      <ScrollToTop />
    </>
  );
};