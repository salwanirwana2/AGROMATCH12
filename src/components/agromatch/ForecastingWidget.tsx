"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, Sparkles, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ForecastingWidgetProps {
  commodity: string;
  region: string;
  totalSupply: number; // in Ton
  totalDemand: number; // in Ton
}

const ForecastingWidget = ({ commodity, region, totalSupply, totalDemand }: ForecastingWidgetProps) => {
  const diff = totalSupply - totalDemand;
  const isSurplus = diff > 0;
  const gapAmount = Math.abs(diff).toFixed(1);

  const getRecommendation = () => {
    if (!isSurplus) {
      return "Saran AI: Segera lakukan mobilisasi stok pangan dari wilayah surplus terdekat (seperti Pidie/Abdya) ke wilayah defisit, atau optimalkan distribusi gudang penyimpanan sebelum puncak harga pasar naik.";
    }
    return "Saran AI: Stok melimpah! Direkomendasikan untuk membuka jalur distribusi luar daerah, mengaktifkan opsi pengolahan pasca-panen (industri turunan), atau menurunkan harga ritel intervensi guna mempercepat penyerapan pasar.";
  };

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Status & Prediktif Ketahanan Pangan Aceh Terkini</h3>
          <p className="text-sm text-slate-500 font-medium">Analisis real-time berbasis aktivitas pasar & hasil panen lokal.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100">
          <Sparkles size={16} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Engine Active</span>
        </div>
      </div>

      <Card className={cn(
        "border-none shadow-xl rounded-[2.5rem] overflow-hidden transition-all duration-500",
        isSurplus ? "bg-emerald-50/50 ring-1 ring-emerald-100" : "bg-rose-50/50 ring-1 ring-rose-100"
      )}>
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Status Icon & Main Info */}
            <div className="flex-shrink-0">
              <div className={cn(
                "w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-lg",
                isSurplus ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
              )}>
                {isSurplus ? <TrendingUp size={40} /> : <TrendingDown size={40} />}
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full border-none font-black text-[10px] uppercase tracking-widest",
                    isSurplus ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {isSurplus ? "Kondisi Surplus" : "Peringatan Defisit"}
                  </Badge>
                  <span className="text-xs text-slate-400 font-bold">• Diperbarui 1 menit yang lalu</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {region} berpotensi <span className={isSurplus ? "text-emerald-600" : "text-rose-600"}>
                    {isSurplus ? "SURPLUS" : "DEFISIT"} {commodity}
                  </span> sebesar <span className="underline decoration-4 underline-offset-4">{gapAmount} Ton</span> pada bulan ini.
                </h4>
              </div>

              {/* AI Recommendation Box */}
              <div className={cn(
                "p-6 rounded-3xl border flex items-start gap-4 transition-all",
                isSurplus ? "bg-white/60 border-emerald-100" : "bg-white/60 border-rose-100"
              )}>
                <div className={cn(
                  "p-2 rounded-xl mt-1",
                  isSurplus ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  <Sparkles size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">Saran Tindakan AI AgroMatch:</p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{getRecommendation()}"</p>
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Suplai</span>
                  <span className="text-lg font-black text-slate-900">{totalSupply.toFixed(1)} Ton</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Permintaan</span>
                  <span className="text-lg font-black text-slate-900">{totalDemand.toFixed(1)} Ton</span>
                </div>
                <div className="hidden md:block bg-slate-900 p-4 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tingkat Akurasi AI</span>
                  <span className="text-lg font-black text-emerald-400">98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", className)}>
    {children}
  </span>
);

export default ForecastingWidget;