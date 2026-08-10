import { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "@/types";
import { SecurityService } from "@/services/security.service";

interface SecurityTabProps {
  initialSessions: Session[];
}

export default function SecurityTab({ initialSessions }: SecurityTabProps) {
  const [tfaEnabled, setTfaEnabled] = useState(false); // Disabled by default, no actual 2FA
  const [recoveryAdded, setRecoveryAdded] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  // Password Form States
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Sync sessions if initialSessions changes
  useEffect(() => {
    setSessions(initialSessions);
  }, [initialSessions]);

  const handleRevokeSession = async (id: number) => {
    if (!confirm("Are you sure you want to sign out this session?")) return;
    const success = await SecurityService.revokeSession(id);
    if (success) {
      setSessions(prev => prev.filter((s) => s.id !== id));
    } else {
      alert("Failed to revoke session.");
    }
  };

  const handleRevokeOtherSessions = async () => {
    if (!confirm("Are you sure you want to sign out all other sessions?")) return;
    const success = await SecurityService.revokeOtherSessions();
    if (success) {
      setSessions(prev => prev.filter((s) => s.is_current));
      alert("All other sessions successfully signed out.");
    } else {
      alert("Failed to sign out other sessions.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordSuccess(null);
    setPasswordError(null);

    try {
      const res = await SecurityService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });

      if (res.success) {
        setPasswordSuccess(res.message);
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
        setShowPasswordForm(false);
      }
    } catch (err: any) {
      setPasswordError(err.message || "An unexpected error occurred.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Sub-tab Navigation */}
      <div className="flex bg-[#eaedff]/60 p-1.5 rounded-2xl border border-[#c3c5d9]/30 text-xs font-mono font-bold w-full sm:w-fit">
        <button
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 bg-[#0052ff] text-white shadow-md shadow-[#0052ff]/20"
        >
          <span className="material-symbols-outlined text-base">shield_lock</span>
          <span>Security</span>
        </button>

        <Link
          href="/dashboard/profile"
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-[#434656] hover:text-[#131b2e]"
        >
          <span className="material-symbols-outlined text-base">person</span>
          <span>Profile</span>
        </Link>

        <Link
          href="/dashboard/profile"
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-[#434656] hover:text-[#131b2e]"
        >
          <span className="material-symbols-outlined text-base">credit_card</span>
          <span>Billing</span>
        </Link>
      </div>

      {/* RENDER ACTIVE TAB VIEW - SECURITY TAB */}
      <div className="space-y-6 animate-in fade-in duration-200">
        
        {/* Security Health Ring Widget */}
        <div className="bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center bg-[#faf8ff] rounded-full shadow-inner border border-[#eaedff]">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-[#eaedff]" cx="50" cy="50" fill="none" r="42" strokeWidth="6" />
              <circle
                className="stroke-[#0052ff] transition-all duration-1000"
                cx="50"
                cy="50"
                fill="none"
                r="42"
                strokeWidth="6"
                strokeDasharray="263.8"
                strokeDashoffset={recoveryAdded ? "0" : "21.1"}
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-2xl font-extrabold text-[#0052ff]">
              {recoveryAdded ? "100%" : "92%"}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#131b2e] font-headline">Security Health Status</h3>
            <p className="text-xs text-[#737688] mt-1 max-w-md">
              Your banking account security is highly protected. Follow the checklist below to secure it completely.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Checklist */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm space-y-5">
            <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
              Action Checklist
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#10b981] text-2xl">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-[#131b2e]">Email Address Verified</h4>
                  <span className="text-[10px] font-mono text-[#737688]">Verified on Oct 24, 2023</span>
                </div>
              </div>

              <div className="h-px bg-[#eaedff]" />

              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#10b981] text-2xl">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-[#131b2e]">Two-Factor Authentication</h4>
                  <span className="text-[10px] font-mono text-[#737688]">Enabled via Google Authenticator App</span>
                </div>
              </div>

              <div className="h-px bg-[#eaedff]" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-2xl ${recoveryAdded ? "text-[#10b981]" : "text-[#737688]"}`}>
                    {recoveryAdded ? "check_circle" : "key"}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">Add Recovery Key</h4>
                    <span className="text-[10px] font-mono text-[#737688]">
                      {recoveryAdded ? "Account recovery protocol activated" : "Highly recommended for fast account access"}
                    </span>
                  </div>
                </div>
                {!recoveryAdded && (
                  <button
                    onClick={() => setRecoveryAdded(true)}
                    className="bg-[#0052ff] hover:bg-[#003ec7] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Add Key
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Authentication controls */}
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-[#c3c5d9]/40 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-5">
                Access Controls
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Master Password</span>
                      <span className="text-[10px] text-[#737688]">Updated recently</span>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="bg-[#faf8ff] hover:bg-[#eaedff] text-[#0052ff] border border-[#eaedff] px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {showPasswordForm ? "Cancel" : "Update"}
                    </button>
                  </div>

                  {showPasswordForm && (
                    <form onSubmit={handlePasswordSubmit} className="mt-3 space-y-3 bg-[#faf8ff] p-4 rounded-2xl border border-[#eaedff] text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-[#737688] uppercase tracking-wider mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-white border border-[#c3c5d9]/40 rounded-xl px-3 py-2 text-[#131b2e] focus:outline-none focus:border-[#0052ff] font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#737688] uppercase tracking-wider mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-white border border-[#c3c5d9]/40 rounded-xl px-3 py-2 text-[#131b2e] focus:outline-none focus:border-[#0052ff] font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#737688] uppercase tracking-wider mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={newPasswordConfirmation}
                          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                          className="w-full bg-white border border-[#c3c5d9]/40 rounded-xl px-3 py-2 text-[#131b2e] focus:outline-none focus:border-[#0052ff] font-mono text-sm"
                        />
                      </div>

                      {passwordError && (
                        <div className="bg-[#ba1a1a]/10 text-[#ba1a1a] p-2.5 rounded-xl font-medium leading-snug">
                          {passwordError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={passwordLoading}
                        className="w-full bg-[#0052ff] hover:bg-[#003ec7] text-white py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {passwordLoading ? "Saving Changes..." : "Save Password"}
                      </button>
                    </form>
                  )}

                  {passwordSuccess && (
                    <div className="mt-2 bg-[#10b981]/10 text-[#059669] p-2.5 rounded-xl text-xs font-semibold">
                      {passwordSuccess}
                    </div>
                  )}
                </div>

                <div className="h-px bg-[#eaedff]" />

                <div className="flex justify-between items-center opacity-70">
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">2FA Enforcement</span>
                    <span className="text-[10px] text-[#737688]">Coming soon (Not configured)</span>
                  </div>
                  <button
                    disabled={true}
                    className="w-9 h-5 rounded-full p-0.5 transition-colors cursor-not-allowed bg-[#c3c5d9]"
                  >
                    <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active device sessions */}
        <div className="bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#eaedff] flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold text-[#131b2e] uppercase tracking-wider">
              Current Authenticated Sessions
            </h3>
            {sessions.filter(s => !s.is_current).length > 0 && (
              <button
                onClick={handleRevokeOtherSessions}
                className="bg-[#faf8ff] hover:bg-[#eaedff] text-[#ba1a1a] border border-[#eaedff] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Sign out all other sessions
              </button>
            )}
          </div>
          
          <div className="p-6 divide-y divide-[#eaedff] space-y-4">
            {sessions.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#737688]">
                No active sessions found.
              </div>
            ) : (
              sessions.map((sess) => (
                <div key={sess.id} className="flex items-center justify-between pt-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-center text-[#737688]">
                      <span className="material-symbols-outlined text-lg">
                        {sess.is_current ? "star" : "devices"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">
                        {sess.name} {sess.is_current ? "(Current Session)" : ""}
                      </span>
                      <span className="text-[10px] text-[#737688] font-mono">
                        Created: {new Date(sess.created_at).toLocaleString()} • Last active: {sess.last_used_at ? new Date(sess.last_used_at).toLocaleString() : "Never"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className={`font-bold bg-[#10b981]/15 px-2 py-0.5 rounded-full ${sess.is_current ? "text-[#059669]" : "text-[#737688]"}`}>
                      {sess.is_current ? "Active" : "Inactive"}
                    </span>
                    {!sess.is_current && (
                      <button
                        onClick={() => handleRevokeSession(sess.id)}
                        className="text-[#ba1a1a] font-bold hover:underline cursor-pointer"
                      >
                        Revoke Session
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
