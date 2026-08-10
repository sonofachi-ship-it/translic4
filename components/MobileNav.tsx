"use client";

import { useState } from "react";

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState<"home" | "invest" | "cards" | "profile">("home");

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-[#c3c5d9]/30 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 px-2">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            activeTab === "home" ? "text-[#0052ff]" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="font-mono text-[10px] font-bold">HOME</span>
        </button>

        {/* Invest Tab */}
        <button
          onClick={() => setActiveTab("invest")}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            activeTab === "invest" ? "text-[#0052ff]" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
          <span className="font-mono text-[10px] font-bold">INVEST</span>
        </button>

        {/* Cards Tab */}
        <button
          onClick={() => setActiveTab("cards")}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            activeTab === "cards" ? "text-[#0052ff]" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">credit_card</span>
          <span className="font-mono text-[10px] font-bold">CARDS</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all ${
            activeTab === "profile" ? "text-[#0052ff]" : "text-[#737688]"
          }`}
        >
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="font-mono text-[10px] font-bold">ME</span>
        </button>
      </div>
    </nav>
  );
}
