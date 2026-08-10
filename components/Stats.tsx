export default function Stats() {
  return (
    <section id="stats" className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#eaedff] via-[#e2e7ff] to-[#dae2fd] rounded-3xl p-8 sm:p-12 border border-[#c3c5d9]/30 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#c3c5d9]/40 items-center">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center pt-4 md:pt-0">
            <span className="font-extrabold text-4xl sm:text-5xl text-[#0052ff] font-headline tracking-tight">
              $15B+
            </span>
            <span className="text-xs font-mono font-bold text-[#434656] uppercase tracking-wider mt-2">
              Transactions Processed
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center pt-4 md:pt-0 md:pl-4">
            <span className="font-extrabold text-4xl sm:text-5xl text-[#131b2e] font-headline tracking-tight">
              500K+
            </span>
            <span className="text-xs font-mono font-bold text-[#434656] uppercase tracking-wider mt-2">
              Active Customers
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center pt-4 md:pt-0 md:pl-4">
            <span className="font-extrabold text-4xl sm:text-5xl text-[#131b2e] font-headline tracking-tight">
              190+
            </span>
            <span className="text-xs font-mono font-bold text-[#434656] uppercase tracking-wider mt-2">
              Countries Supported
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center text-center pt-4 md:pt-0 md:pl-4">
            <span className="font-extrabold text-4xl sm:text-5xl text-[#00677f] font-headline tracking-tight">
              99.999%
            </span>
            <span className="text-xs font-mono font-bold text-[#434656] uppercase tracking-wider mt-2">
              Uptime Guarantee
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
