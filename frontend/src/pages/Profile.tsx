// frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AppDispatch, RootState } from '../store';
import { updateProfile } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserTag, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaGavel,
  FaCalendarAlt,
  FaIdCard,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaLock,
  FaHistory,
  FaQuestionCircle
} from 'react-icons/fa';
import { MdVerified, MdSecurity } from 'react-icons/md';
import { GiScales } from 'react-icons/gi';
import {
  PiUserBold,
  PiEnvelopeBold,
  PiPhoneBold,
  PiTagBold,
  PiPencilBold,
  PiFloppyDiskBold,
  PiXBold,
  PiCheckCircleBold,
  PiShieldCheckBold,
  PiClockBold,
  PiGavelBold,
  PiCalendarBold,
  PiIdentificationCardBold,
  PiUserCircleBold,
  PiChatCircleBold,
  PiMedalBold,
  PiShieldBold,
  PiLockKeyBold,
  PiKeyBold,
  PiArrowRightBold,
  PiSignOutBold,
  PiGearBold,
  PiBellBold,
  PiClockCounterClockwiseBold,
  PiQuestionBold,
  PiUserListBold
} from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';

const profileSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی حداقل ۳ کاراکتر است'),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().regex(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است'),
  specialty: z.string().optional(),
  bio: z.string().max(500, 'بیوگرافی حداکثر ۵۰۰ کاراکتر است').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      specialty: user?.specialty || '',
      bio: user?.bio || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        bio: user.bio || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      await dispatch(updateProfile(data)).unwrap();
      toast.success('پروفایل با موفقیت به‌روزرسانی شد');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.message || 'خطا در به‌روزرسانی پروفایل');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      specialty: user?.specialty || '',
      bio: user?.bio || '',
    });
  };

  const handleLogout = () => {
    // dispatch(logout());
    toast.success('با موفقیت خارج شدید');
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'profile', label: 'پروفایل', icon: PiUserCircleBold },
    { id: 'settings', label: 'تنظیمات', icon: PiGearBold },
    { id: 'notifications', label: 'اعلان‌ها', icon: PiBellBold },
    { id: 'history', label: 'تاریخچه', icon: PiClockCounterClockwiseBold },
    { id: 'security', label: 'امنیت', icon: PiShieldBold },
    { id: 'help', label: 'راهنما', icon: PiQuestionBold },
  ];

  const stats = [
    { label: 'مشاوره‌ها', value: '۱۲', icon: PiGavelBold, color: 'from-[#1A4B6D] to-[#2A6A8D]' },
    { label: 'امتیاز', value: '۴.۸', icon: PiMedalBold, color: 'from-[#0A1A2B] to-[#1A4B6D]' },
    { label: 'عضو از', value: '۱۴۰۲', icon: PiCalendarBold, color: 'from-[#2A6A8D] to-[#4A8AB5]' },
    { label: 'وضعیت', value: 'فعال', icon: PiCheckCircleBold, color: 'from-[#1A4B6D] to-[#2A6A8D]' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#1A4B6D]/20 border-t-[#1A4B6D] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <GiScales className="text-[#1A4B6D] text-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 animate-fade-in">
      {/* Sidebar - Right Side */}
      <div className="w-72 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden sticky top-6">
          {/* User Card */}
          <div className="p-6 bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D] text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#4A8AB5] blur-xl opacity-30 rounded-full"></div>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.fullName || 'کاربر'}&background=4A8AB5&color=fff&size=100`}
                alt={user?.fullName}
                className="relative w-24 h-24 rounded-full border-4 border-white/20 shadow-2xl mx-auto"
              />
              {user?.isVerified && (
                <span className="absolute bottom-0 right-0 bg-[#1A4B6D] rounded-full p-1 border-2 border-white">
                  <MdVerified className="text-white text-sm" />
                </span>
              )}
            </div>
            <h3 className="mt-3 text-white font-bold text-lg">{user?.fullName}</h3>
            <p className="text-white/60 text-sm">{user?.specialty || 'کاربر عادی'}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                آنلاین
              </span>
              <span className="px-2 py-0.5 bg-[#4A8AB5]/20 text-[#4A8AB5] text-xs rounded-full">
                {user?.role === 'LAWYER' ? 'وکیل' : 'کاربر'}
              </span>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-right ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1A4B6D]'
                }`}
              >
                <item.icon className={`text-lg ${activeTab === item.id ? 'text-white' : 'text-[#1A4B6D]'}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <span className="mr-auto">
                    <PiArrowRightBold className="text-xs" />
                  </span>
                )}
              </button>
            ))}
            
            {/* Divider */}
            <div className="my-3 border-t border-gray-100"></div>
            
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-right text-red-600 hover:bg-red-50"
            >
              <PiSignOutBold className="text-lg" />
              <span className="text-sm font-medium">خروج از حساب</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
     
        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100/50 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A4B6D] to-[#2A6A8D] rounded-xl flex items-center justify-center text-white shadow-lg">
                  <PiIdentificationCardBold className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A1A2B]">اطلاعات شخصی</h3>
                  <p className="text-sm text-gray-500">مشاهده و ویرایش اطلاعات حساب کاربری</p>
                </div>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A4B6D] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <PiPencilBold className="text-base" />
                  ویرایش
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                  <PiUserBold className="inline ml-2 text-[#1A4B6D]" />
                  نام و نام خانوادگی
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    !isEditing ? 'bg-gray-50 border-gray-200 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                  } ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <PiXBold className="text-xs" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                  <PiEnvelopeBold className="inline ml-2 text-[#1A4B6D]" />
                  ایمیل
                </label>
                <input
                  {...register('email')}
                  type="email"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    !isEditing ? 'bg-gray-50 border-gray-200 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                  } ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <PiXBold className="text-xs" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                  <PiPhoneBold className="inline ml-2 text-[#1A4B6D]" />
                  شماره موبایل
                </label>
                <input
                  {...register('phone')}
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                    !isEditing ? 'bg-gray-50 border-gray-200 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                  } ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <PiXBold className="text-xs" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Specialty (only for lawyers) */}
              {user?.role === 'LAWYER' && (
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                    <PiTagBold className="inline ml-2 text-[#1A4B6D]" />
                    تخصص
                  </label>
                  <input
                    {...register('specialty')}
                    type="text"
                    disabled={!isEditing}
                    placeholder="مثال: حقوق خانواده"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 ${
                      !isEditing ? 'bg-gray-50 border-gray-200 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
              )}

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2B] mb-1.5">
                  <PiUserCircleBold className="inline ml-2 text-[#1A4B6D]" />
                  بیوگرافی
                </label>
                <textarea
                  {...register('bio')}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="درباره خودتان بنویسید..."
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A4B6D]/20 focus:border-[#1A4B6D] transition-all duration-300 resize-none ${
                    !isEditing ? 'bg-gray-50 border-gray-200 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                  } ${errors.bio ? 'border-red-500' : ''}`}
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <PiXBold className="text-xs" />
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A4B6D] to-[#2A6A8D] text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        در حال ذخیره...
                      </>
                    ) : (
                      <>
                        <PiFloppyDiskBold className="text-lg" />
                        ذخیره تغییرات
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    <PiXBold className="text-lg" />
                    انصراف
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

       
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};