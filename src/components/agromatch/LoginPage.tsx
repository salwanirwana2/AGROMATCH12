"use client";

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

interface LoginPageProps {
  role: string;
  onLogin: (userData: any) => void;
  onBack: () => void;
}

const LoginPage = ({ role, onLogin, onBack }: LoginPageProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const getRoleName = () => {
    switch(role) {
      case 'koperasi': return "Koperasi Tani";
      case 'retail': return "Retail / Pasar Induk";
      case 'logistik': return "Mitra Logistik";
      case 'admin': return "Administrator / Forecaster";
      default: return "";
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role }
          }
        });
        if (error) throw error;
        showSuccess("Pendaftaran berhasil! Silakan cek email Anda.");
        setIsRegistering(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          role: data.user.user_metadata.role
        };
        onLogin(userData);
      }
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="bg-slate-900 p-8 text-center text-white relative">
          <button onClick={onBack} className="absolute left-6 top-8 text-white/60 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">{isRegistering ? 'Daftar Akun' : 'Login Portal'}</h2>
          <p className="text-white/60 text-sm mt-1">{getRoleName()}</p>
        </div>
        
        <CardContent className="p-8 bg-white">
          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <Input 
                  placeholder="Nama Anda" 
                  className="rounded-xl h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <Input 
                type="email" 
                placeholder="nama@instansi.com" 
                className="rounded-xl h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="rounded-xl h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl">
              {loading ? "Memproses..." : isRegistering ? "Daftar Sekarang" : "Masuk Sekarang"}
            </Button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm font-bold text-emerald-600"
              >
                {isRegistering ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;