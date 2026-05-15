"use client";
import { useState, useEffect } from "react";
import { getRooms, addRoom } from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms]   = useState<any[]>([]);
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm]     = useState({
    roomNumber: "", type: "Single", roomClass: "Standard", basePrice: ""
  });

  const load = async () => {
    setLoading(true);
    const data = await getRooms();
    setRooms(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.roomNumber || !form.basePrice) {
      alert("Please fill all fields");
      return;
    }
    const res = await addRoom({ ...form, basePrice: Number(form.basePrice) });
    if (res.error) { alert("Error: " + res.error); return; }
    setForm({ roomNumber: "", type: "Single", roomClass: "Standard", basePrice: "" });
    setShow(false);
    load();
  };

  const statusColor: Record<string, string> = {
    Available:   "bg-emerald-100 text-emerald-700",
    Occupied:    "bg-blue-100 text-blue-700",
    Maintenance: "bg-rose-100 text-rose-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
          <p className="text-sm text-gray-500 mt-1">Inventory & availability</p>
        </div>
        <button onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
          + Add Room
        </button>
      </div>

      {show && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">Add New Room</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Room Number</label>
              <input placeholder="101" value={form.roomNumber}
                onChange={e => setForm({...form, roomNumber: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Class</label>
              <select value={form.roomClass} onChange={e => setForm({...form, roomClass: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Premium</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Base Price (NPR)</label>
              <input type="number" placeholder="2500" value={form.basePrice}
                onChange={e => setForm({...form, basePrice: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Save Room
            </button>
            <button onClick={() => setShow(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400 py-10">Loading...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No rooms added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {rooms.map((r: any) => (
            <div key={r._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xl font-bold text-gray-800">Room {r.roomNumber}</p>
                  <p className="text-sm text-gray-400">{r.type} · {r.roomClass}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[r.status]}`}>
                  {r.status}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <span className="text-blue-600 font-bold">
                  NPR {r.basePrice}<span className="text-xs text-gray-400 font-normal">/night</span>
                </span>
                {/* ✅ Show ID for copying */}
                <p className="text-xs text-gray-300 font-mono mt-2 break-all">ID: {r._id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}