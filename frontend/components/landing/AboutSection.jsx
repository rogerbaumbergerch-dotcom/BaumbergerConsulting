import React from "react";
import { Award, Globe, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Globe, value: "28", label: "Offices Worldwide" },
  { icon: Users, value: "1,200+", label: "Consultants" },
  { icon: Award, value: "15", label: "Years of Excellence" },
  { icon: TrendingUp, value: "40%", label: "Average Client ROI" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-6">
              Built on trust,
              <br />driven by results
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">

            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our unique methodology combines rigorous data analytics with deep industry
              expertise, delivering actionable strategies that create lasting competitive advantage.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl border border-border/60 p-5">
                  <stat.icon className="w-5 h-5 text-accent mb-3" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=1000&fit=crop"
                alt="Modern office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">Trusted by industry leaders</p>
                  <p className="text-xs text-muted-foreground">
                    Partnering with 150+ organizations across 40 countries
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}