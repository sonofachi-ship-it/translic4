"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { id: "overview", label: "Overview", icon: "dashboard", href: "/dashboard" },
    { id: "cards", label: "Cards & Accounts", icon: "credit_card", href: "/dashboard/cards" },
    { id: "transfers", label: "Money Transfers", icon: "swap_horiz", href: "/dashboard/transfers" },
    { id: "analytics", label: "Analytics & Insights", icon: "insights", href: "/dashboard/analytics" },
    { id: "vaults", label: "Yield Vaults", icon: "savings", badge: "5.2% APY", href: "/dashboard/vaults" },
    { id: "profile", label: "Profile & Security", icon: "settings", href: "/dashboard/profile" },
    { id: "support", label: "Support Hub", icon: "contact_support", href: "/dashboard/support" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#ffffff] border-r border-[#c3c5d9]/30 min-h-screen p-6 justify-between shrink-0">
      {/* Brand Header */}
      <div className="flex flex-col gap-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003ec7] via-[#0052ff] to-[#00ccf9] p-0.5 shadow-md shadow-[#0052ff]/20">
            <div className="w-full h-full bg-[#faf8ff] rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0052ff] font-bold text-2xl">
                blur_on
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[#131b2e] font-headline">
              FinSphere
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#0052ff] font-bold -mt-1">
              APEX BANKING
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono font-bold text-[#737688] uppercase tracking-wider px-3 mb-1">
            Main Portal
          </span>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : item.href === "/dashboard/cards"
                ? pathname === "/dashboard/cards" || pathname === "/dashboard/accounts"
                : item.href === "/dashboard/profile"
                ? pathname === "/dashboard/profile" || pathname === "/dashboard/security"
                : pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0052ff] text-white shadow-md shadow-[#0052ff]/25"
                    : "text-[#434656] hover:bg-[#faf8ff] hover:text-[#0052ff]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white text-[#0052ff]"
                        : "bg-[#10b981]/15 text-[#059669]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info Card */}
      <div className="flex flex-col gap-4">
        <div className="bg-[#faf8ff] rounded-2xl p-4 border border-[#eaedff] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#0052ff]">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span className="text-xs font-bold text-[#131b2e]">FDIC Protected</span>
          </div>
          <p className="text-[11px] text-[#434656] leading-snug">
            Your deposits are insured up to $2,500,000 via our sweep network.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Exit Dashboard</span>
        </Link>
      </div>
    </aside>
  );
}
