import { Badge } from "@/components/ui/badge";

const BOOKINGS = [
  { id: 1, guest: "Aarav Sharma",  room: "102", checkIn: "2024-12-01", status: "Active" },
  { id: 2, guest: "Priya Thapa",   room: "301", checkIn: "2024-12-03", status: "Active" },
  { id: 3, guest: "Bikash Gurung", room: "101", checkIn: "2024-11-28", status: "Checked Out" },
];

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {BOOKINGS.map(b => (
          <div key={b.id} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">{b.guest}</p>
              <p className="text-xs text-gray-400">Room {b.room} · {b.checkIn}</p>
            </div>
            <Badge text={b.status} />
          </div>
        ))}
      </div>
    </div>
  );
}