"use client";

import React from 'react';
import { 
  CheckCircle2, 
  Copy, 
  CreditCard, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';

interface PaymentInvoiceProps {
  order: any;
  onClose: () => void;
}

const PaymentInvoice = ({ order, onClose }: PaymentInvoiceProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess("Berhasil disalin ke clipboard!");
  };

  const getBankDetails = (bank: string) => {
    const banks: any = {
      'BSI': { name: 'Bank Syariah Indonesia', acc: '7123 4567 89', owner: 'PT AGROMATCH ACEH JAYA' },
      'Mandiri': { name: 'Bank Mandiri', acc: '158-00-1234567-8', owner: 'PT AGROMATCH ACEH JAYA' },
      'BRI': { name: 'Bank BRI', acc: '0012-01-000123-50-1', owner: 'PT AGROMATCH ACEH JAYA' },
      'BCA': { name: 'Bank BCA', acc: '8001234567', owner: 'PT AGROMATCH ACEH JAYA' }
    };
    return banks[bank] || banks['BSI'];
  };

  const bank = getBankDetails(order.bankName);

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white text-center relative">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Menunggu Pembayaran</h2>
          <p className="text-emerald-100 text-sm mt-1">ID Pesanan: {order.id.split('-')[0].toUpperCase()}</p>
          
          <div className="absolute top-6 right-6">
            <Badge className="bg-white/20 text-white border-none px-3 py-1">
              <Clock size={12} className="mr-1" /> 23:59:59
            </Badge>
          </div>
        </div>

        <CardContent className="p-8 space-y-8 bg-white">
          {/* Total Amount Section */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total yang harus dibayar</span>
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-4xl font-black text-slate-900">Rp {order.totalPrice.toLocaleString('id-ID')}</h3>
              <button onClick={() => copyToClipboard(order.totalPrice.toString())} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition">
                <Copy size={18} />
              </button>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                  🏦
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{bank.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Metode: Transfer Bank</p>
                </div>
              </div>
              <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-white">Verifikasi Otomatis</Badge>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Nomor Rekening</span>
                <span className="text-lg font-black text-slate-800 tracking-wider">{bank.acc}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bank.acc)} className="text-emerald-600 font-bold">
                Salin
              </Button>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Nama Pemilik Rekening</span>
              <span className="text-sm font-bold text-slate-700">{bank.owner}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-slate-900 flex items-center">
              <AlertCircle size={16} className="mr-2 text-amber-500" /> Instruksi Pembayaran
            </h5>
            <ul className="space-y-3">
              {[
                "Gunakan ATM / Mobile Banking / Internet Banking untuk transfer.",
                "Masukkan nominal persis hingga 3 digit terakhir.",
                "Simpan bukti transfer hingga status pesanan berubah.",
                "Pesanan akan otomatis dibatalkan jika tidak dibayar dalam 24 jam."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Button onClick={onClose} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl shadow-lg">
              Saya Sudah Bayar <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" className="flex-1 border-slate-200 text-slate-600 font-bold py-6 rounded-2xl">
              <Download size={18} className="mr-2" /> Unduh Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentInvoice;