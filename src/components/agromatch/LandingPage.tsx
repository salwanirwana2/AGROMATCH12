"use client";

import React from 'react';
import { Wheat, Store, Truck, Cpu, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onSelectRole: (role: string) => void;
}

const AcehMapVisual = ({ color, dots }: { color: string, dots: { x: number, y: number }[] }) => (
  <div className="relative w-full h-32 mt-4 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50">
    <svg viewBox="0 0 100 100" className={`w-24 h-24 opacity-20 ${color}`}>
      <path d="M20,80 L35,30 L50,15 L85,10 L95,40 L75,85 L40,95 Z" fill="currentColor" />
    </svg>
    {dots.map((dot, i) => (
      <div 
        key={i} 
        className={`absolute w-2 h-2 rounded-full animate-pulse ${color.replace('text-', 'bg-')}`}
        style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
      />
    ))}
  </div>
);

const MiniLineChart = () => (
  <div className="w-full h-32 mt-4 flex items-end justify-center px-4 bg-slate-50/50 rounded-xl overflow-hidden">
    <svg viewBox="0 0 100 40" className="w-full h-16 text-blue-500">
      <path 
        d="M0 35 Q 15 10, 30 25 T 60 5 T 100 20" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="animate-in slide-in-from-left duration-1000"
      />
    </svg>
  </div>
);

const LandingPage = ({ onSelectRole }: LandingPageProps) => {
  const portals = [
    { id: 'koperasi', title: 'Koperasi Tani', desc: 'Input hasil panen & akses bursa suplai.', icon: Wheat, color: 'bg-[#4CAF50]' },
    { id: 'retail', title: 'Retail / Pasar', desc: 'Input kebutuhan & monitor stok pangan.', icon: Store, color: 'bg-amber-500' },
    { id: 'logistik', title: 'Mitra Logistik', desc: 'Kelola armada & rute distribusi.', icon: Truck, color: 'bg-blue-500' },
    { id: 'admin', title: 'Admin / Forecaster', desc: 'Matchmaking AI & analisis tren.', icon: Cpu, color: 'bg-slate-800' }
  ];

  const workflowSteps = [
    { title: "Koperasi Suplai Data", desc: "Petani lokal menginput hasil panen segar.", icon: Wheat, color: "from-green-400 to-green-600", bg: "bg-green-50" },
    { title: "AI Mencocokkan", desc: "Algoritma cerdas mencari rute efisien.", icon: Cpu, color: "from-cyan-400 to-teal-500", bg: "bg-cyan-50" },
    { title: "Logistik Mengirim", desc: "Armada memobilisasi pangan ke titik defisit.", icon: Truck, color: "from-blue-400 to-blue-600", bg: "bg-blue-50" },
    { title: "Retail Menerima", desc: "Pasar menerima pasokan harga stabil.", icon: Store, color: "from-amber-400 to-orange-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight uppercase">
          Hub Pangan Terintegrasi <br />
          <span className="text-[#4CAF50]">Provinsi Aceh</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12">
          Menghubungkan petani, pasar, dan logistik secara real-time untuk stabilitas pasokan.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden group hover:translate-y-[-4px] transition-transform">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wilayah Surplus</span>
                <span className="text-3xl font-black text-green-600">(4)</span>
              </div>
              <AcehMapVisual color="text-green-500" dots={[{x: 40, y: 30}, {x: 60, y: 20}, {x: 30, y: 50}, {x: 70, y: 40}]} />
            </CardContent>
          </Card>
          
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden group hover:translate-y-[-4px] transition-transform">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wilayah Defisit</span>
                <span className="text-3xl font-black text-red-600">(3)</span>
              </div>
              <AcehMapVisual color="text-red-500" dots={[{x: 50, y: 60}, {x: 20, y: 40}, {x: 80, y: 30}]} />
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden group hover:translate-y-[-4px] transition-transform">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Pengiriman Aktif</span>
                <span className="text-3xl font-black text-blue-600">(12)</span>
              </div>
              <MiniLineChart />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alur Kerja AgroMatch */}
      <section className="bg-slate-50/50 rounded-[4rem] p-12 md:p-20 border border-slate-100 mb-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Alur Kerja AgroMatch</h2>
          <p className="text-slate-500 font-medium mt-2">Sistem otomatisasi distribusi pangan dari hulu ke hilir.</p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:flex absolute top-1/2 left-0 w-full -translate-y-16 justify-around px-24 pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-slate-200">
                <ChevronRight size={40} strokeWidth={3} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-[2rem] ${step.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <step.icon size={32} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pilih Portal Akses</h2>
          <p className="text-slate-500 font-medium mt-2">Masuk sesuai dengan peran Anda dalam ekosistem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <button 
              key={portal.id}
              onClick={() => onSelectRole(portal.id)}
              className="group text-left bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:border-[#4CAF50]/30 transition-all duration-500"
            >
              <div className={`${portal.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <portal.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{portal.title}</h3>
              <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{portal.desc}</p>
              <div className="flex items-center text-[#4CAF50] font-black text-xs uppercase tracking-widest">
                Masuk Portal <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;