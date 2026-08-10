"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [openAccountOpen, setOpenAccountOpen] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await AuthService.login(email, password);
      if (res.success) {
        setSignInOpen(false);
        // Clear input values
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenAccountOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 glass pt-safe border-b border-[#c3c5d9]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003ec7] via-[#0052ff] to-[#00ccf9] p-0.5 shadow-md shadow-[#0052ff]/20">
              <div className="w-full h-full bg-[#faf8ff] rounded-[10px] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0052ff] font-bold text-2xl">
                  blur_on
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#131b2e] font-headline">
                FinSphere
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#0052ff] font-semibold -mt-1">
                APEX BANKING
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-[#434656] hover:text-[#0052ff] transition-colors"
            >
              Features
            </a>
            <a
              href="#analytics"
              className="text-sm font-medium text-[#434656] hover:text-[#0052ff] transition-colors"
            >
              Analytics
            </a>
            <a
              href="#security"
              className="text-sm font-medium text-[#434656] hover:text-[#0052ff] transition-colors"
            >
              Security
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSignInOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-[#131b2e] hover:text-[#0052ff] hover:bg-[#eaedff]/60 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setOpenAccountOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0052ff] hover:bg-[#003ec7] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#0052ff]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Open Account</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#c3c5d9]/30 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-semibold text-[#131b2e] hover:text-[#0052ff]"
            >
              Features
            </a>
            <a
              href="#analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-semibold text-[#131b2e] hover:text-[#0052ff]"
            >
              Analytics
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-semibold text-[#131b2e] hover:text-[#0052ff]"
            >
              Security
            </a>
            <div className="pt-4 border-t border-[#c3c5d9]/30 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInOpen(true);
                }}
                className="w-full py-3 text-center font-semibold text-[#131b2e] bg-[#eaedff] rounded-xl"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenAccountOpen(true);
                }}
                className="w-full py-3 text-center font-semibold text-white bg-[#0052ff] rounded-xl shadow-md"
              >
                Open Account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal: Sign In */}
      {signInOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/30 relative">
            <button
              onClick={() => setSignInOpen(false)}
              className="absolute top-4 right-4 text-[#737688] hover:text-[#131b2e] p-1 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0052ff]/10 flex items-center justify-center text-[#0052ff]">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">Welcome Back</h3>
                <p className="text-xs text-[#737688]">Access your FinSphere banking portal</p>
              </div>
            </div>
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-xs font-semibold border border-[#ba1a1a]/20 animate-in fade-in duration-200">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Email or Username</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e] disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e] disabled:opacity-50"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#434656]">
                  <input type="checkbox" className="rounded text-[#0052ff]" defaultChecked />
                  Remember me
                </label>
                <a href="#" className="text-[#0052ff] font-semibold hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-sm shadow-md transition-all mt-2 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Signing In..." : "Sign In to Portal →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Open Account */}
      {openAccountOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/30 relative">
            <button
              onClick={() => setOpenAccountOpen(false)}
              className="absolute top-4 right-4 text-[#737688] hover:text-[#131b2e] p-1 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00ccf9]/20 flex items-center justify-center text-[#00677f]">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">Create Your Account</h3>
                <p className="text-xs text-[#737688]">Get started with zero monthly fees</p>
              </div>
            </div>
            <form onSubmit={handleOpenAccountSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#434656] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#434656] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Morgan"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  defaultValue="alex.m@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Account Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-sm text-[#131b2e]">
                  <option>Personal Apex Account</option>
                  <option>Business Enterprise Account</option>
                  <option>Private Wealth Banking</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-sm shadow-md transition-all mt-2 cursor-pointer"
              >
                Instant Onboarding →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

