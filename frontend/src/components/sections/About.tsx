import React from 'react';
import { SectionTitle } from '../common/SectionTitle';

export const About: React.FC = () => {
  const stats = [
    { number: '۵۰۰۰+', label: 'مشاوره موفق' },
    { number: '۹۸%', label: 'رضایت کاربران' },
    { number: '۲۰۰+', label: 'وکیل متخصص' },
    { number: '۱۰۰%', label: 'حریم خصوصی' },
  ];

  const features = [
    'بیش از ۱۰۰۰ پرونده موفق',
    'تیم متخصص و مجرب',
    'پاسخگویی ۲۴ ساعته',
    'حفظ حریم خصوصی',
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="درباره" 
          highlight="راشا عدالت"
          subtitle="همراه شما در مسیر عدالت و حقوق"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div data-aos="fade-up">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0A1A2B] mb-4">
              چرا راشا عدالت؟
            </h3>
            <p className="text-[#4A5A6E] text-base leading-relaxed mb-6">
              راشا عدالت با بهره‌گیری از تیمی مجرب از وکلا و مشاوران حقوقی، 
              بستری امن و حرفه‌ای برای دریافت مشاوره حقوقی فراهم کرده است.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-[#4A5A6E]">
                  <i className="fas fa-check-circle text-[#1A4B6D] text-lg"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="100">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-[#F5F3F0] p-6 rounded-xl text-center hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300"
              >
                <span className="block text-3xl md:text-4xl font-bold text-[#1A4B6D]">
                  {stat.number}
                </span>
                <span className="text-sm text-[#4A5A6E]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};