"use client";
import { LeadProvider } from "../components/electromos/LeadModal";
import Hero from "../components/electromos/Hero";
import Problems from "../components/electromos/Problems";
import Features from "../components/electromos/Features";
import Calculator from "../components/electromos/Calculator";
import HowItWorks from "../components/electromos/HowItWorks";
import Services from "../components/electromos/Services";
import Pricing from "../components/electromos/Pricing";
import Emergency from "../components/electromos/Emergency";
import Master from "../components/electromos/Master";
import Cases from "../components/electromos/Cases";
import FAQ from "../components/electromos/FAQ";
import Footer from "../components/electromos/Footer";
import MobileBar from "../components/electromos/MobileBar";

export default function Home() {
  return (
    <LeadProvider>
      <main className="min-h-screen overflow-x-hidden">
        <Hero />
        <Problems />
        <Features />
        <Calculator />
        <HowItWorks />
        <Services />
        <Pricing />
        <Emergency />
        <Master />
        <Cases />
        <FAQ />
        <Footer />
      </main>
      <MobileBar />
    </LeadProvider>
  );
}
