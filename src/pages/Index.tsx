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
import PaymentInvoice from '@/components/agromatch/PaymentInvoice';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

// --- TypeScript Interfaces ---
export type OrderStatus = "PENDING_MATCHMAKING" | "MATCHED_READY_FOR_SHIPPING" | "SHIPPING" | "DELIVERED";

export interface OrderItem {
  id?: string; // ID komoditas untuk pengurangan stok
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
  paymentMethod?: string;
  bankName?: string;
}

const Index = () => {
  const [appState, setAppState] = useState<'landing' | 'login' | 'dashboard' | 'payment'>('landing');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Global State
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [supplies, setSupplies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const [demands, setDemands] = useState([
    { id: 1, region: "Banda Aceh", commodity: "Beras", qty: 180, maxPrice: 12000, date: "2026-06-12", client: "Pasar Induk Lambaro" }
  ]);

  // --- Isolated Data Fetching ---
  const fetchCommodities = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('commodities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedSupplies = data.map(item => ({
          id: item.id,
          commodity: item.commodity_name,
          cooperative: item.cooperative_name || "Koperasi Tani",
          qty: item.stock,
          price: item.price,
          region: item.region || "Aceh",
          date: item.harvest_date,
          image: item.image_url
        }));
        setSupplies(mappedSupplies);
      }
    } catch (error: any) {
      console.error("Error fetching commodities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommodities();
  }, []);

  // --- AI Forecasting Logic ---
  const forecastingStats = useMemo(() => {
    const totalBerasSupply = supplies
      .filter(s => s.commodity === "Beras")
      .reduce((acc, curr) => acc + curr.qty, 0);

    const totalBerasDemandFromOrders = orders
      .reduce((acc, order) => {
        const berasItem = order.items.find(i => i.commodity === "Beras");
        return acc + (berasItem ? berasItem.qty : 0);
      }, 0) / 1000;

    const initialBerasDemand = demands
      .filter(d => d.commodity === "Beras")
      .reduce((acc, curr) => acc + curr.qty, 0);

    return {
      commodity: "Beras",
      region: "Banda Aceh",
      totalSupply: totalBerasSupply,
      totalDemand: totalBerasDemandFromOrders + initialBerasDemand
    };
  }, [supplies, orders, demands]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, type: "danger", text: "Banda Aceh berpotensi DEFISIT Beras sebesar 30 Ton." }
  ]);

  // --- Order Workflow Handlers ---
  const handleCreateOrder = async (orderData: any) => {
    try {
      // 1. Save to Supabase 'orders' table
      const { data: savedOrder, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            buyer_name: orderData.buyerName,
            buyer_phone: orderData.buyerPhone,
            shipping_address: orderData.address,
            total_price: orderData.totalPrice,
            payment_method: orderData.paymentMethod,
            bank_name: orderData.bankName,
            payment_status: 'Pending'
          }
        ])
        .select();

      if (orderError) throw orderError;

      // 2. Reduce stock in database for each item using RPC
      for (const item of orderData.items) {
        if (item.id) {
          const qtyInTon = item.qty / 1000;
          const { error: rpcError } = await supabase.rpc('reduce_stock', {
            commodity_id: item.id,
            quantity_to_reduce: qtyInTon
          });
          
          if (rpcError) throw rpcError;
        }
      }

      // 3. Update local state
      const newOrder: Order = {
        id: savedOrder[0].id,
        ...orderData,
        status: "PENDING_MATCHMAKING",
      };
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      setCurrentOrder(newOrder);
      
      // 4. Refresh commodities for UI sync
      await fetchCommodities();
      
      showSuccess("Pesanan berhasil dibuat!");

      // 5. UX DELAY & REDIRECT
      setTimeout(() => {
        setAppState('payment');
      }, 1500);

    } catch (error: any) {
      console.error("Error processing order:", error);
      showError("Gagal memproses pesanan: " + (error.message || "Terjadi kesalahan pada server"));
    }
  };

  const handleApproveOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: "MATCHED_READY_FOR_SHIPPING", 
            adminApprovalTimestamp: Date.now(),
            matchedSource: "Koperasi Meuseuraya Pidie",
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

  // --- Secure Data Insertion with Image Upload ---
  const handleAddSupply = async (newSupply: any, file: File | null) => {
    let publicImageUrl = "";

    try {
      if (file) {
        if (!(file instanceof File)) {
          console.error("Invalid file object detected:", file);
          throw new Error("Objek file tidak valid.");
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('commodity-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Supabase Storage Error Detailed:", uploadError);
          throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('commodity-images')
          .getPublicUrl(filePath);
        
        publicImageUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase
        .from('commodities')
        .insert([
          {
            commodity_name: newSupply.commodity,
            stock: newSupply.qty,
            price: newSupply.price,
            harvest_date: newSupply.date || null,
            image_url: publicImageUrl,
            cooperative_name: newSupply.cooperative,
            region: newSupply.region
          }
        ])
        .select();

      if (error) {
        console.error("Database Insert Error Detailed:", error);
        throw error;
      }

      if (data) {
        const savedItem = {
          id: data[0].id,
          commodity: data[0].commodity_name,
          cooperative: data[0].cooperative_name,
          qty: data[0].stock,
          price: data[0].price,
          region: data[0].region,
          date: data[0].harvest_date,
          image: data[0].image_url
        };
        setSupplies(prev => [savedItem, ...prev]);
        showSuccess(`Komoditas ${newSupply.commodity} berhasil dinaikkan ke Pasar!`);
      }
    } catch (error: any) {
      console.error("Full Submission Error Trace:", error);
      showError(`Gagal mengunggah: ${error.message || "Terjadi kesalahan sistem"}`);
      throw error; 
    }
  };

  const handleAutoMatch = (supplyId: number, demandId: number) => {
    showSuccess("AI Matchmaking Berhasil!");
  };

  const mySupplies = useMemo(() => {
    if (!user || user.role !== 'koperasi') return [];
    return supplies.filter(s => s.cooperative === user.name);
  }, [supplies, user]);

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
            demands={demands}
          />
        )}
        {appState === 'login' && selectedRole && <LoginPage role={selectedRole} onLogin={handleLogin} onBack={() => setAppState('landing')} />}
        
        {appState === 'payment' && currentOrder && (
          <PaymentInvoice order={currentOrder} onClose={() => setAppState('dashboard')} />
        )}

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

            {activeTab === 'supply' && (
              <SupplyPortal 
                supplies={mySupplies} 
                onAddSupply={handleAddSupply} 
                userName={user.name}
              />
            )}

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