"use client";
import Link from "next/link";
import { BrainCircuit, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterWrapper({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6 relative overflow-hidden">
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 mix-blend-screen"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl z-10">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-slate-800/50 rounded-full border border-slate-700/50">
            <BrainCircuit className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-2">
          Create Account
        </h2>
        <p className="text-slate-400 text-center mb-8">
          Join the enterprise knowledge base.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="password"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                min="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
