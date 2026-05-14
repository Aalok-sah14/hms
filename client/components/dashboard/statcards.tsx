"use client";
import { useEffect, useState } from "react";
import { getRooms, getGuests, getBookings, getMaintenance } from "@/lib/api";

export default function StatCards() {
  const [stats, setStats] = useState([
    { label: "Total Rooms",     value: "...", sub: "",  color: "from-blue-500 to-blue-700" },
    { label: "Total Guests",    value: "...", sub: "",  color: "from-emerald-500 to-emerald-700" },
    { label: "Active Bookings", value: "...", sub: "",  color: "from-amber-500 to-amber-700" },
    { label: "Pending Tasks",   value: "...", sub: "",  color: "from-rose-500 to-rose-700" },
  ]);

  useEffect(() => {
    Promise.all([getRooms(), getGuests(), getBookings(), getMaintenance()])
      .then(([rooms, guests, bookings, tasks]) => {
        const availableRooms  = rooms.filter((r: any) => r.status === "Available").length;
        const activeBookings  = bookings.filter((b: any) => !b.checkOut).length;
        const pendingTasks    = tasks.filter((t: any) => t.status === "Pending").length;
        setStats([
          { label: "Total Rooms",     value: rooms.length.toString(),    sub: `${availableRooms} available`,   color: "from-blue-500 to-blue-700" },
          { label: "Total Guests",    value: guests.length.toString(),   sub: "registered guests",             color: "from-emerald-500 to-emerald-700" },
          { label: "Active Bookings", value: activeBookings.toString(),  sub: "currently checked in",          color: "from-amber-500 to-amber-700" },
          { label: "Pending Tasks",   value: pendingTasks.toString(),    sub: "maintenance pending",           color: "from-rose-500 to-rose-700" },
        ]);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {stats.map((s, i) => (
        <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-md`}>
          <p className="text-sm opacity-90 mb-2">{s.label}</p>
          <p className="text-3xl font-bold mb-1">{s.value}</p>
          <p className="text-xs opacity-80">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}