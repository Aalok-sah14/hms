"use client";
import { useState, useEffect } from "react";
import { getBookings, checkIn, checkOut } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [show, setShow]         = useState(false);
  const [form, setForm]         = useState({ guest: "", room: "", checkIn: "" });

  const load = () => getBookings().then(setBookings);
  useEffect(() => { load(); }, []);

  const handleCheckIn  = async () => { await checkIn(form); setShow(false); load(); };
  const handleCheckOut = async (id: string) => { await checkOut(id); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <Button onClick={() => setShow(!show)}>+ New Check-In</Button>
      </div>

      {show && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">New Check-In</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Guest ID" placeholder="Guest ObjectId" onChange={e => setForm({...form, guest: e.target.value})} />
            <Input label="Room ID"  placeholder="Room ObjectId"  onChange={e => setForm({...form, room: e.target.value})} />
            <Input label="Check-In Date" type="date"             onChange={e => setForm({...form, checkIn: e.target.value})} />
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="success" onClick={handleCheckIn}>Confirm Check-In</Button>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <Card>
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
                  <td className="px-5 py-3"><Badge text={b.checkOut ? "Checked Out" : "Active"} /></td>
                  <td className="px-5 py-3">
                    {!b.checkOut && (
                      <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleCheckOut(b._id)}>
                        Check-Out
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}