"use client";

import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const forecastingData: Record<string, any> = {
  "Beras": {
    data: [
      { month: "Jan", supply: 120, demand: 140 },
      { month: "Feb", supply: 135, demand: 142 },
      { month: "Mar", supply: 180, demand: 145 },
      { month: "Apr", supply: 210, demand: 148 },
      { month: "Mei", supply: 160, demand: 150 },
      { month: "Jun*", supply: 110, demand: 155 },
      { month: "Jul*", supply: 90, demand: 160 },
    ],
    analysis: "Defisit Beras di Banda Aceh diprediksi terjadi pada Juni-Juli akibat berakhirnya masa panen raya di Pidie dan Abdya. Disarankan melakukan mobilisasi stok dari gudang penyimpanan di wilayah pesisir barat sebelum puncak kemarau."
  },
  "Cabai Merah": {
    data: [
      { month: "Jan", supply: 40, demand: 35 },
      { month: "Feb", supply: 30, demand: 38 },
      { month: "Mar", supply: 25, demand: 40 },
      { month: "Apr", supply: 45, demand: 42 },
      { month: "Mei", supply: 50, demand: 45 },
      { month: "Jun*", supply: 65, demand: 45 },
      { month: "Jul*", supply: 55, demand: 47 },
    ],
    analysis: "Pasokan Cabai Merah dari dataran tinggi Gayo (Bener Meriah & Aceh Tengah) diperkirakan melimpah di bulan Juni. Pasar di Lhokseumawe dan Langsa disarankan melakukan kontrak beli sekarang untuk menstabilkan harga eceran."
  },
  "Bawang Merah": {
    data: [
      { month: "Jan", supply: 30, demand: 28 },
      { month: "Feb", supply: 25, demand: 30 },
      { month: "Mar", supply: 35, demand: 31 },
      { month: "Apr", supply: 50, demand: 33 },
      { month: "Mei", supply: 40, demand: 35 },
      { month: "Jun*", supply: 30, demand: 36 },
      { month: "Jul*", supply: 20, demand: 38 },
    ],
    analysis: "Risiko defisit Bawang Merah terdeteksi di wilayah Meulaboh pada bulan Juli. Diperlukan mitigasi pengiriman dari sentra produksi lokal atau koordinasi dengan distributor luar daerah untuk menjaga ketersediaan."
  }
};

const ForecastingPortal = () => {
  const [selectedCommodity, setSelectedCommodity] = useState("Beras");
  const activeForecast = forecastingData[selectedCommodity];

  return (
    <div className="space-y-8">
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-bold">Peramalan AI & Tren Pasokan Aceh</CardTitle>
            <p className="text-sm text-slate-500 mt-0.5">Analisis tren musiman lokal & kecerdasan buatan.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(forecastingData).map(commodity => (
              <Button 
                key={commodity} 
                variant={selectedCommodity === commodity ? "default" : "secondary"}
                onClick={() => setSelectedCommodity(commodity)}
                className={selectedCommodity === commodity ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                size="sm"
              >
                {commodity}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeForecast.data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                  <Bar name="Suplai Estimasi (Ton)" dataKey="supply" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar name="Kebutuhan Pasar (Ton)" dataKey="demand" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start space-x-4">
            <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-800">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Analisis Prediktif AI AgroMatch Aceh</h4>
              <p className="text-emerald-900 text-xs mt-1 leading-relaxed">{activeForecast.analysis}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingPortal;