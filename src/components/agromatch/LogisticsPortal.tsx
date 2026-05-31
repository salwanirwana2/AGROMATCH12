"use client";

import React, { useState } from 'react';
import { Truck, Clock, Network, MapPin } from 'lucide-react';
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
              <div key={ship.id} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-200 text-slate-700 border-none">Resi: AM-{ship.id}</Badge>
                    <h4 className="text-lg font-bold text-slate-800 mt-2">{ship.commodity} • {ship.qty} Ton</h4>
                  </div>
                  <Badge className={ship.status === "Dalam Perjalanan" ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none" : "bg-blue-100 text-blue-800 hover:bg-blue-100 border-none"}>
                    {ship.status}
                  </Badge>
                </div>

                <div className="mt-4 space-y-3 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-300">
                  <div>
                    <span className="text-xs text-slate-400 block">ASAL (Pemasok)</span>
                    <span className="text-sm font-semibold text-slate-700">{ship.sender}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">TUJUAN (Konsumen)</span>
                    <span className="text-sm font-semibold text-slate-700">{ship.receiver}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400 block">MITRA EXPEDISI</span>
                    <span className="font-bold text-slate-700">{ship.logistics}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">ESTIMASI TIBA</span>
                    <span className="font-bold text-indigo-600 flex items-center justify-end">
                      <Clock className="mr-1" size={12} /> {ship.eta}
                    </span>
                  </div>
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

      {/* Modal Pendaftaran */}
      <FleetRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LogisticsPortal;