"use client";

import { useState } from "react";
import { Account, Beneficiary } from "@/types";
import { TransferService } from "@/services/transfer.service";

interface TransfersTabProps {
  sourceAccounts: Account[];
  quickRecipients: Beneficiary[];
  onRefresh: () => Promise<void>;
}

export default function TransfersTab({ sourceAccounts, quickRecipients, onRefresh }: TransfersTabProps) {
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<number | null>(quickRecipients[0]?.id || null);
  const [recipientText, setRecipientText] = useState(quickRecipients[0]?.name || "");
  const [amount, setAmount] = useState("500");
  const [sourceAccountId, setSourceAccountId] = useState<number | null>(
    sourceAccounts[0] ? Number(sourceAccounts[0].id) : null
  );
  const [note, setNote] = useState("");
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [successRef, setSuccessRef] = useState("");

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // New beneficiary modal form states
  const [newBeneficiaryModal, setNewBeneficiaryModal] = useState(false);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState("");
  const [newBeneficiaryEmail, setNewBeneficiaryEmail] = useState("");
  const [newBeneficiaryAccount, setNewBeneficiaryAccount] = useState("");
  const [newBeneficiaryLoading, setNewBeneficiaryLoading] = useState(false);

  const handleSelectQuickRecipient = (beneficiary: Beneficiary) => {
    setSelectedBeneficiaryId(beneficiary.id);
    setRecipientText(beneficiary.name);
  };

  const handleCreateBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewBeneficiaryLoading(true);
    setErrorMsg("");
    try {
      const res = await TransferService.createBeneficiary({
        name: newBeneficiaryName,
        email: newBeneficiaryEmail || undefined,
        account_identifier: newBeneficiaryAccount,
      });

      if (res) {
        setNewBeneficiaryModal(false);
        setNewBeneficiaryName("");
        setNewBeneficiaryEmail("");
        setNewBeneficiaryAccount("");
        await onRefresh();
        setSelectedBeneficiaryId(res.id);
        setRecipientText(res.name);
      } else {
        setErrorMsg("Failed to create beneficiary. Please check inputs.");
      }
    } catch (err) {
      setErrorMsg("Error creating beneficiary.");
    } finally {
      setNewBeneficiaryLoading(false);
    }
  };

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!sourceAccountId) {
      setErrorMsg("Please select a source account.");
      return;
    }

    if (!selectedBeneficiaryId) {
      setErrorMsg("Please select a recipient.");
      return;
    }

    const transferAmount = Number(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setErrorMsg("Please enter an amount greater than zero.");
      return;
    }

    const account = sourceAccounts.find((a) => Number(a.id) === sourceAccountId);
    if (account && account.balance < transferAmount) {
      setErrorMsg("Insufficient funds in the selected account.");
      return;
    }

    setProcessing(true);
    try {
      const res = await TransferService.createTransfer({
        account_id: sourceAccountId,
        beneficiary_id: selectedBeneficiaryId,
        amount: transferAmount,
        note: note || undefined,
      });

      if (res.success) {
        setSuccessRef(res.reference || "N/A");
        setTransferSuccess(true);
        await onRefresh();
        setAmount("");
        setNote("");
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg("Failed to execute transfer. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c3c5d9]/40 shadow-sm max-w-3xl mx-auto relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">swap_horiz</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#131b2e] font-headline">Money Transfer Hub</h2>
            <p className="text-xs text-[#737688]">Instant P2P, ACH Bank Settlement, & International SWIFT Wires</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 text-[#ba1a1a] rounded-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {transferSuccess ? (
          <div className="bg-[#10b981]/10 border border-[#10b981]/30 text-[#059669] p-6 rounded-2xl text-center space-y-3 animate-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">check</span>
            </div>
            <h3 className="text-lg font-bold text-[#131b2e]">Transfer Complete!</h3>
            <p className="text-xs text-[#434656]">
              Successfully sent <span className="font-bold text-[#10b981]">${Number(amount || 0).toFixed(2)}</span> to{" "}
              <span className="font-bold text-[#131b2e]">{recipientText}</span>.
            </p>
            <div className="text-[10px] font-mono text-[#737688] pt-2 border-t border-[#10b981]/10">
              Reference: <span className="font-bold text-[#131b2e]">{successRef}</span>
            </div>
            <button
              onClick={() => {
                setTransferSuccess(false);
                setSuccessRef("");
              }}
              className="mt-4 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Send Another Transfer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMoney} className="space-y-5">
            {/* Source Account */}
            <div>
              <label className="block text-xs font-semibold text-[#434656] mb-1">Source Account</label>
              <select
                value={sourceAccountId || ""}
                onChange={(e) => setSourceAccountId(Number(e.target.value))}
                disabled={processing}
                className="w-full px-4 py-3 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs font-mono text-[#131b2e] bg-white disabled:opacity-50"
              >
                {sourceAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} (${acc.balance.toLocaleString()} {acc.currency})
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-[#434656]">Recipient</label>
                <button
                  type="button"
                  onClick={() => setNewBeneficiaryModal(true)}
                  disabled={processing}
                  className="text-xs font-mono text-[#0052ff] font-bold hover:underline cursor-pointer disabled:opacity-50"
                >
                  + Add Recipient
                </button>
              </div>

              {quickRecipients.length === 0 ? (
                <div className="py-3 px-4 bg-[#faf8ff] border border-[#eaedff] rounded-xl text-center text-xs text-[#737688] mb-2 font-mono">
                  No saved recipients. Click "+ Add Recipient" to add one.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {quickRecipients.map((bene) => (
                    <button
                      type="button"
                      key={bene.id}
                      disabled={processing}
                      onClick={() => handleSelectQuickRecipient(bene)}
                      className={`py-2 px-1.5 rounded-xl text-[11px] font-semibold border transition-all truncate cursor-pointer disabled:opacity-50 ${
                        selectedBeneficiaryId === bene.id
                          ? "bg-[#0052ff] text-white border-[#0052ff]"
                          : "bg-[#faf8ff] text-[#131b2e] border-[#eaedff] hover:bg-[#eaedff]"
                      }`}
                    >
                      {bene.name}
                    </button>
                  ))}
                </div>
              )}

              <input
                type="text"
                readOnly
                value={recipientText}
                placeholder="Select a recipient above or add a new one"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] bg-[#faf8ff] text-xs text-[#737688] focus:outline-none"
              />
            </div>

            {/* Amount & Quick Pills */}
            <div>
              <label className="block text-xs font-semibold text-[#434656] mb-1">Transfer Amount ($)</label>
              <div className="flex gap-2 mb-2">
                {["50", "100", "250", "500", "1000"].map((val) => (
                  <button
                    type="button"
                    key={val}
                    disabled={processing}
                    onClick={() => setAmount(val)}
                    className="flex-1 py-1.5 bg-[#eaedff]/60 hover:bg-[#dae2fd] text-[#0038b6] rounded-lg font-mono text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    +${val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={processing}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-lg font-mono font-bold text-[#131b2e] disabled:opacity-50"
              />
            </div>

            {/* Transfer Note */}
            <div>
              <label className="block text-xs font-semibold text-[#434656] mb-1">Payment Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={processing}
                placeholder="e.g. Dinner split / Rent contribution"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || !selectedBeneficiaryId || !sourceAccountId}
              className="w-full py-4 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{processing ? "Executing Settlement..." : "Execute Instant Settlement"}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
        )}
      </div>

      {/* Add Recipient Modal */}
      {newBeneficiaryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c3c5d9]/40 relative">
            <button
              onClick={() => setNewBeneficiaryModal(false)}
              disabled={newBeneficiaryLoading}
              className="absolute top-5 right-5 text-[#737688] hover:text-[#131b2e] p-1.5 rounded-full hover:bg-[#eaedff] cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">person_add</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">Add Recipient</h3>
                <p className="text-xs text-[#737688]">Save recipient details for easy money transfers</p>
              </div>
            </div>

            <form onSubmit={handleCreateBeneficiary} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newBeneficiaryName}
                  onChange={(e) => setNewBeneficiaryName(e.target.value)}
                  disabled={newBeneficiaryLoading}
                  placeholder="e.g. Sarah Miller"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={newBeneficiaryEmail}
                  onChange={(e) => setNewBeneficiaryEmail(e.target.value)}
                  disabled={newBeneficiaryLoading}
                  placeholder="e.g. sarah@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#434656] mb-1">Account Number / IBAN</label>
                <input
                  type="text"
                  required
                  value={newBeneficiaryAccount}
                  onChange={(e) => setNewBeneficiaryAccount(e.target.value)}
                  disabled={newBeneficiaryLoading}
                  placeholder="e.g. US89APEX9876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e] disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={newBeneficiaryLoading}
                className="w-full py-3 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-xs shadow-md transition-all mt-2 cursor-pointer disabled:opacity-75"
              >
                {newBeneficiaryLoading ? "Adding Recipient..." : "Add Recipient Immediately"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
