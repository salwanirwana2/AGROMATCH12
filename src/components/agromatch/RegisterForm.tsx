"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, Building2, MapPin, Phone, FileText, Wheat, Store, Truck, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess, showError } from '@/utils/toast';

interface RegisterFormProps {
  role: string;
  onSuccess: () => void;
}

const RegisterForm = ({ role, onSuccess }: RegisterFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({
    email: '',
    password: '',
    // Koperasi fields
    cooperativeName: '',
    leaderName: '',
    legalNumber: '',
    address: '',
    district: '',
    mainCommodity: '',
    // Retail fields
    businessName: '',
    ownerName: '',
    whatsapp: '',
    needType: '',
    // Logistics fields
    companyName: '',
    vehicleType: '',
    coverageArea: '',
    poolAddress: '',
    contactNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi validasi & pendaftaran
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccess("Pendaftaran berhasil! Silakan masuk ke portal Anda.");
      onSuccess();
    }, 1500);
  };

  const renderKoperasiFields = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nama Koperasi</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="cooperativeName" placeholder="Koperasi Tani Makmur" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nama Ketua</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="leaderName" placeholder="Nama Lengkap" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-500">Nomor Badan Hukum</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-slate-400" size={16} />
          <Input name="legalNumber" placeholder="Contoh: 123/BH/M.KUKM/..." className="pl-10 rounded-xl" onChange={handleChange} required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Kabupaten/Kota di Aceh</Label>
          <Select onValueChange={(v) => handleSelectChange('district', v)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Pilih Wilayah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banda-aceh">Banda Aceh</SelectItem>
              <SelectItem value="aceh-besar">Aceh Besar</SelectItem>
              <SelectItem value="pidie">Pidie</SelectItem>
              <SelectItem value="aceh-tengah">Aceh Tengah</SelectItem>
              <SelectItem value="bener-meriah">Bener Meriah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Komoditas Utama</Label>
          <div className="relative">
            <Wheat className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="mainCommodity" placeholder="Beras, Cabai, dll" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-500">Alamat Kantor / Gudang</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
          <Input name="address" placeholder="Alamat Lengkap" className="pl-10 rounded-xl" onChange={handleChange} required />
        </div>
      </div>
    </div>
  );

  const renderRetailFields = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nama Usaha / Toko</Label>
          <div className="relative">
            <Store className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="businessName" placeholder="Toko Sembako Jaya" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nama Pemilik</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="ownerName" placeholder="Nama Lengkap" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nomor WhatsApp</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="whatsapp" placeholder="0812..." className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Jenis Kebutuhan</Label>
          <Select onValueChange={(v) => handleSelectChange('needType', v)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Pilih Jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grosir">Grosir / Partai Besar</SelectItem>
              <SelectItem value="eceran">Eceran / Retail Kecil</SelectItem>
              <SelectItem value="horeka">Horeka (Hotel, Resto, Kafe)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-500">Alamat Lengkap Toko / Pasar</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
          <Input name="address" placeholder="Alamat Lengkap" className="pl-10 rounded-xl" onChange={handleChange} required />
        </div>
      </div>
    </div>
  );

  const renderLogisticsFields = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-500">Nama Perusahaan Logistik</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
          <Input name="companyName" placeholder="PT. Aceh Express Logistik" className="pl-10 rounded-xl" onChange={handleChange} required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Jenis Armada Utama</Label>
          <Select onValueChange={(v) => handleSelectChange('vehicleType', v)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Pilih Armada" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pickup">Pick-up / Gran Max</SelectItem>
              <SelectItem value="cde">Truk Engkel (CDE)</SelectItem>
              <SelectItem value="fuso">Truk Fuso / Tronton</SelectItem>
              <SelectItem value="cold">Cold Storage / Reefer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Cakupan Wilayah</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="coverageArea" placeholder="Seluruh Aceh / Lintas Timur" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Nomor Kontak Operasional</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="contactNumber" placeholder="0811..." className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500">Alamat Pool Kendaraan</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input name="poolAddress" placeholder="Alamat Pool" className="pl-10 rounded-xl" onChange={handleChange} required />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {role === 'koperasi' && renderKoperasiFields()}
      {role === 'retail' && renderRetailFields()}
      {role === 'logistik' && renderLogisticsFields()}

      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-500">Email / Username</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
              <Input type="email" name="email" placeholder="email@instansi.com" className="pl-10 rounded-xl" onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-500">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
              <Input type="password" name="password" placeholder="••••••••" className="pl-10 rounded-xl" onChange={handleChange} required />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-lg transition-all"
        >
          {isSubmitting ? "Memproses..." : "Daftar Akun Sekarang"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;