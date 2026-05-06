"use client";
import { useState, useEffect } from "react";
import { getGuests, registerGuest } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [show, setShow]     = useState(false);
  const [form, setForm]     = useState({ name: "", phone: "", address: "", dob: "", idPhotoUrl: "" });

  useEffect(() => { getGuests().then(setGuests); }, []);

  const handleSave = async () => {
    await registerGuest(form);
    setShow(false);
    getGuests().then(setGuests);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Guests</h1>
        <Button onClick={() => setShow(!show)}>+ Register Guest</Button>
      </div>

      {show && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">New Guest</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name"    placeholder="Aarav Sharma"  onChange={e => setForm({...form, name: e.target.value})} />
            <Input label="Phone"        placeholder="98XXXXXXXX"    onChange={e => setForm({...form, phone: e.target.value})} />
            <Input label="Address"      placeholder="Kathmandu"     onChange={e => setForm({...form, address: e.target.value})} />
            <Input label="Date of Birth" type="date"                onChange={e => setForm({...form, dob: e.target.value})} />
            <Input label="ID Photo URL" placeholder="https://..."   onChange={e => setForm({...form, idPhotoUrl: e.target.value})} />
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={handleSave}>Save Guest</Button>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <Card>
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
                <td className="px-5 py-3 font-medium text-gray-800">{g.name}</td>
                <td className="px-5 py-3 text-gray-500">{g.phone}</td>
                <td className="px-5 py-3 text-gray-500">{g.address}</td>
                <td className="px-5 py-3 text-gray-500">{g.age} yrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}