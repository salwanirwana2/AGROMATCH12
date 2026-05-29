"use client";

import React, { useState } from 'react';
import { PlusCircle, CloudUpload, MapPin, Camera, Edit3, Archive, Trash2, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SupplyPortalProps {
  supplies: any[];
  onAddSupply: (supply: any) => void;
}

const SupplyPortal = ({ supplies, onAddSupply }: SupplyPortalProps) => {
  const [formData, setFormData] = useState({
    cooperative: "Koperasi Meuseuraya Pidie",
    region: "Pidie",
    commodity: "Beras",
    qty: "",
    price: "",
    date: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.qty || !formData.price || !formData.cooperative) return;
    onAddSupply({
      ...formData,
      qty: parseFloat(formData.qty),
      price: parseFloat(formData.price)
    });
    setFormData({ ...formData, qty: "", price: "", date: "" });
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* KOLOM KIRI: INPUT TAMBAH BARANG */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-white py-4">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center">
              <PlusCircle className="text-emerald-600 mr-2" size={18} /> Tambah Komoditas Baru
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Upload Placeholder */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Foto Komoditas</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50/50 transition-all group">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="text-slate-400 group-hover:text-emerald-500" size={20} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 block">+ Tambah Foto</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Maksimal 2MB (JPG, PNG)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Nama Komoditas</label>
                  <Select value={formData.commodity} onValueChange={v => setFormData({...formData, commodity: v})}>
                    <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-emerald-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beras">Beras Premium</SelectItem>
                      <SelectItem value="Bawang Merah">Bawang Merah Lokal</SelectItem>
                      <SelectItem value="Cabai Merah">Cabai Merah Keriting</SelectItem>
                      <SelectItem value="Kentang">Kentang Granola</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Total Stok (Ton)</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={formData.qty} 
                      onChange={e => setFormData({...formData, qty: e.target.value})}
                      className="rounded-xl bg-slate-50 border-slate-200 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Harga / Kg (Rp)</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="rounded-xl bg-slate-50 border-slate-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Estimasi Tanggal Panen</label>
                  <Input 
                    type="date" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="rounded-xl bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-md transition-all">
                <CloudUpload className="mr-2 h-5 w-5" /> Naikkan / Upload Komoditas
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* KOLOM KANAN: ETALASE BARANG */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">📦 Etalase Komoditas Koperasi Anda</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Kelola stok dan harga penawaran Anda di pasar.</p>
          </div>
          <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 px-3 py-1 rounded-full">
            Total: {supplies.length} Produk
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {supplies.map(sup => (
            <div key={sup.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative">
              {/* Out of Stock Overlay */}
              {sup.qty === 0 && (
                <div className="absolute inset-0 bg-white/60 z-10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                  <span className="bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg transform -rotate-3">
                    Stok Habis
                  </span>
                </div>
              )}

              <div>
                {/* Product Image Placeholder */}
                <div className={cn(
                  "h-40 flex items-center justify-center text-5xl relative transition-transform duration-500 group-hover:scale-105",
                  getBgColor(sup.commodity)
                )}>
                  {getEmoji(sup.commodity)}
                  {sup.qty > 0 && (
                    <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-tighter">
                      Aktif
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{sup.commodity} Premium</h3>
                    <div className="flex items-center text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                      <MapPin size={10} className="mr-1 text-rose-500" /> {sup.region}
                    </div>
                  </div>

                  <div className="flex justify-between items-end bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Sisa Stok</span>
                      <span className={cn(
                        "text-sm font-black",
                        sup.qty === 0 ? "text-rose-500" : "text-slate-900"
                      )}>
                        {sup.qty} Ton
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Harga / Kg</span>
                      <span className="text-sm font-black text-emerald-600">
                        Rp {sup.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-2 gap-3 relative z-20">
                {sup.qty === 0 ? (
                  <>
                    <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl h-10">
                      <RefreshCcw size={14} className="mr-1.5" /> Isi Ulang
                    </Button>
                    <Button variant="outline" className="border-slate-200 text-slate-500 font-bold text-xs rounded-xl h-10 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100">
                      <Trash2 size={14} className="mr-1.5" /> Hapus
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl h-10">
                      <Edit3 size={14} className="mr-1.5" /> Ubah Stok
                    </Button>
                    <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl h-10">
                      <Archive size={14} className="mr-1.5" /> Arsipkan
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}

          {supplies.length === 0 && (
            <div className="col-span-2 py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-bold text-slate-900">Belum Ada Komoditas</h3>
              <p className="text-sm text-slate-500 mt-1">Mulai upload hasil panen Anda untuk dilihat oleh pembeli.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyPortal;