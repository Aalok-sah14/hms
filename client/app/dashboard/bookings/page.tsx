"use client";
import { useState, useEffect } from "react";
import { getBookings, checkIn, checkOut, getGuests, getRooms } from "@/lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [guests, setGuests]     = useState<any[]>([]);
  const [rooms, setRooms]       = useState<any[]>([]);
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({
    guest: "", room: "", checkIn: ""
  });

  // ✅ Load guests and rooms ONCE on mount — separate from bookings load
  useEffect(() => {
    getGuests().then(d => setGuests(Array.isArray(d) ? d : []));
    getRooms().then(d => setRooms(Array.isArray(d) ? d : []));
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleCheckIn = async () => {
    if (!form.guest || !form.room || !form.checkIn) {
      alert("Please fill all fields");
      return;
    }
    const res = await checkIn(form);
    if (res.error) { alert("Error: " + res.error); return; }
    setForm({ guest: "", room: "", checkIn: "" });
    setShow(false);
    loadBookings(); // ✅ only reload bookings, not guests/rooms
  };

  const handleCheckOut = async (id: string) => {
    await checkOut(id);
    loadBookings();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Check-in & check-out management</p>
        </div>
        <button onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
          + New Check-In
        </button>
      </div>

      {show && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">New Check-In</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* ✅ Guest dropdown by NAME */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Select Guest</label>
              <select value={form.guest}
                onChange={e => setForm({...form, guest: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">-- Select Guest --</option>
                {guests.map((g: any) => (
                  <option key={g._id} value={g._id}>
                    {g.name} · {g.phone}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Room dropdown by ROOM NUMBER */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Select Room</label>
              <select value={form.room}
                onChange={e => setForm({...form, room: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">-- Select Room --</option>
                {rooms
                  .filter((r: any) => r.status === "Available")
                  .map((r: any) => (
                    <option key={r._id} value={r._id}>
                      Room {r.roomNumber} · {r.type} · NPR {r.basePrice}
                    </option>
                  ))}
              </select>
            </div>

            {/* Check-In Date */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Check-In Date</label>
              <input type="date" value={form.checkIn}
                onChange={e => setForm({...form, checkIn: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

          </div>

          {/* Info box */}
          {guests.length === 0 && (
            <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg mt-3">
              ⚠️ No guests found. Please register a guest first.
            </p>
          )}
          {rooms.filter((r: any) => r.status === "Available").length === 0 && (
            <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg mt-3">
              ⚠️ No available rooms. Please add a room first.
            </p>
          )}

          <div className="flex gap-3 mt-5">
            <button onClick={handleCheckIn}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold">
              Confirm Check-In
            </button>
            <button onClick={() => setShow(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  {["Guest","Room","Check-In","Check-Out","Status","Action"].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b: any) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{b.guest?.name ?? "—"}</td>
                    <td className="px-5 py-3 text-gray-500">Room {b.room?.roomNumber ?? "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{b.checkIn?.slice(0,10)}</td>
                    <td className="px-5 py-3 text-gray-500">{b.checkOut?.slice(0,10) ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                        ${b.checkOut ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-700"}`}>
                        {b.checkOut ? "Checked Out" : "Active"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {!b.checkOut && (
                        <button onClick={() => handleCheckOut(b._id)}
                          className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold">
                          Check-Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}