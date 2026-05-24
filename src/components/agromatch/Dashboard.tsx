"use client";

import React from 'react';
import { ArrowDownTrend, ArrowUpTrend, Shuffle, Truck, RefreshCw, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  supplies: any[];
  demands: any[];
  shipments: any[];
  onAutoMatch: (supplyId: number, demandId: number) => void;
}

const Dashboard = ({ supplies, demands, shipments, onAutoMatch }: DashboardProps) => {
  const potentialMatches = supplies.flatMap(sup => 
    demands
      .filter(dem => dem.commodity === sup.commodity && dem.qty > 0)
      .map(dem => ({ supply: sup, demand: dem }))
  );

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-5">
            <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl">
              <ArrowDownTrend size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-sm block font-medium">Zona Defisit Terdeteksi</span>
              <span className="text-3xl font-bold text-rose-600">3 Wilayah</span>
              <span className="text-xs text-slate-400 block mt-0.5">Memerlukan suplai segera</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-5">
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
              <ArrowUpTrend size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-sm block font-medium">Zona Surplus Terdeteksi</span>
              <span className="text-3xl font-bold text-emerald-600">4 Wilayah</span>
              <span className="text-xs text-slate-400 block mt-0.5">Kelebihan hasil panen</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-5">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Shuffle size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-sm block font-medium">Pengiriman Berjalan</span>
              <span className="text-3xl font-bold text-indigo-600">{shipments.length} Distribusi</span>
              <span className="text-xs text-slate-400 block mt-0.5">Dikawal mitra logistik</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Matching Engine */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-md">
        <div className="max-w-3xl">
          <Badge className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold border-none">AI Matchmaker Engine</Badge>
          <h2 className="text-3xl font-bold mt-3">Rekomendasi Distribusi Optimal</h2>
          <p className="text-emerald-200 mt-2 text-sm leading-relaxed">
            Sistem AgroMatch mendeteksi titik ketidakseimbangan komoditas pangan. Tekan tombol <strong>"Auto-Match & Kirim"</strong> untuk memobilisasi logistik secara instan.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {potentialMatches.length > 0 ? (
            potentialMatches.map((match, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <div className="bg-emerald-500/20 text-emerald-300 p-3 rounded-xl hidden md:block">
                    <RefreshCw className="animate-spin-slow" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-emerald-300">{match.supply.commodity}</span>
                      <Badge variant="outline" className="text-[10px] border-yellow-500 text-yellow-500">Matching Potensial</Badge>
                    </div>
                    <div className="text-sm mt-1 text-slate-100 flex flex-wrap items-center gap-1">
                      Suplai: <strong className="text-white">{match.supply.qty} Ton</strong> ({match.supply.region}) 
                      <span className="mx-1 text-emerald-400">→</span>
                      Permintaan: <strong className="text-white">{match.demand.qty} Ton</strong> ({match.demand.region})
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => onAutoMatch(match.supply.id, match.demand.id)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl w-full md:w-auto"
                >
                  <Truck className="mr-2 h-4 w-4" /> Auto-Match & Kirim
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-dashed border-white/25 text-emerald-300">
              Tidak ada ketidakseimbangan yang terdeteksi saat ini.
            </div>
          )}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold flex items-center">
              <Wheat className="text-emerald-600 mr-2" size={20} /> Stok Suplai Koperasi
            </CardTitle>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">{supplies.length} Terdaftar</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-2">
              {supplies.map(sup => (
                <div key={sup.id} className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{sup.commodity} ({sup.qty} Ton)</span>
                    <span className="text-xs text-slate-500 block mt-0.5">{sup.cooperative} • {sup.region}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-emerald-600 block">Rp {sup.price.toLocaleString('id-ID')}/Kg</span>
                    <span className="text-[11px] text-slate-400">Panen: {sup.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold flex items-center">
              <Store className="text-amber-600 mr-2" size={20} /> Permintaan Pasar
            </CardTitle>
            <Badge variant="secondary" className="bg-amber-50 text-amber-700">{demands.length} Tertunda</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-2">
              {demands.map(dem => (
                <div key={dem.id} className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{dem.commodity} ({dem.qty} Ton)</span>
                    <span className="text-xs text-slate-500 block mt-0.5">{dem.client} • {dem.region}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-amber-600 block">Batas: Rp {dem.maxPrice.toLocaleString('id-ID')}/Kg</span>
                    <span className="text-[11px] text-slate-400">Target: {dem.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;