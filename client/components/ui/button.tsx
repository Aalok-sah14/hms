type Variant = "primary" | "secondary" | "danger" | "success";

export const Button = ({
  children, onClick, variant = "primary", className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}) => {
  const v: Record<Variant, string> = {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    danger:    "bg-rose-500 hover:bg-rose-600 text-white",
    success:   "bg-emerald-500 hover:bg-emerald-600 text-white",
  };
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${v[variant]} ${className}`}>
      {children}
    </button>
  );
};