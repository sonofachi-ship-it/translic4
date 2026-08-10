"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubMobileNav from "@/components/SubMobileNav";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("General Support");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full pt-16 pb-24 md:pb-12 max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Banner Title */}
        <div className="py-8 text-center space-y-2 mt-4">
          <h1 className="text-2xl sm:text-4xl font-bold font-headline text-[#131b2e]">Get in Touch</h1>
          <p className="text-xs text-[#737688]">We are here to assist. Connect with our global support team.</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm p-6 sm:p-8 mb-8">
          {submitted ? (
            <div className="bg-[#10b981]/15 text-[#059669] border border-[#10b981]/30 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-2xl">check</span>
              </div>
              <h3 className="text-base font-bold text-[#131b2e]">Message Sent!</h3>
              <p className="text-xs text-[#434656]">We have received your message. Our agents will respond within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#737688] mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-[#faf8ff] px-4 py-2.5 rounded-xl border border-[#c3c5d9]/40 focus:outline-[#0052ff] text-xs text-[#131b2e]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#737688] mb-1">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-[#faf8ff] px-4 py-2.5 rounded-xl border border-[#c3c5d9]/40 focus:outline-[#0052ff] text-xs text-[#131b2e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-[#737688] mb-1">INQUIRY TYPE</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#faf8ff] px-4 py-2.5 rounded-xl border border-[#c3c5d9]/40 focus:outline-[#0052ff] text-xs text-[#131b2e]"
                >
                  <option>General Support</option>
                  <option>Account Issues</option>
                  <option>Partnerships</option>
                  <option>Technical Help</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-[#737688] mb-1">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?"
                  className="w-full bg-[#faf8ff] px-4 py-2.5 rounded-xl border border-[#c3c5d9]/40 focus:outline-[#0052ff] text-xs text-[#131b2e] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0052ff] hover:bg-[#003ec7] text-white font-semibold rounded-xl text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Hotlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="mailto:support@finsphere.com"
            className="bg-white p-5 rounded-2xl border border-[#c3c5d9]/40 shadow-xs flex items-center gap-4 hover:scale-[1.01] transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">mail</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#737688]">EMAIL SUPPORT</span>
              <span className="text-xs font-bold text-[#131b2e] block">support@finsphere.com</span>
            </div>
          </a>

          <a
            href="tel:+18005550199"
            className="bg-white p-5 rounded-2xl border border-[#c3c5d9]/40 shadow-xs flex items-center gap-4 hover:scale-[1.01] transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-[#00ccf9]/20 text-[#00677f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">call</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#737688]">CALL CENTER (24/7)</span>
              <span className="text-xs font-bold text-[#131b2e] block">+1 (800) 555-0199</span>
            </div>
          </a>
        </div>

        {/* Global Locations */}
        <div className="space-y-4">
          <h2 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
            Global Headquarters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* HQ 1 */}
            <div className="bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm overflow-hidden flex flex-col justify-between">
              <div
                className="w-full h-36 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&auto=format&fit=crop&q=80')",
                }}
              />
              <div className="p-5">
                <h4 className="text-xs font-bold text-[#131b2e]">New York HQ</h4>
                <p className="text-[11px] text-[#434656] mt-1">120 Broadway, Suite 3400, New York, NY 10271</p>
              </div>
            </div>

            {/* HQ 2 */}
            <div className="bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm overflow-hidden flex flex-col justify-between">
              <div
                className="w-full h-36 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&auto=format&fit=crop&q=80')",
                }}
              />
              <div className="p-5">
                <h4 className="text-xs font-bold text-[#131b2e]">London EMEA</h4>
                <p className="text-[11px] text-[#434656] mt-1">1 Canada Square, Floor 25, London E14 5AB, UK</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <SubMobileNav />
    </div>
  );
}
