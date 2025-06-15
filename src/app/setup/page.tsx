"use client";

import { useState } from "react";

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Database details
  const [dbHost, setDbHost] = useState("localhost");
  const [dbPort, setDbPort] = useState("3306");
  const [dbUser, setDbUser] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [dbName, setDbName] = useState("");

  // Step 2: Admin user fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Step 3: Forum settings fields
  const [forumName, setForumName] = useState("");
  const [forumUrl, setForumUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [theme, setTheme] = useState("dark");

  async function handleDbSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/setup/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dbHost, dbPort, dbUser, dbPassword, dbName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to configure database");
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdminSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/setup/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create admin");
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSettingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/setup/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forumName, forumUrl, logoUrl, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save settings");
      setStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#100c14] via-[#0a0a0a] to-[#140c10]">
      <div className="w-full max-w-md bg-[#101212] rounded-2xl shadow-2xl p-8 border border-[#232a23] relative">
        <div className="flex flex-col items-center mb-6">
          {/* Logo Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mb-2 shadow-lg">
            <span className="text-3xl font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Forumnex Setup</h1>
          <p className="text-sm text-[#b6e7c9] mb-2">Get your forum ready in a few steps</p>
        </div>
        {error && <div className="mb-4 text-green-400 text-center font-medium">{error}</div>}
        {step === 1 && (
          <form onSubmit={handleDbSubmit} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-green-400 mb-2">Database Details</h2>
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Host" value={dbHost} onChange={e => setDbHost(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Port" value={dbPort} onChange={e => setDbPort(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="User" value={dbUser} onChange={e => setDbUser(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Password (optional)" type="password" value={dbPassword} onChange={e => setDbPassword(e.target.value)} />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Database Name" value={dbName} onChange={e => setDbName(e.target.value)} required />
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-60 mt-2" type="submit" disabled={loading}>
              {loading ? "Configuring..." : "Next"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleAdminSubmit} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-green-400 mb-2">Create Admin User</h2>
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-60 mt-2" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Next"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSettingsSubmit} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-green-400 mb-2">Forum Settings</h2>
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Forum Name" value={forumName} onChange={e => setForumName(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Forum URL" value={forumUrl} onChange={e => setForumUrl(e.target.value)} required />
            <input className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400" placeholder="Logo URL (optional)" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} />
            <select className="w-full p-2 rounded-lg border border-[#232a23] bg-[#181A1B] text-white focus:outline-none focus:ring-2 focus:ring-green-500" value={theme} onChange={e => setTheme(e.target.value)} required>
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 bg-[#232a23] text-green-200 py-2 rounded-lg hover:bg-[#1a2a1e] transition" type="button" onClick={() => setStep(2)} disabled={loading}>
                Back
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-60" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Finish"}
              </button>
            </div>
          </form>
        )}
        {step === 4 && (
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mb-2 shadow-lg">
              <span className="text-3xl font-bold text-white">✔</span>
            </div>
            <h2 className="text-xl font-extrabold text-green-400 mb-2">Setup Complete!</h2>
            <p className="mb-4 text-gray-200">Your forum is ready to use.</p>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition" onClick={() => window.location.href = "/"}>
              Go to Forum
            </button>
          </div>
        )}
      </div>
      <p className="mt-8 text-purple-900 text-xs opacity-60">&copy; {new Date().getFullYear()} Forumnex</p>
    </div>
  );
} 