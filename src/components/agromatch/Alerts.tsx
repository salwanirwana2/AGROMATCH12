"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertItem {
  id: number;
  type: 'danger' | 'success' | 'warning' | 'info';
  text: string;
}

interface AlertsProps {
  alerts: AlertItem[];
  onClear: () => void;
}

const Alerts = ({ alerts, onClear }: AlertsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'danger': return <AlertCircle className="text-red-500" size={20} />;
      case 'success': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'danger': return "bg-red-50/80 border-red-100 text-red-800";
      case 'success': return "bg-emerald-50/80 border-emerald-100 text-emerald-800";
      case 'warning': return "bg-amber-50/80 border-amber-100 text-amber-800";
      default: return "bg-blue-50/80 border-blue-100 text-blue-800";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center">
          <span className="flex h-2 w-2 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Informasi Kondisi Pangan Real-Time
        </h3>
        {alerts.length > 0 && (
          <button onClick={onClear} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
            <X size={12} /> Sembunyikan Semua
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {alerts.slice(0, 4).map(alert => (
          <div 
            key={alert.id} 
            className={cn(
              "p-3.5 rounded-xl border flex items-start space-x-3 text-sm shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2",
              getBgColor(alert.type)
            )}
          >
            <div className="mt-0.5">{getIcon(alert.type)}</div>
            <span className="font-medium">{alert.text}</span>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="col-span-2 text-center p-4 bg-slate-100 rounded-xl text-slate-500 text-sm border border-dashed border-slate-300">
            Tidak ada notifikasi kritis baru. Sistem berjalan seimbang.
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;