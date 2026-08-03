// frontend/src/components/sections/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IoArrowBackOutline,
  IoPlayCircleOutline,
  IoPlayOutline,
  IoChevronBackOutline
} from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';
import { BiBot } from 'react-icons/bi';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-[104px] md:-mt-[112px] pt-[104px] md:pt-[112px]" id="home">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: `url('./images/hero/1.jpg')`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2B]/90 via-[#0A1A2B]/70 to-[#0A1A2B]/40"></div>
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A8AB5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#1A4B6D]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
            {/* Right Side - Content */}
            <div className="text-right lg:col-span-1">
              

              {/* Title */}
              <div className="mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                  <span className="block mb-2">مشاوره حقوقی</span>
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#4A8AB5] via-[#6AA8C5] to-[#8AC8E5] bg-clip-text text-transparent animate-pulse-slow">
                      هوشمند
                    </span>
                  </span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl text-white/40 mt-4 font-light tracking-wide">
                    با <span className="text-white/60 font-semibold">راشا عدالت</span>
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-lg mr-auto mb-10 leading-relaxed font-light">
                دریافت مشاوره تخصصی با بهترین وکلای کشور،
                <span className="block"> به صورت آنلاین و حضوری</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 items-end">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(26,75,109,0.4)] hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">شروع کنید</span>
                  <IoArrowBackOutline className="relative z-10 group-hover:translate-x-[-4px] transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <a
                  href="#ai-section"
                  className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-2xl"
                >
                  <MdOutlineSmartToy className="group-hover:animate-pulse text-2xl" />
                  <span>مشاوره با AI</span>
                  <IoChevronBackOutline className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Left Side - Video Player */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Video Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0A1A2B]/50 backdrop-blur-sm">
                  {/* Video Player */}
                  <div className="aspect-video relative">
                    <iframe
                      src="https://www.aparat.com/video/video/embed/videohash/uglh746/vt/frame"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full border-0"
                      title="ویدیو مشاوره حقوقی"
                    />
                    
                    {/* Play Button Overlay (Fallback) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-[#1A4B6D]/80 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/20 shadow-2xl">
                        <IoPlayOutline className="text-white text-3xl mr-1" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A1A2B]/90 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <IoPlayCircleOutline className="text-[#4A8AB5] text-xl" />
                        <span className="text-sm font-medium">ویدیو معرفی</span>
                      </div>
                      <span className="text-xs text-white/40">۰۲:۳۴</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements around Video */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1A4B6D]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#4A8AB5]/10 rounded-full blur-2xl"></div>
                
              
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};