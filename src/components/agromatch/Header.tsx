"use client";

import React from 'react';
import { Handshake, LayoutDashboard, Wheat, Store, Truck, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Matchmaker', icon: LayoutDashboard },
    { id: 'supply', label: 'Koperasi Tani (Supply)', icon: Wheat },
    { id: 'demand', label: 'Pasar Induk/Retail (Demand)', icon: Store },
    { id: 'logistics', label: 'Distribusi Logistik', icon: Truck },
    { id: 'forecasting', label: 'Forecasting AI', icon: LineChart },
  ];

  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 text-emerald-950 p-2.5 rounded-xl flex items-center justify-center shadow-md">
            <Handshake size={24} />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight block">AgroMatch</span>
            <span className="text-xs text-emerald-300">Hub Pangan Real-Time Antar Wilayah</span>
          </div>
        </div>
        
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
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;