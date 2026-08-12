import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <Partners />
        <Features />
        <Stats />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

