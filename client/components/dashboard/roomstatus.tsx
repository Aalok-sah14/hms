"use client";
import { useEffect, useState } from "react";
import { getRooms } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function RoomStatus() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => { getRooms().then(setRooms); }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Room Status</h2>
      </div>
      {rooms.length === 0 ? (
        <p className="text-center text-gray-400 py-6 text-sm">No rooms added yet</p>
      ) : (
        <div className="divide-y divide-gray-50">
          {rooms.slice(0,5).map((r: any) => (
            <div key={r._id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">Room {r.roomNumber} — {r.type}</p>
                <p className="text-xs text-gray-400">{r.roomClass} · NPR {r.basePrice}/night</p>
              </div>
              <Badge text={r.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}