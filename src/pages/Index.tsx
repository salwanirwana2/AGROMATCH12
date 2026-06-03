"use client";

import React, { useState } from 'react';
import Header from '@/components/agromatch/Header';
import Alerts, { AlertItem } from '@/components/agromatch/Alerts';
import Dashboard from '@/components/agromatch/Dashboard';
import SupplyPortal from '@/components/agromatch/SupplyPortal';
import DemandPortal from '@/components/agromatch/DemandPortal';
import LogisticsPortal from '@/components/agromatch/LogisticsPortal';
import ForecastingPortal from '@/components/agromatch/ForecastingPortal';
import LandingPage from '@/components/agromatch/LandingPage';
import LoginPage from '@/components/agromatch/LoginPage';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showInfo } from '@/utils/toast';

const Index = () => {
  const [appState, setAppState] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Global Cart State
  const [cart, setCart] = useState<any[]>([]);

  // Simulated Database State
  const [supplies, setSupplies] = useState([
    { id: 1, region: "Pidie", commodity: "Beras", qty: 150, price: 10500, date: "2026-06-10", cooperative: "Koperasi Meuseuraya Pidie", image: "" },
    { id: 2, region: "Bener Meriah", commodity: "Kentang", qty: 45, price: 12000, date: "2026-06-12", cooperative: "Koperasi Gayo Horti", image: "" },
    { id: 3, region: "Aceh Tengah", commodity: "Cabai Merah", qty: 20, price: 35000, date: "2026-06-08", cooperative: "Koperasi Tani Dataran Tinggi", image: "" }
  ]);

  const [demands, setDemands] = useState([
    { id: 1, region: "Banda Aceh", commodity: "Beras", qty: 180, maxPrice: 12000, date: "2026-06-12", client: "Pasar Induk Lambaro" },
    { id: 2, region: "Lhokseumawe", commodity: "Cabai Merah", qty: 35, maxPrice: 40000, date: "2026-06-09", client: "Pasar Pajak Inpres" }
  ]);

  // Unified Orders State (Pending Matchmaking -> Approved for Shipping -> Shipping)
  const [orders, setOrders] = useState<any[]>([
    { 
      id: "AM-101", 
      items: [{ commodity: "Beras", qty: 100, price: 10500 }], 
      buyerName: "Budi Santoso", 
      buyerPhone: "08123456789", 
      address: "Pasar Induk Lambaro, Banda Aceh",
      region: "Banda Aceh",
      totalWeight: 100,
      totalPrice: 1100000,
      status: "Approved for Shipping",
      logistics: "Trans Kutaraja Logistik",
      eta: "2 Jam"
    }
  ]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, type: "danger", text: "Banda Aceh berpotensi DEFISIT Beras sebesar 30 Ton akibat lonjakan permintaan di Pasar Lambaro." },
    { id: 2, type: "success", text: "Wilayah Abdya melaporkan SURPLUS Beras sebesar 50 Ton dari hasil panen raya minggu ini." }
  ]);

  // Navigation Handlers
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setAppState('login');
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setAppState('dashboard');
    
    if (userData.role === 'koperasi') setActiveTab('supply');
    else if (userData.role === 'retail') setActiveTab('demand');
    else if (userData.role === 'logistik') setActiveTab('logistics');
    else setActiveTab('dashboard');
    
    showSuccess(`Selamat datang, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setAppState('landing');
    setActiveTab('dashboard');
  };

  // Cart Handlers
  const handleAddToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 5 } : item));
    } else {
      setCart([...cart, { ...product, qty: 5 }]);
    }
    showSuccess(`${product.commodity} ditambahkan ke keranjang`);
  };

  const handleCreateOrder = (orderData: any) => {
    const newOrder = {
      id: `AM-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      status: "Pending Matchmaking",
      timestamp: Date.now()
    };
    setOrders([newOrder, ...orders]);
    setCart([]); // Clear cart after checkout
    showSuccess("Pesanan berhasil dibuat! Menunggu Matchmaking Admin.");
  };

  const handleApproveOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "Approved for Shipping", logistics: "Mitra Logistik AgroMatch", eta: "Menunggu Penjemputan" } 
        : order
    ));
    showSuccess("Pesanan disetujui! Data diteruskan ke Mitra Logistik.");
  };

  // Feature Handlers
  const handleAddSupply = (newSupply: any) => {
    const item = { id: Date.now(), ...newSupply };
    setSupplies([item, ...supplies]);
    showSuccess(`Komoditas ${item.commodity} berhasil dinaikkan ke Pasar!`);
  };

  const handleAddDemand = (newDemand: any) => {
    const item = { id: Date.now(), ...newDemand };
    setDemands([item, ...demands]);
    showInfo(`Permintaan ${item.commodity} telah ditayangkan.`);
  };

  const handleAutoMatch = (supplyId: number, demandId: number) => {
    const supply = supplies.find(s => s.id === supplyId);
    const demand = demands.find(d => d.id === demandId);
    if (!supply || !demand) return;

    const matchedQty = Math.min(supply.qty, demand.qty);
    const newOrder = {
      id: `AM-${Date.now()}`,
      items: [{ commodity: supply.commodity, qty: matchedQty * 1000, price: supply.price }],
      buyerName: demand.client,
      buyerPhone: "0811-XXXX-XXXX",
      address: demand.region,
      region: demand.region,
      totalWeight: matchedQty * 1000,
      totalPrice: matchedQty * 1000 * supply.price,
      status: "Approved for Shipping",
      logistics: "Trans Kutaraja Logistik",
      eta: "5 Jam"
    };

    setOrders([newOrder, ...orders]);
    setSupplies(supplies.map(s => s.id === supplyId ? { ...s, qty: s.qty - matchedQty } : s).filter(s => s.qty > 0));
    setDemands(demands.map(d => d.id === demandId ? { ...d, qty: d.qty - matchedQty } : d).filter(d => d.qty > 0));
    showSuccess(`Match Berhasil! Armada sedang diproses.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {appState === 'landing' && (
          <LandingPage onSelectRole={handleSelectRole} />
        )}

        {appState === 'login' && selectedRole && (
          <LoginPage 
            role={selectedRole} 
            onLogin={handleLogin} 
            onBack={() => setAppState('landing')} 
          />
        )}

        {appState === 'dashboard' && user && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Alerts alerts={alerts} onClear={() => setAlerts([])} />

            {activeTab === 'dashboard' && (
              <Dashboard 
                supplies={supplies} 
                demands={demands} 
                shipments={orders.filter(o => o.status === "Approved for Shipping" || o.status === "Shipping")} 
                pendingOrders={orders.filter(o => o.status === "Pending Matchmaking")}
                onAutoMatch={handleAutoMatch} 
                onApproveOrder={handleApproveOrder}
              />
            )}

            {activeTab === 'supply' && (
              <SupplyPortal supplies={supplies} onAddSupply={handleAddSupply} />
            )}

            {activeTab === 'demand' && (
              <DemandPortal 
                demands={demands} 
                supplies={supplies} 
                cart={cart}
                setCart={setCart}
                onAddToCart={handleAddToCart}
                onCreateOrder={handleCreateOrder}
                onAddDemand={handleAddDemand} 
              />
            )}

            {activeTab === 'logistics' && (
              <LogisticsPortal shipments={orders.filter(o => o.status === "Approved for Shipping" || o.status === "Shipping")} />
            )}

            {activeTab === 'forecasting' && (
              <ForecastingPortal />
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p>© 2026 AgroMatch Aceh. Hak Cipta Dilindungi.</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;