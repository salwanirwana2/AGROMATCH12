"use client";

import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Building2, 
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';

interface FleetRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FleetRegistrationModal = ({ isOpen, onClose }: FleetRegistrationModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi proses pengiriman data
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccess("Pendaftaran Berhasil! Tim AgroMatch akan memverifikasi berkas armada Anda dalam 1x24 jam.");
      onClose();
      setStep(1);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
        <div className="bg-indigo-600 p-8 text-white relative">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Truck size={32} className="text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Kemitraan Armada</DialogTitle>
              <DialogDescription className="text-indigo-100 mt-1">
                Bergabunglah dalam jaringan distribusi pangan Aceh.
              </DialogDescription>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex mt-8 gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${
                  step >= i ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 bg-white">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <Building2 size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Profil Perusahaan / Pemilik</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Nama Perusahaan / Pemilik</Label>
                  <Input placeholder="Contoh: PT. Trans Aceh Logistik" className="rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">NIB / KTP Pemilik</Label>
                  <Input placeholder="16 Digit Nomor Identitas" className="rounded-xl border-slate-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500">Alamat Kantor Pusat / Pool Armada</Label>
                <Textarea placeholder="Alamat lengkap di wilayah Aceh..." className="rounded-xl border-slate-200 min-h-[80px]" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Nama Kontak Person</Label>
                  <Input placeholder="Nama Penanggung Jawab" className="rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Nomor WhatsApp Aktif</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input placeholder="0812..." className="pl-10 rounded-xl border-slate-200" required />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <ShieldCheck size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Kapasitas & Jenis Armada</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Jumlah Total Armada</Label>
                  <Input type="number" placeholder="0" className="rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Total Kapasitas (Ton)</Label>
                  <Input type="number" placeholder="0" className="rounded-xl border-slate-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500">Jenis Armada Utama</Label>
                <Select required>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Pilih jenis armada terbanyak" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pick-up / Gran Max (< 1.5 Ton)</SelectItem>
                    <SelectItem value="engkel">Truk Engkel (CDE) (2 - 3 Ton)</SelectItem>
                    <SelectItem value="cdd">Colt Diesel Double (CDD) (4 - 5 Ton)</SelectItem>
                    <SelectItem value="fuso">Fuso / Tronton (> 10 Ton)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-start space-x-3">
                <Info className="text-indigo-600 mt-0.5" size={18} />
                <p className="text-[11px] text-indigo-800 leading-relaxed">
                  Pastikan armada dalam kondisi layak jalan dan memiliki dokumen KIR yang masih berlaku untuk menjamin keamanan distribusi pangan.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <MapPin size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Fasilitas & Wilayah Operasional</h3>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500">Jenis Bak / Karoseri</Label>
                <Select required>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Pilih spesifikasi bak" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terpal">Bak Terbuka + Terpal</SelectItem>
                    <SelectItem value="box">Box Tertutup</SelectItem>
                    <SelectItem value="reefer">Colt Diesel Pendingin (Reefer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500">Wilayah Cakupan di Aceh</Label>
                <Select required>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Pilih rute operasional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Seluruh Wilayah Aceh</SelectItem>
                    <SelectItem value="banda">Khusus Banda Aceh & Aceh Besar</SelectItem>
                    <SelectItem value="barat">Lintas Pantai Barat - Selatan</SelectItem>
                    <SelectItem value="timur">Lintas Pantai Timur - Utara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-medium">Data siap dikirim untuk verifikasi</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                className="flex-1 rounded-xl border-slate-200 h-12 font-bold"
              >
                Kembali
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold shadow-lg"
              >
                Lanjut <ChevronRight size={18} className="ml-1" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold shadow-lg"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FleetRegistrationModal;