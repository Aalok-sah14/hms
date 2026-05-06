import { Badge } from "@/components/ui/badge";

const ROOMS = [
  { id: 1, number: "101", type: "Single",  roomClass: "Standard", basePrice: 2500, status: "Available" },
  { id: 2, number: "102", type: "Double",  roomClass: "Deluxe",   basePrice: 4500, status: "Occupied" },
  { id: 3, number: "201", type: "Suite",   roomClass: "Premium",  basePrice: 9000, status: "Available" },
  { id: 4, number: "202", type: "Single",  roomClass: "Standard", basePrice: 2500, status: "Maintenance" },
  { id: 5, number: "301", type: "Double",  roomClass: "Deluxe",   basePrice: 4500, status: "Occupied" },
];

export default function RoomStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Room Status</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {ROOMS.map(r => (
          <div key={r.id} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Room {r.number} — {r.type}</p>
              <p className="text-xs text-gray-400">{r.roomClass} · NPR {r.basePrice}/night</p>
            </div>
            <Badge text={r.status} />
          </div>
        ))}
      </div>
    </div>
  );
}