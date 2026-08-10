"use client";

import { useEffect, useState } from "react";
import { Transaction, QuickContact, Account, Card } from "@/types";
import { AccountService } from "@/services/account.service";
import { CardsService } from "@/services/cards.service";
import { TransactionService } from "@/services/transaction.service";

interface OverviewTabProps {
  onOpenTransfer: () => void;
  quickContacts: QuickContact[];
}

export default function OverviewTab({ onOpenTransfer, quickContacts }: OverviewTabProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [cardFrozen, setCardFrozen] = useState(false);
  const [selectedTxFilter, setSelectedTxFilter] = useState("all");
  const [txSearchQuery, setTxSearchQuery] = useState("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadAccounts() {
      try {
        const fetchedAccounts = await AccountService.getAccounts();
        if (!active) return;
        setAccounts(fetchedAccounts);
        setAccountsError(null);
      } catch (err) {
        if (!active) return;
        setAccountsError("Failed to load accounts. Please try again.");
      } finally {
        if (active) {
          setAccountsLoading(false);
        }
      }
    }
    loadAccounts();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadCards() {
      try {
        const fetchedCards = await CardsService.getCards();
        if (!active) return;
        setCards(fetchedCards);
      } catch (err) {
        console.error("Failed to load cards in overview:", err);
      } finally {
        if (active) {
          setCardsLoading(false);
        }
      }
    }
    loadCards();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadTransactions() {
      try {
        const fetchedTxs = await TransactionService.getTransactions();
        if (!active) return;
        setTransactions(fetchedTxs);
      } catch (err) {
        if (!active) return;
        setTxError("Failed to load transactions.");
      } finally {
        if (active) {
          setTxLoading(false);
        }
      }
    }
    loadTransactions();
    return () => {
      active = false;
    };
  }, []);

  const primaryCard = cards.find(c => c.type.toLowerCase().includes('primary') || c.type.toLowerCase().includes('debit')) || cards[0];
  const isCardFrozen = primaryCard ? primaryCard.status === 'frozen' : false;

  const handleToggleFreeze = async () => {
    if (!primaryCard) return;
    const nextFrozen = !isCardFrozen;
    
    // Optimistic UI update
    setCards(prev => prev.map(c => c.id === primaryCard.id ? { ...c, status: nextFrozen ? 'frozen' : 'active' } : c));
    
    const success = await CardsService.freezeCard(primaryCard.id, nextFrozen);
    if (!success) {
      // Revert if API fails
      setCards(prev => prev.map(c => c.id === primaryCard.id ? { ...c, status: isCardFrozen ? 'frozen' : 'active' } : c));
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const mainCurrency = accounts[0]?.currency || "USD";
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: mainCurrency,
  }).format(totalBalance);

  const accountsSummary = accounts
    .map(
      (acc) => {
        const lastFour = acc.account_number ? ` •••• ${acc.account_number.slice(-4)}` : "";
        return `${acc.name}${lastFour} (${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: acc.currency,
        }).format(acc.balance)})`;
      }
    )
    .join(" • ");

  const filteredTx = transactions.filter((tx) => {
    const matchesFilter =
      selectedTxFilter === "all" ||
      (selectedTxFilter === "income" && tx.type === "income") ||
      (selectedTxFilter === "expenses" && tx.type === "expense");

    const matchesSearch =
      tx.name.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(txSearchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Row: Balance Summary & Interactive Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Total Net Worth Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#0052ff] via-[#003ec7] to-[#3737c5] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#0052ff]/20 relative overflow-hidden flex flex-col justify-between">
          {/* Subtle Background Glow Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-white/80 uppercase">
                Total Net Worth
              </span>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">
                  {balanceVisible ? "visibility" : "visibility_off"}
                </span>
                <span>{balanceVisible ? "Hide" : "Show"}</span>
              </button>
            </div>

            <div className="flex items-baseline gap-4 mb-2">
              <h2 className="font-extrabold text-3xl sm:text-4xl font-mono tracking-tight">
                {accountsLoading ? (
                  <span className="text-xl font-sans font-semibold text-white/70">Loading balance...</span>
                ) : accountsError ? (
                  <span className="text-xl font-sans font-semibold text-white/70">Error loading data</span>
                ) : !balanceVisible ? (
                  "•••••••••"
                ) : (
                  formattedTotal
                )}
              </h2>
              {!accountsLoading && !accountsError && accounts.length > 0 && (
                <span className="text-xs font-mono font-bold bg-[#10b981] text-white px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <span className="text-xs text-white/75 font-mono block min-h-[1.25rem]">
              {accountsLoading ? (
                "Retrieving your accounts..."
              ) : accountsError ? (
                accountsError
              ) : accounts.length === 0 ? (
                "No active accounts found."
              ) : (
                accountsSummary
              )}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <button
              onClick={onOpenTransfer}
              className="bg-white text-[#0052ff] hover:bg-[#faf8ff] font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Transfer</span>
            </button>

            <button
              onClick={onOpenTransfer}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-3 px-4 rounded-xl backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Deposit</span>
            </button>

            <button
              onClick={onOpenTransfer}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-3 px-4 rounded-xl backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">qr_code_2</span>
              <span>Request</span>
            </button>
          </div>
        </div>

        {/* Interactive Apex Visa Card Widget */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between">
          {cardsLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[14rem] text-xs font-semibold text-[#737688] gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
              <span>Loading card...</span>
            </div>
          ) : !primaryCard ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[14rem] text-xs font-semibold text-[#737688] gap-2">
              <span className="material-symbols-outlined text-3xl text-[#c3c5d9]">credit_card_off</span>
              <span>No card issued.</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                  Primary Apex Card
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#737688]">
                    {isCardFrozen ? "FROZEN" : "ACTIVE"}
                  </span>
                  <button
                    onClick={handleToggleFreeze}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      isCardFrozen ? "bg-[#ba1a1a]" : "bg-[#10b981]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        isCardFrozen ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Visual Card */}
              <div
                className={`w-full h-44 bg-gradient-to-br ${primaryCard.cardColor || "from-[#131b2e] via-[#283044] to-[#0052ff]"} rounded-2xl p-5 text-white shadow-md flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isCardFrozen ? "grayscale opacity-75" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-xs tracking-widest text-[#00ccf9]">
                    {primaryCard.name.toUpperCase()}
                  </span>
                  <span className="material-symbols-outlined text-lg">contactless</span>
                </div>
                <div>
                  <span className="font-mono text-base tracking-widest block">{primaryCard.number}</span>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/80 mt-2">
                    <span>{primaryCard.holder}</span>
                    <span>EXP {primaryCard.expiry}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs font-semibold text-[#0052ff]">
                <span>Monthly Spending Limit: ${primaryCard.spendingLimit.toLocaleString()}</span>
                <span className="font-mono font-bold text-[#131b2e]">${primaryCard.spent.toLocaleString()} Used</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Middle Row: Quick Contacts & Cashflow Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Send P2P Contacts */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                Quick Transfer
              </span>
              <button onClick={onOpenTransfer} className="text-xs font-mono text-[#0052ff] font-bold hover:underline">
                New Recipient
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center my-4">
              {quickContacts.map((contact, i) => (
                <button
                  key={i}
                  onClick={onOpenTransfer}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <img
                    src={contact.img}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-[#0052ff] group-hover:scale-105 transition-all shadow-xs"
                  />
                  <span className="text-[11px] font-semibold text-[#131b2e] truncate max-w-full">
                    {contact.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0052ff] text-xl">bolt</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">Instant P2P Rail</span>
              <span className="text-[10px] text-[#737688]">Zero fees on all internal Apex transfers</span>
            </div>
          </div>
        </div>

        {/* Cashflow Overview */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider block">
                Cashflow Overview
              </span>
              <span className="text-[11px] text-[#737688]">Income vs Monthly Expenses</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[#131b2e]">Income: $14,500</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0052ff]" />
                <span className="text-[#131b2e]">Expenses: $3,840</span>
              </div>
            </div>
          </div>

          {/* Simple Visual Cashflow Bar Chart */}
          <div className="space-y-4 my-2">
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-[#131b2e]">
                <span>August Earnings</span>
                <span>78% of Monthly Goal</span>
              </div>
              <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10b981] to-[#00ccf9] rounded-full w-[78%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-[#131b2e]">
                <span>August Expenses</span>
                <span>26% of Income Budget</span>
              </div>
              <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0052ff] to-[#3737c5] rounded-full w-[26%]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-3 border-t border-[#eaedff]">
            <span className="text-[#10b981] font-mono">Net Surplus: +$10,660.00</span>
            <span className="text-[#0052ff] font-mono hover:underline cursor-pointer">
              View Detailed Analytics →
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity Feed with Search & Filter */}
      <div className="bg-white rounded-3xl p-6 border border-[#c3c5d9]/40 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#131b2e] font-headline">Recent Transactions</h3>
            <span className="text-xs text-[#737688]">Real-time account debit & credit log</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter Pills */}
            <div className="flex items-center bg-[#faf8ff] p-1 rounded-xl border border-[#eaedff] text-xs font-mono font-bold">
              {(["all", "income", "expenses"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedTxFilter(filter)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                    selectedTxFilter === filter
                      ? "bg-[#0052ff] text-white shadow-xs"
                      : "text-[#434656] hover:text-[#131b2e]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Filter Input */}
            <input
              type="text"
              value={txSearchQuery}
              onChange={(e) => setTxSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1.5 bg-[#faf8ff] border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-[#0052ff] w-32"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-[#eaedff]">
          {txLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-xs font-semibold text-[#737688]">
              <div className="w-8 h-8 rounded-full border-2 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
              <span>Loading transactions...</span>
            </div>
          ) : txError ? (
            <div className="py-8 text-center text-xs text-[#ba1a1a] font-semibold flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span>{txError}</span>
            </div>
          ) : filteredTx.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#737688]">No transactions yet.</div>
          ) : (
            filteredTx.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="py-3.5 flex items-center justify-between hover:bg-[#faf8ff] px-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.color}`}>
                    <span className="material-symbols-outlined text-xl">{tx.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">{tx.name}</span>
                    <span className="text-[11px] text-[#737688]">
                      {tx.category} • {tx.date}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`text-xs font-mono font-bold ${
                      tx.type === "income" ? "text-[#10b981]" : "text-[#131b2e]"
                    }`}
                  >
                    {tx.type === "income" ? `+$${tx.amount.toFixed(2)}` : `−$${tx.amount.toFixed(2)}`}
                  </span>
                  <span className="text-[10px] font-mono text-[#0052ff] bg-[#eaedff] px-2 py-0.5 rounded-full mt-0.5">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/40 relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 text-[#737688] hover:text-[#131b2e] p-1.5 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex flex-col items-center text-center my-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${selectedTx.color}`}>
                <span className="material-symbols-outlined text-3xl">{selectedTx.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[#131b2e]">{selectedTx.name}</h3>
              <span className="text-xs text-[#737688]">{selectedTx.category}</span>
              <span className={`text-2xl font-bold font-mono my-3 ${selectedTx.type === "income" ? "text-[#10b981]" : "text-[#131b2e]"}`}>
                {selectedTx.type === "income" ? `+$${selectedTx.amount.toFixed(2)}` : `−$${selectedTx.amount.toFixed(2)}`}
              </span>
            </div>

            <div className="space-y-2.5 bg-[#faf8ff] p-4 rounded-2xl border border-[#eaedff] text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#eaedff]">
                <span className="text-[#737688]">Status</span>
                <span className="font-bold text-[#10b981]">{selectedTx.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]">
                <span className="text-[#737688]">Date & Time</span>
                <span className="font-bold text-[#131b2e]">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]">
                <span className="text-[#737688]">Payment Source</span>
                <span className="font-bold text-[#131b2e]">{selectedTx.account}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#737688]">Transaction ID</span>
                <span className="font-bold text-[#0052ff]">{selectedTx.id}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full mt-6 py-3 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-xs shadow-md transition-all"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
