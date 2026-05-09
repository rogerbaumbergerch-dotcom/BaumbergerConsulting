import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, BarChart3, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const kpiData = [
  { month: "Jan", value: 72 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 82 },
  { month: "May", value: 91 },
  { month: "Jun", value: 95 },
];

const projectMilestones = [
  { name: "Discovery & Assessment", status: "completed", date: "Jan 15" },
  { name: "Strategy Development", status: "completed", date: "Feb 28" },
  { name: "Implementation Phase 1", status: "in_progress", date: "Apr 30" },
  { name: "Performance Review", status: "upcoming", date: "Jun 15" },
  { name: "Final Delivery", status: "upcoming", date: "Aug 01" },
];

const recentDocs = [
  { name: "Q2 Strategy Brief.pdf", date: "May 5", size: "2.4 MB" },
  { name: "Market Analysis Report.xlsx", date: "May 3", size: "1.8 MB" },
  { name: "Board Presentation.pptx", date: "Apr 28", size: "5.1 MB" },
  { name: "Financial Model v3.xlsx", date: "Apr 22", size: "3.2 MB" },
];

export default function ClientOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Partner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your project "Digital Transformation Initiative" is 68% complete
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Project Progress", value: "68%", icon: BarChart3, change: "+12% this month", color: "text-accent" },
          { label: "Milestones Hit", value: "2/5", icon: CheckCircle2, change: "On track", color: "text-green-500" },
          { label: "Documents", value: "24", icon: FileText, change: "4 new this week", color: "text-chart-4" },
          { label: "Next Milestone", value: "Apr 30", icon: Calendar, change: "Implementation P1", color: "text-accent" },
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
        {/* KPI Chart */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Performance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectMilestones.map((milestone) => (
                <div key={milestone.name} className="flex gap-3 items-start">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                    milestone.status === "completed" ? "bg-green-500" :
                    milestone.status === "in_progress" ? "bg-accent animate-pulse" :
                    "bg-border"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${
                      milestone.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                    }`}>
                      {milestone.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{milestone.date}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-[9px] shrink-0 ${
                      milestone.status === "completed" ? "bg-green-500/10 text-green-600" :
                      milestone.status === "in_progress" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.status === "completed" ? "Done" :
                     milestone.status === "in_progress" ? "Active" : "Upcoming"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Shared Documents</CardTitle>
            <button className="text-xs text-accent hover:underline underline-offset-4">View all</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {recentDocs.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doc.date} · {doc.size}</p>
                  </div>
                </div>
                <button className="text-[10px] text-accent hover:underline">Download</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}