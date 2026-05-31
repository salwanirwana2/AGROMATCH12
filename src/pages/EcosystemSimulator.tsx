"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Store, Wheat, Truck, CheckCircle2, XCircle, 
  MapPin, Phone, User, Package, ChevronRight, ArrowRight,
  ClipboardList, Navigation, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showInfo, showWarning } from '@/utils/toast';

// --- Types & Mock Data ---
interface Order {
  id: string;
  commodity: string;
  qty: number;
  price: number;
  total: number;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: string;
  region: string;
  sellerName: string;
  sellerAddress: string;
  status: 'pending' | 'approved' | 'rejected' | 'shipping' | 'delivered';
  timestamp: number;
  vehicleType?: string;
}

const PRODUCTS = [
  { id: 1, name: "Beras Premium Tangse", seller: "Koperasi Meuseuraya Pidie", address: "Jl. Sigli-Banda Aceh, Pidie", price: 11500, emoji: "🌾", color: "bg-amber-50" },
  { id: 2, name: "Cabai Merah Keriting", seller: "Koperasi Tani Abdya", address: "Blangpidie, Aceh Barat Daya", price: 38000, emoji: "🌶️", color: "bg-rose-50" },
  { id: 3, name: "Bawang Merah Lokal", seller: "Koperasi Gayo Horti", address: "Simpang Tiga Redelong, Bener Meriah", price: 28000, emoji: "🧅", color: "bg-purple-50" },
];

const EcosystemSimulator = () => {
  const [activePortal, setActivePortal] = useState<'retail' | 'koperasi' | 'logistik'>('retail');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    region: 'Banda Aceh',
    qty: 1
  });

  // --- Logic ---
  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showWarning("Harap lengkapi data pengiriman!");
      return;
    }

    const newOrder: Order = {
      id: `AM-${Math.floor(100 + Math.random() * 900)}`,
      commodity: selectedProduct.name,
      qty: formData.qty,
      price: selectedProduct.price,
      total: (selectedProduct.price * formData.qty * 1000) + 50000, // Price per kg * ton * 1000 + flat shipping
      buyerName: formData.name,
      buyerPhone: formData.phone,
      deliveryAddress: formData.address,
      region: formData.region,
      sellerName: selectedProduct.seller,
      sellerAddress: selectedProduct.address,
      status: 'pending',
      timestamp: Date.now()
    };

    setOrders([newOrder, ...orders]);
    setIsCheckoutOpen(false);
    showSuccess("Pesanan berhasil dibuat! Menunggu persetujuan Koperasi.");
    setFormData({ ...formData, name: '', phone: '', address: '', qty: 1 });
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        // Add vehicle recommendation logic for logistics
        let vehicle = "Pick-up";
        if (o.qty >= 1 && o.qty < 5) vehicle = "Truk Engkel";
        if (o.qty >= 5) vehicle = "Colt Diesel Truk";
        
        return { ...o, status, vehicleType: vehicle };
      }
      return o;
    }));
    
    if (status === 'approved') showSuccess("Pesanan disetujui! Diteruskan ke Mitra Logistik.");
    if (status === 'shipping') showInfo("Manifes diambil! Armada dalam perjalanan.");
  };

  // --- Renderers ---
  
  const renderRetail = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-teal-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
            <Store size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Portal Retail / Pasar</h2>
            <p className="text-xs text-slate-500">Akun Pembeli • Model Shopee</p>
          </div>
        </div>
        <Badge className="bg-teal-600 text-white border-none px-4 py-1.5 rounded-full">Pasar Induk Lambaro</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map(p => (
          <Card key={p.id} className="overflow-hidden rounded-[2rem] border-slate-100 hover:shadow-xl transition-all group">
            <div className={cn("h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform", p.color)}>
              {p.emoji}
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.seller}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Harga / Kg</span>
                  <span className="text-lg font-black text-teal-600">Rp {p.price.toLocaleString('id-ID')}</span>
                </div>
                <Button 
                  onClick={() => { setSelectedProduct(p); setIsCheckoutOpen(true); }}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-10 px-4"
                >
                  Beli Langsung
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card className="w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-teal-600 p-6 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">Checkout Pesanan</h3>
              <button onClick={() => setIsCheckoutOpen(false)}><XCircle /></button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Nama Penerima</label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Contoh: Budi" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Nomor HP</label>
                  <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="0812..." className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Wilayah Tujuan</label>
                <select 
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20"
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                >
                  <option>Banda Aceh</option>
                  <option>Aceh Besar</option>
                  <option>Lhokseumawe</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Alamat Lengkap</label>
                <textarea 
                  className="w-full h-20 p-3 rounded-xl border border-slate-200 text-sm"
                  placeholder="Jl. T. Nyak Arief No. 123..."
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{selectedProduct.emoji}</div>
                  <div>
                    <p className="text-sm font-bold">{selectedProduct.name}</p>
                    <p className="text-[10px] text-slate-500">Qty: {formData.qty} Ton</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFormData({...formData, qty: Math.max(1, formData.qty - 1)})} className="w-8 h-8 bg-white border rounded-lg">-</button>
                  <span className="font-bold">{formData.qty}</span>
                  <button onClick={() => setFormData({...formData, qty: formData.qty + 1})} className="w-8 h-8 bg-white border rounded-lg">+</button>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-teal-600 hover:bg-teal-700 py-6 rounded-2xl font-bold text-lg">
                Konfirmasi & Buat Pesanan
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const renderKoperasi = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between bg-emerald-900 p-6 rounded-3xl text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <Wheat size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Portal Koperasi Tani</h2>
            <p className="text-xs text-emerald-300">Seller Centre • Manajemen Pesanan</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-emerald-400 uppercase">Gudang Aktif</p>
          <p className="text-sm font-bold">Koperasi Meuseuraya Pidie</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <ClipboardList size={20} className="text-emerald-600" /> Pesanan Masuk
        </h3>
        {orders.filter(o => o.status === 'pending').length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-medium">Belum ada pesanan baru yang perlu disetujui.</p>
          </div>
        ) : (
          orders.filter(o => o.status === 'pending').map(order => (
            <Card key={order.id} className="rounded-[2rem] border-emerald-100 overflow-hidden shadow-sm">
              <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700 border-none">{order.id}</Badge>
                    <h4 className="font-bold text-lg">{order.commodity} • {order.qty} Ton</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Penjemputan (Gudang Anda)</p>
                      <p className="text-xs font-bold text-slate-700">{order.sellerAddress}</p>
                    </div>
                    <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Tujuan Pengiriman</p>
                      <p className="text-xs font-bold text-slate-700">{order.buyerName} - {order.region}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 min-w-[180px]">
                  <Button onClick={() => updateOrderStatus(order.id, 'approved')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                    Setujui & Siapkan
                  </Button>
                  <Button variant="ghost" onClick={() => updateOrderStatus(order.id, 'rejected')} className="text-rose-600 hover:bg-rose-50 font-bold rounded-xl">
                    Tolak Pesanan
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderLogistics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between bg-blue-600 p-6 rounded-3xl text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-200">
            <Truck size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Portal Mitra Logistik</h2>
            <p className="text-xs text-blue-200">Driver App • Job List</p>
          </div>
        </div>
        <Badge className="bg-white text-blue-600 border-none px-4 py-1.5 rounded-full font-bold">Online</Badge>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Navigation size={20} className="text-blue-600" /> Tugas Pengantaran Tersedia
        </h3>
        {orders.filter(o => o.status === 'approved' || o.status === 'shipping').length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-medium">Tidak ada tugas pengantaran saat ini.</p>
          </div>
        ) : (
          orders.filter(o => o.status === 'approved' || o.status === 'shipping').map(order => (
            <Card key={order.id} className={cn(
              "rounded-[2.5rem] border-none shadow-md overflow-hidden transition-all",
              order.status === 'shipping' ? "bg-blue-50 ring-2 ring-blue-500" : "bg-white"
            )}>
              <div className="p-6 space-y-6">
                {/* Header Card - Gojek Style */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">RESI: {order.id}</p>
                      <h4 className="font-bold text-slate-900">{order.commodity} • {order.qty} Ton</h4>
                    </div>
                  </div>
                  <Badge className={cn(
                    "px-3 py-1 rounded-full border-none",
                    order.status === 'shipping' ? "bg-blue-600 text-white" : "bg-amber-100 text-amber-700"
                  )}>
                    {order.status === 'shipping' ? 'Dalam Perjalanan' : 'Siap Jemput'}
                  </Badge>
                </div>

                {/* Vehicle Recommendation */}
                <div className="bg-blue-600/5 p-3 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <AlertCircle size={16} className="text-blue-600" />
                  <p className="text-xs font-bold text-blue-800">Rekomendasi Armada: <span className="underline">{order.vehicleType}</span></p>
                </div>

                {/* Route Info */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 before:border-dashed">
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Titik Penjemputan (Pickup)</p>
                    <p className="text-sm font-bold text-slate-800">{order.sellerName}</p>
                    <p className="text-xs text-slate-500">{order.sellerAddress}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Titik Pengantaran (Delivery)</p>
                    <p className="text-sm font-bold text-slate-800">{order.buyerName} - {order.region}</p>
                    <p className="text-xs text-slate-500">{order.deliveryAddress}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1 flex items-center gap-1">
                      <Phone size={12} /> {order.buyerPhone}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {order.status === 'approved' ? (
                  <Button 
                    onClick={() => updateOrderStatus(order.id, 'shipping')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                  >
                    Ambil Manifes / Terima Tugas <ArrowRight size={18} />
                  </Button>
                ) : (
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      Estimasi Tiba: 2 Jam
                    </div>
                    <Button variant="outline" className="text-blue-600 border-blue-200 rounded-xl">Detail Rute</Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">🌱</div>
            <h1 className="font-black text-xl tracking-tighter text-slate-900 hidden sm:block">AGROMATCH <span className="text-emerald-600">SIMULATOR</span></h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActivePortal('retail')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activePortal === 'retail' ? "bg-teal-600 text-white shadow-md" : "text-slate-500 hover:text-teal-600"
              )}
            >
              <Store size={14} /> <span className="hidden md:inline">Retail</span>
            </button>
            <button 
              onClick={() => setActivePortal('koperasi')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activePortal === 'koperasi' ? "bg-emerald-900 text-white shadow-md" : "text-slate-500 hover:text-emerald-900"
              )}
            >
              <Wheat size={14} /> <span className="hidden md:inline">Koperasi</span>
            </button>
            <button 
              onClick={() => setActivePortal('logistik')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activePortal === 'logistik' ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:text-blue-600"
              )}
            >
              <Truck size={14} /> <span className="hidden md:inline">Logistik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {activePortal === 'retail' && renderRetail()}
        {activePortal === 'koperasi' && renderKoperasi()}
        {activePortal === 'logistik' && renderLogistics()}
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-slate-100 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 AgroMatch Aceh - Ecosystem Prototype</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-teal-500"></div> Retail Active</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-900"></div> Koperasi Active</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Logistics Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcosystemSimulator;