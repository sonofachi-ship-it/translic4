"use client";

import React from "react";

export default function Home() {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center gap-stack-sm">
          <button
            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors rounded-full"
            onClick={() => window.history.back()}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Security Settings</h1>
        </div>
      </header>
      
      <main className="flex flex-col relative w-full pt-16 bg-background min-h-screen">
        <div className="flex flex-col w-full px-margin-mobile gap-stack-lg pb-stack-xl">
          
          <div className="flex flex-col items-center justify-center pt-stack-lg pb-stack-md gap-stack-sm text-center">
            <div className="relative w-32 h-32 flex items-center justify-center bg-surface-container rounded-full mb-stack-sm shadow-md">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="stroke-surface-variant" cx="50" cy="50" fill="none" r="45" strokeWidth="8"></circle>
                <circle className="stroke-primary" cx="50" cy="50" fill="none" r="45" strokeDasharray="282.7" strokeDashoffset="22.6" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="flex flex-col items-center">
                <span className="font-display-lg text-[40px] leading-tight text-primary">92<span className="text-body-lg">%</span></span>
              </div>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">Security Health</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Your account is well protected. Review the checklist below to reach 100%.</p>
          </div>

          <div className="flex bg-surface-container-low rounded-xl p-unit shadow-sm overflow-x-auto snap-x hide-scrollbar">
            <button className="flex-1 min-w-[120px] py-stack-sm px-stack-md text-center rounded-lg bg-surface shadow-sm text-on-surface font-body-md font-medium transition-colors snap-center">Security</button>
            <button className="flex-1 min-w-[120px] py-stack-sm px-stack-md text-center rounded-lg text-on-surface-variant hover:text-on-surface font-body-md transition-colors snap-center">Profile</button>
            <button className="flex-1 min-w-[120px] py-stack-sm px-stack-md text-center rounded-lg text-on-surface-variant hover:text-on-surface font-body-md transition-colors snap-center">Billing</button>
          </div>

          <div className="flex flex-col gap-stack-sm">
            <h3 className="font-headline-md text-headline-md text-on-background px-unit">Action Checklist</h3>
            <div className="bg-surface-container rounded-[24px] p-stack-md shadow-sm flex flex-col gap-stack-md text-on-surface">
              <div className="flex items-center gap-stack-md">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-lg font-semibold truncate text-on-surface">Email Verified</h4>
                  <p className="font-body-md text-on-surface-variant text-sm truncate">Verified on Oct 24, 2023</p>
                </div>
              </div>
              <div className="h-px bg-outline-variant/30 w-full"></div>
              <div className="flex items-center gap-stack-md">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-lg font-semibold truncate text-on-surface">Two-Factor Auth</h4>
                  <p className="font-body-md text-on-surface-variant text-sm truncate">Enabled via Authenticator App</p>
                </div>
              </div>
              <div className="h-px bg-outline-variant/30 w-full"></div>
              <div className="flex items-center gap-stack-md">
                <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-lg font-semibold truncate text-on-surface">Add Recovery Key</h4>
                  <p className="font-body-md text-on-surface-variant text-sm truncate">Recommended for account recovery</p>
                </div>
                <button className="px-stack-sm py-unit bg-primary text-on-primary rounded-lg font-label-mono text-sm shadow-sm active:scale-95 transition-transform shrink-0">Add</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-stack-sm">
            <h3 className="font-headline-md text-headline-md text-on-background px-unit">Authentication</h3>
            <div className="bg-surface-container rounded-[24px] p-stack-md shadow-sm flex flex-col gap-stack-md text-on-surface">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg font-semibold text-on-surface">Password</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">Last changed 4 months ago</p>
                </div>
                <button className="px-stack-md py-stack-sm bg-surface text-on-surface rounded-lg font-body-md font-medium shadow-sm ring-1 ring-outline-variant/50 active:bg-surface-variant transition-colors">Update</button>
              </div>
              <div className="h-px bg-outline-variant/30 w-full"></div>
              <div className="flex justify-between items-center">
                <div className="flex-1 pr-stack-md">
                  <h4 className="font-body-lg font-semibold text-on-surface">Two-Factor Authentication</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">Require a code from an app when logging in.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox" defaultValue="" />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-stack-sm">
            <h3 className="font-headline-md text-headline-md text-on-background px-unit">Recent Activity</h3>
            <div className="bg-surface-container rounded-[24px] overflow-hidden shadow-sm flex flex-col text-on-surface">
              <div
                className="h-40 w-full bg-surface-variant relative"
                data-location="San Francisco, CA"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaPQmnaDAXIQm5nSy5jiYVFIRVpBVppkNDdSkrOQ4OnVgwvjPwrsfO9HqPZRArRsrZ58V9q_d1gTkmdSQHh0FBVSw561nEAXHF9gBX7feKn9cFIJIUHxvAtvZmAQ_AA4ktGM1lrUGSwQQRvrzUi9EW6X_cEMjlnXjsJWdDhjyo-vyXFZEWBgNPMZ178MrhIgig-C0kpAfpC2hM-LzTDLBeVtUOhZ7x82w_i7RPcHkwSgCnS7UspLM')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                <div className="absolute bottom-stack-md left-stack-md flex items-center gap-unit text-on-surface">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <span className="font-body-md font-semibold text-shadow-sm">Current Session</span>
                </div>
              </div>
              <div className="p-stack-md flex flex-col gap-stack-md">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-body-lg font-semibold text-on-surface">MacBook Pro 16"</span>
                    <span className="font-body-md text-on-surface-variant text-sm">San Francisco, CA • IP: 192.168.1.1</span>
                    <span className="font-body-md text-secondary text-sm mt-unit">Active now</span>
                  </div>
                  <span className="material-symbols-outlined text-outline">laptop_mac</span>
                </div>
                <div className="h-px bg-outline-variant/30 w-full"></div>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-body-lg font-semibold text-on-surface">iPhone 14 Pro</span>
                    <span className="font-body-md text-on-surface-variant text-sm">San Jose, CA • IP: 192.168.1.55</span>
                    <span className="font-body-md text-on-surface-variant text-sm mt-unit">Last active: 2 hours ago</span>
                  </div>
                  <div className="flex flex-col items-end gap-stack-sm">
                    <span className="material-symbols-outlined text-outline">smartphone</span>
                    <button className="text-error font-body-md text-sm font-medium hover:underline">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
