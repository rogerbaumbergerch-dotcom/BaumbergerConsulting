import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const insights = [
  {
    category: "Digital Strategy",
    title: "The AI Imperative: How Leading Firms Are Redefining Competitive Advantage",
    summary: "Our latest research reveals that companies investing in AI-driven decision frameworks achieve 3.2x faster time-to-market.",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  },
  {
    category: "Operations",
    title: "Beyond Efficiency: Building Anti-Fragile Supply Chains in a Volatile World",
    summary: "A practical framework for supply chain resilience that 40+ Fortune 500 companies have adopted since 2024.",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    category: "Leadership",
    title: "The Next Generation of Executive Leadership: Data-Driven and Human-Centered",
    summary: "How the most successful C-suite leaders balance analytical rigor with empathetic organizational design.",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="py-24 lg:py-32 bg-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-6"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
              Latest Thinking
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Insights & Research
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4">
            View all insights <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-accent">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}