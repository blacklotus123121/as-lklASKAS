import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Link2, FileBarChart2, Settings, LogOut,
  Plug, Bell, CreditCard, User, Zap, Share2, 
  Headphones, Smartphone, History, Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'UTM Builder', href: '/dashboard/utm-builder', icon: Link2 },
    { name: 'Integrations', href: '/dashboard/integrations', icon: Plug },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: FileBarChart2 },
    { name: 'Reports', href: '/dashboard/reports', icon: FileBarChart2 },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'My Account', href: '/dashboard/account', icon: User },
    { name: 'Advanced', href: '/dashboard/advanced', icon: Zap },
    { name: 'Refer & Earn 10%', href: '/dashboard/referral', icon: Share2 },
    { name: 'Support', href: '/dashboard/support', icon: Headphones },
    { name: 'Mobile App', href: '/dashboard/app', icon: Smartphone },
    { name: 'Year in Review', href: '/dashboard/review', icon: History },
    { name: 'Status', href: '/dashboard/status', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-muted p-4">
          <div className="flex items-center mb-8">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LotusFy
            </span>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={signOut}
            className="flex items-center px-4 py-2 mt-8 w-full text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;