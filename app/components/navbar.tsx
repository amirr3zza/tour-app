"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./auth-modal";

interface UserProfile {
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleOpenAuth = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const isToursActive = pathname === "/tours";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/80 transition-all font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                🌿
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-zinc-950">
                  تور گیلان<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-medium -mt-1">
                  طبیعت‌گردی و بوم‌گردی شمال
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
              <Link
                href="/#destinations"
                className="hover:text-emerald-800 transition-colors"
              >
                مقاصد دیدنی گیلان
              </Link>
              <Link
                href="/tours"
                className={`transition-colors ${
                  isToursActive
                    ? "text-emerald-900 font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    : "hover:text-emerald-800"
                }`}
              >
                تورها و سفرها
              </Link>
              <Link
                href="/#last-minute"
                className="hover:text-emerald-800 transition-colors"
              >
                لحظه آخری با تخفیف
              </Link>
              <Link
                href="/#guides"
                className="hover:text-emerald-800 transition-colors"
              >
                راهنمایان محلی
              </Link>
            </nav>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency / Region badge */}
            <div className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-100">
              تومان (ایران)
            </div>

            <div className="h-4 w-px bg-zinc-200" />

            {/* Single Joined Login / Register Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-semibold">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUser(null)}
                  className="px-2.5 py-1.5 text-xs text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="خروج از حساب"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleOpenAuth("login")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-900 transition-all shadow-xs active:scale-95 cursor-pointer group"
              >
                <svg
                  className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>ورود / ثبت‌نام</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {!user ? (
              <button
                type="button"
                onClick={() => handleOpenAuth("login")}
                className="px-3 py-1.5 rounded-xl bg-zinc-950 text-white text-xs font-medium active:scale-95 transition-all shadow-xs"
              >
                ورود
              </button>
            ) : (
              <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="منوی اصلی"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-md px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-700">
              <Link
                href="/#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                مقاصد دیدنی گیلان
              </Link>
              <Link
                href="/tours"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isToursActive ? "bg-emerald-50 text-emerald-900 font-bold" : "hover:bg-zinc-100"
                }`}
              >
                تورها و سفرها
              </Link>
              <Link
                href="/#last-minute"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                لحظه آخری با تخفیف
              </Link>
              <Link
                href="/#guides"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                راهنمایان محلی
              </Link>
            </nav>

            <div className="pt-3 border-t border-zinc-100">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">{user.name}</p>
                      <p className="text-[10px] text-zinc-500" dir="ltr">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUser(null);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
                  >
                    خروج از حساب
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenAuth("login");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-950 text-white text-sm font-semibold hover:bg-emerald-900 transition-all shadow-xs active:scale-98 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-zinc-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>ورود / ثبت‌نام در سامانه</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Unified Auth Modal */}
      <AuthModal
        key={`${isAuthModalOpen}-${authModalTab}`}
        isOpen={isAuthModalOpen}
        initialTab={authModalTab}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />
    </>
  );
}
