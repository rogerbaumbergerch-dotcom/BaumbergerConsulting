import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, FileText, Users, TrendingUp, ArrowUpRight, BarChart3, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 420 },
  { month: "Feb", revenue: 380 },
  { month: "Mar", revenue: 510 },
  { month: "Apr", revenue: 480 },
  { month: "May", revenue: 590 },
  { month: "Jun", revenue: 620 },
];

const clientDistribution = [
  { name: "Enterprise", value: 45, color: "hsl(var(--accent))" },
  { name: "Mid-Market", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Growth Stage", value: 25, color: "hsl(var(--chart-4))" },
];

const activeProjects = [
  { client: "MERIDIAN Corp", project: "Digital Transformation", progress: 68, status: "on_track" },
  { client: "NEXUS Group", project: "M&A Integration", progress: 42, status: "on_track" },
  { client: "ATLAS Corp", project: "Cost Optimization", progress: 85, status: "ahead" },
  { client: "VANGUARD Ltd", project: "Market Entry Strategy", progress: 25, status: "at_risk" },
];

const pendingReports = [
  { title: "Q2 Market Analysis", client: "MERIDIAN", due: "May 12", priority: "high" },
  { title: "Integration Roadmap v2", client: "NEXUS", due: "May 15", priority: "medium" },
  { title: "Cost Benchmark Report", client: "ATLAS", due: "May 18", priority: "low" },
];

export default function AssociateOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Associate Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          4 active engagements · 3 reports pending · 2 meetings today
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Clients", value: "4", icon: Users, change: "+1 this quarter", color: "text-accent" },
          { label: "Total Revenue", value: "$2.4M", icon: TrendingUp, change: "+18% YoY", color: "text-green-500" },
          { label: "Reports Due", value: "3", icon: FileText, change: "Next: May 12", color: "text-chart-4" },
          { label: "Data Sources", value: "12", icon: Database, change: "All synced", color: "text-accent" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              <div className={`text-[11px] mt-2 ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Engagement Revenue (K$)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Distribution */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Client Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={clientDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {clientDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {clientDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-[10px] text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Active Engagements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeProjects.map((proj) => (
              <div key={proj.client} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{proj.client}</span>
                    <Badge
                      variant="secondary"
                      className={`text-[9px] ${
                        proj.status === "ahead" ? "bg-green-500/10 text-green-600" :
                        proj.status === "at_risk" ? "bg-destructive/10 text-destructive" :
                        "bg-accent/10 text-accent"
                      }`}
                    >
                      {proj.status === "ahead" ? "Ahead" : proj.status === "at_risk" ? "At Risk" : "On Track"}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{proj.project}</p>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{proj.progress}%</span>
                  </div>
                  <Progress value={proj.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Reports */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Pending Reports</CardTitle>
            <button className="text-xs text-accent hover:underline underline-offset-4">View all</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {pendingReports.map((report) => (
              <div key={report.title} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    report.priority === "high" ? "bg-destructive/10" :
                    report.priority === "medium" ? "bg-chart-4/10" :
                    "bg-muted"
                  }`}>
                    <Activity className={`w-4 h-4 ${
                      report.priority === "high" ? "text-destructive" :
                      report.priority === "medium" ? "text-chart-4" :
                      "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{report.title}</p>
                    <p className="text-[10px] text-muted-foreground">{report.client} · Due {report.due}</p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-[9px] ${
                    report.priority === "high" ? "bg-destructive/10 text-destructive" :
                    report.priority === "medium" ? "bg-chart-4/10 text-chart-4" :
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {report.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}