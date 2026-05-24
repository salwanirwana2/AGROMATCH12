"use client";

import React, { useState } from 'react';
import { PlusCircle, CloudUpload, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface SupplyPortalProps {
  supplies: any[];
  onAddSupply: (supply: any) => void;
}

const SupplyPortal = ({ supplies, onAddSupply }: SupplyPortalProps) => {
  const [formData, setFormData] = useState({
    cooperative: "",
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
    setFormData({ cooperative: "", region: "Pidie", commodity: "Beras", qty: "", price: "", date: "" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center">
            <PlusCircle className="text-emerald-600 mr-2" size={20} /> Input Hasil Tani Aceh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Koperasi Tani</label>
              <Input 
                placeholder="Koperasi Meuseuraya" 
                value={formData.cooperative} 
                onChange={e => setFormData({...formData, cooperative: e.target.value})}
                className="rounded-xl"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Komoditas</label>
                <Select value={formData.commodity} onValueChange={v => setFormData({...formData, commodity: v})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beras">Beras</SelectItem>
                    <SelectItem value="Bawang Merah">Bawang Merah</SelectItem>
                    <SelectItem value="Cabai Merah">Cabai Merah</SelectItem>
                    <SelectItem value="Kentang">Kentang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Wilayah Asal</label>
                <Select value={formData.region} onValueChange={v => setFormData({...formData, region: v})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pidie">Pidie</SelectItem>
                    <SelectItem value="Bener Meriah">Bener Meriah</SelectItem>
                    <SelectItem value="Aceh Tengah">Aceh Tengah</SelectItem>
                    <SelectItem value="Aceh Barat Daya (Abdya)">Abdya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Jumlah (Ton)</label>
                <Input 
                  type="number" 
                  placeholder="Misal: 25" 
                  value={formData.qty} 
                  onChange={e => setFormData({...formData, qty: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Harga / Kg (Rp)</label>
                <Input 
                  type="number" 
                  placeholder="Misal: 10500" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estimasi Tanggal Panen</label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="rounded-xl"
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl shadow-md">
              <CloudUpload className="mr-2 h-5 w-5" /> Pasang Di Bursa Suplai Aceh
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Bursa Suplai Komoditas Aceh</CardTitle>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">Live Update</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-bold">Koperasi / Lokasi</TableHead>
                  <TableHead className="font-bold">Komoditas</TableHead>
                  <TableHead className="font-bold text-center">Volume (Ton)</TableHead>
                  <TableHead className="font-bold">Harga/Kg</TableHead>
                  <TableHead className="font-bold">Jadwal Panen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplies.map(sup => (
                  <TableRow key={sup.id} className="hover:bg-slate-50/50 transition">
                    <TableCell>
                      <div className="font-bold text-slate-800">{sup.cooperative}</div>
                      <div className="text-xs text-slate-400 flex items-center mt-0.5">
                        <MapPin className="text-rose-500 mr-1" size={12} /> {sup.region}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-700">{sup.commodity}</TableCell>
                    <TableCell className="text-center font-bold text-slate-700">{sup.qty}</TableCell>
                    <TableCell className="font-bold">Rp {sup.price.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-slate-500">{sup.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyPortal;