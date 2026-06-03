"use client";

import React, { useState } from 'react';
import { Truck, Clock, Network, MapPin, Package, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FleetRegistrationModal from './FleetRegistrationModal';

interface LogisticsPortalProps {
  shipments: any[];
}

const LogisticsPortal = ({ shipments }: LogisticsPortalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Manajemen Pengiriman Optimal</CardTitle>
            <p className="text-sm text-slate-500 mt-0.5">Daftar perjalanan distribusi pangan terintegrasi.</p>
          </div>
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">Proses Distribusi Aktif</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipments.map(ship => (
              <div key={ship.id} className="border border-slate-100 rounded-[2.5rem] p-6 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-all border-l-8 border-l-indigo-600">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                      <Package size={24} />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-100 text-slate-500 border-none">Resi: {ship.id}</Badge>
                      <h4 className="text-lg font-bold text-slate-800 mt-1">
                        {ship.items ? ship.items.map((i: any) => i.commodity).join(", ") : ship.commodity}
                      </h4>
                    </div>
                  </div>
                  <Badge className="bg-indigo-600 text-white border-none px-3 py-1 rounded-full">
                    {ship.status}
                  </Badge>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Berat</span>
                    <span className="text-sm font-black text-slate-900">{ship.totalWeight || ship.qty} KG</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimasi Tiba</span>
                    <span className="text-sm font-black text-indigo-600 flex items-center">
                      <Clock className="mr-1" size={14} /> {ship.eta}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 before:border-dashed">
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Penjemputan</span>
                    <span className="text-xs font-bold text-slate-700">{ship.sender || "Gudang Koperasi Mitra"}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-sm"></div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Tujuan Pengiriman</span>
                    <span className="text-xs font-bold text-slate-700">{ship.buyerName || ship.receiver}</span>
                    <p className="text-[10px] text-slate-500 mt-1">{ship.address}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                        <User size={10} /> {ship.buyerName}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                        <Phone size={10} /> {ship.buyerPhone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <Truck size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{ship.logistics}</span>
                  </div>
                  <Button size="sm" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none rounded-xl font-bold text-xs">
                    Detail Rute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-indigo-900 text-white rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-2xl">
            <Network size={32} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Tertarik Menjadi Mitra Logistik AgroMatch?</h4>
            <p className="text-indigo-200 text-xs mt-0.5">Integrasikan armada Anda untuk menjangkau jutaan rute pengiriman tani.</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-6 rounded-xl shadow-md"
        >
          Daftar Kemitraan Armada
        </Button>
      </div>

      <FleetRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LogisticsPortal;