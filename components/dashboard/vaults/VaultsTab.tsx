"use client";

import { useState } from "react";

import { Vault } from "@/types";

interface VaultsTabProps {
  vaults: Vault[];
}

export default function VaultsTab({ vaults }: VaultsTabProps) {
  const [depositModal, setDepositModal] = useState(false);
  const [selectedVault, setSelectedVault] = useState<string>(vaults[0]?.name || "Emergency Wealth Vault");
  const [depositAmount, setDepositAmount] = useState("1000");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#131b2e] font-headline">High-Yield Wealth Vaults</h2>
            <span className="text-xs font-mono font-bold bg-[#10b981] text-white px-2.5 py-0.5 rounded-full">
              5.2% APY
            </span>
          </div>
          <p className="text-xs text-[#737688]">Automated goal-based savings with compound interest calculated daily.</p>
        </div>

        <button
          onClick={() => setDepositModal(true)}
          className="bg-[#0052ff] hover:bg-[#003ec7] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Deposit to Vault</span>
        </button>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vaults.map((vault, i) => {
          const progress = Math.round((vault.current / vault.target) * 100);
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center ${vault.color}`}>
                    <span className="material-symbols-outlined text-2xl">{vault.icon}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-[#10b981]/15 text-[#059669] px-2.5 py-1 rounded-full">
                    {vault.apy}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#131b2e] mb-1">{vault.name}</h3>
                <span className="text-2xl font-bold font-mono text-[#131b2e] block mb-4">
                  ${vault.current.toLocaleString()}
                </span>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold text-[#737688]">
                    <span>Goal: ${vault.target.toLocaleString()}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${vault.color}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedVault(vault.name);
                  setDepositModal(true);
                }}
                className="w-full py-2.5 bg-[#faf8ff] hover:bg-[#eaedff] text-[#0052ff] border border-[#eaedff] font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Top-Up Vault
              </button>
            </div>
          );
        })}
      </div>

      {/* Deposit Modal */}
      {depositModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/40 relative">
            <button
              onClick={() => setDepositModal(false)}
              className="absolute top-5 right-5 text-[#737688] hover:text-[#131b2e] p-1.5 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#059669] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">Deposit to Vault</h3>
                <p className="text-xs text-[#737688]">Earn 5.2% APY compounded daily</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDepositModal(false);
                alert(`Successfully deposited $${depositAmount} into ${selectedVault}!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Target Vault</label>
                <select
                  value={selectedVault}
                  onChange={(e) => setSelectedVault(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                >
                  {vaults.map((vault) => (
                    <option key={vault.name}>{vault.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Deposit Amount ($)</label>
                <input
                  type="number"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-base font-mono font-bold text-[#131b2e]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-xs shadow-md transition-all"
              >
                Confirm Deposit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
