"use client";

import { CategoryBudget } from "@/types";

interface AnalyticsTabProps {
  categories: CategoryBudget[];
}

export default function AnalyticsTab({ categories }: AnalyticsTabProps) {

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#131b2e] font-headline">Analytics & Spending Insights</h2>
          <p className="text-xs text-[#737688]">Categorized breakdown and predictive liquidity metrics for August 2026.</p>
        </div>
        <button
          onClick={() => alert("Statement export generated.")}
          className="bg-[#faf8ff] hover:bg-[#eaedff] text-[#0052ff] border border-[#c3c5d9]/40 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export Monthly Statement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#131b2e] font-headline">Category Budgets</h3>
          <div className="space-y-5">
            {categories.map((cat, i) => {
              const percentage = Math.round((cat.spent / cat.budget) * 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#131b2e]">
                    <span>{cat.name}</span>
                    <span className="font-mono">
                      ${cat.spent.toLocaleString()} / ${cat.budget.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Health Score Widget */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#131b2e] to-[#283044] text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono font-bold text-[#00ccf9] uppercase">Financial Health</span>
              <span className="material-symbols-outlined text-base">insights</span>
            </div>
            <h3 className="text-2xl font-bold font-headline">845 / 850</h3>
            <span className="text-xs text-white/80 font-mono">EXCELLENT • Top 2% of Apex Users</span>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#10b981] font-bold">
              <span className="material-symbols-outlined text-base">trending_up</span>
              <span>Low Credit Utilization (4.2%)</span>
            </div>
            <p className="text-[11px] text-white/75 leading-relaxed">
              Your spending is 14% lower than last month. Automated savings rules have saved you an extra $340.00 this cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
