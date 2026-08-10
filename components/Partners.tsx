export default function Partners() {
  return (
    <section className="w-full border-y border-[#c3c5d9]/30 bg-[#ffffff] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <p className="text-center font-mono text-xs font-bold text-[#737688] uppercase tracking-widest mb-6">
          Trusted by Global Financial Networks & Enterprise Partners
        </p>

        <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Visa */}
          <div className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform">
            <span className="font-extrabold text-2xl tracking-tighter italic text-[#0038b6] font-headline">
              VISA
            </span>
          </div>

          {/* Mastercard */}
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 -ml-2.5" />
            </div>
            <span className="font-semibold text-lg text-[#131b2e] tracking-tight">
              mastercard
            </span>
          </div>

          {/* Apple Pay */}
          <div className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl text-[#131b2e]">
              payments
            </span>
            <span className="font-bold text-lg text-[#131b2e]">Pay</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center cursor-pointer hover:scale-105 transition-transform">
            <span className="font-bold text-2xl italic text-[#003087]">
              Pay<span className="text-[#0079C1]">Pal</span>
            </span>
          </div>

          {/* Stripe */}
          <div className="flex items-center cursor-pointer hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl text-[#6366f1] tracking-tight">
              stripe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
