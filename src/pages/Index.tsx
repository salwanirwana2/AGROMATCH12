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

// --- TypeScript Interfaces ---
export type OrderStatus = "PENDING_MATCHMAKING" | "MATCHED_READY_FOR_SHIPPING" | "SHIPPING" | "DELIVERED";

export interface OrderItem {
  commodity: string;
  qty: number; // in KG
  price: number;
}

export interface Order {
  id: string;
  buyerName: string;
  buyerPhone: string;
  address: string;
  region: string;
  items: OrderItem[];
  totalWeight: number;
  totalPrice: number;
  status: OrderStatus;
  adminApprovalTimestamp?: number;
  matchedSource?: string;
  logistics?: string;
  eta?: string;
}

const Index = () => {
  const [appState, setAppState] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Global State
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [supplies, setSupplies] = useState([
    { id: 1, region: "Pidie", commodity: "Beras", qty: 150, price: 10500, date: "2026-06-10", cooperative: "Koperasi Meuseuraya Pidie", image: "" },
    { id: 2, region: "Bener Meriah", commodity: "Kentang", qty: 45, price: 12000, date: "2026-06-12", cooperative: "Koperasi Gayo Horti", image: "" },
    { id: 3, region: "Aceh Tengah", commodity: "Cabai Merah", qty: 20, price: 35000, date: "2026-06-08", cooperative: "Koperasi Tani Dataran Tinggi", image: "" }
  ]);

  const [demands, setDemands] = useState([
    { id: 1, region: "Banda Aceh", commodity: "Beras", qty: 180, maxPrice: 12000, date: "2026-06-12", client: "Pasar Induk Lambaro" }
  ]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, type: "danger", text: "Banda Aceh berpotensi DEFISIT Beras sebesar 30 Ton." }
  ]);

  // --- Order Workflow Handlers ---

  // Step 1: Create Order (Retail Portal)
  const handleCreateOrder = (orderData: any) => {
    const newOrder: Order = {
      id: `AM-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      status: "PENDING_MATCHMAKING",
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    showSuccess("Pesanan dibuat! Menunggu Matchmaking Admin.");
  };

  // Step 2: Admin Approval (Admin Portal)
  const handleApproveOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: "MATCHED_READY_FOR_SHIPPING", 
            adminApprovalTimestamp: Date.now(),
            matchedSource: "Koperasi Meuseuraya Pidie", // Mock matched source
            logistics: "Mitra Logistik AgroMatch",
            eta: "Menunggu Penjemputan"
          } 
        : order
    ));
    showSuccess("Pesanan disetujui! Manifest dikirim ke Logistik secara real-time.");
  };

  // --- Navigation & Auth ---
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

  const handleAddToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 5 } : item));
    } else {
      setCart([...cart, { ...product, qty: 5 }]);
    }
    showSuccess(`${product.commodity} ditambahkan ke keranjang`);
  };

  const handleAddSupply = (newSupply: any) => {
    setSupplies(prev => [{ id: Date.now(), ...newSupply }, ...prev]);
    showSuccess(`Komoditas ${newSupply.commodity} berhasil dinaikkan!`);
  };

  const handleAutoMatch = (supplyId: number, demandId: number) => {
    // Logic for AI Auto-match (Admin only)
    showSuccess("AI Matchmaking Berhasil!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {appState === 'landing' && <LandingPage onSelectRole={handleSelectRole} />}
        {appState === 'login' && selectedRole && <LoginPage role={selectedRole} onLogin={handleLogin} onBack={() => setAppState('landing')} />}
        
        {appState === 'dashboard' && user && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Alerts alerts={alerts} onClear={() => setAlerts([])} />

            {activeTab === 'dashboard' && (
              <Dashboard 
                supplies={supplies} 
                demands={demands} 
                shipments={orders.filter(o => o.status === "MATCHED_READY_FOR_SHIPPING" || o.status === "SHIPPING")} 
                pendingOrders={orders.filter(o => o.status === "PENDING_MATCHMAKING")}
                onAutoMatch={handleAutoMatch} 
                onApproveOrder={handleApproveOrder}
              />
            )}

            {activeTab === 'supply' && <SupplyPortal supplies={supplies} onAddSupply={handleAddSupply} />}

            {activeTab === 'demand' && (
              <DemandPortal 
                demands={demands} 
                supplies={supplies} 
                cart={cart}
                setCart={setCart}
                onAddToCart={handleAddToCart}
                onCreateOrder={handleCreateOrder}
                onAddDemand={() => {}} 
              />
            )}

            {activeTab === 'logistics' && (
              <LogisticsPortal shipments={orders.filter(o => o.status === "MATCHED_READY_FOR_SHIPPING" || o.status === "SHIPPING")} />
            )}

            {activeTab === 'forecasting' && <ForecastingPortal />}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AgroMatch Aceh. Hak Cipta Dilindungi.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;