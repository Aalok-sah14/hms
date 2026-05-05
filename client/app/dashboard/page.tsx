"use client";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  { label: "Total Rooms",     value: "48",         sub: "12 available",    color: "from-blue-500 to-blue-700" },
  { label: "Active Guests",   value: "31",         sub: "3 checking out",  color: "from-emerald-500 to-emerald-700" },
  { label: "Today's Revenue", value: "NPR 84,200", sub: "+12% yesterday",  color: "from-amber-500 to-amber-700" },
  { label: "Pending Tasks",   value: "7",          sub: "2 high priority", color: "from-rose-500 to-rose-700" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white`}>
            <p className="text-sm opacity-90 mb-2">{s.label}</p>
            <p className="text-3xl font-bold mb-1">{s.value}</p>
            <p className="text-xs opacity-80">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}