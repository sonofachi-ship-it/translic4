"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="security" className="bg-[#ffffff] border-t border-[#c3c5d9]/30 pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#003ec7] to-[#00ccf9] p-0.5 shadow-sm">
                <div className="w-full h-full bg-[#faf8ff] rounded-[10px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0052ff] text-xl font-bold">
                    blur_on
                  </span>
                </div>
              </div>
              <span className="font-bold text-xl text-[#131b2e] font-headline">FinSphere</span>
            </div>
            <p className="text-sm text-[#434656] max-w-sm leading-relaxed">
              Apex Digital Banking Platform providing enterprise-grade wealth tools, global transfers, and biometric security for modern individuals and institutions.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-[#0052ff] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#131b2e] font-headline uppercase tracking-wider">
              Products
            </h4>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Checking</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">High-Yield Savings</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Apex Metal Cards</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Investing Vaults</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Private Wealth</a>
          </div>

          {/* Column 2: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#131b2e] font-headline uppercase tracking-wider">
              Resources
            </h4>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Help Center</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Developer API</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Market Analysis</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Tax Documents</a>
            <a href="#" className="text-sm text-[#434656] hover:text-[#0052ff] transition-colors">Security Whitepaper</a>
          </div>

          {/* Column 3: Newsletter */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#131b2e] font-headline uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-[#434656]">Get market insights & security updates.</p>

            {subscribed ? (
              <div className="bg-[#10b981]/15 text-[#059669] p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  className="bg-[#faf8ff] px-3.5 py-2.5 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                />
                <button
                  type="submit"
                  className="bg-[#0052ff] hover:bg-[#003ec7] text-white py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#c3c5d9]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#737688]">
          <span>© 2026 FinSphere Inc. Apex Digital Banking Platform. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#0052ff]">Privacy Policy</a>
            <a href="#" className="hover:text-[#0052ff]">Terms of Service</a>
            <a href="#" className="hover:text-[#0052ff]">FDIC Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
