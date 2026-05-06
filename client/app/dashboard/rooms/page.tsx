"use client";
import { useState, useEffect } from "react";
import { getRooms, addRoom } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [show, setShow]   = useState(false);
  const [form, setForm]   = useState({ roomNumber: "", type: "Single", roomClass: "Standard", basePrice: "" });

  useEffect(() => { getRooms().then(setRooms); }, []);

  const handleSave = async () => {
    await addRoom(form);
    setShow(false);
    getRooms().then(setRooms);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
        <Button onClick={() => setShow(!show)}>+ Add Room</Button>
      </div>

      {show && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">Add New Room</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Room Number"      placeholder="101"  onChange={e => setForm({...form, roomNumber: e.target.value})} />
            <Select label="Type"            options={["Single","Double","Suite"]}                       onChange={e => setForm({...form, type: e.target.value})} />
            <Select label="Class"           options={["Standard","Deluxe","Premium"]}                  onChange={e => setForm({...form, roomClass: e.target.value})} />
            <Input label="Base Price (NPR)" placeholder="2500" onChange={e => setForm({...form, basePrice: e.target.value})} />
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={handleSave}>Save Room</Button>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((r: any) => (
          <Card key={r._id} className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xl font-bold text-gray-800">Room {r.roomNumber}</p>
                <p className="text-sm text-gray-400">{r.type} · {r.roomClass}</p>
              </div>
              <Badge text={r.status} />
            </div>
            <div className="border-t border-gray-100 pt-3">
              <span className="text-blue-600 font-bold">NPR {r.basePrice}<span className="text-xs text-gray-400 font-normal">/night</span></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}