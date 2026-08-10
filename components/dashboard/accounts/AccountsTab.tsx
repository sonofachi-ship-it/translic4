"use client";

import { useEffect, useState } from "react";
import { Account } from "@/types";
import { AccountService } from "@/services/account.service";

interface AccountsTabProps {
  accounts?: Account[];
}

export default function AccountsTab({ accounts: propAccounts }: AccountsTabProps) {
  const [detailsAccountId, setDetailsAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAccounts() {
    setLoading(true);
    try {
      const res = await AccountService.getAccounts();
      setAccounts(res);
      setError(null);
    } catch (err) {
      setError("Failed to load bank accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (propAccounts && propAccounts.length > 0) {
      setAccounts(propAccounts);
      setLoading(false);
    } else {
      fetchAccounts();
    }
  }, [propAccounts]);

  const toggleDetails = (accountId: string) => {
    setDetailsAccountId((prev) => (prev === accountId ? null : accountId));
  };

  // Helper to mask account number: e.g. "•••• •••• 5199"
  const maskAccountNumber = (num: string) => {
    if (!num) return "•••• •••• ••••";
    const lastFour = num.slice(-4);
    return `•••• •••• ${lastFour}`;
  };

  // Helper to format currency
  const formatBalance = (balance: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(balance);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#131b2e] font-headline">Bank Accounts</h2>
          <p className="text-xs text-[#737688]">
            View and manage your connected bank accounts, checking accounts, and routing information.
          </p>
        </div>
      </div>

      {/* Accounts Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-3 min-h-[200px]">
          <div className="w-10 h-10 rounded-full border-4 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
          <span className="text-xs font-semibold text-[#737688]">Loading your bank accounts...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#ba1a1a]">
          <span className="material-symbols-outlined text-3xl">error</span>
          <span>{error}</span>
        </div>
      ) : accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#737688]">
          <span className="material-symbols-outlined text-4xl text-[#c3c5d9]">account_balance_wallet</span>
          <span>No bank accounts found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const isDetailsOpen = detailsAccountId === account.id;
            const statusUpper = account.status.charAt(0).toUpperCase() + account.status.slice(1);
            const typeUpper = account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1);

            return (
              <div key={account.id} className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#131b2e] uppercase block">
                      {account.name}
                    </span>
                    <span className="text-[10px] text-[#737688]">{typeUpper} Account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      account.status === 'active' 
                        ? 'bg-[#10b981]/15 text-[#059669]' 
                        : 'bg-[#737688]/15 text-[#737688]'
                    }`}>
                      {statusUpper}
                    </span>
                  </div>
                </div>

                {/* Visual Account representation */}
                <div
                  className="w-full h-48 bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300"
                >
                  {/* Bank Icon / Decorative element */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-extrabold text-sm tracking-widest text-[#94a3b8]">
                      FEDERAL DEPOSIT INSURANCE
                    </span>
                    <span className="material-symbols-outlined text-xl text-[#94a3b8]">
                      account_balance
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-lg tracking-widest block font-bold">
                      {isDetailsOpen ? account.account_number : maskAccountNumber(account.account_number)}
                    </span>
                    <div className="flex justify-between items-center text-xs font-mono text-white/80 mt-3">
                      <span>{typeUpper}</span>
                      <span className="font-bold">
                        {formatBalance(account.balance, account.currency)} {account.currency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controls & Details Toggle */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#131b2e]">Account Details</span>
                    <button
                      onClick={() => toggleDetails(account.id)}
                      className="text-[#0052ff] font-mono hover:underline text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isDetailsOpen ? "visibility_off" : "visibility"}
                      </span>
                      <span>{isDetailsOpen ? "Hide Details" : "Show Details"}</span>
                    </button>
                  </div>

                  {isDetailsOpen && (
                    <div className="bg-[#faf8ff] p-4 rounded-2xl border border-[#eaedff] space-y-2 text-xs animate-in slide-in-from-top-2 duration-200">
                      <div className="flex justify-between items-center text-[#131b2e]">
                        <span className="text-[#737688]">Full Account Number:</span>
                        <span className="font-mono font-bold">{account.account_number}</span>
                      </div>
                      <div className="flex justify-between items-center text-[#131b2e]">
                        <span className="text-[#737688]">Routing Transit Number:</span>
                        <span className="font-mono font-bold">121000248</span>
                      </div>
                      <div className="flex justify-between items-center text-[#131b2e]">
                        <span className="text-[#737688]">ACH Transfers:</span>
                        <span className="text-[#10b981] font-bold font-mono">ENABLED</span>
                      </div>
                      <div className="flex justify-between items-center text-[#131b2e]">
                        <span className="text-[#737688]">Wire Transfer ID:</span>
                        <span className="font-mono">WS-{account.id}094A</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
