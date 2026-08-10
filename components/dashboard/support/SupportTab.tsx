"use client";

import { useState } from "react";

import { SystemStatus } from "@/types";

interface SupportTabProps {
  systemStatus: SystemStatus[];
}

export default function SupportTab({ systemStatus }: SupportTabProps) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi there! I can help you with account inquiries, transaction tracing, or direct you to human support. What do you need?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [accountLocked, setAccountLocked] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputVal("");

    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm processing that. Let me look up your account details...";
      if (userMsg.toLowerCase().includes("card") || userMsg.toLowerCase().includes("freeze")) {
        reply = "To freeze your card, please head to the 'Cards & Accounts' tab and click the freeze toggle switch.";
      } else if (userMsg.toLowerCase().includes("transfer") || userMsg.toLowerCase().includes("wire")) {
        reply = "You can execute transfers to your contacts instantly inside the 'Money Transfers' tab.";
      } else if (userMsg.toLowerCase().includes("support") || userMsg.toLowerCase().includes("agent")) {
        reply = "I am routing your connection to our live enterprise banking agent now. Please standby.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 7000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Search Hero */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c3c5d9]/40 shadow-sm text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] font-headline">How can we help today?</h2>
        <p className="text-xs text-[#737688] max-w-md mx-auto">
          Search help guides, view network status, or message our smart support team.
        </p>
        <div className="relative max-w-md mx-auto w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737688] text-base">
            search
          </span>
          <input
            type="text"
            placeholder="Search guides, transactions, security..."
            className="w-full bg-[#faf8ff] pl-10 pr-4 py-2.5 rounded-xl border border-[#eaedff] text-xs text-[#131b2e] focus:outline-[#0052ff]"
          />
        </div>
      </div>

      {/* Emergency Assistance Banner */}
      <div className="bg-[#ffdad6]/40 border border-[#ffdad6] p-5 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">warning</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#131b2e]">Emergency Assistance</h3>
            <span className="text-xs text-[#737688]">Account compromised or card lost?</span>
          </div>
        </div>
        <button
          onClick={() => {
            setAccountLocked(true);
            alert("Account security locks have been successfully activated.");
          }}
          disabled={accountLocked}
          className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          {accountLocked ? "Account Locked" : "Lock Account"}
        </button>
      </div>

      {/* Quick Help Categories */}
      <div>
        <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-3">
          Help Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Transactions", icon: "account_balance_wallet", color: "text-[#0052ff] bg-[#0052ff]/10" },
            { label: "Card Limits", icon: "credit_card", color: "text-[#00677f] bg-[#00ccf9]/20" },
            { label: "Account Info", icon: "manage_accounts", color: "text-[#3737c5] bg-[#3737c5]/15" },
            { label: "Security Keys", icon: "security", color: "text-[#059669] bg-[#10b981]/15" },
          ].map((cat, i) => (
            <button
              key={i}
              className="bg-white hover:bg-[#faf8ff] p-4 rounded-2xl border border-[#c3c5d9]/40 shadow-xs flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cat.color}`}>
                <span className="material-symbols-outlined text-lg">{cat.icon}</span>
              </div>
              <span className="text-xs font-semibold text-[#131b2e]">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Support Grid: AI Bot & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Chat Console */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#eaedff]">
            <div className="w-8 h-8 rounded-full bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">smart_toy</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#131b2e] block">FinSphere AI Agent</span>
              <span className="text-[9px] text-[#10b981] font-mono font-bold">ONLINE • 24/7 SUPPORT</span>
            </div>
          </div>

          {/* Messages log */}
          <div className="space-y-3 h-52 overflow-y-auto pr-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                  msg.sender === "ai"
                    ? "bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] self-start"
                    : "bg-[#0052ff] text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[#faf8ff] px-4 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:outline-[#0052ff] text-[#131b2e]"
            />
            <button
              type="submit"
              className="bg-[#0052ff] hover:bg-[#003ec7] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Network & System Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-4">
            <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
              System Network Status
            </h3>

            <div className="space-y-3">
              {systemStatus.map((sys, i) => (
                <div key={i} className="bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#131b2e]">{sys.name}</span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded-full ${sys.color} flex items-center gap-1`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sys.status === "Degraded" ? "bg-[#ba1a1a] animate-pulse" : "bg-[#10b981]"}`} />
                    <span>{sys.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Guides */}
      <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-4">
        <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
          Popular Help Guides
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { title: "How to dispute a charge", date: "Updated 2 days ago" },
            { title: "Understanding international fees", date: "Updated 1 week ago" },
            { title: "Setting up multi-factor authentication", date: "Updated 1 month ago" },
          ].map((article, i) => (
            <div key={i} className="bg-[#faf8ff] hover:bg-[#eaedff] p-4 rounded-2xl border border-[#eaedff] transition-all cursor-pointer">
              <span className="font-bold text-[#131b2e] block mb-1 hover:text-[#0052ff]">{article.title}</span>
              <span className="text-[10px] text-[#737688] font-mono">{article.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
