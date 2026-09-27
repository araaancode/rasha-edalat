// frontend/src/components/Layout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

// ============================================
// صفحاتی که Layout اختصاصی (بدون Header/Footer عمومی) دارند
// ============================================
const DASHBOARD_ROUTES = [
  '/dashboard',
  '/chats',
  '/cases',
  '/profile',
  '/lawyers',
  '/settings',
  '/subscription',
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isDashboardRoute = DASHBOARD_ROUTES.some((path) =>
    location.pathname.startsWith(path),
  );

  // ============================================
  // حالت ۱: صفحات داشبورد — بدون Header/Footer عمومی، تمام‌عرض
  // ============================================
  if (isDashboardRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {children || <Outlet />}
      </div>
    );
  }

  // ============================================
  // حالت ۲: صفحات عمومی — با Header و Footer
  // ============================================
  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <Header />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-2">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};