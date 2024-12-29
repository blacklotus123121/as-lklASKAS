import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const UtmBuilder = React.lazy(() => import('./pages/UtmBuilder'));
const Integrations = React.lazy(() => import('./pages/Integrations'));
const Campaigns = React.lazy(() => import('./pages/Campaigns'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Subscription = React.lazy(() => import('./pages/Subscription'));
const Account = React.lazy(() => import('./pages/Account'));
const Advanced = React.lazy(() => import('./pages/Advanced'));
const Referral = React.lazy(() => import('./pages/Referral'));
const Support = React.lazy(() => import('./pages/Support'));
const MobileApp = React.lazy(() => import('./pages/MobileApp'));
const YearInReview = React.lazy(() => import('./pages/YearInReview'));
const Status = React.lazy(() => import('./pages/Status'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="utm-builder" element={<UtmBuilder />} />
                <Route path="integrations/*" element={<Integrations />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="reports" element={<Reports />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="account" element={<Account />} />
                <Route path="advanced" element={<Advanced />} />
                <Route path="referral" element={<Referral />} />
                <Route path="support" element={<Support />} />
                <Route path="app" element={<MobileApp />} />
                <Route path="review" element={<YearInReview />} />
                <Route path="status" element={<Status />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" theme="dark" />
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;