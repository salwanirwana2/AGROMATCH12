"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Zap, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  MapPin, 
  Package,
  ChevronRight
} from 'lucide-react';
import ForecastingWidget from './ForecastingWidget';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onSelectRole: (role: string) => void;
  forecastingStats: {
    commodity: string;
    region: string;
    totalSupply: number;
    totalDemand: number;
  };
  supplies: any[];
  orders: any[];
  demands: any[];
}

const LandingPage = ({ onSelectRole, forecastingStats, supplies, orders, demands }: LandingPageProps) => {
  const [activeModal, setActiveModal] = useState<'surplus' | 'deficit' | 'logistics' | null>(null);

  // --- Data Processing for Modals ---
  
  // 1. Surplus Breakdown
  const surplusRegions = supplies.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.region === curr.region);
    if (existing) {
      existing.total += curr.qty;
      existing.items.push(`${curr.commodity} (${curr.qty} Ton)`);
    } else {
      acc.push({ region: curr.region, total: curr.qty, items: [`${curr.commodity} (${curr.qty} Ton)`] });
    }
    return acc;
  }, []);

  // 2. Deficit Breakdown (Mocked based on current demand logic)
  const deficitRegions = [
    { region: "Banda Aceh", amount: forecastingStats.totalDemand - forecastingStats.totalSupply, commodity: "Beras", urgency: "Tinggi" },
    { region: "Aceh Besar", amount: 5.2, commodity: "Bawang Merah", urgency: "Sedang" },
    { region: "Lhokseumawe", amount: 8.5, commodity: "Cabai Merah", urgency: "Tinggi" }
  ].filter(d => d.amount > 0);

  // 3. Logistics Data
  const activeShipments = orders.filter(o => o.status === "SHIPPING" || o.status === "MATCHED_READY_FOR_SHIPPING");
  
  const chartData = [
    { day: 'Sen', total: 4 },
    { day: 'Sel', total: 7 },
    { day: 'Rab', total: 5 },
    { day: 'Kam', total: 9 },
    { day: 'Jum', total: 12 },
    { day: 'Sab', total: 8 },
    { day: 'Min', total: 10 },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-20">
      {/* HERO SECTION */}
      <section className="text-center space-y-10">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Zap size={14} className="fill-emerald-700" /> Solusi Cerdas Atasi Defisit & Surplus Pangan Aceh
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Hub Pangan Terintegrasi <br />
            <span className="text-emerald-600">Provinsi Aceh</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Menghubungkan petani, pasar, dan logistik secara real-time menggunakan kecerdasan buatan untuk menjaga stabilitas harga dan pasokan.
          </p>
        </div>

        {/* INTERACTIVE SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {/* Card 1: Surplus */}
          <div 
            onClick={() => setActiveModal('surplus')}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-52"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Wilayah Surplus</span>
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
                  <TrendingUp size={18} />
                </div>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-5xl font-black text-emerald-600">{surplusRegions.length}</span>
                <span className="text-sm font-bold text-gray-500">Kabupaten/Kota</span>
              </div>
            </div>
            <div className="w-full py-3 bg-emerald-50/50 rounded-2xl flex items-center justify-center text-[10px] text-emerald-700 font-black uppercase tracking-widest group-hover:bg-emerald-100 transition-colors">
              🗺️ Peta Distribusi Hijau Aktif <ChevronRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 2: Defisit */}
          <div 
            onClick={() => setActiveModal('deficit')}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-52"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Wilayah Defisit</span>
                <div className="bg-rose-100 p-2 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
                  <TrendingDown size={18} />
                </div>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-5xl font-black text-rose-600">{deficitRegions.length}</span>
                <span className="text-sm font-bold text-gray-500">Kabupaten/Kota</span>
              </div>
            </div>
            <div className="w-full py-3 bg-rose-50/50 rounded-2xl flex items-center justify-center text-[10px] text-rose-700 font-black uppercase tracking-widest group-hover:bg-rose-100 transition-colors">
              🗺️ Peta Pantauan Defisit Merah <ChevronRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 3: Logistik */}
          <div 
            onClick={() => setActiveModal('logistics')}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-52"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Pengiriman Aktif</span>
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Truck size={18} />
                </div>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-5xl font-black text-blue-600">{activeShipments.length}</span>
                <span className="text-sm font-bold text-gray-500">Armada Berjalan</span>
              </div>
            </div>
            <div className="w-full py-3 bg-blue-50/50 rounded-2xl flex items-center justify-center text-[10px] text-blue-700 font-black uppercase tracking-widest group-hover:bg-blue-100 transition-colors">
              📈 Grafik Tren Logistik <ChevronRight size={12} className="ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      
      {/* 1. Surplus Modal */}
      <Dialog open={activeModal === 'surplus'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-emerald-600 p-8 text-white">
            <DialogTitle className="text-2xl font-black">Daftar Wilayah Surplus</DialogTitle>
            <DialogDescription className="text-emerald-100 mt-1">
              Wilayah dengan ketersediaan stok pangan melimpah saat ini.
            </DialogDescription>
          </div>
          <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto bg-white">
            {surplusRegions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{s.region}</h4>
                    <p className="text-[10px] text-emerald-700 font-bold uppercase">{s.items.join(", ")}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-600 text-white border-none">+{s.total} Ton</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Deficit Modal */}
      <Dialog open={activeModal === 'deficit'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-rose-600 p-8 text-white">
            <DialogTitle className="text-2xl font-black">Daftar Wilayah Defisit</DialogTitle>
            <DialogDescription className="text-rose-100 mt-1">
              Wilayah yang membutuhkan pasokan pangan segera.
            </DialogDescription>
          </div>
          <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto bg-white">
            {deficitRegions.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm">
                    <TrendingDown size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{d.region}</h4>
                    <p className="text-[10px] text-rose-700 font-bold uppercase">Butuh: {d.commodity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-rose-600 text-white border-none">-{d.amount.toFixed(1)} Ton</Badge>
                  <p className={cn(
                    "text-[9px] font-black uppercase mt-1",
                    d.urgency === "Tinggi" ? "text-rose-600" : "text-amber-600"
                  )}>Urgensi: {d.urgency}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 3. Logistics Modal */}
      <Dialog open={activeModal === 'logistics'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-blue-600 p-8 text-white">
            <DialogTitle className="text-2xl font-black">Tren Logistik & Armada</DialogTitle>
            <DialogDescription className="text-blue-100 mt-1">
              Pantauan distribusi pangan real-time di seluruh Aceh.
            </DialogDescription>
          </div>
          <div className="p-8 space-y-8 bg-white">
            {/* Chart Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Tren Pengiriman 7 Hari Terakhir</h4>
              <div className="h-40 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Shipments List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Armada Berjalan Saat Ini</h4>
              <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2">
                {activeShipments.length === 0 ? (
                  <p className="text-center py-6 text-slate-400 text-sm italic">Tidak ada pengiriman aktif.</p>
                ) : (
                  activeShipments.map((ship, i) => (
                    <div key={i} className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                        <Truck size={20} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">Armada #{ship.id.split('-')[1]}</h5>
                          <Badge variant="outline" className="text-[9px] border-blue-200 text-blue-600 bg-white">
                            {ship.status === "SHIPPING" ? "Dalam Perjalanan" : "Siap Jemput"}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                          {ship.matchedSource} <ArrowRight size={10} className="inline mx-1" /> {ship.region}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI FORECASTING WIDGET */}
      <div className="max-w-5xl mx-auto">
        <ForecastingWidget 
          commodity={forecastingStats.commodity}
          region={forecastingStats.region}
          totalSupply={forecastingStats.totalSupply}
          totalDemand={forecastingStats.totalDemand}
        />
      </div>

      {/* ALUR KERJA SECTION */}
      <section className="bg-emerald-900 text-white rounded-[3rem] p-8 md:p-12 shadow-xl">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">Alur Kerja AgroMatch</h3>
          <p className="text-emerald-200 text-sm md:text-base max-w-xl mx-auto">Sistem otomatisasi distribusi pangan pintar dari hulu ke hilir secara transparan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            { icon: "👨‍🌾", title: "Koperasi Suplai Data", desc: "Petani menginput hasil panen lokal." },
            { icon: "🤖", title: "AI Mencocokkan", desc: "Sistem mencocokkan suplai & kebutuhan." },
            { icon: "🚚", title: "Logistik Mengirim", desc: "Armada mendistribusikan secara efisien." },
            { icon: "🏪", title: "Retail Menerima", desc: "Pasar menerima stok dengan harga stabil." }
          ].map((step, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-20 h-20 bg-white/10 rounded-[2rem] mx-auto flex items-center justify-center text-3xl shadow-inner border border-white/20">
                {step.icon}
              </div>
              <div>
                <h4 className="font-semibold text-lg text-emerald-100">{step.title}</h4>
                <p className="text-xs text-emerald-200/80 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PILIH PORTAL AKSES SECTION */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Pilih Portal Akses</h3>
          <p className="text-gray-500 text-sm">Masuk sesuai dengan peran dan tanggung jawab Anda dalam ekosistem.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'koperasi', icon: "🌾", title: "Koperasi Tani", desc: "Input data hasil panen harian, pantau harga pokok, dan akses bursa suplai pangan.", color: "bg-emerald-600 hover:bg-emerald-700", iconBg: "bg-emerald-50 text-emerald-600" },
            { id: 'retail', icon: "🏪", title: "Retail / Pasar", desc: "Input kebutuhan komoditas, monitor ketersediaan stok, dan jaga stabilitas pasar.", color: "bg-teal-600 hover:bg-teal-700", iconBg: "bg-teal-50 text-teal-600" },
            { id: 'logistik', icon: "🚚", title: "Mitra Logistik", desc: "Kelola armada pengiriman, ambil manifes distribusi, dan optimasikan rute jalan.", color: "bg-blue-600 hover:bg-blue-700", iconBg: "bg-blue-50 text-blue-600" },
            { id: 'admin', icon: "📊", title: "Admin / Forecaster", desc: "Kelola kecerdasan buatan (AI matchmaking), analisis tren pasar, dan laporan defisit.", color: "bg-gray-800 hover:bg-gray-900", iconBg: "bg-gray-100 text-gray-700" }
          ].map((portal) => (
            <div key={portal.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between text-center space-y-6">
              <div className="space-y-4">
                <div className={`w-16 h-16 ${portal.iconBg} rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold shadow-sm`}>
                  {portal.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{portal.title}</h4>
                  <p className="text-xs text-gray-500 mt-2">{portal.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => onSelectRole(portal.id)}
                className={`w-full ${portal.color} text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2`}
              >
                Akses Portal <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;