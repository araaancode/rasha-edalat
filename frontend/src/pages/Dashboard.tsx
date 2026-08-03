// frontend/src/pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AppDispatch, RootState } from '../store';
import { getConversations } from '../store/slices/chatSlice';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  IoChatbubbleOutline, 
  IoPersonOutline,
  IoArrowBackOutline,
  IoSparklesOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiRobot2Line } from 'react-icons/ri';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { conversations, isLoading } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(getConversations({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Quick actions data
  const quickActions = [
    {
      id: 'ai-chat',
      title: 'مشاوره با هوش مصنوعی',
      subtitle: 'پاسخ فوری ۲۴/۷',
      icon: RiRobot2Line,
      to: '/chat/new',
      badge: 'جدید',
    },
    {
      id: 'lawyer',
      title: 'مشاوره با وکیل',
      subtitle: 'مشاوره تخصصی حقوقی',
      icon: HiOutlineUserGroup,
      to: '/lawyers',
      badge: 'حرفه‌ای',
    },
    {
      id: 'profile',
      title: 'پروفایل من',
      subtitle: 'مدیریت اطلاعات شخصی',
      icon: IoPersonOutline,
      to: '/profile',
      badge: null,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      {/* Hero Section - Improved Readability */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1A2B] via-[#1A4B6D] to-[#0A1A2B] p-8 lg:p-12 shadow-2xl"
      >
        {/* Ambient Background Effects - Reduced opacity for better contrast */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A8AB5]/40 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A8AB5]/30 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        {/* Grid Pattern Overlay - Reduced opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Avatar / Illustration */}
          <motion.div 
            // whileHover={{ scale: 1.05, rotate: -2 }}
            // transition={{ type: 'spring', stiffness: 400 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 lg:w-64 lg:h-64">
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#4A8AB5] to-[#1A4B6D] rounded-2xl blur-2xl opacity-40" /> */}
              <img
                src="https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg"
                alt="مشاوره حقوقی هوشمند"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20"
              />
              {/* Online Status Badge */}
              {/* <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-2 border-[#0A1A2B]">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div> */}
            </div>
          </motion.div>

          {/* Content - Improved readability */}
          <div className="flex-1 text-center lg:text-right space-y-5">
         

            {/* Main Title - Larger and bolder for better readability */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              به سامانه مشاوره حقوقی
              <br />
              <span className="bg-gradient-to-r from-[#6BB8E0] to-[#4A8AB5] bg-clip-text text-transparent drop-shadow-lg">
                هوشمند راشا عدالت
              </span>
            </h1>

            {/* Description - Better contrast and larger text */}
            <p className="text-white/90 text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium backdrop-blur-sm bg-black/10 p-4 rounded-xl">
              با استفاده از هوش مصنوعی پیشرفته و تیم متخصص وکلا، 
              پاسخ سوالات حقوقی خود را در سریع‌ترین زمان دریافت کنید
            </p>

            {/* CTA Buttons - Larger and more prominent */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-3">
              <Link
                to="/chat/new"
                className="group relative px-10 py-4 bg-[#4A8AB5] rounded-xl font-bold text-white text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  شروع مشاوره
                  <IoChatbubbleOutline className="text-xl group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#1A4B6D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/lawyers"
                className="px-10 py-4 bg-white/15 backdrop-blur-sm rounded-xl font-bold text-white text-lg hover:bg-white/25 transition-all duration-300 border-2 border-white/20 hover:border-white/30 hover:scale-105"
              >
                مشاهده وکلا
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        variants={itemVariants}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-[#0A1A2B] dark:text-white flex items-center gap-3">
          {/* <IoSparklesOutline className="text-[#4A8AB5] text-2xl" /> */}
          اقدامات سریع
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.to}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#0A1A2B] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#1A4B6D]/20 hover:border-[#4A8AB5]/40 hover:-translate-y-1"
            >
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-xl transition-all duration-300">
                  <action.icon className="w-6 h-6 " />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[#0A1A2B] dark:text-white text-base">
                      {action.title}
                    </h3>
                    {action.badge && (
                      <span className="text-xs px-2.5 py-1 bg-[#4A8AB5]/10 text-[#1A4B6D] dark:text-[#4A8AB5] rounded-full font-medium">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {action.subtitle}
                  </p>
                </div>
                
                <IoArrowBackOutline className="text-[#1A4B6D]/30 group-hover:text-[#1A4B6D] dark:text-gray-600 dark:group-hover:text-gray-300 transition-colors text-xl" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Info Banner with Glassmorphism - Improved readability */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] p-6 lg:p-8 border-2 border-[#4A8AB5]/30 shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A8AB5]/10 to-transparent" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
        
            <div>
              <h4 className="font-bold text-white text-lg">
                مشاوره حقوقی هوشمند و امن
              </h4>
              <p className="text-white/80 text-sm">
                از هوش مصنوعی راشا عدالت برای پاسخ به سوالات حقوقی خود استفاده کنید
              </p>
            </div>
          </div>
          
          <Link
            to="/chat/new"
            className="group flex items-center gap-2 px-8 py-3 bg-white rounded-xl font-bold text-[#0A1A2B] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#4A8AB5] hover:text-white"
          >
            شروع کنید
            <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};