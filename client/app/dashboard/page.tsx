"use client";
import StatCards      from "@/components/dashboard/statcards";
import RecentBookings from "@/components/dashboard/recentbooking";
import RoomStatus     from "@/components/dashboard/roomstatus";
import PendingTasks   from "@/components/dashboard/pendingtask";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back!</p>
      <StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <RecentBookings />
        <RoomStatus />
      </div>
      <PendingTasks />
    </div>
  );
}