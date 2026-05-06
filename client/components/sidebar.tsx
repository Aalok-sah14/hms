"use client";
import { useRouter, usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard",             label: "Dashboard" },
  { href: "/dashboard/guests",      label: "Guests" },
  { href: "/dashboard/rooms",       label: "Rooms" },
  { href: "/dashboard/bookings",    label: "Bookings" },
  { href: "/dashboard/billing",     label: "Billing" },
  { href: "/dashboard/maintenance", label: "Maintenance" },
];

export const Sidebar = () => {
  const router   = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-white font-bold">Broadway HMS</p>
        <p className="text-slate-400 text-xs">Kathmandu, Nepal</p>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map(n => (
          <button key={n.href} onClick={() => router.push(n.href)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${pathname === n.href
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
            {n.label}
          </button>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={logout}
          className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all">
          Logout
        </button>
      </div>
    </aside>
  );
};