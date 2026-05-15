"use client";
import { useState, useEffect } from "react";
import { getMaintenance, addMaintenance, updateMaintenance, getRooms } from "@/lib/api";

export default function MaintenancePage() {
  // ✅ ALL useState at TOP
  const [tasks, setTasks]     = useState<any[]>([]);
  const [rooms, setRooms]     = useState<any[]>([]);
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({
    room: "", issueType: "Cleaning", priority: "Medium", notes: ""
  });

  useEffect(() => {
    getRooms().then(d => setRooms(Array.isArray(d) ? d : []));
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const data = await getMaintenance();
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.room) { alert("Please select a room"); return; }
    const res = await addMaintenance(form);
    if (res.error) { alert("Error: " + res.error); return; }
    setForm({ room: "", issueType: "Cleaning", priority: "Medium", notes: "" });
    setShow(false);
    loadTasks();
  };

  const handleProgress = async (id: string) => {
    await updateMaintenance(id, { status: "In-Progress" });
    loadTasks();
  };

  const handleResolve = async (id: string) => {
    await updateMaintenance(id, { status: "Resolved", completedAt: new Date() });
    loadTasks();
  };

  const statusColor: Record<string, string> = {
    "Pending":     "bg-amber-100 text-amber-700",
    "In-Progress": "bg-blue-100 text-blue-700",
    "Resolved":    "bg-emerald-100 text-emerald-700",
  };

  const priorityColor: Record<string, string> = {
    "High":   "bg-rose-100 text-rose-700",
    "Medium": "bg-amber-100 text-amber-700",
    "Low":    "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-sm text-gray-500 mt-1">Room maintenance & housekeeping</p>
        </div>
        <button onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
          + New Task
        </button>
      </div>

      {show && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">Create Maintenance Task</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Select Room</label>
              <select value={form.room}
                onChange={e => setForm({...form, room: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">-- Select Room --</option>
                {rooms.map((r: any) => (
                  <option key={r._id} value={r._id}>
                    Room {r.roomNumber} · {r.type} · {r.status}
                  </option>
                ))}
              </select>
              {rooms.length === 0 && (
                <p className="text-xs text-rose-500 mt-1">⚠️ No rooms found. Add a room first.</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Issue Type</label>
              <select value={form.issueType}
                onChange={e => setForm({...form, issueType: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Cleaning</option>
                <option>Repair</option>
                <option>Inspection</option>
                <option>Laundry Pick-up</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Priority</label>
              <select value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Notes</label>
              <input placeholder="Details about the issue..."
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
              Create Task
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
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No maintenance tasks yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  {["Room","Issue","Priority","Status","Notes","Action"].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tasks.map((m: any) => (
                  <tr key={m._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">
                      Room {m.room?.roomNumber ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{m.issueType}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColor[m.priority]}`}>
                        {m.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[m.status]}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{m.notes || "—"}</td>
                    <td className="px-5 py-3">
                      {m.status === "Pending" && (
                        <button onClick={() => handleProgress(m._id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold">
                          Start
                        </button>
                      )}
                      {m.status === "In-Progress" && (
                        <button onClick={() => handleResolve(m._id)}
                          className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold">
                          Resolve
                        </button>
                      )}
                      {m.status === "Resolved" && (
                        <span className="text-xs text-gray-400">Done ✓</span>
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