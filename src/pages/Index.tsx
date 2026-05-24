"use client";

import React, { useState } from 'react';
import Header from '@/components/agromatch/Header';
import Alerts, { AlertItem } from '@/components/agromatch/Alerts';
import Dashboard from '@/components/agromatch/Dashboard';
import SupplyPortal from '@/components/agromatch/SupplyPortal';
import DemandPortal from '@/components/agromatch/DemandPortal';
import LogisticsPortal from '@/components/agromatch/LogisticsPortal';
import ForecastingPortal from '@/components/agromatch/ForecastingPortal';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showInfo } from '@/utils/toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Simulated Database State
  const [supplies, setSupplies] = useState([
    { id: 1, region: "Karawang", commodity: "Beras", qty: 120, price: 11000, date: "2026-06-10", cooperative: "Koperasi Tani Makmur" },
    { id: 2, region: "Brebes", commodity: "Bawang Merah", qty: 45, price: 24000, date: "2026-06-12", cooperative: "Koperasi Berkah Tani" },
    { id: 3, region: "Cianjur", commodity: "Cabai Merah", qty: 15, price: 32000, date: "2026-06-08", cooperative: "Koperasi Horti Lestari" },
    { id: 4, region: "Malang", commodity: "Kentang", qty: 60, price: 14000, date: "2026-06-15", cooperative: "Koperasi Tani Agro Jaya" }
  ]);

  const [demands, setDemands] = useState([
    { id: 1, region: "Jakarta", commodity: "Beras", qty: 150, maxPrice: 12500, date: "2026-06-12", client: "Pasar Induk Cipinang" },
    { id: 2, region: "Bandung", commodity: "Cabai Merah", qty: 30, maxPrice: 35000, date: "2026-06-09", client: "Pasar Caringin" },
    { id: 3, region: "Semarang", commodity: "Bawang Merah", qty: 25, maxPrice: 26000, date: "2026-06-14", client: "Pasar Johar" }
  ]);

  const [shipments, setShipments] = useState([
    { id: 101, sender: "Koperasi Tani Makmur (Karawang)", receiver: "Pasar Induk Cipinang (Jakarta)", commodity: "Beras", qty: 80, logistics: "Trans Agro Cargo", status: "Dalam Perjalanan", eta: "4 Jam" }
  ]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, type: "danger", text: "Jakarta berpotensi DEFISIT Beras sebesar 30 Ton dalam 3 hari ke depan." },
    { id: 2, type: "success", text: "Karawang mengalami SURPLUS Beras sebesar 40 Ton minggu ini." }
  ]);

  // Handlers
  const handleAddSupply = (newSupply: any) => {
    const item = { id: Date.now(), ...newSupply };
    setSupplies([item, ...supplies]);
    setAlerts([{ id: Date.now(), type: "info", text: `${item.cooperative} mendaftarkan pasokan baru: ${item.qty} Ton ${item.commodity} di ${item.region}` }, ...alerts]);
    showSuccess(`Pasokan ${item.commodity} berhasil didaftarkan!`);
    setActiveTab("dashboard");
  };

  const handleAddDemand = (newDemand: any) => {
    const item = { id: Date.now(), ...newDemand };
    setDemands([item, ...demands]);
    setAlerts([{ id: Date.now(), type: "warning", text: `Permintaan baru terdeteksi: ${item.client} membutuhkan ${item.qty} Ton ${item.commodity}` }, ...alerts]);
    showInfo(`Permintaan ${item.commodity} telah ditayangkan.`);
    setActiveTab("dashboard");
  };

  const handleAutoMatch = (supplyId: number, demandId: number) => {
    const supply = supplies.find(s => s.id === supplyId);
    const demand = demands.find(d => d.id === demandId);

    if (!supply || !demand) return;

    const matchedQty = Math.min(supply.qty, demand.qty);
    const logisticsAgencies = ["Karya Mandiri Logistik", "Sinar Tani Expedisi", "Trans Agro Cargo", "Bumi Distribusi"];
    const selectedLogistics = logisticsAgencies[Math.floor(Math.random() * logisticsAgencies.length)];

    // Update Supply and Demand
    setSupplies(supplies.map(s => s.id === supplyId ? { ...s, qty: s.qty - matchedQty } : s).filter(s => s.qty > 0));
    setDemands(demands.map(d => d.id === demandId ? { ...d, qty: d.qty - matchedQty } : d).filter(d => d.qty > 0));

    // Add to active delivery
    const newShipment = {
      id: Date.now(),
      sender: `${supply.cooperative} (${supply.region})`,
      receiver: `${demand.client} (${demand.region})`,
      commodity: supply.commodity,
      qty: matchedQty,
      logistics: selectedLogistics,
      status: "Diproses Armada",
      eta: "12 Jam"
    };

    setShipments([newShipment, ...shipments]);
    setAlerts([{ id: Date.now(), type: "success", text: `MATCH BERHASIL! Mentransfer ${matchedQty} Ton ${supply.commodity} dari ${supply.region} ke ${demand.region}.` }, ...alerts]);
    showSuccess(`Match Berhasil! Armada ${selectedLogistics} sedang diproses.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <Alerts alerts={alerts} onClear={() => setAlerts([])} />

        {activeTab === 'dashboard' && (
          <Dashboard 
            supplies={supplies} 
            demands={demands} 
            shipments={shipments} 
            onAutoMatch={handleAutoMatch} 
          />
        )}

        {activeTab === 'supply' && (
          <SupplyPortal supplies={supplies} onAddSupply={handleAddSupply} />
        )}

        {activeTab === 'demand' && (
          <DemandPortal demands={demands} onAddDemand={handleAddDemand} />
        )}

        {activeTab === 'logistics' && (
          <LogisticsPortal shipments={shipments} />
        )}

        {activeTab === 'forecasting' && (
          <ForecastingPortal />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p className="font-bold text-slate-200 mb-1">AgroMatch App Prototype</p>
            <p>Diuji untuk platform multipengguna (Koperasi Tani, Retail, Logistik)</p>
          </div>
          <div className="flex flex-col items-end">
            <p>© 2026 AgroMatch. Hak Cipta Dilindungi.</p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;