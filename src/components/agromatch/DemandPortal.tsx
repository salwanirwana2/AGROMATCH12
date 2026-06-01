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
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface DemandPortalProps {
  demands: any[];
  supplies: any[];
  onAddDemand: (demand: any) => void;
}

const DemandPortal = ({ demands, supplies, onAddDemand }: DemandPortalProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderQty, setOrderQty] = useState(1);
  const [selectedCourier, setSelectedCourier] = useState<string>('internal');
  
  const couriers = [
    { id: 'internal', name: 'Kurir Internal Koperasi', price: 50000, eta: '3-5 Jam', desc: 'Rekomendasi Terdekat' },
    { id: 'jt', name: 'J&T Cargo', price: 85000, eta: '1 Hari', desc: 'Layanan Cepat' },
    { id: 'jne', name: 'JNE Logistics', price: 75000, eta: '1-2 Hari', desc: 'Layanan Reguler' }
  ];

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    showSuccess("Produk ditambahkan ke keranjang");
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const courierPrice = couriers.find(c => c.id === selectedCourier)?.price || 0;
    return (selectedProduct.price * orderQty * 1000) + courierPrice;
  };

  const confirmOrder = () => {
    showSuccess("Pesanan Pembelian Berhasil Dibuat!");
    setIsCheckoutOpen(false);
    setCartCount(0);
  };

  const getEmoji = (commodity: string) => {
    switch (commodity) {
      case 'Beras': return "🌾";
      case 'Cabai Merah': return "🌶️";
      case 'Bawang Merah': return "🧅";
      case 'Kentang': return "🥔";
      default: return "📦";
    }
  };

  const getBgColor = (commodity: string) => {
    switch (commodity) {
      case 'Beras': return "bg-amber-50";
      case 'Cabai Merah': return "bg-rose-50";
      case 'Bawang Merah': return "bg-purple-50";
      case 'Kentang': return "bg-orange-50";
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
          <div className="relative cursor-pointer p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
            <ShoppingBag className="text-slate-600" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
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

                  <div className="flex items-center text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <MapPin size={10} className="mr-1 text-rose-500" /> Asal: {product.region}
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleAddToCart}
                    className="rounded-xl border-slate-200 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-100"
                  >
                    <ShoppingBag size={18} />
                  </Button>
                  <Button 
                    onClick={() => handleBuyNow(product)}
                    className="flex-grow bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md"
                  >
                    Beli Langsung
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isCheckoutOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-teal-600 p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="font-bold text-lg">Checkout Pembelian</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center text-3xl overflow-hidden", getBgColor(selectedProduct.commodity))}>
                  {selectedProduct.image ? (
                    <img src={selectedProduct.image} alt={selectedProduct.commodity} className="w-full h-full object-cover" />
                  ) : (
                    getEmoji(selectedProduct.commodity)
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900">{selectedProduct.commodity} Premium</h4>
                  <p className="text-xs text-slate-500">{selectedProduct.cooperative}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Jumlah (Ton)</label>
                    <Input 
                      type="number" 
                      value={orderQty} 
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="w-16 h-8 text-center rounded-lg border-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 flex items-center">
                    <User size={16} className="mr-2 text-teal-600" /> Informasi Penerima
                  </h5>
                  <div className="space-y-3">
                    <Input placeholder="Nama Lengkap Kontak" className="rounded-xl border-slate-200" />
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <Input placeholder="Nomor HP Aktif" className="pl-10 rounded-xl border-slate-200" />
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
                      <p className="text-[10px] text-slate-500 mt-1">{courier.desc}</p>
                      <p className="text-xs font-bold text-slate-900 mt-2">Rp {courier.price.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Total Pembayaran</span>
                <span className="text-2xl font-black text-teal-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
              <Button 
                onClick={confirmOrder}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-10 py-6 rounded-2xl shadow-lg"
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