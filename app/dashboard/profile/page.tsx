"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ProfileTab from "@/components/dashboard/profile/ProfileTab";
import { ProfileService } from "@/services/profile.service";
import { mockNotifications, mockBillingHistory, mockCurrentUser } from "@/constants/mockData";
import { User } from "@/types";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      try {
        const profile = await ProfileService.getProfile();
        if (!active) return;
        if (profile) {
          setUserProfile(profile);
        } else {
          setError("Could not load your profile. Please check your authentication.");
        }
      } catch (err) {
        if (!active) return;
        setError("Failed to fetch profile from the server.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardLayout user={userProfile || mockCurrentUser} notifications={mockNotifications}>
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-3 min-h-[200px]">
          <div className="w-10 h-10 rounded-full border-4 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
          <span className="text-xs font-semibold text-[#737688]">Loading profile details...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-2 min-h-[200px] text-xs font-semibold text-[#ba1a1a]">
          <span className="material-symbols-outlined text-3xl">error</span>
          <span>{error}</span>
        </div>
      ) : userProfile ? (
        <ProfileTab
          user={userProfile}
          billingHistory={mockBillingHistory}
          onProfileUpdate={setUserProfile}
        />
      ) : null}
    </DashboardLayout>
  );
}
