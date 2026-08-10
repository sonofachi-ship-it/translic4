"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, BillingInvoice } from "@/types";
import { ProfileService } from "@/services/profile.service";

interface ProfileTabProps {
  user: User;
  billingHistory: BillingInvoice[];
  onProfileUpdate?: (updatedUser: User) => void;
}

export default function ProfileTab({ user, billingHistory, onProfileUpdate }: ProfileTabProps) {
  const [subTab, setSubTab] = useState<"profile" | "billing">("profile");

  // User Profile States
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    try {
      const updated = await ProfileService.updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        email,
      });

      if (updated) {
        setIsEditingProfile(false);
        setProfileSuccess(true);
        if (onProfileUpdate) {
          onProfileUpdate(updated);
        }
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        setErrorMsg("Failed to update profile. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Sub-tab Navigation */}
      <div className="flex bg-[#eaedff]/60 p-1.5 rounded-2xl border border-[#c3c5d9]/30 text-xs font-mono font-bold w-full sm:w-fit">
        <Link
          href="/dashboard/security"
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-[#434656] hover:text-[#131b2e]"
        >
          <span className="material-symbols-outlined text-base">shield_lock</span>
          <span>Security</span>
        </Link>

        <button
          onClick={() => setSubTab("profile")}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            subTab === "profile"
              ? "bg-[#0052ff] text-white shadow-md shadow-[#0052ff]/20"
              : "text-[#434656] hover:text-[#131b2e]"
          }`}
        >
          <span className="material-symbols-outlined text-base">person</span>
          <span>Profile</span>
        </button>

        <button
          onClick={() => setSubTab("billing")}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            subTab === "billing"
              ? "bg-[#0052ff] text-white shadow-md shadow-[#0052ff]/20"
              : "text-[#434656] hover:text-[#131b2e]"
          }`}
        >
          <span className="material-symbols-outlined text-base">credit_card</span>
          <span>Billing</span>
        </button>
      </div>

      {/* RENDER ACTIVE TAB VIEW */}

      {/* PROFILE TAB */}
      {subTab === "profile" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Executive Header */}
          <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Eleanor Vance Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0052ff]/30 shadow-md"
              />
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#0052ff] text-white rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-xs">edit</span>
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e] font-headline">{firstName} {lastName}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dde1ff] text-[#0038b6] font-mono text-[9px] font-bold tracking-wider mt-1">
                <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                <span>PREMIUM TIER</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Legal Information Details */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                  Personal Information
                </h3>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-[#0052ff] font-mono font-bold text-xs hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">edit_square</span>
                    <span>Edit Info</span>
                  </button>
                ) : null}
              </div>

              {profileSuccess && (
                <div className="bg-[#10b981]/15 text-[#059669] p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Profile changes saved successfully!
                </div>
              )}

              {errorMsg && (
                <div className="bg-[#ba1a1a]/15 text-[#ba1a1a] p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  {errorMsg}
                </div>
              )}

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#434656] mb-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#434656] mb-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#434656] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#434656] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#434656] mb-1">Residential Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#c3c5d9] focus:outline-[#0052ff] text-xs text-[#131b2e]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-[#0052ff] hover:bg-[#003ec7] text-white py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 bg-[#faf8ff] text-[#434656] border border-[#c3c5d9] py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="divide-y divide-[#eaedff] text-xs space-y-3.5">
                  <div className="flex justify-between py-2 border-b border-[#eaedff] first:pt-0">
                    <span className="text-[#737688] font-mono">First Name</span>
                    <span className="font-semibold text-[#131b2e]">{firstName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#eaedff]">
                    <span className="text-[#737688] font-mono">Last Name</span>
                    <span className="font-semibold text-[#131b2e]">{lastName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#eaedff] items-center">
                    <span className="text-[#737688] font-mono">Email Address</span>
                    <div className="flex items-center gap-1 text-[#10b981] font-bold">
                      <span className="text-[#131b2e] font-semibold">{email}</span>
                      <span className="material-symbols-outlined text-base">verified</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#eaedff]">
                    <span className="text-[#737688] font-mono">Phone Number</span>
                    <span className="font-semibold text-[#131b2e]">{phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#eaedff]">
                    <span className="text-[#737688] font-mono">Residential Address</span>
                    <span className="font-semibold text-[#131b2e] text-right max-w-[200px] truncate">{address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Verification & KYC Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-4">
                <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                  Identity Verification
                </h3>
                
                <div className="bg-[#faf8ff] p-4 rounded-2xl border border-[#eaedff] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">health_and_safety</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">KYC Status</span>
                      <span className="text-[10px] text-[#737688]">Level 3: Full Access</span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono font-bold bg-[#E6F4EA] text-[#137333] px-2.5 py-1 rounded-full">
                    VERIFIED
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold pt-2">
                  <span className="text-[#737688]">Verified on Oct 24, 2023</span>
                  <a href="#" className="text-[#0052ff] hover:underline flex items-center gap-1 font-bold">
                    <span>Documents</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-4">
                <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                  Account Preferences
                </h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#faf8ff] text-left">
                    <span className="text-xs font-semibold text-[#131b2e]">Language (English US)</span>
                    <span className="material-symbols-outlined text-base text-[#737688]">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#faf8ff] text-left">
                    <span className="text-xs font-semibold text-[#131b2e]">Primary Currency (USD $)</span>
                    <span className="material-symbols-outlined text-base text-[#737688]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BILLING TAB */}
      {subTab === "billing" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Plan Info */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold text-[#0052ff] uppercase tracking-wider">
                    Current Plan
                  </span>
                  <h3 className="text-2xl font-bold text-[#131b2e] font-headline">Premium Plan</h3>
                  <span className="text-xs text-[#737688] font-mono">$19.99 / month</span>
                </div>

                <span className="text-[9px] font-mono font-bold bg-[#E6F4EA] text-[#137333] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#1E8E3E] rounded-full" />
                  <span>ACTIVE</span>
                </span>
              </div>

              <div className="h-px bg-[#eaedff]" />

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#737688] block">Next renewal</span>
                  <span className="font-bold text-[#131b2e] font-mono">Nov 12, 2023</span>
                </div>
                <button className="bg-[#faf8ff] hover:bg-[#eaedff] text-[#0052ff] border border-[#eaedff] px-4 py-2 rounded-xl text-xs font-bold transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                    Payment Methods
                  </h3>
                  <button className="text-[#0052ff] font-mono font-bold text-xs hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">add</span>
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Card 1 */}
                  <div className="bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-white rounded border border-[#eaedff] flex items-center justify-center font-mono text-[9px] font-bold text-[#0052ff]">
                        VISA
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">•••• 4281</span>
                        <span className="text-[9px] text-[#737688] font-mono">Expires 09/25</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-[#eaedff] text-[#0038b6] px-2 py-0.5 rounded">
                      Default
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-white rounded border border-[#eaedff] flex items-center justify-center font-mono text-[9px] font-bold text-[#FF5F00]">
                        MC
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">•••• 8823</span>
                        <span className="text-[9px] text-[#737688] font-mono">Expires 12/24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History log */}
          <div className="bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#eaedff]">
              <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                Billing History Log
              </h3>
            </div>

            <div className="p-6 divide-y divide-[#eaedff] space-y-4">
              {billingHistory.map((invoice, i) => (
                <div key={i} className="flex items-center justify-between pt-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#0052ff]/10 text-[#0052ff] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">receipt_long</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">{invoice.date}</span>
                      <span className="text-[10px] text-[#737688] font-mono">{invoice.plan}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="font-bold text-[#131b2e]">${invoice.amount.toFixed(2)}</span>
                    <button className="w-8 h-8 rounded-full bg-[#faf8ff] border border-[#eaedff] text-[#0052ff] flex items-center justify-center hover:bg-[#eaedff] transition-colors">
                      <span className="material-symbols-outlined text-base">download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
