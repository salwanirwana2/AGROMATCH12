"use client";

import React, { useState } from 'react';
import { PlusCircle, Bullhorn, MapPin, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DemandPortalProps {
  demands: any[];
  onAddDemand: (demand: any) => void;
}

const DemandPortal = ({ demands, onAddDemand }: DemandPortalProps) => {
  const [formData, setFormData] = useState({
    client: "",
    region: "Jakarta",
    commodity: "Beras",
    qty: "",
    maxPrice: "",
    date: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.qty || !formData.maxPrice || !formData.client) return;
    onAddDemand({
      ...formData,
      qty: parseFloat(formData.qty),
      maxPrice: parseFloat(formData.maxPrice)
    });
    setFormData({ client: "", region: "Jakarta", commodity: "Beras", qty: "", maxPrice: "", date: "" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center">
            <PlusCircle className="text-amber-600 mr-2" size={20} /> Input Permintaan Pasar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Pasar / Retail</label>
              <Input 
                placeholder="Pasar Jaya Senen" 
                value={formData.client} 
                onChange={e => setFormData({...formData, client: e.target.value})}
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
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Wilayah Tujuan</label>
                <Select value={formData.region} onValueChange={v => setFormData({...formData, region: v})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Semarang">Semarang</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kebutuhan (Ton)</label>
                <Input 
                  type="number" 
                  placeholder="Misal: 40" 
                  value={formData.qty} 
                  onChange={e => setFormData({...formData, qty: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Harga Max / Kg (Rp)</label>
                <Input 
                  type="number" 
                  placeholder="Misal: 15000" 
                  value={formData.maxPrice} 
                  onChange={e => setFormData({...formData, maxPrice: e.target.value})}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Target Batas Pengiriman</label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="rounded-xl"
              />
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-6 rounded-xl shadow-md">
              <Bullhorn className="mr-2 h-5 w-5" /> Tayangkan Permintaan
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Permintaan Konsumen & Defisit Sektor</CardTitle>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">Live Monitor</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-bold">Nama Pembeli / Tujuan</TableHead>
                  <TableHead className="font-bold">Komoditas</TableHead>
                  <TableHead className="font-bold text-center">Kebutuhan (Ton)</TableHead>
                  <TableHead className="font-bold">Batas Harga</TableHead>
                  <TableHead className="font-bold">Batas Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demands.map(dem => (
                  <TableRow key={dem.id} className="hover:bg-slate-50/50 transition">
                    <TableCell>
                      <div className="font-bold text-slate-800">{dem.client}</div>
                      <div className="text-xs text-slate-400 flex items-center mt-0.5">
                        <MapPin className="text-rose-500 mr-1" size={12} /> {dem.region}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-amber-700">{dem.commodity}</TableCell>
                    <TableCell className="text-center font-bold text-slate-700">{dem.qty}</TableCell>
                    <TableCell className="font-bold">Rp {dem.maxPrice.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-slate-500">{dem.date}</TableCell>
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

export default DemandPortal;