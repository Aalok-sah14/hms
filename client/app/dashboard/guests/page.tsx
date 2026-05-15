"use client";
import { useState, useEffect } from "react";
import { getGuests, registerGuest } from "@/lib/api";

export default function GuestsPage() {
  const [guests, setGuests]   = useState([]);
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({
    name: "", phone: "", address: "", dob: "", idPhotoUrl: ""
  });

  const load = async () => {
    setLoading(true);
    const data = await getGuests();
    const [guests, setGuests] = useState<any[]>([]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.address || !form.dob || !form.idPhotoUrl) {
      alert("Please fill all fields");
      return;
    }
    const res = await registerGuest(form);
    if (res.error) {
      alert("Error: " + res.error);
      return;
    }
    setForm({ name: "", phone: "", address: "", dob: "", idPhotoUrl: "" });
    setShow(false);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guests</h1>
          <p className="text-sm text-gray-500 mt-1">Manage guest registrations</p>
        </div>
        <button onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
          + Register Guest
        </button>
      </div>

      {show && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">New Guest Registration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
              <input placeholder="Aarav Sharma"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
              <input placeholder="98XXXXXXXX"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
              />
            </div>

            

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Address</label>
              <input placeholder="Kathmandu"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</label>
              <input type="date"
                value={form.dob}
                onChange={e => setForm({...form, dob: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">ID Photo URL</label>
              <input placeholder="https://..."
                value={form.idPhotoUrl}
                onChange={e => setForm({...form, idPhotoUrl: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
              />
            </div>

          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Save Guest
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
        ) : guests.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No guests registered yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  {["Name", "Phone", "Address", "Age"].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {guests.map((g: any) => (
                  <tr key={g._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {g.name?.[0]}
                        </div>
                        {g.name}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{g.phone}</td>
                    <td className="px-5 py-3 text-gray-500">{g.address}</td>
                    <td className="px-5 py-3 text-gray-500">{g.age ?? "—"} yrs</td>
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