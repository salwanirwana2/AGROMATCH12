"use client";

import React, { useState, useMemo, useEffect } from 'react';
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
import { showSuccess } from '@/utils/toast';
import { useAgroMatch } from '@/hooks/useAgroMatch';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [appState, setAppState] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cart, setCart] = useState<any[]>([]);

  // Supabase Data Hook
  const { supplies, orders, addSupply, createOrder, approveOrder } = useAgroMatch(user);

  // Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role
        };
        setUser(userData);
        setAppState('dashboard');
        setInitialTab(userData.role);
      }
    });
  }, []);

  const setInitialTab = (role: string) => {
    if (role === 'koperasi') setActiveTab('supply');
    else if (role === 'retail') setActiveTab('demand');
    else if (role === 'logistik') setActiveTab('logistics');
    else setActiveTab('dashboard');
  };

  // AI Forecasting Logic
  const forecastingStats = useMemo(() => {
    const totalBerasSupply = supplies
      .filter(s => s.name === "Beras")
      .reduce((acc, curr) => acc + curr.stock_ton, 0);

    const totalBerasDemand = orders
      .reduce((acc, order) => {
        const berasItem = order.order_items?.find((i: any) => i.commodity_name === "Beras");
        return acc + (berasItem ? berasItem.quantity_kg : 0);
      }, 0) / 1000;

    return {
      commodity: "Beras",
      region: "Banda Aceh",
      totalSupply: totalBerasSupply || 150,
      totalDemand: totalBerasDemand || 180
    };
  }, [supplies, orders]);

  const [alerts] = useState<AlertItem[]>([
    { id: 1, type: "danger", text: "Banda Aceh berpotensi DEFISIT Beras sebesar 30 Ton." }
  ]);

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setAppState('login');
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setAppState('dashboard');
    setInitialTab(userData.role);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
      setCart([...cart, { ...product, qty: 5, commodity: product.name }]);
    }
    showSuccess(`${product.name} ditambahkan ke keranjang`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {appState === 'landing' && (
          <LandingPage 
            onSelectRole={handleSelectRole} 
            forecastingStats={forecastingStats}
            supplies={supplies}
            orders={orders}
            demands={[]}
          />
        )}
        {appState === 'login' && selectedRole && (
          <LoginPage role={selectedRole} onLogin={handleLogin} onBack={() => setAppState('landing')} />
        )}
        
        {appState === 'dashboard' && user && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Alerts alerts={alerts} onClear={() => {}} />

            {activeTab === 'dashboard' && (
              <Dashboard 
                supplies={supplies} 
                demands={[]} 
                shipments={orders.filter(o => o.status !== "PENDING_MATCHMAKING")} 
                pendingOrders={orders.filter(o => o.status === "PENDING_MATCHMAKING")}
                onAutoMatch={() => {}} 
                onApproveOrder={approveOrder}
              />
            )}

            {activeTab === 'supply' && <SupplyPortal supplies={supplies} onAddSupply={addSupply} />}

            {activeTab === 'demand' && (
              <DemandPortal 
                demands={[]} 
                supplies={supplies} 
                cart={cart}
                setCart={setCart}
                onAddToCart={handleAddToCart}
                onCreateOrder={createOrder}
                onAddDemand={() => {}} 
              />
            )}

            {activeTab === 'logistics' && (
              <LogisticsPortal shipments={orders.filter(o => o.status !== "PENDING_MATCHMAKING")} />
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