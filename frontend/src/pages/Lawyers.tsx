// frontend/src/pages/Lawyers.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  // FaStarHalfAlt, // حذف - استفاده نشده
  // FaRegStar, // حذف - استفاده نشده
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { 
  PiUserCircleBold,
  PiChatCircleBold,
  PiPhoneBold,
  PiEnvelopeBold,
  PiMapPinBold,
  PiGavelBold,
  PiGraduationCapBold,
  PiClockBold,
  PiMedalBold,
  PiMagnifyingGlassBold,
  PiFunnelBold,
  PiXCircleBold,
} from 'react-icons/pi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

interface Lawyer {
  id: string;
  fullName: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  location: string;
  isVerified: boolean;
  isOnline: boolean;
  pricePerHour: number;
  description: string;
  avatar: string;
  casesWon?: number;
  responseTime?: string;
}

export const Lawyers: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Sample lawyers data با اطلاعات بیشتر
  const lawyers: Lawyer[] = [
    {
      id: '1',
      fullName: 'دکتر علی محمدی',
      specialty: 'حقوق خانواده',
      experience: 12,
      rating: 4.9,
      reviewsCount: 127,
      phone: '09123456789',
      email: 'ali.mohammadi@lawyer.com',
      location: 'تهران، خیابان ولیعصر',
      isVerified: true,
      isOnline: true,
      pricePerHour: 350000,
      description: 'وکیل پایه یک دادگستری با ۱۲ سال سابقه در حوزه حقوق خانواده، طلاق، حضانت و مهریه',
      avatar: 'https://ui-avatars.com/api/?name=علی+محمدی&background=1A4B6D&color=fff&size=100',
      casesWon: 89,
      responseTime: 'کمتر از ۱ ساعت'
    },
    {
      id: '2',
      fullName: 'دکتر سارا احمدی',
      specialty: 'حقوق قراردادها',
      experience: 8,
      rating: 4.8,
      reviewsCount: 98,
      phone: '09123456788',
      email: 'sara.ahmadi@lawyer.com',
      location: 'تهران، خیابان انقلاب',
      isVerified: true,
      isOnline: false,
      pricePerHour: 300000,
      description: 'وکیل پایه یک دادگستری با ۸ سال سابقه در حوزه حقوق قراردادها، تجاری و سرمایه‌گذاری',
      avatar: 'https://ui-avatars.com/api/?name=سارا+احمدی&background=1A4B6D&color=fff&size=100',
      casesWon: 67,
      responseTime: 'کمتر از ۲ ساعت'
    },
    {
      id: '3',
      fullName: 'دکتر رضا کریمی',
      specialty: 'حقوق کیفری',
      experience: 15,
      rating: 4.7,
      reviewsCount: 203,
      phone: '09123456787',
      email: 'reza.karimi@lawyer.com',
      location: 'تهران، خیابان مطهری',
      isVerified: true,
      isOnline: true,
      pricePerHour: 400000,
      description: 'وکیل پایه یک دادگستری با ۱۵ سال سابقه در حوزه حقوق کیفری، جرایم و دعاوی کیفری',
      avatar: 'https://ui-avatars.com/api/?name=رضا+کریمی&background=1A4B6D&color=fff&size=100',
      casesWon: 112,
      responseTime: 'کمتر از ۳۰ دقیقه'
    },
    {
      id: '4',
      fullName: 'دکتر نرگس حسینی',
      specialty: 'حقوق کار و تامین اجتماعی',
      experience: 6,
      rating: 4.6,
      reviewsCount: 67,
      phone: '09123456786',
      email: 'narges.hosseini@lawyer.com',
      location: 'تهران، خیابان کارگر',
      isVerified: true,
      isOnline: false,
      pricePerHour: 280000,
      description: 'وکیل پایه یک دادگستری با ۶ سال سابقه در حوزه حقوق کار، بیمه و تامین اجتماعی',
      avatar: 'https://ui-avatars.com/api/?name=نرگس+حسینی&background=1A4B6D&color=fff&size=100',
      casesWon: 43,
      responseTime: 'کمتر از ۳ ساعت'
    },
    {
      id: '5',
      fullName: 'دکتر محمد رضایی',
      specialty: 'حقوق شرکت‌ها',
      experience: 10,
      rating: 4.9,
      reviewsCount: 156,
      phone: '09123456785',
      email: 'mohammad.rezaei@lawyer.com',
      location: 'تهران، خیابان بهشتی',
      isVerified: true,
      isOnline: true,
      pricePerHour: 380000,
      description: 'وکیل پایه یک دادگستری با ۱۰ سال سابقه در حوزه حقوق شرکت‌ها، ثبت و سرمایه‌گذاری',
      avatar: 'https://ui-avatars.com/api/?name=محمد+رضایی&background=1A4B6D&color=fff&size=100',
      casesWon: 95,
      responseTime: 'کمتر از ۱ ساعت'
    },
    {
      id: '6',
      fullName: 'دکتر زهرا موسوی',
      specialty: 'حقوق ملکی',
      experience: 7,
      rating: 4.5,
      reviewsCount: 89,
      phone: '09123456784',
      email: 'zahra.mousavi@lawyer.com',
      location: 'تهران، خیابان آزادی',
      isVerified: true,
      isOnline: false,
      pricePerHour: 320000,
      description: 'وکیل پایه یک دادگستری با ۷ سال سابقه در حوزه حقوق ملکی، خرید، فروش و اجاره',
      avatar: 'https://ui-avatars.com/api/?name=زهرا+موسوی&background=1A4B6D&color=fff&size=100',
      casesWon: 56,
      responseTime: 'کمتر از ۲ ساعت'
    },
  ];

  const specialties = [
    'همه',
    'حقوق خانواده',
    'حقوق قراردادها',
    'حقوق کیفری',
    'حقوق کار و تامین اجتماعی',
    'حقوق شرکت‌ها',
    'حقوق ملکی',
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const matchesSearch = lawyer.fullName.includes(searchTerm) ||
        lawyer.specialty.includes(searchTerm) ||
        lawyer.location.includes(searchTerm);
      const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'همه' || lawyer.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'price') return a.pricePerHour - b.pricePerHour;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-gray-100/50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="جستجوی وکیل، تخصص یا شهر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 text-[#0A1A2B] placeholder-gray-400"
            />
            <PiMagnifyingGlassBold className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <PiXCircleBold className="text-lg" />
              </button>
            )}
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-[#1A4B6D] transition-all duration-300 text-[#0A1A2B] whitespace-nowrap"
          >
            <PiFunnelBold className="text-lg" />
            <span>فیلترها</span>
            {selectedSpecialty && (
              <span className="w-2 h-2 bg-[#1A4B6D] rounded-full"></span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 text-[#0A1A2B]"
          >
            <option value="rating">مرتب‌سازی: امتیاز</option>
            <option value="experience">مرتب‌سازی: سابقه</option>
            <option value="price">مرتب‌سازی: قیمت</option>
          </select>
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty === 'همه' ? '' : specialty)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    (selectedSpecialty === '' && specialty === 'همه') || selectedSpecialty === specialty
                      ? 'bg-[#1A4B6D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
            {selectedSpecialty && (
              <button
                onClick={() => setSelectedSpecialty('')}
                className="mt-3 text-sm text-[#1A4B6D] hover:underline flex items-center gap-1"
              >
                <PiXCircleBold />
                حذف فیلترها
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lawyers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#1A4B6D]/20 group overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={lawyer.avatar}
                    alt={lawyer.fullName}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  {lawyer.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full">
                      <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></span>
                    </span>
                  )}
                  {lawyer.isVerified && (
                    <span className="absolute -top-1 -right-1 bg-[#1A4B6D] rounded-full p-1 shadow-lg">
                      <MdVerified className="text-white text-xs" />
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-[#0A1A2B] group-hover:text-[#1A4B6D] transition-colors">
                        {lawyer.fullName}
                      </h3>
                      <p className="text-sm text-[#1A4B6D] font-medium">
                        {lawyer.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <span className="text-sm font-bold text-yellow-600">{lawyer.rating}</span>
                      <FaStar className="text-yellow-400 text-xs" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <PiGraduationCapBold className="text-[#1A4B6D]" />
                      {lawyer.experience} سال سابقه
                    </span>
                    <span className="flex items-center gap-1">
                      <PiChatCircleBold className="text-[#1A4B6D]" />
                      {lawyer.reviewsCount} نظر
                    </span>
                    <span className="flex items-center gap-1">
                      <PiGavelBold className="text-[#1A4B6D]" />
                      {lawyer.pricePerHour.toLocaleString()} تومان/ساعت
                    </span>
                    {lawyer.casesWon && (
                      <span className="flex items-center gap-1">
                        <PiMedalBold className="text-[#1A4B6D]" />
                        {lawyer.casesWon} پرونده موفق
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {lawyer.description}
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {lawyer.isOnline ? (
                      <span className="flex items-center gap-1 text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        آنلاین
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        آفلاین
                      </span>
                    )}
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                      <PiMapPinBold className="inline ml-1 text-xs" />
                      {lawyer.location}
                    </span>
                    {lawyer.responseTime && (
                      <span className="text-xs text-[#1A4B6D] bg-[#1A4B6D]/5 px-2 py-0.5 rounded-full">
                        <PiClockBold className="inline ml-1 text-xs" />
                        پاسخ: {lawyer.responseTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  to={`/chat/new?lawyer=${lawyer.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <PiUserCircleBold className="text-base" />
                  درخواست مشاوره
                </Link>
                <button
                  onClick={() => toast.success('شماره تماس نمایش داده شد')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <PiPhoneBold className="text-base" />
                </button>
                <button
                  onClick={() => toast.success('ایمیل نمایش داده شد')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <PiEnvelopeBold className="text-base" />
                </button>
                <button
                  onClick={() => toast.success('چت با وکیل شروع شد')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1A4B6D]/5 text-[#1A4B6D] text-sm font-medium rounded-xl hover:bg-[#1A4B6D]/10 transition-all duration-300"
                >
                  <PiChatCircleBold className="text-base" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLawyers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PiUserCircleBold className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-[#0A1A2B]">وکیلی یافت نشد</h3>
          <p className="text-gray-500 text-sm mt-1">
            سعی کنید فیلترهای جستجو را تغییر دهید
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('');
            }}
            className="mt-4 px-6 py-2.5 bg-[#1A4B6D] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <PiXCircleBold />
            حذف فیلترها
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};