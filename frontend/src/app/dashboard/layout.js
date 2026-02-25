"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  BrainCircuit,
  MessageSquare,
  Database,
  LogOut,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Unauthorised");
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  const navLinks = [
    { name: "Omni-Chat", href: "/dashboard", icon: MessageSquare },
    { name: "Knowledge Ingest", href: "/dashboard/ingest", icon: Database },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 w-64 p-4 text-slate-300">
      <div className="flex items-center gap-3 px-2 py-4 mb-6 text-slate-100">
        <BrainCircuit className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold tracking-wide">Engiknow</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== "/dashboard");

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600/10 text-blue-400 font-medium"
                  : "hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-800">
        <div className="px-3 py-2 mb-2 text-sm text-slate-400">
          <p className="font-medium text-slate-200 truncate">{user.name}</p>
          <p className="text-xs truncate">{user.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 h-full bg-slate-900 shadow-2xl">
            <button
              className="absolute top-4 right-4 text-slate-400"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-slate-100">Engiknow</span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
