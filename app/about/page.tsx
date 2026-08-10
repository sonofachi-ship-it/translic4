import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubMobileNav from "@/components/SubMobileNav";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-x-hidden">
      <Header />
      
      <main className="flex-1 w-full pt-16 pb-24 md:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <section className="relative w-full h-[320px] sm:h-[420px] flex items-end p-6 sm:p-12 rounded-3xl overflow-hidden mt-6 mb-12 shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/65 to-transparent" />
          <div className="relative z-10 w-full flex flex-col gap-2 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full w-fit mb-2 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#00ccf9] animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00ccf9]">
                Our Mission
              </span>
            </div>
            <h1 className="font-extrabold text-3xl sm:text-5xl font-headline tracking-tight leading-tight">
              Redefining Wealth for the Modern Era
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl">
              We bridge the gap between traditional financial security and the lightning-fast agility of modern software engineering.
            </p>
          </div>
        </section>

        {/* Security & Agility Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Uncompromising Security */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e] font-headline mb-2">Uncompromising Security</h3>
              <p className="text-sm text-[#434656] leading-relaxed">
                Built on enterprise-grade cryptographic rails, we safeguard your wealth using bank-level biometric authentication and physical custody networks.
              </p>
            </div>
          </div>

          {/* Card 2: Institutional Agility */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#00ccf9]/20 text-[#00677f] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">speed</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e] font-headline mb-2">Institutional Agility</h3>
              <p className="text-sm text-[#434656] leading-relaxed">
                Execute transactions and transfers across multi-currency channels instantaneously, powered by our high-performance settlement layer.
              </p>
            </div>
          </div>

        </section>

        {/* Leadership */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#131b2e] font-headline">Executive Leadership</h2>
            <span className="text-xs font-mono font-bold text-[#0052ff] uppercase tracking-wider">
              FinSphere Board
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Elena */}
            <div className="bg-white p-5 rounded-3xl border border-[#c3c5d9]/40 shadow-xs flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova CEO"
                className="w-20 h-20 rounded-2xl object-cover border border-[#0052ff]/20 shadow-sm shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-[#131b2e]">Elena Rostova</h4>
                <span className="text-[10px] font-mono font-bold text-[#0052ff] block mb-1">
                  CHIEF EXECUTIVE OFFICER
                </span>
                <p className="text-[11px] text-[#434656] leading-relaxed">
                  Former Managing Director at a global Tier-1 investment bank. 15+ years scaling secure digital finance channels.
                </p>
              </div>
            </div>

            {/* Marcus */}
            <div className="bg-white p-5 rounded-3xl border border-[#c3c5d9]/40 shadow-xs flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Marcus Chen CTO"
                className="w-20 h-20 rounded-2xl object-cover border border-[#0052ff]/20 shadow-sm shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-[#131b2e]">Marcus Chen</h4>
                <span className="text-[10px] font-mono font-bold text-[#0052ff] block mb-1">
                  CHIEF TECHNOLOGY OFFICER
                </span>
                <p className="text-[11px] text-[#434656] leading-relaxed">
                  Architect of low-latency order-book execution layers and cryptographic key routing modules. PhD in Computer Science.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Box */}
        <section className="bg-gradient-to-r from-[#0052ff] to-[#3737c5] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-[#0052ff]/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
            <h3 className="text-xl sm:text-2xl font-bold font-headline">Ready to elevate your banking?</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Join thousands of modern enterprises, investment offices, and individuals building their financial inheritance securely with FinSphere.
            </p>
            <a
              href="/dashboard"
              className="bg-white text-[#0052ff] hover:bg-[#faf8ff] font-bold text-xs py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-95 mt-4"
            >
              Open an Account
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <SubMobileNav />
    </div>
  );
}
