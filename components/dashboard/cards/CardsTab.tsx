"use client";

import { useEffect, useState } from "react";
import { Card } from "@/types";
import { CardsService } from "@/services/cards.service";

interface CardsTabProps {
  cards?: Card[];
}

export default function CardsTab({ cards: propCards }: CardsTabProps) {
  const [detailsCardId, setDetailsCardId] = useState<string | null>(null);
  const [spendingLimits, setSpendingLimits] = useState<{ [key: string]: number }>({});
  const [newCardModal, setNewCardModal] = useState(false);

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formNickname, setFormNickname] = useState("");
  const [formLimit, setFormLimit] = useState("500");
  const [formType, setFormType] = useState("Disposable Single-Use Card");
  const [formLoading, setFormLoading] = useState(false);

  async function fetchCards() {
    setLoading(true);
    try {
      const res = await CardsService.getCards();
      setCards(res);
      setError(null);
    } catch (err) {
      setError("Failed to load cards. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const toggleFreeze = async (cardId: string, currentStatus: string) => {
    const isFrozen = currentStatus === "frozen" || currentStatus === "FROZEN";
    const nextFrozen = !isFrozen;

    // Optimistic UI update
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, status: nextFrozen ? 'frozen' : 'active' } : c));

    const success = await CardsService.freezeCard(cardId, nextFrozen);
    if (!success) {
      // Revert if API fails
      setCards(prev => prev.map(c => c.id === cardId ? { ...c, status: isFrozen ? 'frozen' : 'active' } : c));
    }
  };

  const handleSliderChange = (cardId: string, value: number) => {
    setSpendingLimits((prev) => ({ ...prev, [cardId]: value }));
  };

  const handleSliderRelease = async (cardId: string, value: number) => {
    await CardsService.updateCard(cardId, { spending_limit: value });
  };

  const toggleDetails = (cardId: string) => {
    setDetailsCardId((prev) => (prev === cardId ? null : cardId));
  };

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await CardsService.issueCard({
        name: formNickname,
        type: formType,
        spending_limit: Number(formLimit),
        card_color: 'from-[#3737c5] via-[#5153de] to-[#00ccf9]',
      });
      if (res) {
        setNewCardModal(false);
        setFormNickname("");
        setFormLimit("500");
        setFormType("Disposable Single-Use Card");
        await fetchCards();
      } else {
        alert("Failed to issue card. Please try again.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#131b2e] font-headline">Card Management Center</h2>
          <p className="text-xs text-[#737688]">
            Manage your physical metal cards, generate single-use virtual cards, and control spending limits.
          </p>
        </div>

        <button
          onClick={() => setNewCardModal(true)}
          className="bg-[#0052ff] hover:bg-[#003ec7] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_card</span>
          <span>Issue Virtual Card</span>
        </button>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-3 min-h-[200px]">
          <div className="w-10 h-10 rounded-full border-4 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
          <span className="text-xs font-semibold text-[#737688]">Loading your cards...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#ba1a1a]">
          <span className="material-symbols-outlined text-3xl">error</span>
          <span>{error}</span>
        </div>
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#737688]">
          <span className="material-symbols-outlined text-4xl text-[#c3c5d9]">credit_card_off</span>
          <span>No cards found. Click "Issue Virtual Card" to get started.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const isFrozen = card.status === "frozen" || card.status === "FROZEN";
            const limit = spendingLimits[card.id] ?? card.spendingLimit;
            const isDetailsOpen = detailsCardId === card.id;

            return (
              <div key={card.id} className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#131b2e] uppercase block">
                      {card.name}
                    </span>
                    <span className="text-[10px] text-[#737688]">{card.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#737688]">
                      {isFrozen ? "FROZEN" : "ACTIVE"}
                    </span>
                    <button
                      onClick={() => toggleFreeze(card.id, card.status)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        isFrozen ? "bg-[#ba1a1a]" : "bg-[#10b981]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          isFrozen ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Visual Card */}
                <div
                  className={`w-full h-48 bg-gradient-to-br ${card.cardColor || "from-[#131b2e] via-[#283044] to-[#0052ff]"} rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isFrozen ? "grayscale opacity-75" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-extrabold text-sm tracking-widest text-[#00ccf9]">
                      {card.type.toLowerCase().includes("physical") || card.type.toLowerCase().includes("metal") ? "APEX PLATINUM" : "VIRTUAL SHIELD"}
                    </span>
                    <span className="material-symbols-outlined text-xl">
                      {card.type.toLowerCase().includes("physical") || card.type.toLowerCase().includes("metal") ? "contactless" : "vibration"}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-lg tracking-widest block font-bold">
                      {isDetailsOpen ? card.number : `•••• •••• •••• ${card.number.split(" ").pop()}`}
                    </span>
                    <div className="flex justify-between items-center text-xs font-mono text-white/80 mt-3">
                      <span>{card.holder}</span>
                      <span>EXP {card.expiry} • CVV {isDetailsOpen ? "•••" : "•••"}</span>
                    </div>
                  </div>
                </div>

                {/* Controls & Security Toggle */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#131b2e]">Reveal Card Details</span>
                    <button
                      onClick={() => toggleDetails(card.id)}
                      className="text-[#0052ff] font-mono hover:underline text-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isDetailsOpen ? "visibility_off" : "visibility"}
                      </span>
                      <span>{isDetailsOpen ? "Hide Security Info" : "Show Details"}</span>
                    </button>
                  </div>

                  {!card.type.toLowerCase().includes("disposable") ? (
                    <div>
                      <div className="flex justify-between text-xs font-mono font-bold text-[#131b2e] mb-1">
                        <span>Monthly Spending Limit</span>
                        <span>${limit.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="25000"
                        step="500"
                        value={limit}
                        onChange={(e) => handleSliderChange(card.id, Number(e.target.value))}
                        onMouseUp={(e) => handleSliderRelease(card.id, Number((e.target as HTMLInputElement).value))}
                        onTouchEnd={(e) => handleSliderRelease(card.id, Number((e.target as HTMLInputElement).value))}
                        className="w-full accent-[#0052ff] cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="flex justify-between items-center text-[#131b2e] font-semibold">
                        <span>Auto-Regenerate CVV</span>
                        <span className="font-mono text-[#10b981] font-bold">ENABLED</span>
                      </div>
                      <div className="flex justify-between items-center text-[#131b2e] font-semibold">
                        <span>Single Merchant Lock</span>
                        <span className="font-mono text-[#0052ff] font-bold">ACTIVE (AWS)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Virtual Card Generator Modal */}
      {newCardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/40 relative">
            <button
              onClick={() => setNewCardModal(false)}
              className="absolute top-5 right-5 text-[#737688] hover:text-[#131b2e] p-1.5 rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">credit_card</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">Issue Virtual Card</h3>
                <p className="text-xs text-[#737688]">Create an instant single-use or merchant card</p>
              </div>
            </div>

            <form
              onSubmit={handleCreateCard}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Card Nickname</label>
                <input
                  type="text"
                  required
                  value={formNickname}
                  onChange={(e) => setFormNickname(e.target.value)}
                  disabled={formLoading}
                  placeholder="e.g. Netflix Subscription"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Spending Limit ($)</label>
                <input
                  type="number"
                  required
                  value={formLimit}
                  onChange={(e) => setFormLimit(e.target.value)}
                  disabled={formLoading}
                  placeholder="500"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Card Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  disabled={formLoading}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] bg-white disabled:opacity-50"
                >
                  <option>Disposable Single-Use Card</option>
                  <option>Recurring Subscription Lock</option>
                  <option>Travel & Expense Card</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-xs shadow-md transition-all mt-2 cursor-pointer disabled:opacity-75"
              >
                {formLoading ? "Generating Digital Card..." : "Generate Digital Card Immediately"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
