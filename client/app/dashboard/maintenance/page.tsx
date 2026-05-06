"use client";
import { useState, useEffect } from "react";
import { getMaintenance, addMaintenance, updateMaintenance } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function MaintenancePage() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow]   = useState(false);
  const [form, setForm]   = useState({ room: "", staffAssigned: "", issueType: "Cleaning", priority: "Medium", notes: "" });

  const load = () => getMaintenance().then(setTasks);
  useEffect(() => { load(); }, []);

  const handleSave    = async () => { await addMaintenance(form); setShow(false); load(); };
  const handleResolve = async (id: string) => { await updateMaintenance(id, { status: "Resolved" }); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
        <Button onClick={() => setShow(!show)}>+ New Task</Button>
      </div>

      {show && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">Create Task</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Room ID"    placeholder="Room ObjectId"  onChange={e => setForm({...form, room: e.target.value})} />
            <Input label="Staff ID"   placeholder="Staff ObjectId" onChange={e => setForm({...form, staffAssigned: e.target.value})} />
            <Select label="Issue Type" options={["Cleaning","Repair","Inspection","Laundry Pick-up"]} onChange={e => setForm({...form, issueType: e.target.value})} />
            <Select label="Priority"   options={["Low","Medium","High"]}                             onChange={e => setForm({...form, priority: e.target.value})} />
            <Input label="Notes"      placeholder="Details..."    onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={handleSave}>Create Task</Button>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                {["Room","Issue","Priority","Status","Staff","Action"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tasks.map((m: any) => (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{m.room?.roomNumber ?? m.room}</td>
                  <td className="px-5 py-3 text-gray-600">{m.issueType}</td>
                  <td className="px-5 py-3"><Badge text={m.priority} /></td>
                  <td className="px-5 py-3"><Badge text={m.status} /></td>
                  <td className="px-5 py-3 text-gray-500">{m.staffAssigned?.username ?? "—"}</td>
                  <td className="px-5 py-3">
                    {m.status !== "Resolved" && (
                      <Button variant="success" className="text-xs py-1 px-3" onClick={() => handleResolve(m._id)}>
                        Resolve
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