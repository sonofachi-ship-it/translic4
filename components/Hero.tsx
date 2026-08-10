"use client";

import { useState } from "react";

export default function Hero() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeChartFilter, setActiveChartFilter] = useState<"6M" | "1Y" | "ALL">("6M");
  const [transfersCount, setTransfersCount] = useState(1);

  // Mock chart data multipliers
  const chartHeights = {
    "6M": [30, 50, 40, 70, 60, 90],
    "1Y": [45, 60, 55, 80, 75, 95],
    ALL: [25, 40, 60, 70, 85, 98],
  };

  const handleSendQuickTransfer = () => {
    setTransfersCount((prev) => prev + 1);
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0052ff]/20 via-[#00ccf9]/15 to-transparent -z-10 blur-3xl opacity-70 pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ffffff] to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#dae2fd]/60 border border-[#0052ff]/20 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0052ff] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-[#0038b6] uppercase tracking-wider">
              New Apex Features v2.4 Available
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#131b2e] leading-[1.15] tracking-tight font-headline">
            Banking Made{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052ff] via-[#3737c5] to-[#00ccf9]">
              Smarter
            </span>{" "}
            for the Modern World
          </h1>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg text-[#434656] max-w-xl font-normal leading-relaxed">
            Experience effortless financial management, instant global transfers, and AI-driven insights designed to help you grow your wealth securely.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
            <a
              href="#features"
              className="w-full sm:w-auto bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#0052ff]/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Open an Account</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
            <a
              href="#security"
              className="w-full sm:w-auto bg-white/80 hover:bg-[#eaedff] border border-[#737688]/30 text-[#131b2e] font-semibold text-base px-8 py-4 rounded-xl transition-all active:scale-95 text-center"
            >
              Learn More
            </a>
          </div>

          {/* Social Proof & Ratings */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-10 pt-8 border-t border-[#c3c5d9]/30 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Avatar 1"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Avatar 2"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Avatar 3"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#dae2fd] flex items-center justify-center text-xs font-mono font-bold text-[#131b2e] shadow-sm">
                  +500K
                </div>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] text-[#f59e0b]">
                      {i === 4 ? "star_half" : "star"}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-[#434656] font-medium mt-0.5">
                  4.9/5 from 10k+ reviews
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#c3c5d9]/40" />

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0052ff] text-xl">
                verified_user
              </span>
              <span className="text-xs font-mono font-semibold text-[#131b2e] uppercase tracking-wider">
                Bank-Level Security
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Hero Card Container */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center min-h-[480px]">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0052ff]/20 to-[#00ccf9]/20 rounded-3xl filter blur-2xl opacity-70 transform scale-95 pointer-events-none" />

          {/* Main Interactive Card */}
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,82,255,0.18)] border border-[#c3c5d9]/40 flex flex-col overflow-hidden relative z-10 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-500">
            
            {/* Card Header */}
            <div className="p-4 bg-[#faf8ff] flex justify-between items-center border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0052ff] text-white flex items-center justify-center shadow-md shadow-[#0052ff]/20">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#434656] font-mono uppercase tracking-wider">
                    Apex Balance
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-[#131b2e] font-mono">
                      {balanceVisible ? "$124,500.00" : "••••••••••"}
                    </span>
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-[#737688] hover:text-[#0052ff] transition-colors"
                      title={balanceVisible ? "Hide Balance" : "Show Balance"}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {balanceVisible ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center relative cursor-pointer hover:bg-[#dae2fd]">
                <span className="material-symbols-outlined text-base text-[#131b2e]">
                  notifications
                </span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
              </div>
            </div>

            {/* Card Body: Dynamic Growth Chart */}
            <div className="p-4 flex flex-col gap-3 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#737688] font-mono font-semibold">
                  Portfolio Growth
                </span>
                <div className="flex items-center gap-1 bg-[#eaedff]/60 p-0.5 rounded-lg text-[10px] font-mono font-bold">
                  {(["6M", "1Y", "ALL"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveChartFilter(filter)}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        activeChartFilter === filter
                          ? "bg-[#0052ff] text-white shadow-xs"
                          : "text-[#434656] hover:text-[#131b2e]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Bars */}
              <div className="w-full h-36 bg-[#faf8ff] rounded-2xl border border-[#eaedff] p-3 flex flex-col relative justify-end">
                <div className="flex items-end gap-2 h-full justify-between pt-4">
                  {chartHeights[activeChartFilter].map((height, idx) => (
                    <div
                      key={idx}
                      className="w-1/6 bg-gradient-to-t from-[#0052ff]/30 to-[#0052ff] rounded-t-md relative group transition-all duration-300 hover:brightness-110"
                      style={{ height: `${height}%` }}
                    >
                      {idx === 5 && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#131b2e] text-white text-[10px] py-0.5 px-2 rounded-md font-mono whitespace-nowrap shadow-md">
                          +14.2%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className="bg-[#faf8ff] rounded-2xl border border-[#eaedff] p-3 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs font-semibold text-[#131b2e]">
                  <span>Recent Activity</span>
                  <span className="text-[10px] font-mono text-[#0052ff] cursor-pointer hover:underline">
                    View All
                  </span>
                </div>

                {/* Tx 1 */}
                <div className="flex justify-between items-center pb-2 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">laptop_mac</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#131b2e]">Apple Store</span>
                      <span className="text-[10px] text-[#737688]">Electronics</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#131b2e]">-$1,299.00</span>
                </div>

                {/* Tx 2 */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">arrow_downward</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#131b2e]">Salary Deposit</span>
                      <span className="text-[10px] text-[#737688]">TechCorp Inc.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#10b981]">+$8,500.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Element 1: Glassmorphic Visa Card */}
          <div className="absolute -left-4 sm:-left-8 top-8 w-36 sm:w-40 h-24 bg-gradient-to-br from-[#3737c5] via-[#0052ff] to-[#00ccf9] rounded-2xl shadow-xl p-3.5 flex flex-col justify-between border border-white/30 animate-float z-20">
            <div className="flex justify-between items-center">
              <span className="text-white text-[10px] font-mono font-extrabold tracking-widest">
                APEX VISA
              </span>
              <span className="material-symbols-outlined text-white text-base">contactless</span>
            </div>
            <div>
              <div className="text-white text-[11px] font-mono tracking-widest opacity-95">
                •••• 4242
              </div>
              <div className="text-[9px] text-white/80 font-mono mt-0.5">EXPIRES 08/29</div>
            </div>
          </div>

          {/* Floating Element 2: Interactive Transfer Notification */}
          <div
            onClick={handleSendQuickTransfer}
            className="absolute -right-4 sm:-right-6 bottom-10 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#c3c5d9]/40 p-3 flex items-center gap-3 animate-float-delayed z-20 cursor-pointer hover:scale-105 transition-transform"
            title="Click to simulate new transfer notification"
          >
            <div className="w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#10b981] text-base">
                check_circle
              </span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-bold text-[#131b2e] leading-tight truncate">
                Transfer #{transfersCount} Sent
              </span>
              <span className="text-[9px] text-[#737688] leading-tight">
                $500.00 to Sarah M.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
