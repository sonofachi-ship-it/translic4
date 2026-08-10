"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import SecurityTab from "@/components/dashboard/security/SecurityTab";
import { SecurityService } from "@/services/security.service";
import { mockCurrentUser, mockNotifications } from "@/constants/mockData";
import { Session } from "@/types";

export default function SecurityPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadSessions() {
      try {
        const fetched = await SecurityService.getSessions();
        if (!active) return;
        setSessions(fetched);
      } catch (err) {
        if (!active) return;
        setError("Failed to fetch active sessions.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSessions();
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-3 min-h-[200px]">
          <div className="w-10 h-10 rounded-full border-4 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
          <span className="text-xs font-semibold text-[#737688]">Loading security settings...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#ba1a1a]">
          <span className="material-symbols-outlined text-3xl">error</span>
          <span>{error}</span>
        </div>
      ) : (
        <SecurityTab initialSessions={sessions} />
      )}
    </DashboardLayout>
  );
}
