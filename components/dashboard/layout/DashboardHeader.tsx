"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notification, User } from "@/types";
import { AuthService } from "@/services/auth.service";
import { NotificationService } from "@/services/notification.service";

interface DashboardHeaderProps {
  notifications?: Notification[];
  user: User;
}

export default function DashboardHeader({ notifications: propNotifications, user }: DashboardHeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    async function fetchNotifications() {
      try {
        const res = await NotificationService.getNotifications();
        if (!active) return;
        setNotifications(res);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchNotifications();
    return () => {
      active = false;
    };
  }, []);

  const handleMarkAsRead = async (id: number, currentReadAt: string | null | undefined) => {
    if (currentReadAt !== null && currentReadAt !== undefined) return;
    
    // Optimistic state update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
    
    const success = await NotificationService.markAsRead(id);
    if (!success) {
      // Revert if API fails
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: null } : n));
    }
  };

  const handleMarkAllAsRead = async () => {
    const originalNotifications = [...notifications];
    
    // Optimistic state update
    setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
    
    const success = await NotificationService.markAllAsRead();
    if (!success) {
      setNotifications(originalNotifications);
    }
  };

  const unreadCount = notifications.filter(n => n.read_at === null).length;

  return (
    <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#c3c5d9]/30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Title / Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#003ec7] to-[#00ccf9] p-0.5 shadow-sm">
            <div className="w-full h-full bg-[#faf8ff] rounded-[9px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0052ff] text-lg font-bold">
                blur_on
              </span>
            </div>
          </div>
        </Link>

        {/* Global Financial Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737688] text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions, cards, contacts..."
            className="w-full bg-white pl-10 pr-4 py-2 rounded-xl border border-[#c3c5d9]/40 focus:outline-[#0052ff] text-xs font-medium text-[#131b2e] placeholder-[#737688] shadow-xs"
          />
        </div>
      </div>

      {/* Right: Quick Action CTAs & User Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Send Money CTA */}
        <button
          className="hidden sm:inline-flex items-center gap-2 bg-[#0052ff] hover:bg-[#003ec7] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#0052ff]/20 transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">send</span>
          <span>Send Money</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-9 h-9 rounded-xl bg-white border border-[#c3c5d9]/40 flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ba1a1a] rounded-full border-2 border-white text-white text-[8px] font-bold flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#c3c5d9]/40 p-4 z-50 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff] mb-3">
                <span className="font-bold text-sm text-[#131b2e]">Notifications</span>
                {unreadCount > 0 && (
                  <span
                    onClick={handleMarkAllAsRead}
                    className="text-[10px] font-mono text-[#0052ff] font-bold cursor-pointer hover:underline"
                  >
                    Mark All Read
                  </span>
                )}
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-6 text-xs text-[#737688]">
                    <div className="w-5 h-5 rounded-full border-2 border-[#0052ff]/10 border-t-[#0052ff] animate-spin mr-2" />
                    <span>Loading...</span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#737688]">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleMarkAsRead(item.id, item.read_at)}
                      className={`flex items-start gap-3 p-2 rounded-xl hover:bg-[#faf8ff] transition-colors cursor-pointer ${
                        item.read_at === null ? "bg-[#eaedff]/20 font-medium" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-xs font-bold text-[#131b2e] leading-snug">{item.title}</span>
                          {item.read_at === null && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff] shrink-0 mt-1.5" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#434656]">{item.desc}</span>
                        <span className="text-[9px] font-mono text-[#737688] mt-1">{item.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white border border-transparent hover:border-[#c3c5d9]/30 transition-all cursor-pointer"
          >
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-9 h-9 rounded-xl object-cover border border-[#0052ff]/30 shadow-xs"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#131b2e]">{user.firstName} {user.lastName}</span>
              <span className="text-[10px] font-mono text-[#0052ff] font-semibold">{user.tier}</span>
            </div>
            <span className="material-symbols-outlined text-base text-[#737688] hidden md:block">
              expand_more
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-[#c3c5d9]/40 p-2 z-50 animate-in fade-in duration-200">
              <div className="p-3 border-b border-[#eaedff] mb-1">
                <span className="block text-xs font-bold text-[#131b2e]">{user.firstName} {user.lastName}</span>
                <span className="block text-[11px] text-[#737688]">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-[#131b2e] hover:bg-[#faf8ff] rounded-xl flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-[#0052ff]">person</span>
                Account Settings
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-[#131b2e] hover:bg-[#faf8ff] rounded-xl flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-[#0052ff]">credit_card</span>
                Manage Cards
              </button>
              <button
                onClick={async () => {
                  setProfileOpen(false);
                  await AuthService.logout();
                  router.push("/");
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-xl flex items-center gap-2 mt-1 border-t border-[#eaedff] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
