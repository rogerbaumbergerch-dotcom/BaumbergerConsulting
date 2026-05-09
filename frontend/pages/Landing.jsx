import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import InsightsSection from "@/components/landing/InsightsSection";
import AboutSection from "@/components/landing/AboutSection";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <InsightsSection />
      <AboutSection />
      <TrustSection />
      <Footer />
    </div>
  );
}