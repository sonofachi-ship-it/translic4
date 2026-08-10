"use client";

import { useState } from "react";

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  colorClass: string;
  badge: string;
  details: string[];
}

const features: FeatureItem[] = [
  {
    id: "secure",
    icon: "shield_locked",
    title: "Secure Banking",
    tagline: "Bank-Grade Encryption",
    description: "Multi-factor biometric authentication and 256-bit hardware-level encryption keep your assets protected around the clock.",
    colorClass: "bg-[#0052ff]/10 text-[#0052ff] group-hover:bg-[#0052ff] group-hover:text-white",
    badge: "256-bit AES",
    details: [
      "Hardware security module (HSM) backed key storage",
      "Real-time fraud monitoring with AI anomaly detection",
      "Instant biometric step-up authentication",
    ],
  },
  {
    id: "transfers",
    icon: "bolt",
    title: "Instant Transfers",
    tagline: "Global Settlement Engine",
    description: "Send and receive money globally in seconds with ultra-low fees, real-time status tracking, and automated currency exchange.",
    colorClass: "bg-[#00ccf9]/20 text-[#00677f] group-hover:bg-[#00ccf9] group-hover:text-[#001f28]",
    badge: "Sub-Second",
    details: [
      "190+ supported corridor settlement rails",
      "Zero hidden FX markup fees",
      "Automated SWIFT & SEPA instant integration",
    ],
  },
  {
    id: "analytics",
    icon: "monitoring",
    title: "Smart Analytics",
    tagline: "AI Spending Insights",
    description: "Understand your spending habits with auto-categorization, predictive cash-flow modeling, and rich visual dashboards.",
    colorClass: "bg-[#5153de]/15 text-[#3737c5] group-hover:bg-[#3737c5] group-hover:text-white",
    badge: "AI Powered",
    details: [
      "Automated merchant taxonomy matching",
      "30-day predictive liquidity forecasting",
      "Customizable budget thresholds and alerts",
    ],
  },
  {
    id: "bills",
    icon: "receipt_long",
    title: "Bill Payments",
    tagline: "Automated Subscriptions",
    description: "Automate your recurring utility bills, credit lines, and subscriptions. Never miss a due date with smart balance holds.",
    colorClass: "bg-[#f59e0b]/15 text-[#d97706] group-hover:bg-[#f59e0b] group-hover:text-white",
    badge: "Auto-Pilot",
    details: [
      "e-Bill synchronization direct from providers",
      "Virtual cards with dynamic limit locks",
      "One-click subscription cancellation",
    ],
  },
  {
    id: "savings",
    icon: "savings",
    title: "Savings Goals",
    tagline: "Automated Wealth Vaults",
    description: "Create automated rules to sweep spare change, split paychecks, or set aside fixed percentages into high-yield yield vaults.",
    colorClass: "bg-[#10b981]/15 text-[#059669] group-hover:bg-[#10b981] group-hover:text-white",
    badge: "5.2% APY",
    details: [
      "Smart spare-change transaction rounding",
      "FDIC insured up to $2,500,000 via sweep network",
      "Lockable vaults with target milestone rewards",
    ],
  },
  {
    id: "investing",
    icon: "trending_up",
    title: "Investment Tools",
    tagline: "Direct Market Access",
    description: "Access curated ETF portfolios, fractional stocks, and digital assets directly from your unified banking dashboard.",
    colorClass: "bg-[#0052ff]/10 text-[#0052ff] group-hover:bg-[#0052ff] group-hover:text-white",
    badge: "Zero Comm.",
    details: [
      "Fractional share purchases starting at $1",
      "Algorithmic tax-loss harvesting",
      "Real-time market data & level-2 order book depth",
    ],
  },
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  return (
    <section id="features" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#faf8ff] relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 bg-[#eaedff] px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#0052ff] uppercase tracking-wider mb-3">
            Enterprise Architecture
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#131b2e] tracking-tight font-headline">
            Everything you need to <br className="hidden sm:block" />
            manage your money like a pro.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#434656]">
            Powerful financial tools wrapped in a simple, high-performance interface designed for total control.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFeature(item)}
              className="bg-white p-7 rounded-2xl border border-[#c3c5d9]/30 shadow-sm hover:shadow-[0_12px_30px_-5px_rgba(0,82,255,0.12)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${item.colorClass}`}
                  >
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-[#eaedff] text-[#0038b6] px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#131b2e] mb-1 font-headline">
                  {item.title}
                </h3>
                <span className="text-xs font-mono font-semibold text-[#0052ff] block mb-3">
                  {item.tagline}
                </span>
                <p className="text-sm text-[#434656] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#eaedff] flex items-center justify-between text-xs font-semibold text-[#0052ff] group-hover:translate-x-1 transition-transform">
                <span>Explore Capabilities</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 shadow-2xl border border-[#c3c5d9]/40 relative">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 text-[#737688] hover:text-[#131b2e] p-1.5 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedFeature.colorClass.split(" ")[0]} ${selectedFeature.colorClass.split(" ")[1]}`}>
                <span className="material-symbols-outlined text-2xl">{selectedFeature.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#131b2e]">{selectedFeature.title}</h3>
                <span className="text-xs font-mono text-[#0052ff] font-bold">{selectedFeature.tagline}</span>
              </div>
            </div>

            <p className="text-sm text-[#434656] mb-6 leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="space-y-3 bg-[#faf8ff] p-4 rounded-2xl border border-[#eaedff]">
              <span className="text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider block mb-2">
                Technical Highlights
              </span>
              {selectedFeature.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#131b2e]">
                  <span className="material-symbols-outlined text-base text-[#10b981] shrink-0">
                    check_circle
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedFeature(null)}
              className="w-full mt-6 py-3.5 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-sm shadow-md transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
