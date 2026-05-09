import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.05]" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Strategic Advisory & Transformation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Navigating
              <br />
              Complexity with
              <br />
              <span className="text-accent">Precision</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
              We partner with industry leaders to architect transformative strategies,
              optimize operations, and unlock sustainable competitive advantages.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-sm px-6 h-12 rounded-lg"
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-sm px-6 h-12 rounded-lg border-primary/15 hover:border-accent hover:text-accent"
                >
                  <Shield className="w-4 h-4" />
                  Partner Portal
                </Button>
              </Link>
            </div>

            {/* Trust Numbers */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-border/60">
              {[
                { value: "150+", label: "Global Clients" },
                { value: "98%", label: "Retention Rate" },
                { value: "$12B", label: "Value Delivered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Partner Quick Access */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-2xl border border-border/60 shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Card Header */}
                <div className="bg-primary px-8 py-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-primary-foreground font-semibold text-sm">Secure Partner Gateway</span>
                  </div>
                  <p className="text-primary-foreground/60 text-xs mt-2">
                    Access your project dashboard, documents, and analytics
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-8 space-y-5">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Partner ID</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter your Partner ID"
                        className="flex-1 h-11 px-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  <Link to="/login" className="block">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-11 rounded-lg gap-2 text-sm">
                      Access Portal
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 justify-center pt-2">
                    <Shield className="w-3 h-3 text-accent/60" />
                    <span className="text-[11px] text-muted-foreground">256-bit encrypted · SOC 2 Certified</span>
                  </div>
                </div>

                {/* Visual Elements */}
                <div className="px-8 pb-6">
                  <div className="grid grid-cols-3 gap-3">
                    {["Project Timeline", "Documents", "Analytics"].map((item) => (
                      <div key={item} className="bg-muted/60 rounded-lg p-3 text-center">
                        <div className="w-6 h-6 rounded-md bg-accent/10 mx-auto mb-2" />
                        <span className="text-[10px] text-muted-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}