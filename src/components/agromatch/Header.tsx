"use client";

import React from 'react';
import { LogOut, Wheat, LayoutDashboard, LineChart, Store, Truck } from 'lucide-react';
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
    if (user.role === 'admin') return [
      { id: 'dashboard', label: 'Matchmaker', icon: LayoutDashboard },
      { id: 'forecasting', label: 'Forecasting AI', icon: LineChart },
    ];
    if (user.role === 'koperasi') return [{ id: 'supply', label: 'Portal Suplai', icon: Wheat }];
    if (user.role === 'retail') return [{ id: 'demand', label: 'Portal Permintaan', icon: Store }];
    if (user.role === 'logistik') return [{ id: 'logistics', label: 'Distribusi', icon: Truck }];
    return [];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-[#4CAF50] p-2 rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
            <Wheat className="text-white" size={24} />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 tracking-tight block">AgroMatch</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hub Pangan Real-Time Provinsi Aceh</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <nav className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2",
                    activeTab === item.id 
                      ? "bg-white text-[#4CAF50] shadow-sm border border-slate-100" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <item.icon size={14} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {user && (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="hidden lg:block text-right">
                <span className="text-xs font-bold block text-slate-900">{user.name}</span>
                <span className="text-[10px] text-[#4CAF50] font-bold uppercase tracking-tighter">{user.role}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onLogout}
                className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
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