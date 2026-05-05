export const Badge = ({ text }: { text: string }) => {
  const colors: Record<string, string> = {
    Available:     "bg-emerald-100 text-emerald-700",
    Occupied:      "bg-blue-100 text-blue-700",
    Maintenance:   "bg-rose-100 text-rose-700",
    Active:        "bg-blue-100 text-blue-700",
    "Checked Out": "bg-gray-100 text-gray-600",
    Pending:       "bg-amber-100 text-amber-700",
    "In-Progress": "bg-blue-100 text-blue-700",
    Resolved:      "bg-emerald-100 text-emerald-700",
    High:          "bg-rose-100 text-rose-700",
    Medium:        "bg-amber-100 text-amber-700",
    Low:           "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[text] ?? "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
};