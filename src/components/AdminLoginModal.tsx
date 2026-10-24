import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = usePesantren();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setErrorMsg('Kata sandi salah. Gunakan sandi admin yang valid.');
    } else {
      setErrorMsg('');
      setPassword('');
    }
  };

  const handleQuickFill = (pwd: string) => {
    setPassword(pwd);
    loginAdmin(pwd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-islamic">
                Login Pengurus & Admin
              </h3>
              <p className="text-xs text-slate-500">Panel Pengelolaan Konten Pesantren</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setErrorMsg('');
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Tutup login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kata Sandi / PIN Keamanan Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                autoFocus
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Masuk ke Dashboard Admin</span>
          </button>
        </form>

        {/* Quick Demo Credentials Box */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-950">
            <span className="font-bold block text-emerald-900 mb-1">Akses Cepat Pengurus / Demo:</span>
            <p className="text-[11px] text-emerald-800 mb-2">
              Klik salah satu tombol di bawah untuk langsung login:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin123')}
                className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 text-[11px] font-mono font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                PIN: admin123
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('bustanul2026')}
                className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 text-[11px] font-mono font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                PIN: bustanul2026
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
