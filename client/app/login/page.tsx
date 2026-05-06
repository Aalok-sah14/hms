"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]   = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await loginApi(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white"> HMS</h1>
          <p className="text-blue-300 text-sm mt-1">Hotel Management System</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
          <h2 className="text-lg font-semibold text-white mb-6">Staff Login</h2>
          {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-blue-200 uppercase">Username</label>
              <input type="text" placeholder="Enter username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-blue-200 uppercase">Password</label>
              <input type="password" placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <button onClick={handleLogin}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}