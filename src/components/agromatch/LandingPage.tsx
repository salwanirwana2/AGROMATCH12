"use client";

import React from 'react';
import { Wheat, Store, Truck, Cpu, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onSelectRole: (role: string) => void;
}

const LandingPage = ({ onSelectRole }: LandingPageProps) => {
  const stats = [
    { label: "Wilayah Surplus", value: "4", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Wilayah Defisit", value: "3", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Pengiriman Aktif", value: "12", color: "text-indigo-600", bg: "bg-indigo-50" }
  ];

  const portals = [
    { id: 'koperasi', title: 'Koperasi Tani', desc: 'Input hasil panen & akses bursa suplai.', icon: Wheat, color: 'bg-emerald-600' },
    { id: 'retail', title: 'Retail / Pasar', desc: 'Input kebutuhan & monitor stok pangan.', icon: Store, color: 'bg-amber-600' },
    { id: 'logistik', title: 'Mitra Logistik', desc: 'Kelola armada & rute distribusi.', icon: Truck, color: 'bg-indigo-600' },
    { id: 'admin', title: 'Admin / Forecaster', desc: 'Matchmaking AI & analisis tren.', icon: Cpu, color: 'bg-slate-800' }
  ];

  const workflowSteps = [
    {
      title: "Koperasi Suplai Data",
      desc: "Petani lokal menginput hasil panen segar ke sistem.",
      icon: Wheat,
      color: "from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-200",
      bg: "bg-emerald-50"
    },
    {
      title: "AI Mencocokkan",
      desc: "Algoritma cerdas mencari rute distribusi paling efisien.",
      icon: Cpu,
      color: "from-cyan-400 to-teal-500",
      shadow: "shadow-cyan-200",
      bg: "bg-cyan-50"
    },
    {
      title: "Logistik Mengirim",
      desc: "Armada logistik memobilisasi pangan ke titik defisit.",
      icon: Truck,
      color: "from-indigo-400 to-indigo-600",
      shadow: "shadow-indigo-200",
      bg: "bg-indigo-50"
    },
    {
      title: "Retail Menerima",
      desc: "Pasar menerima pasokan dengan harga yang stabil.",
      icon: Store,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-200",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-100">
          <Zap size={16} />
          <span>Solusi Cerdas Atasi Defisit & Surplus Pangan Aceh</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Hub Pangan Terintegrasi <br />
          <span className="text-emerald-600">Provinsi Aceh</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Menghubungkan petani, pasar, dan logistik secara real-time menggunakan kecerdasan buatan untuk menjaga stabilitas harga dan pasokan.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className={`p-6 rounded-2xl ${stat.bg}`}>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                <span className={`block text-4xl font-black mt-1 ${stat.color}`}>{stat.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alur Kerja AgroMatch */}
      <section className="bg-slate-50/50 rounded-[3rem] p-12 border border-slate-100 mb-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Alur Kerja AgroMatch</h2>
          <p className="text-slate-500 mt-2">Sistem otomatisasi distribusi pangan dari hulu ke hilir.</p>
        </div>
        
        <div className="relative">
          {/* Desktop Arrows */}
          <div className="hidden lg:flex absolute top-1/2 left-0 w-full -translate-y-16 justify-around px-24 pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-slate-300 animate-pulse">
                <ChevronRight size={32} strokeWidth={3} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-full ${step.bg} flex items-center justify-center mb-6 relative transition-transform duration-300 group-hover:scale-110`}>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ${step.shadow}`}>
                    <step.icon size={40} strokeWidth={1.5} />
                  </div>
                  {/* Decorative Circuit Lines for AI Step */}
                  {step.title === "AI Mencocokkan" && (
                    <div className="absolute inset-0 border-2 border-cyan-200 border-dashed rounded-full animate-spin-slow opacity-50"></div>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Pilih Portal Akses</h2>
          <p className="text-slate-500 mt-2">Masuk sesuai dengan peran Anda dalam ekosistem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <button 
              key={portal.id}
              onClick={() => onSelectRole(portal.id)}
              className="group text-left bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
            >
              <div className={`${portal.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <portal.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{portal.title}</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">{portal.desc}</p>
              <div className="flex items-center text-emerald-600 font-bold text-sm">
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