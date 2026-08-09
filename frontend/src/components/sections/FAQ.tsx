// frontend/src/components/sections/FAQ.tsx
import React, { useState } from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { 
  MdKeyboardArrowDown, 
  MdReply, 
  MdArrowBack
} from 'react-icons/md';
import { RiQuestionFill } from 'react-icons/ri';
import { TbHeadset } from 'react-icons/tb';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { 
      q: 'چگونه می‌توانم از خدمات استفاده کنم؟', 
      a: 'با ثبت‌نام در سایت و انتخاب نوع مشاوره، می‌توانید از خدمات ما استفاده کنید. پس از ثبت‌نام، به پنل کاربری خود دسترسی پیدا می‌کنید و می‌توانید درخواست مشاوره خود را ثبت کنید.' 
    },
    { 
      q: 'هزینه مشاوره چقدر است؟', 
      a: 'هزینه مشاوره بر اساس نوع خدمات و مدت زمان تعیین می‌شود. هزینه‌ها به صورت شفاف در صفحه خدمات درج شده است و شما قبل از ثبت درخواست از هزینه نهایی مطلع می‌شوید.' 
    },
    { 
      q: 'آیا اطلاعات من محفوظ است؟', 
      a: 'بله، تمام اطلاعات شما با بالاترین سطح امنیت حفظ می‌شود. ما از پروتکل‌های رمزنگاری پیشرفته استفاده می‌کنیم و اطلاعات شما هرگز با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.' 
    },
    { 
      q: 'چگونه با وکیل ارتباط برقرار کنم؟', 
      a: 'پس از ثبت درخواست، به صورت آنلاین یا حضوری با وکیل ارتباط برقرار می‌کنید. شما می‌توانید از طریق چت، تماس تلفنی یا ویدئو کنفرانس با وکیل خود در ارتباط باشید.' 
    },
    {
      q: 'آیا مشاوره آنلاین معتبر است؟',
      a: 'بله، مشاوره آنلاین کاملاً معتبر و مطابق با قوانین جمهوری اسلامی ایران است. تمام مشاوره‌ها توسط وکلای مجرب و دارای پروانه وکالت ارائه می‌شود.'
    },
    {
      q: 'چقدر زمان برای پاسخگویی نیاز است؟',
      a: 'پاسخگویی به سوالات شما در اسرع وقت انجام می‌شود. به طور معمول، پاسخ سوالات ساده در کمتر از ۲۴ ساعت و مشاوره‌های تخصصی در کمتر از ۴۸ ساعت ارائه می‌شود.'
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#1A4B6D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A8AB5]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="سوالات" 
          highlight="متداول"
          subtitle="پاسخ به سوالات پرتکرار شما"
        />

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-[#1A4B6D]/20 ${
                  openIndex === index ? 'shadow-lg border-[#1A4B6D]/30' : ''
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-right p-5 md:p-6 flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] text-white shadow-md' 
                        : 'bg-[#F8F9FA] text-[#1A4B6D] group-hover:bg-[#EAE7E2]'
                    }`}>
                      <RiQuestionFill className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-semibold transition-all duration-300 ${
                        openIndex === index ? 'text-[#1A4B6D]' : 'text-[#0A1A2B]'
                      }`}>
                        {faq.q}
                      </h3>
                    </div>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-[#1A4B6D] text-white rotate-180' 
                      : 'bg-[#F8F9FA] text-[#4A5A6E] group-hover:bg-[#EAE7E2]'
                  }`}>
                    <MdKeyboardArrowDown className="text-sm" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1A4B6D]/5 flex items-center justify-center flex-shrink-0">
                          <MdReply className="text-[#1A4B6D] text-sm" />
                        </div>
                        <p className="text-sm md:text-base text-[#4A5A6E] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#4A5A6E] text-sm mb-4">
              سوال دیگری دارید؟ ما آماده پاسخگویی هستیم
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <TbHeadset className="text-lg" />
              تماس با پشتیبانی
              <MdArrowBack className="group-hover:translate-x-[-4px] transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};