import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ClientOverview from "@/components/dashboard/ClientOverview";
import AssociateOverview from "@/components/dashboard/AssociateOverview";

export default function Dashboard() {
  const [role, setRole] = useState("client");

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} onRoleToggle={setRole} />

      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {role === "client" ? <ClientOverview /> : <AssociateOverview />}
        </div>
      </main>
    </div>
  );
}