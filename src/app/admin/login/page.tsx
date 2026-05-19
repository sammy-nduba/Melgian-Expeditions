"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/state/authStore";
import { apiClient } from "@/core/api/apiClient";
import { ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await apiClient<{
        token: string;
        user: { email: string; fullName: string };
      }>("/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data && data.token) {
        login(data.token, data.user);
        router.push("/admin");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err instanceof Error ? err.message : "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-charcoal overflow-hidden px-4">
      {/* Premium wild savannah styled background blur accents */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-forest/20 blur-[100px] pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-savannah/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md rounded-premium border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-savannah/10 text-savannah border border-savannah/30 mb-4 shadow-lg shadow-savannah/5">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white">
            Administrative Login
          </h1>
          <p className="mt-2 text-xs text-ivory/60 tracking-wider uppercase">
            Melgian Expeditions Control Panel
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/35 px-4 py-3 text-xs text-red-300 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ivory/90 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/20 focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
              placeholder="admin@melgianexpeditions.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ivory/90 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/20 focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-savannah hover:bg-white text-charcoal hover:shadow-lg hover:shadow-white/5 active:scale-[0.98] py-3.5 text-xs font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-charcoal" />
                Authenticating...
              </>
            ) : (
              "Sign In to Console"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs text-ivory/45 hover:text-savannah transition-colors font-semibold"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
