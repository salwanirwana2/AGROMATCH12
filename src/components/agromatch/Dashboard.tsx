"use client";

import React from 'react';
import { TrendingDown, TrendingUp, Shuffle, Truck, RefreshCw, Wheat, Store, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  supplies: any[];
  demands: any[];
  shipments: any[];
  pendingOrders?: any[];
  onAutoMatch: (supplyId: number, demandId: number) => void;
  onApproveOrder?: (orderId: string) => void;
}

const Dashboard = ({ supplies, demands, shipments, pendingOrders = [], onAutoMatch, onApproveOrder }: DashboardProps) => {
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
              <TrendingDown size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-sm block font-medium">Zona Defisit Terdeteksi</span>
              <span className="text-3xl font-bold text-rose-600">3 Wilayah</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-5">
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-sm block font-medium">Zona Surplus Terdeteksi</span>
              <span className="text-3xl font-bold text-emerald-600">4 Wilayah</span>
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 2: Admin Matchmaking Queue */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="text-amber-500" size={24} /> Antrean Matchmaking (Pending)
          </h3>
          <Badge className="bg-amber-100 text-amber-700 border-none">{pendingOrders.length} Pesanan</Badge>
        </div>
        
        {pendingOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-[2rem] border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-medium">Tidak ada pesanan yang menunggu matchmaking.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="border-slate-100 shadow-sm rounded-3xl overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-slate-900 text-white border-none">{order.id}</Badge>
                      <h4 className="font-bold text-slate-900">{order.buyerName} • {order.region}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item: any, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-teal-50 text-teal-700 border-teal-100">
                          {item.commodity} ({item.qty} KG)
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 italic">Alamat: {order.address}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 min-w-[200px]">
                    <span className="text-lg font-black text-teal-600">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                    <Button 
                      onClick={() => onApproveOrder?.(order.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve & Match
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Smart Matching Engine Recommendation */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-md">
        <div className="max-w-3xl">
          <Badge className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold border-none">AI Matchmaker Engine</Badge>
          <h2 className="text-3xl font-bold mt-3">Rekomendasi Distribusi Optimal</h2>
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
                    </div>
                    <div className="text-sm mt-1 text-slate-100">
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
    </div>
  );
};

export default Dashboard;