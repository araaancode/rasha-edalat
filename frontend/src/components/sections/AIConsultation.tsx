// frontend/src/components/sections/AIConsultation.tsx
import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { Button } from '../common/Button';
import { 
  MdSmartToy,
  MdAccessTime,
  MdSecurity,
  MdGavel,
  MdSchool,
  MdInfoOutline,
  MdArrowBack,
  MdBalance,
  MdWorkspacePremium
} from 'react-icons/md';
// import { GrUserGraduate } from 'react-icons/gr';
import { HiAcademicCap } from 'react-icons/hi';
import { GiJusticeStar } from 'react-icons/gi';
import { RiRobot2Line, RiShieldCheckLine } from 'react-icons/ri';
import { TbScale } from 'react-icons/tb';
import { LuScale } from 'react-icons/lu';

export const AIConsultation: React.FC = () => {
  const features = [
    { icon: MdAccessTime, text: 'پاسخگویی ۲۴ ساعته' },
    { icon: RiShieldCheckLine, text: 'حریم خصوصی کامل' },
    { icon: MdGavel, text: 'پوشش تمام حوزه‌ها' },
    { icon: MdGavel, text: 'مبتنی بر قوانین ایران' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#F8F9FA] relative overflow-hidden" id="ai-section">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="مشاوره با" 
          highlight="هوش مصنوعی"
          subtitle="سوالات حقوقی خود را مطرح کنید و پاسخ فوری دریافت کنید"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - Left Side */}
          <div className="order-2 lg:order-1" data-aos="fade-up">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#1A4B6D]/20 relative overflow-hidden group">
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1A4B6D]/5 rounded-full blur-2xl group-hover:bg-[#1A4B6D]/10 transition-all duration-500"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4A8AB5]/5 rounded-full blur-2xl group-hover:bg-[#4A8AB5]/10 transition-all duration-500"></div>
              
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transform transition-all duration-300">
                    <RiRobot2Line className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1A2B]">
                      دستیار هوشمند حقوقی
                    </h3>
                    <p className="text-sm text-[#4A5A6E] opacity-60">پاسخگویی مبتنی بر AI</p>
                  </div>
                </div>
                
                <p className="text-[#4A5A6E] text-base leading-relaxed mb-6 pr-2">
                  از هوش مصنوعی پیشرفته ما برای دریافت مشاوره اولیه در مورد مسائل حقوقی خود استفاده کنید. پاسخ‌های فوری و دقیق مبتنی بر قوانین روز ایران.
                </p>
                
                {/* Features Grid - Improved */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li 
                        key={index} 
                        className="flex items-center gap-3 text-[#4A5A6E] text-sm py-2.5 px-3 rounded-xl bg-[#F8F9FA] hover:bg-[#EAE7E2] transition-all duration-300 group/item"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform duration-300">
                          <Icon className="text-xs" />
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Note - Improved */}
                <div className="bg-gradient-to-r from-[#EAE7E2] to-[#F5F3F0] p-4 rounded-xl flex items-start gap-3 text-sm text-[#4A5A6E] border-r-3 border-[#1A4B6D] shadow-sm">
                  <div className="w-8 h-8 bg-[#1A4B6D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdInfoOutline className="text-[#1A4B6D] text-lg" />
                  </div>
                  <span className="leading-relaxed">این مشاوره مقدماتی است و جایگزین مشاوره حضوری با وکیل نمی‌شود.</span>
                </div>

                {/* Button - Improved */}
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full mt-6 group/btn relative overflow-hidden"
                  icon={<RiRobot2Line className="group-hover/btn:animate-pulse" />}
                  href="/ai-consultation"
                >
                  <span className="relative z-10">شروع مشاوره با AI</span>
                  <MdArrowBack className="relative z-10 mr-2 group-hover/btn:translate-x-[-4px] transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </Button>
              </div>
            </div>
          </div>

          {/* Images - Right Side */}
          <div className="order-1 lg:order-2 space-y-4" data-aos="fade-up" data-aos-delay="100">
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 group">
              <img 
                src="./images/hero/3.jpg"
                alt="مشاوره حقوقی" 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2B]/60 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 right-4 bg-[#0A1A2B]/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2 shadow-lg border border-white/10">
                <TbScale className="text-[#4A8AB5] text-lg" />
                مشاوره تخصصی
              </span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 group">
              <img 
                src="./images/hero/2.jpg"
                alt="حقوق و عدالت" 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2B]/60 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 right-4 bg-[#0A1A2B]/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2 shadow-lg border border-white/10">
                <GiJusticeStar className="text-[#4A8AB5]" />
                عدالت هوشمند
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};