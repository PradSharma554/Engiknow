"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 relative">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-3xl -z-10 mix-blend-screen"></div>

      <main className="flex flex-col items-center justify-center p-8 text-center max-w-4xl z-10">
        <div className="p-4 bg-slate-800/50 rounded-full border border-slate-700/50 mb-8 mt-12 animate-fade-in-up">
          <BrainCircuit className="w-16 h-16 text-blue-400" />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-6 drop-shadow-sm">
          Enterprise AI Brain
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl font-light">
          Automatically ingest, understand, structure, and maintain all your
          fragmented company knowledge.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105"
          >
            Log In
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Register for Access
          </Link>
        </div>
      </main>
    </div>
  );
}
