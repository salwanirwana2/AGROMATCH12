"use client";

import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: string) => void;
}

const LandingPage = ({ onSelectRole }: LandingPageProps) => {
  return (
    <div className="animate-in fade-in duration-700 space-y-20">
      {/* HERO SECTION & STATISTIK */}
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

        {/* GRID STATISTIK MODERN DENGAN VISUALISASI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {/* Wilayah Surplus */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between h-48">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Wilayah Surplus</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-emerald-600">4</span>
                <span className="text-sm font-medium text-gray-500">Kabupaten/Kota</span>
              </div>
            </div>
            <div className="w-full h-16 bg-emerald-50/50 rounded-xl flex items-center justify-center text-xs text-emerald-700 font-medium">
              🗺️ Peta Distribusi Hijau Aktif
            </div>
          </div>

          {/* Wilayah Defisit */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between h-48">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Wilayah Defisit</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-rose-600">3</span>
                <span className="text-sm font-medium text-gray-500">Kabupaten/Kota</span>
              </div>
            </div>
            <div className="w-full h-16 bg-rose-50/50 rounded-xl flex items-center justify-center text-xs text-rose-700 font-medium">
              🗺️ Peta Pantauan Defisit Merah
            </div>
          </div>

          {/* Pengiriman Aktif */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between h-48">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Pengiriman Aktif</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-blue-600">12</span>
                <span className="text-sm font-medium text-gray-500">Armada Berjalan</span>
              </div>
            </div>
            <div className="w-full h-16 bg-blue-50/50 rounded-xl flex items-center justify-center text-xs text-blue-700 font-medium">
              📈 Grafik Tren Pengiriman 7 Hari Terakhir
            </div>
          </div>
        </div>
      </section>

      {/* ALUR KERJA SECTION */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
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
              <div className="w-20 h-20 bg-white/10 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-inner border border-white/20">
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
            <div key={portal.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between text-center space-y-6">
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
                className={`w-full ${portal.color} text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2`}
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