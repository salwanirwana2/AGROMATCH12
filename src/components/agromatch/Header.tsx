"use client";

import React from 'react';
import { LayoutDashboard, Wheat, Store, Truck, LineChart, LogOut } from 'lucide-react';
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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl">
            🌱
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">AgroMatch</h1>
            <p className="text-xs text-gray-500">Hub Pangan Real-Time Provinsi Aceh</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <nav className="hidden md:flex space-x-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2",
                      activeTab === item.id 
                        ? "bg-white text-emerald-600 shadow-sm border border-gray-100" 
                        : "text-gray-500 hover:text-emerald-600 hover:bg-white"
                    )}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                <div className="hidden lg:block text-right">
                  <span className="text-xs font-bold block text-gray-900">{user.name}</span>
                  <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-tighter">{user.role}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onLogout}
                  className="text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            </>
          ) : (
            <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
              <a href="#" className="text-emerald-600">Beranda</a>
              <a href="#" class="hover:text-emerald-600 transition">Tentang Kami</a>
              <a href="#" class="hover:text-emerald-600 transition">Bantuan</a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;