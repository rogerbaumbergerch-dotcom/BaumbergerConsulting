import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <span className="font-semibold text-foreground">
                Baumberger Consulting
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strategic management consulting for a complex world.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Services",
              links: ["Growth Strategy", "Digital Transformation", "Performance Optimization", "M&A Advisory"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Insights", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-muted-foreground">
            © 2026 Baumberger Consulting. All rights reserved.
          </p>
          <Link to="/login" className="text-[11px] text-accent hover:underline underline-offset-4">
            Partner Portal Access →
          </Link>
        </div>
      </div>
    </footer>
  );
}