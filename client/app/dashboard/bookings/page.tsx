"use client";
import { useState, useEffect } from "react";
import { getBookings, checkIn, checkOut } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ guest: "", room: "", checkIn: "" });

  const load = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCheckIn = async () => {
    if (!form.guest || !form.room || !form.checkIn) {
      alert("Please fill all fields");
      return;
    }
    await checkIn(form);
    setShow(false);
    setForm({ guest: "", room: "", checkIn: "" });
    load();
  };

  const handleCheckOut = async (id: string) => {
    await checkOut(id);
    load();
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
            <Input label="Guest ID" placeholder="Guest ObjectId"
              value={form.guest} onChange={e => setForm({...form, guest: e.target.value})} />
            <Input label="Room ID" placeholder="Room ObjectId"
              value={form.room} onChange={e => setForm({...form, room: e.target.value})} />
            <Input label="Check-In Date" type="date"
              value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})} />
          </div>
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
                    <td className="px-5 py-3 font-medium text-gray-800">{b.guest?.name ?? b.guest}</td>
                    <td className="px-5 py-3 text-gray-500">{b.room?.roomNumber ?? b.room}</td>
                    <td className="px-5 py-3 text-gray-500">{b.checkIn?.slice(0,10)}</td>
                    <td className="px-5 py-3 text-gray-500">{b.checkOut?.slice(0,10) ?? "—"}</td>
                    <td className="px-5 py-3">
                      <Badge text={b.checkOut ? "Checked Out" : "Active"} />
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