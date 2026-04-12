"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/admin");
    } else {
      alert("Hatalı giriş!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-dark-950">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-md w-full p-8 rounded-2xl border border-white/10"
      >
        <div className="text-center mb-8">
          <img src="/images/GençArıcılık_Logo.png" alt="Logo" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200">
            Yönetici Girişi
          </h2>
          <p className="text-gray-400 text-sm mt-2">Daha önce belirlediğiniz bilgilerle giriş yapın.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">E-Posta Adresi</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@gencaricilik.com.tr" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="********" 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-transform active:scale-95"
          >
            Giriş Yap
          </button>
        </form>
      </motion.div>
    </div>
  );
}
