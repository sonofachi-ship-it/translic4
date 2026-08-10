"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubMobileNav from "@/components/SubMobileNav";

interface FaqItem {
  question: string;
  answer: string;
  category: "accounts" | "transfers" | "security" | "investing";
}

const faqData: FaqItem[] = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, go to the login screen and tap 'Forgot Password'. We will send a secure reset link to your registered email address. Follow the instructions to create a new password.",
    category: "security",
  },
  {
    question: "What are the fees for international transfers?",
    answer: "We pride ourselves on transparent pricing. International transfers incur a flat fee of $5 plus 1% of the transfer amount, up to a maximum fee of $50. Exchange rates are locked in at the time of transfer.",
    category: "transfers",
  },
  {
    question: "How long does it take for funds to settle?",
    answer: "Standard ACH transfers typically take 2-3 business days to settle. Wire transfers requested before 2:00 PM EST are usually processed the same day. For instant access, try our Instant P2P Settlement.",
    category: "transfers",
  },
  {
    question: "Is my money insured?",
    answer: "Yes, funds deposited into your FinSphere checking or savings accounts are FDIC-insured up to $2,500,000 via our sweep network partners. Investment assets are protected via SIPC parameters.",
    category: "accounts",
  },
  {
    question: "How do I order a physical card?",
    answer: "You can request a physical debit card directly from the app. Navigate to the 'Cards' tab, select 'Order Physical Card,' and confirm your address. Standard shipping takes 5-7 business days.",
    category: "accounts",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "accounts" | "transfers" | "security" | "investing">("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaq = faqData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full pt-16 pb-24 md:pb-12 max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Banner */}
        <div className="py-8 text-center space-y-4 mt-4">
          <h1 className="text-2xl sm:text-4xl font-bold font-headline text-[#131b2e]">How can we help?</h1>
          <p className="text-xs text-[#737688]">Search for fast answers or browse custom topics below.</p>
          <div className="relative w-full shadow-sm rounded-xl overflow-hidden group border border-[#c3c5d9]/40 focus-within:shadow-md transition-all bg-white">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737688] text-base">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-transparent pl-10 pr-4 py-3 rounded-lg outline-none text-xs text-[#131b2e] placeholder-[#737688]"
            />
          </div>
        </div>

        {/* Categories scroll bar */}
        <div className="w-full overflow-x-auto pb-4 flex gap-2 text-xs font-mono font-bold no-scrollbar">
          {(["all", "accounts", "transfers", "security", "investing"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedIndex(null);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0052ff] text-white shadow-md shadow-[#0052ff]/20"
                  : "bg-white border border-[#eaedff] text-[#434656] hover:text-[#131b2e]"
              }`}
            >
              {cat === "all" ? "All Topics" : cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3 mt-4">
          {filteredFaq.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#c3c5d9]/30 p-6">
              <span className="material-symbols-outlined text-4xl text-[#737688] mb-2">search_off</span>
              <h3 className="text-sm font-bold text-[#131b2e]">No answers found</h3>
              <p className="text-[11px] text-[#737688] mt-1">We couldn&apos;t find matching items. Adjust query parameters.</p>
            </div>
          ) : (
            filteredFaq.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#c3c5d9]/30 shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      {item.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#737688] transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-[#0052ff]" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-40 border-t border-[#eaedff]" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 text-xs text-[#434656] leading-relaxed bg-[#faf8ff]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      <Footer />
      <SubMobileNav />
    </div>
  );
}
