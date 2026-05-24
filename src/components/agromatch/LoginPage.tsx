"use client";

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginPageProps {
  role: string;
  onLogin: (userData: any) => void;
  onBack: () => void;
}

const LoginPage = ({ role, onLogin, onBack }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRoleName = () => {
    switch(role) {
      case 'koperasi': return "Koperasi Tani";
      case 'retail': return "Retail / Pasar Induk";
      case 'logistik': return "Mitra Logistik";
      case 'admin': return "Administrator / Forecaster";
      default: return "";
    }
  };

  const handleDemoLogin = () => {
    onLogin({
      role: role,
      name: `User Demo ${getRoleName()}`,
      email: "demo@agromatch.aceh.go.id"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ role, name: email.split('@')[0], email });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="bg-emerald-900 p-8 text-center text-white relative">
          <button 
            onClick={onBack}
            className="absolute left-6 top-8 text-emerald-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold">Login Portal</h2>
          <p className="text-emerald-300 text-sm mt-1">{getRoleName()}</p>
        </div>
        
        <CardContent className="p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email / Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <Input 
                  type="email" 
                  placeholder="nama@instansi.com" 
                  className="pl-10 rounded-xl border-slate-200 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 rounded-xl border-slate-200 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-lg">
              Masuk Sekarang
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">Atau</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              onClick={handleDemoLogin}
              className="w-full border-emerald-100 text-emerald-700 hover:bg-emerald-50 font-bold h-12 rounded-xl"
            >
              Gunakan Akun Demo (Bypass)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;