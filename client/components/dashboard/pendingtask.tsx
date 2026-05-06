import { Badge } from "@/components/ui/badge";

const TASKS = [
  { id: 1, room: "202", issue: "Repair",   priority: "High",   status: "Pending" },
  { id: 2, room: "101", issue: "Cleaning", priority: "Low",    status: "In-Progress" },
  { id: 3, room: "301", issue: "Inspection", priority: "Medium", status: "Resolved" },
];

export default function PendingTasks() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Maintenance Tasks</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {TASKS.map(t => (
          <div key={t.id} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Room {t.room} — {t.issue}</p>
              <p className="text-xs text-gray-400">Priority: {t.priority}</p>
            </div>
            <Badge text={t.status} />
          </div>
        ))}
      </div>
    </div>
  );
}