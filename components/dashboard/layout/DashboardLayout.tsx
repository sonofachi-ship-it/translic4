"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { Notification, User } from "@/types";
import { AuthService } from "@/services/auth.service";

interface DashboardLayoutProps {
  children: React.ReactNode;
  notifications: Notification[];
  user: User;
}

export default function DashboardLayout({ children, notifications, user }: DashboardLayoutProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    async function loadUser() {
      // Fast check: if no token exists, redirect immediately to prevent flash of content
      if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
        router.push("/");
        return;
      }

      const apiUser = await AuthService.getCurrentUser();
      if (!active) return;
      if (apiUser) {
        setCurrentUser(apiUser);
      } else {
        router.push("/");
      }
    }
    loadUser();
    return () => {
      active = false;
    };
  }, [router]);

  const activeUser = currentUser || user;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex text-[#131b2e]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <DashboardHeader notifications={notifications} user={activeUser} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
