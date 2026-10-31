"use client";

import { useState, useEffect, useRef } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
  onLoginSuccess?: (user: { name: string; email: string }) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login",
  onLoginSuccess,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = {
        name:
          activeTab === "register" && name.trim()
            ? name.trim()
            : email.split("@")[0] || "مسافر گیلان",
        email: email || "traveler@gilan-tours.ir",
      };
      setLoading(false);
      setSuccessMessage(
        activeTab === "register"
          ? `${user.name} عزیز، حساب شما با موفقیت ایجاد شد!`
          : `خوش آمدید، ${user.name} عزیز!`
      );

      setTimeout(() => {
        onLoginSuccess?.(user);
        onClose();
      }, 900);
    }, 600);
  };

  const handleQuickDemo = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = {
        name: provider === "Google" ? "آرمین راد" : "نیلوفر گیلانی",
        email: `${provider.toLowerCase()}@gilan-tours.ir`,
      };
      setSuccessMessage(`ورود موفقیت‌آمیز با حساب ${provider}`);
      setTimeout(() => {
        onLoginSuccess?.(user);
        onClose();
      }, 800);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-3xl border border-zinc-200/90 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-right"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="بستن پنجره"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand and Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            🌿
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-900">
            تور گیلان<span className="text-emerald-600">.</span>
          </span>
        </div>

        <h3 className="text-2xl font-bold text-zinc-950 mt-3">
          {activeTab === "login" ? "خوش آمدید" : "ایجاد حساب کاربری"}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          {activeTab === "login"
            ? "برای مشاهده تورهای رزرو شده و سفرهای مورد علاقه وارد شوید."
            : "به جمع مسافران طبیعت بکر و ییلاقات بهشتی گیلان بپیوندید."}
        </p>

        {/* Tab Switcher */}
        <div className="flex p-1 mt-5 bg-zinc-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-white text-zinc-950 shadow-xs"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            ورود به حساب
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-white text-zinc-950 shadow-xs"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            ثبت‌نام جدید
          </button>
        </div>

        {/* Quick Social Auth */}
        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={() => handleQuickDemo("Google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs sm:text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            ورود سریع با گوگل
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo("Apple")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs sm:text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer active:scale-98"
          >
            <svg className="w-4 h-4 fill-current text-zinc-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.64-.78 1.08-1.87.96-2.96-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.79-.97 2.85 1.04.08 2.1-.51 2.74-1.29z" />
            </svg>
            ورود سریع با اپل
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <span className="relative px-3 bg-white text-[11px] font-medium text-zinc-400">
            یا با شماره موبایل / ایمیل
          </span>
        </div>

        {/* Success message banner */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-center animate-in fade-in duration-150">
            ✓ {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {activeTab === "register" && (
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">نام و نام خانوادگی</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: آرمین میرزایی"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all text-right"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">شماره همراه یا ایمیل</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="09123456789 یا email@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all text-right"
              dir="ltr"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-zinc-700">کلمه عبور</label>
              {activeTab === "login" && (
                <button
                  type="button"
                  onClick={() => alert("لینک بازیابی رمز عبور پیامک شد.")}
                  className="text-[11px] text-zinc-500 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  فراموشی رمز؟
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all text-right"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-900 active:scale-98 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : activeTab === "login" ? (
              "ورود به حساب کاربری"
            ) : (
              "ثبت‌نام رایگان در تور گیلان"
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <p className="mt-5 text-center text-xs text-zinc-500">
          {activeTab === "login" ? (
            <>
              حساب کاربری ندارید؟{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setSuccessMessage(null);
                }}
                className="font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                ثبت‌نام کنید
              </button>
            </>
          ) : (
            <>
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setSuccessMessage(null);
                }}
                className="font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                وارد شوید
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
