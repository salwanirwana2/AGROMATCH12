"use client";

import React from 'react';
import { LayoutDashboard, Wheat, Store, Truck, LineChart, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const Header = ({ activeTab, setActiveTab, user, onLogout }: HeaderProps) => {
  const getNavItems = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Matchmaker', icon: LayoutDashboard },
        { id: 'forecasting', label: 'Forecasting AI', icon: LineChart },
      ];
    }
    if (user.role === 'koperasi') {
      return [{ id: 'supply', label: 'Portal Suplai', icon: Wheat }];
    }
    if (user.role === 'retail') {
      return [{ id: 'demand', label: 'Portal Permintaan', icon: Store }];
    }
    if (user.role === 'logistik') {
      return [{ id: 'logistics', label: 'Distribusi', icon: Truck }];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-1 rounded-xl flex items-center justify-center shadow-md overflow-hidden w-12 h-12">
            <img 
              src="/src/assets/logo.png" 
              alt="AgroMatch Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight block">AgroMatch</span>
            <span className="text-xs text-emerald-300">Hub Pangan Real-Time Provinsi Aceh</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <nav className="flex flex-wrap justify-center gap-1 bg-emerald-950 p-1 rounded-xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
                    activeTab === item.id 
                      ? "bg-emerald-500 text-white shadow-md" 
                      : "text-emerald-300 hover:text-white hover:bg-emerald-900/50"
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {user && (
            <div className="flex items-center gap-3 pl-4 border-l border-emerald-800">
              <div className="hidden lg:block text-right">
                <span className="text-xs font-bold block text-white">{user.name}</span>
                <span className="text-[10px] text-emerald-400 uppercase tracking-tighter">{user.role}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onLogout}
                className="text-emerald-300 hover:text-white hover:bg-rose-500/20 rounded-xl"
              >
                <LogOut size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;