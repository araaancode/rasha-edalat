import React from 'react';
import { SectionTitle } from '../common/SectionTitle';

export const Testimonials: React.FC = () => {
  const testimonials = [
    { name: 'رضا محمدی', text: 'خدمات راشا عدالت عالی بود. تیم حرفه‌ای و پاسخگویی سریع آنها قابل ستایش است.' },
    { name: 'سارا احمدی', text: 'بسیار راضی هستم. مشاوره دقیق و کامل دریافت کردم.' },
    { name: 'علی کریمی', text: 'پلتفرم عالی برای ارتباط با وکلای مجرب.' },
    { name: 'نرگس حسینی', text: 'تشکر از تیم راشا عدالت، راهنمایی‌های بسیار مفیدی دریافت کردم.' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#EAE7E2]" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="نظرات" 
          highlight="مشتریان"
          subtitle="آنچه مشتریان ما درباره راشا عدالت می‌گویند"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex gap-1 text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-sm"></i>
                ))}
              </div>
              <p className="text-[#4A5A6E] text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-[#0A1A2B]">{testimonial.name}</h4>
                  <span className="text-xs text-[#4A5A6E]">کاربر راشا عدالت</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};