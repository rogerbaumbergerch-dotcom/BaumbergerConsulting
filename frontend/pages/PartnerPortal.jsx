import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Eye, EyeOff, ChevronRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnerPortal() {
  const [showPassword, setShowPassword] = useState(false);
  const [partnerId, setPartnerId] = useState("");

  const handleLogin = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="relative z-10 px-16 max-w-lg">
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 border border-primary-foreground/10 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-semibold text-lg text-primary-foreground">
              Baumbeger Consulting
            </span>
          </div>

          <h2 className="text-3xl font-bold text-primary-foreground leading-tight mb-4">
            Your strategic
            <br />command center
          </h2>
          <p className="text-primary-foreground/60 leading-relaxed text-sm">
            Access real-time project analytics, collaborate with your dedicated
            expert team, and track KPIs-all in one secure environment.
          </p>

          {/* Feature Highlights */}
          <div className="mt-12 space-y-4">
            {["Real-time project dashboards", "Secure document sharing", "KPI tracking & analytics"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="text-sm text-primary-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to website
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-xs font-medium text-accent">Secure Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your partner dashboard
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">Partner ID</Label>
              <Input
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                placeholder="e.g. AG-2024-0192"
                className="h-11"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-xs text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-xs text-accent hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>

            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-11 gap-2"
              onClick={handleLogin}
            >
              Sign In
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 justify-center">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">
                Protected by 256-bit SSL encryption
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}