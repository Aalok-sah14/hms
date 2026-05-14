"use client";
import { useEffect, useState } from "react";
import { getBookings } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function RecentBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { getBookings().then(setBookings); }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
      </div>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-400 py-6 text-sm">No bookings yet</p>
      ) : (
        <div className="divide-y divide-gray-50">
          {bookings.slice(0,5).map((b: any) => (
            <div key={b._id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{b.guest?.name ?? "Guest"}</p>
                <p className="text-xs text-gray-400">Room {b.room?.roomNumber ?? b.room} · {b.checkIn?.slice(0,10)}</p>
              </div>
              <Badge text={b.checkOut ? "Checked Out" : "Active"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}