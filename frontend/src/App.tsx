// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { getMe } from './store/slices/authSlice';
import { LoadingPage } from './components/LoadingPage';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Lawyers } from './pages/Lawyers';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // اگر توکن وجود دارد ولی کاربر لود نشده، اطلاعات کاربر را دریافت کن
    if (localStorage.getItem('accessToken') && !isAuthenticated) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <LoadingPage message="در حال بررسی احراز هویت..." />;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Layout Wrapper for Protected Routes
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="در حال آماده‌سازی..." />;
  }

  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A1A2B',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#4A8AB5',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        
        <Route
          path="/chat"
          element={
            <ProtectedLayout>
              <Chat />
            </ProtectedLayout>
          }
        >
          <Route path="new" element={<Chat />} />
          <Route path=":conversationId" element={<Chat />} />
        </Route>
        
        <Route
          path="/lawyers"
          element={
            <ProtectedLayout>
              <Lawyers />
            </ProtectedLayout>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;