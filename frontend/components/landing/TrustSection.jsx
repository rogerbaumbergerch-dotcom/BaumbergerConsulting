import React from "react";
import { Shield, Lock, FileCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "ISO 27001" },
  { icon: FileCheck, label: "GDPR Compliant" },
  { icon: Award, label: "Top 10 Consulting Firm" },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl font-bold text-primary-foreground mb-3">
            Enterprise-Grade Security & Compliance
          </h3>
          <p className="text-primary-foreground/60 text-sm max-w-xl mx-auto">
            Your data is protected by industry-leading security protocols. We maintain
            the highest standards of data handling and confidentiality.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5 text-center hover:bg-primary-foreground/10 transition-colors"
            >
              <badge.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <span className="text-xs font-medium text-primary-foreground">{badge.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-primary-foreground/10"
        >
          <p className="text-center text-[10px] tracking-widest uppercase text-primary-foreground/40 mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap justify-center gap-10 items-center opacity-40">
            {["MERIDIAN", "NEXUS GROUP", "ATLAS CORP", "VANGUARD", "PINNACLE", "HORIZON"].map((name) => (
              <span key={name} className="text-primary-foreground font-bold text-sm tracking-wider">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}