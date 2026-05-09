import React from "react";
import { TrendingUp, BarChart3, Users, Lightbulb, ArrowRight, Target, Layers } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Market entry, portfolio optimization, and revenue acceleration strategies for sustainable growth.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Layers,
    title: "Digital Transformation",
    description: "End-to-end digital strategy, technology roadmaps, and organizational change management.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Performance Optimization",
    description: "Operational excellence, cost reduction, and process re-engineering for maximum efficiency.",
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: Users,
    title: "Organizational Design",
    description: "Talent strategy, leadership development, and culture transformation programs.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Target,
    title: "M&A Advisory",
    description: "Due diligence, integration planning, and value creation for mergers and acquisitions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Lightbulb,
    title: "Innovation Lab",
    description: "Venture building, design sprints, and rapid prototyping for emerging opportunities.",
    color: "bg-chart-4/20 text-chart-4",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            Strategic capabilities that
            <br />drive measurable impact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Six core practice areas, each led by senior partners with 20+ years
            of industry-specific experience.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card rounded-xl border border-border/60 p-7 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mb-5`}>
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}