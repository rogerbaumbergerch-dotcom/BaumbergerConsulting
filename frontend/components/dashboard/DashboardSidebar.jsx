import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Database,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const clientNav = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Calendar, label: "Project Timeline", path: "/dashboard?tab=timeline" },
  { icon: FileText, label: "Documents", path: "/dashboard?tab=documents" },
  { icon: BarChart3, label: "KPI Dashboard", path: "/dashboard?tab=kpis" },
];

const associateNav = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Database, label: "Data Analysis", path: "/dashboard?tab=analysis" },
  { icon: FileText, label: "Reports", path: "/dashboard?tab=reports" },
  { icon: Users, label: "Client Management", path: "/dashboard?tab=clients" },
];

export default function DashboardSidebar({ role, onRoleToggle }) {
  const location = useLocation();
  const { logout } = useAuth();
  const navItems = role === "client" ? clientNav : associateNav;

  const currentPath = location.pathname + location.search;

  return (
    <aside className="w-64 bg-primary min-h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-sm text-primary-foreground">
            Baumberger Consulting
          </span>
        </Link>
      </div>

      {/* Role Toggle */}
      <div className="px-4 py-4">
        <div className="bg-sidebar-accent rounded-lg p-1 flex gap-1">
          <button
            onClick={() => onRoleToggle("client")}
            className={`flex-1 text-[11px] font-medium py-2 rounded-md transition-all ${
              role === "client"
                ? "bg-accent text-accent-foreground"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
            }`}
          >
            Client View
          </button>
          <button
            onClick={() => onRoleToggle("associate")}
            className={`flex-1 text-[11px] font-medium py-2 rounded-md transition-all ${
              role === "associate"
                ? "bg-accent text-accent-foreground"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
            }`}
          >
            Associate View
          </button>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || 
            (item.path === "/dashboard" && currentPath === "/dashboard");
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-sidebar-accent text-accent"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/dashboard?tab=settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Security Badge */}
      <div className="px-4 pb-4">
        <div className="bg-sidebar-accent/60 rounded-lg p-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] text-sidebar-foreground/50">Secure Data Handling</span>
        </div>
      </div>
    </aside>
  );
}