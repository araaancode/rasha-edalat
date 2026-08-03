import React from 'react';
import { SectionTitle } from '../common/SectionTitle';

export const Services: React.FC = () => {
  const services = [
    { icon: 'fa-gavel', title: 'حقوق خانواده', desc: 'طلاق، حضانت، مهریه و مسائل خانوادگی' },
    { icon: 'fa-file-signature', title: 'حقوق قراردادها', desc: 'تنظیم و بررسی قراردادهای تجاری' },
    { icon: 'fa-briefcase', title: 'حقوق کار', desc: 'مشاوره در زمینه روابط کار و بیمه' },
    { icon: 'fa-handcuffs', title: 'حقوق کیفری', desc: 'دفاع در دعاوی کیفری و جرایم' },
    { icon: 'fa-building', title: 'حقوق شرکت‌ها', desc: 'ثبت شرکت، سرمایه‌گذاری و تجارت' },
    { icon: 'fa-home', title: 'حقوق ملکی', desc: 'مشاوره در خرید، فروش و اجاره ملک' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="خدمات" 
          highlight="حقوقی"
          subtitle="در تمام حوزه‌های حقوقی کنار شما هستیم"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-[#F5F3F0] p-6 rounded-2xl text-center hover:shadow-xl hover:translate-y-[-6px] transition-all duration-300 border border-transparent hover:border-[#1A4B6D]"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0A1A2B] mb-2">{service.title}</h3>
              <p className="text-sm text-[#4A5A6E] mb-3">{service.desc}</p>
              <a href="#" className="text-[#1A4B6D] text-sm font-medium inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
                اطلاعات بیشتر <i className="fas fa-arrow-left text-xs"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};