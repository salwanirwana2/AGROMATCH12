"use client";

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Truck, 
  User, 
  Phone, 
  X, 
  CheckCircle2,
  Search,
  Store,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface DemandPortalProps {
  demands: any[];
  supplies: any[];
  cart: any[];
  setCart: (cart: any[]) => void;
  onAddToCart: (product: any) => void;
  onCreateOrder: (order: any) => void;
  onAddDemand: (demand: any) => void;
}

const DemandPortal = ({ demands, supplies, cart, setCart, onAddToCart, onCreateOrder, onAddDemand }: DemandPortalProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string>('internal');
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '', address: '', region: 'Banda Aceh' });
  
  const couriers = [
    { id: 'internal', name: 'Kurir Internal Koperasi', price: 50000, eta: '3-5 Jam', desc: 'Rekomendasi Terdekat' },
    { id: 'jt', name: 'J&T Cargo', price: 85000, eta: '1 Hari', desc: 'Layanan Cepat' },
    { id: 'jne', name: 'JNE Logistics', price: 75000, eta: '1-2 Hari', desc: 'Layanan Reguler' }
  ];

  const updateItemQty = (id: number, newQty: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(0, newQty) } : item));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const calculateTotalWeight = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  const calculateTotal = () => {
    const courierPrice = couriers.find(c => c.id === selectedCourier)?.price || 0;
    return calculateSubtotal() + courierPrice;
  };

  const isOrderValid = () => {
    const hasItems = cart.length > 0;
    const allItemsMin5kg = cart.every(item => item.qty >= 5);
    const hasInfo = buyerInfo.name && buyerInfo.phone && buyerInfo.address;
    return hasItems && allItemsMin5kg && hasInfo;
  };

  const handleConfirmOrder = () => {
    if (!isOrderValid()) {
      showError("Harap lengkapi data dan pastikan semua item minimal 5 KG.");
      return;
    }

    const orderData = {
      items: cart.map(item => ({ commodity: item.commodity, qty: item.qty, price: item.price })),
      buyerName: buyerInfo.name,
      buyerPhone: buyerInfo.phone,
      address: buyerInfo.address,
      region: buyerInfo.region,
      totalWeight: calculateTotalWeight(),
      totalPrice: calculateTotal(),
      courier: couriers.find(c => c.id === selectedCourier)?.name
    };

    onCreateOrder(orderData);
    setIsCheckoutOpen(false);
    setBuyerInfo({ name: '', phone: '', address: '', region: 'Banda Aceh' });
  };

  const getEmoji = (commodity: string) => {
    switch (commodity) {
      case 'Beras': return "🌾";
      case 'Bawang Merah': return "🧅";
      case 'Bawang Putih': return "🧄";
      case 'Cabai Merah': return "🌶️";
      case 'Cabai Hijau': return "🫑";
      case 'Cabai Rawit': return "🔥";
      case 'Kentang': return "🥔";
      case 'Jagung': return "🌽";
      case 'Tomat': return "🍅";
      default: return "📦";
    }
  };

  const getBgColor = (commodity: string) => {
    switch (commodity) {
      case 'Beras': return "bg-amber-50";
      case 'Bawang Merah': return "bg-purple-50";
      case 'Bawang Putih': return "bg-slate-50";
      case 'Cabai Merah': return "bg-rose-50";
      case 'Cabai Hijau': return "bg-emerald-50";
      case 'Cabai Rawit': return "bg-orange-50";
      case 'Kentang': return "bg-orange-50";
      case 'Jagung': return "bg-yellow-50";
      case 'Tomat': return "bg-red-50";
      default: return "bg-slate-50";
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
            <Store size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pasar Induk Lambaro</h2>
            <p className="text-xs text-slate-500 flex items-center">
              <MapPin size={12} className="mr-1 text-rose-500" /> Banda Aceh, Aceh Besar
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Cari komoditas..." 
              className="pl-10 rounded-xl border-slate-200 w-full md:w-64"
            />
          </div>
          <div 
            onClick={() => setIsCheckoutOpen(true)}
            className="relative cursor-pointer p-2 bg-teal-600 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-100"
          >
            <ShoppingBag className="text-white" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Katalog Komoditas Segar</h3>
          <Badge variant="outline" className="text-teal-600 border-teal-100 bg-teal-50">Live dari Koperasi</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supplies.map((product) => (
            <Card key={product.id} className="group border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col">
              <div className={cn("h-48 flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110 overflow-hidden", getBgColor(product.commodity))}>
                {product.image ? (
                  <img src={product.image} alt={product.commodity} className="w-full h-full object-cover" />
                ) : (
                  getEmoji(product.commodity)
                )}
              </div>
              <CardContent className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{product.commodity} Premium</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{product.cooperative}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Harga / Kg</span>
                      <span className="text-lg font-black text-teal-600">Rp {product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Stok</span>
                      <span className="text-sm font-bold text-slate-700">{product.qty} Ton</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Button 
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Tambah ke Keranjang
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-teal-600 p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="font-bold text-lg">Checkout Keranjang Belanja</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              {/* Cart Items List */}
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-slate-900 flex items-center">
                  <ShoppingBag size={16} className="mr-2 text-teal-600" /> Daftar Belanja
                </h5>
                {cart.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm">Keranjang Anda kosong.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl overflow-hidden", getBgColor(item.commodity))}>
                          {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : getEmoji(item.commodity)}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-900 text-sm">{item.commodity} Premium</h4>
                          <p className="text-[10px] text-slate-500">{item.cooperative}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center space-x-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">JUMLAH (KG)</label>
                            <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                              <button onClick={() => updateItemQty(item.id, item.qty - 1)} className="px-2 py-1 hover:bg-slate-100">-</button>
                              <Input 
                                type="number" 
                                value={item.qty} 
                                onChange={(e) => updateItemQty(item.id, Number(e.target.value))}
                                className="w-12 h-8 text-center border-none focus:ring-0 text-xs font-bold"
                              />
                              <button onClick={() => updateItemQty(item.id, item.qty + 1)} className="px-2 py-1 hover:bg-slate-100">+</button>
                            </div>
                          </div>
                          {item.qty < 5 && (
                            <span className="text-[9px] text-rose-500 font-bold flex items-center gap-1">
                              <AlertCircle size={10} /> Minimal pembelian adalah 5 KG
                            </span>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-rose-500 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 flex items-center">
                    <User size={16} className="mr-2 text-teal-600" /> Informasi Penerima
                  </h5>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Nama Lengkap Kontak" 
                      className="rounded-xl border-slate-200" 
                      value={buyerInfo.name}
                      onChange={e => setBuyerInfo({...buyerInfo, name: e.target.value})}
                    />
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <Input 
                        placeholder="Nomor HP Aktif" 
                        className="pl-10 rounded-xl border-slate-200" 
                        value={buyerInfo.phone}
                        onChange={e => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 flex items-center">
                    <MapPin size={16} className="mr-2 text-teal-600" /> Alamat Pengiriman
                  </h5>
                  <div className="space-y-3">
                    <textarea 
                      placeholder="Alamat spesifik retail/pasar..." 
                      className="w-full h-24 p-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      value={buyerInfo.address}
                      onChange={e => setBuyerInfo({...buyerInfo, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-bold text-slate-900 flex items-center">
                  <Truck size={16} className="mr-2 text-teal-600" /> Opsi Pengiriman Terdekat
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {couriers.map((courier) => (
                    <div 
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier.id)}
                      className={cn(
                        "p-4 rounded-2xl border-2 cursor-pointer transition-all",
                        selectedCourier === courier.id 
                          ? "border-teal-600 bg-teal-50/50" 
                          : "border-slate-100 bg-white hover:border-slate-200"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-teal-600 uppercase">{courier.eta}</span>
                        {selectedCourier === courier.id && <CheckCircle2 size={14} className="text-teal-600" />}
                      </div>
                      <h6 className="text-xs font-bold text-slate-900">{courier.name}</h6>
                      <p className="text-xs font-bold text-slate-900 mt-2">Rp {courier.price.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Berat: {calculateTotalWeight()} KG</span>
                <span className="text-2xl font-black text-teal-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
              <Button 
                onClick={handleConfirmOrder}
                disabled={!isOrderValid()}
                className={cn(
                  "w-full sm:w-auto font-bold px-10 py-6 rounded-2xl shadow-lg transition-all",
                  isOrderValid() ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                Konfirmasi & Buat Pesanan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandPortal;