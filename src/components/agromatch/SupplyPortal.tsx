"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, CloudUpload, MapPin, Camera, Edit3, Archive, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { showError, showWarning } from '@/utils/toast';

interface SupplyPortalProps {
  supplies: any[];
  onAddSupply: (supply: any, file: File | null) => Promise<void>;
  userName: string;
}

const COMMODITIES = [
  "Beras", "Bawang Merah", "Bawang Putih", "Cabai Merah", 
  "Cabai Hijau", "Cabai Rawit", "Kentang", "Jagung", "Tomat"
];

const SupplyPortal = ({ supplies, onAddSupply, userName }: SupplyPortalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    commodity: "Beras",
    qty: "",
    price: "",
    date: "",
    region: "Pidie"
  });

  // Pastikan form selalu menggunakan nama user terbaru sebagai pengirim
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.qty || !formData.price) {
      showWarning("Harap isi jumlah stok dan harga per kilogram.");
      return;
    }
    
    setIsUploading(true);
    try {
      // Kirim data ke handler utama di Index.tsx
      await onAddSupply({
        ...formData,
        cooperative: userName, // Menggunakan prop userName langsung agar akurat
        qty: parseFloat(formData.qty),
        price: parseFloat(formData.price)
      }, selectedFile);

      // Reset form setelah berhasil
      setFormData({
        commodity: "Beras",
        qty: "",
        price: "",
        date: "",
        region: "Pidie"
      });
      setImagePreview(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (error) {
      // Error ditangani di Index.tsx, tapi kita hentikan loading di sini
      console.error("Submission error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showError("Ukuran file terlalu besar (Maks 5MB).");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const getEmoji = (commodity: string) => {
    const emojis: Record<string, string> = {
      'Beras': "🌾", 'Bawang Merah': "🧅", 'Bawang Putih': "🧄", 
      'Cabai Merah': "🌶️", 'Cabai Hijau': "🫑", 'Cabai Rawit': "🔥", 
      'Kentang': "🥔", 'Jagung': "🌽", 'Tomat': "🍅"
    };
    return emojis[commodity] || "📦";
  };

  const getBgColor = (commodity: string) => {
    const colors: Record<string, string> = {
      'Beras': "bg-amber-50", 'Bawang Merah': "bg-purple-50", 
      'Cabai Merah': "bg-rose-50", 'Cabai Hijau': "bg-emerald-50"
    };
    return colors[commodity] || "bg-slate-50";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden sticky top-24">
          <CardHeader className="border-b border-slate-100 bg-white py-4">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center">
              <PlusCircle className="text-emerald-600 mr-2" size={18} /> Naikkan Komoditas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Foto Produk</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all group relative overflow-hidden min-h-[160px] flex flex-col items-center justify-center",
                    imagePreview ? "border-emerald-500 bg-white" : "border-slate-200 hover:border-emerald-500 bg-slate-50/50"
                  )}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button type="button" variant="destructive" size="icon" className="rounded-full h-8 w-8" onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setSelectedFile(null);
                        }}>
                          <X size={16} />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                        <Camera className="text-slate-400 group-hover:text-emerald-500" size={20} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600">+ Tambah Foto</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Komoditas</label>
                  <Select value={formData.commodity} onValueChange={v => setFormData({...formData, commodity: v})}>
                    <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMODITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Stok (Ton)</label>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="0.0" 
                      value={formData.qty} 
                      onChange={e => setFormData({...formData, qty: e.target.value})}
                      className="rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Harga/Kg (Rp)</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Estimasi Panen</label>
                  <Input 
                    type="date" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isUploading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-md"
              >
                {isUploading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                ) : (
                  <><CloudUpload className="mr-2 h-5 w-5" /> Naikkan / Upload Komoditas</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">📦 Produk Saya ({userName})</h2>
          <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 px-3 py-1 rounded-full">
            {supplies.length} Item
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {supplies.map(sup => (
            <div key={sup.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
              <div className={cn("h-40 flex items-center justify-center text-5xl relative", getBgColor(sup.commodity))}>
                {sup.image ? (
                  <img src={sup.image} alt={sup.commodity} className="w-full h-full object-cover" />
                ) : (
                  getEmoji(sup.commodity)
                )}
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-slate-900">{sup.commodity} Premium</h3>
                <div className="flex justify-between items-end bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Stok</span>
                    <span className="text-sm font-black text-slate-900">{sup.qty} Ton</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Harga</span>
                    <span className="text-sm font-black text-emerald-600">Rp {sup.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {supplies.length === 0 && (
            <div className="col-span-2 py-20 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Belum ada komoditas yang dinaikkan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyPortal;