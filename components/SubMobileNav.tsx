"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-[#c3c5d9]/30 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 px-2">
        
        {/* Dashboard/Home Tab */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            pathname === "/dashboard" ? "text-[#0052ff] font-bold" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="font-mono text-[9px]">HOME</span>
        </Link>

        {/* About Tab */}
        <Link
          href="/about"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            pathname === "/about" ? "text-[#0052ff] font-bold" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">info</span>
          <span className="font-mono text-[9px]">ABOUT</span>
        </Link>

        {/* FAQ Tab */}
        <Link
          href="/faq"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            pathname === "/faq" ? "text-[#0052ff] font-bold" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">quiz</span>
          <span className="font-mono text-[9px]">FAQ</span>
        </Link>

        {/* Contact Tab */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            pathname === "/contact" ? "text-[#0052ff] font-bold" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">mail</span>
          <span className="font-mono text-[9px]">CONTACT</span>
        </Link>

      </div>
    </nav>
  );
}
