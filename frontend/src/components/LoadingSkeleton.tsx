// frontend/src/components/LoadingSkeleton.tsx
import React from 'react';
import { 
  MdChat, 
  MdDashboard, 
  MdNotifications,
  MdPerson,
  MdAccessTime,
  MdPhone,
  MdEmail,
  MdSettings,
  MdHelp,
  MdInfo,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdHome,
  MdSearch,
  MdMenu,
  MdClose,
  MdArrowForward,
  MdArrowBack,
  MdRefresh,
  MdDownload,
  MdUpload,
  MdDelete,
  MdEdit,
  MdAdd,
  MdRemove,
  MdSave,
  MdCancel,
  MdPrint,
  MdShare,
  MdFavorite,
  MdStar,
  MdLock,
  MdUnlock,
  MdVisibility,
  MdVisibilityOff,
  MdAccountCircle,
  MdAssignment,
  MdCalendarToday,
  MdDescription,
  MdFolder,
  MdImage,
  MdVideoLibrary,
  MdAudiotrack,
  MdAttachFile,
  MdLink,
  MdCode,
  MdTerminal,
  MdBugReport,
  MdAnalytics,
  MdTrendingUp,
  MdTrendingDown,
  MdBarChart,
  MdPieChart,
  MdTimeline,
  MdTableChart,
  MdMap,
  MdLocationOn,
  MdPlace,
  MdRoom,
  MdPinDrop,
  MdDirections,
  MdNavigateNext,
  MdNavigateBefore,
  MdMenuBook,
  MdSchool,
  MdWork,
  MdBusiness,
  MdHomeWork,
  MdApartment,
  MdCottage,
  MdVilla,
  MdHouse,
  MdHolidayVillage,
  MdStorefront,
  MdShoppingCart,
  MdPayment,
  MdCreditCard,
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdMonetizationOn,
  MdReceipt,
  MdRequestQuote,
  MdAssessment,
  MdTrendingFlat,
  MdCompareArrows,
  MdSwapHoriz,
  MdSwapVert,
  MdSwapCalls,
  MdCallSplit,
  MdMergeType,
  MdTransform,
  MdSync,
  MdSyncAlt,
  MdSettingsBackupRestore,
  MdSettingsInputComponent,
  MdSettingsPhone,
  MdSettingsRemote,
  MdSettingsVoice,
  MdSettingsPower,
  MdSettingsApplications,
  MdSettingsBrightness,
  MdSettingsCell,
  MdSettingsEthernet,
  MdSettingsInputAntenna,
  MdSettingsInputComposite,
  MdSettingsInputHdmi,
  MdSettingsInputSvideo,
  MdSettingsOverscan,
  MdSettingsSystemDaydream,
  MdSettingsTimelapse,
  MdBluetooth,
  MdBluetoothDisabled,
  MdBluetoothConnected,
  MdBluetoothSearching,
  MdWifi,
  MdWifiOff,
  MdSignalWifiStatusbarConnectedNoInternet4,
  MdSignalWifiStatusbarNull,
  MdSignalWifiStatusbarNotConnected,
  MdSignalCellularConnectedNoInternet0Bar,
  MdSignalCellularConnectedNoInternet4Bar,
  MdSignalCellularNoSim,
  MdSignalCellularNull,
  MdSignalCellularOff,
  MdBatteryUnknown,
  MdBatteryStd,
  MdBatteryFull,
  MdBatteryChargingFull,
  MdBatteryAlert,
  MdBattery20,
  MdBattery30,
  MdBattery50,
  MdBattery60,
  MdBattery80,
  MdBattery90,
  MdStorage,
  MdSdStorage,
  MdSimCard,
  MdSimCardAlert,
  MdSimCardDownload,
  MdNetworkCheck,
  MdNetworkLocked,
  MdNetworkWifi,
  MdNetworkWifi1Bar,
  MdNetworkWifi2Bar,
  MdNetworkWifi3Bar,
  MdNetworkPing,
  MdVpnKey,
  MdVpnLock,
  MdDns,
  MdHttp,
  MdHttps,
  MdLockClock,
  MdLockOutline,
  MdLockOpen,
  MdLockReset,
  MdNoEncryption,
  MdNoEncryptionGmailerrorred,
  MdPassword,
  MdSecurity,
  MdSecurityUpdate,
  MdSecurityUpdateGood,
  MdSecurityUpdateWarning,
  MdVerified,
  MdVerifiedUser,
  MdVpnKeyOff,
  MdGavel,
  MdBalance,
  MdScale,
  MdJustice,
  MdCourt,
  MdLaw,
  MdLegal,
  MdGavel as MdGavelIcon,
  MdBalance as MdBalanceIcon,
  MdScale as MdScaleIcon,
  MdJustice as MdJusticeIcon,
  MdCourt as MdCourtIcon,
  MdLaw as MdLawIcon,
  MdLegal as MdLegalIcon
} from 'react-icons/md';
import { RiQuestionFill } from 'react-icons/ri';
import { TbHeadset } from 'react-icons/tb';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export const LoadingSkeleton: React.FC = () => {
  // آیکون‌های استفاده شده در این کامپوننت (برای مرجع)
  const icons = {
    chat: MdChat,
    dashboard: MdDashboard,
    notifications: MdNotifications,
    person: MdPerson,
    accessTime: MdAccessTime,
    phone: MdPhone,
    email: MdEmail,
    settings: MdSettings,
    help: MdHelp,
    info: MdInfo,
    warning: MdWarning,
    checkCircle: MdCheckCircle,
    error: MdError,
    home: MdHome,
    search: MdSearch,
    menu: MdMenu,
    close: MdClose,
    arrowForward: MdArrowForward,
    arrowBack: MdArrowBack,
    refresh: MdRefresh,
    download: MdDownload,
    upload: MdUpload,
    delete: MdDelete,
    edit: MdEdit,
    add: MdAdd,
    remove: MdRemove,
    save: MdSave,
    cancel: MdCancel,
    print: MdPrint,
    share: MdShare,
    favorite: MdFavorite,
    star: MdStar,
    lock: MdLock,
    unlock: MdUnlock,
    visibility: MdVisibility,
    visibilityOff: MdVisibilityOff,
    accountCircle: MdAccountCircle,
    assignment: MdAssignment,
    calendarToday: MdCalendarToday,
    description: MdDescription,
    folder: MdFolder,
    image: MdImage,
    videoLibrary: MdVideoLibrary,
    audiotrack: MdAudiotrack,
    attachFile: MdAttachFile,
    link: MdLink,
    code: MdCode,
    terminal: MdTerminal,
    bugReport: MdBugReport,
    analytics: MdAnalytics,
    trendingUp: MdTrendingUp,
    trendingDown: MdTrendingDown,
    barChart: MdBarChart,
    pieChart: MdPieChart,
    timeline: MdTimeline,
    tableChart: MdTableChart,
    map: MdMap,
    locationOn: MdLocationOn,
    place: MdPlace,
    room: MdRoom,
    pinDrop: MdPinDrop,
    directions: MdDirections,
    navigateNext: MdNavigateNext,
    navigateBefore: MdNavigateBefore,
    menuBook: MdMenuBook,
    school: MdSchool,
    work: MdWork,
    business: MdBusiness,
    homeWork: MdHomeWork,
    apartment: MdApartment,
    cottage: MdCottage,
    villa: MdVilla,
    house: MdHouse,
    holidayVillage: MdHolidayVillage,
    storefront: MdStorefront,
    shoppingCart: MdShoppingCart,
    payment: MdPayment,
    creditCard: MdCreditCard,
    accountBalance: MdAccountBalance,
    accountBalanceWallet: MdAccountBalanceWallet,
    attachMoney: MdAttachMoney,
    monetizationOn: MdMonetizationOn,
    receipt: MdReceipt,
    requestQuote: MdRequestQuote,
    assessment: MdAssessment,
    trendingFlat: MdTrendingFlat,
    compareArrows: MdCompareArrows,
    swapHoriz: MdSwapHoriz,
    swapVert: MdSwapVert,
    swapCalls: MdSwapCalls,
    callSplit: MdCallSplit,
    mergeType: MdMergeType,
    transform: MdTransform,
    sync: MdSync,
    syncAlt: MdSyncAlt,
    settingsBackupRestore: MdSettingsBackupRestore,
    settingsInputComponent: MdSettingsInputComponent,
    settingsPhone: MdSettingsPhone,
    settingsRemote: MdSettingsRemote,
    settingsVoice: MdSettingsVoice,
    settingsPower: MdSettingsPower,
    settingsApplications: MdSettingsApplications,
    settingsBrightness: MdSettingsBrightness,
    settingsCell: MdSettingsCell,
    settingsEthernet: MdSettingsEthernet,
    settingsInputAntenna: MdSettingsInputAntenna,
    settingsInputComposite: MdSettingsInputComposite,
    settingsInputHdmi: MdSettingsInputHdmi,
    settingsInputSvideo: MdSettingsInputSvideo,
    settingsOverscan: MdSettingsOverscan,
    settingsSystemDaydream: MdSettingsSystemDaydream,
    settingsTimelapse: MdSettingsTimelapse,
    bluetooth: MdBluetooth,
    bluetoothDisabled: MdBluetoothDisabled,
    bluetoothConnected: MdBluetoothConnected,
    bluetoothSearching: MdBluetoothSearching,
    wifi: MdWifi,
    wifiOff: MdWifiOff,
    signalWifiStatusbarConnectedNoInternet4: MdSignalWifiStatusbarConnectedNoInternet4,
    signalWifiStatusbarNull: MdSignalWifiStatusbarNull,
    signalWifiStatusbarNotConnected: MdSignalWifiStatusbarNotConnected,
    signalCellularConnectedNoInternet0Bar: MdSignalCellularConnectedNoInternet0Bar,
    signalCellularConnectedNoInternet4Bar: MdSignalCellularConnectedNoInternet4Bar,
    signalCellularNoSim: MdSignalCellularNoSim,
    signalCellularNull: MdSignalCellularNull,
    signalCellularOff: MdSignalCellularOff,
    batteryUnknown: MdBatteryUnknown,
    batteryStd: MdBatteryStd,
    batteryFull: MdBatteryFull,
    batteryChargingFull: MdBatteryChargingFull,
    batteryAlert: MdBatteryAlert,
    battery20: MdBattery20,
    battery30: MdBattery30,
    battery50: MdBattery50,
    battery60: MdBattery60,
    battery80: MdBattery80,
    battery90: MdBattery90,
    storage: MdStorage,
    sdStorage: MdSdStorage,
    simCard: MdSimCard,
    simCardAlert: MdSimCardAlert,
    simCardDownload: MdSimCardDownload,
    networkCheck: MdNetworkCheck,
    networkLocked: MdNetworkLocked,
    networkWifi: MdNetworkWifi,
    networkWifi1Bar: MdNetworkWifi1Bar,
    networkWifi2Bar: MdNetworkWifi2Bar,
    networkWifi3Bar: MdNetworkWifi3Bar,
    networkPing: MdNetworkPing,
    vpnKey: MdVpnKey,
    vpnLock: MdVpnLock,
    dns: MdDns,
    http: MdHttp,
    https: MdHttps,
    lockClock: MdLockClock,
    lockOutline: MdLockOutline,
    lockOpen: MdLockOpen,
    lockReset: MdLockReset,
    noEncryption: MdNoEncryption,
    noEncryptionGmailerrorred: MdNoEncryptionGmailerrorred,
    password: MdPassword,
    security: MdSecurity,
    securityUpdate: MdSecurityUpdate,
    securityUpdateGood: MdSecurityUpdateGood,
    securityUpdateWarning: MdSecurityUpdateWarning,
    verified: MdVerified,
    verifiedUser: MdVerifiedUser,
    vpnKeyOff: MdVpnKeyOff,
    gavel: MdGavel,
    balance: MdBalance,
    scale: MdScale,
    justice: MdJustice,
    court: MdCourt,
    law: MdLaw,
    legal: MdLegal,
    gavelIcon: MdGavelIcon,
    balanceIcon: MdBalanceIcon,
    scaleIcon: MdScaleIcon,
    justiceIcon: MdJusticeIcon,
    courtIcon: MdCourtIcon,
    lawIcon: MdLawIcon,
    legalIcon: MdLegalIcon
  };

  return (
    <div className="animate-pulse space-y-6">
      {/* هدر */}
      <div className="h-14 bg-gradient-to-r from-[#1A4B6D]/20 to-[#4A8AB5]/20 rounded-2xl w-full"></div>
      
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1A4B6D]/20 to-[#4A8AB5]/20 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* بخش اصلی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* مکالمات اخیر */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100/50">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1A4B6D]/20 to-[#4A8AB5]/20 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-40 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* اقدامات سریع */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#1A4B6D]/10">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A4B6D]/20 to-[#4A8AB5]/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>

      {/* بنر اطلاع‌رسانی */}
      <div className="bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] rounded-2xl p-6 shadow-lg border border-[#4A8AB5]/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#4A8AB5]/20 rounded-full animate-pulse"></div>
            <div>
              <div className="h-5 bg-white/20 rounded w-48 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-64"></div>
            </div>
          </div>
          <div className="h-10 bg-[#4A8AB5]/30 rounded-lg w-28"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, 
            rgba(26, 75, 109, 0.05) 25%, 
            rgba(74, 138, 181, 0.15) 50%, 
            rgba(26, 75, 109, 0.05) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};