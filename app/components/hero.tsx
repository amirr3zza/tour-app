"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TOURS_DATA, Tour } from "@/app/data/tours";

const POPULAR_TAGS = [
  "ماسال",
  "قلعه رودخان",
  "ماسوله",
  "لاهیجان",
  "تالاب انزلی",
  "سوباتان",
  "رشت",
];

export default function Hero() {
  const router = useRouter();

  // Search state
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto Slider state for random tours in hero image holder
  const [sliderTours, setSliderTours] = useState<Tour[]>(TOURS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Randomize tours order on client mount without blocking SSR prerender
  useEffect(() => {
    const timer = setTimeout(() => {
      setSliderTours([...TOURS_DATA].sort(() => 0.5 - Math.random()));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide effect (every 4.5 seconds if not hovered)
  useEffect(() => {
    if (isHovered || sliderTours.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderTours.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, sliderTours.length]);

  const activeTour = sliderTours[currentIndex] || TOURS_DATA[0];

  const handleNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliderTours.length);
  }, [sliderTours.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sliderTours.length) % sliderTours.length);
  }, [sliderTours.length]);

  // Close search menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length > 0);
  };

  const handleSelectPopularTag = (tag: string) => {
    setQuery(tag);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  // Navigate to detailed tour page
  const handleSelectSearchResult = (tourId: string) => {
    setIsOpen(false);
    router.push(`/tours/${tourId}`);
  };

  // Real-time filtering matching title, location, county, category, or highlight
  const filteredTours = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return TOURS_DATA.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.county.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.highlight.toLowerCase().includes(q) ||
        item.guide.name.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const showLiveMenu = isOpen && query.trim().length > 0;

  return (
    <section
      className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        
        {/* Right Side: Content + Live Search */}
        <div className="flex flex-col justify-center py-2 sm:py-6 text-right order-2 lg:order-1">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 leading-[1.25]">
            سفر رویایی‌ات به{" "}
            <span className="font-extrabold text-emerald-900 underline decoration-emerald-300 underline-offset-8">
              بهشت گیلان
            </span>{" "}
            را کشف کن.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 font-normal max-w-xl leading-relaxed">
            از ییلاقات مه‌آلود ماسال و کلبه‌های چوبی اولسبلنگاه تا دژ
            قلعه‌رودخان، تالاب انزلی و طعم‌های بی‌نظیر شهر خلاق خوراک‌شناسی رشت.
          </p>

          {/* Search Container with Live Dropdown Menu */}
          <div ref={searchContainerRef} className="relative mt-8 max-w-xl">
            {/* Search Input Bar */}
            <div className="relative flex items-center">
              <svg
                className="absolute right-4 w-5 h-5 text-zinc-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                  if (query.trim().length > 0) setIsOpen(true);
                }}
                placeholder="جستجوی مقصد یا تور در گیلان (ماسال، قلعه رودخان، ماسوله، دیلمان)..."
                className="w-full pr-12 pl-10 py-4 bg-white rounded-2xl border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-sm sm:text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all text-right"
              />

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute left-3.5 p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  aria-label="پاک کردن جستجو"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Live Search Menu -> Clicking directly redirects to detail page to make reservation */}
            {showLiveMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white/98 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2 border-b border-zinc-100 px-1">
                  <span className="text-xs font-bold text-emerald-950">
                    {filteredTours.length === 0
                      ? `توری برای «${query}» یافت نشد`
                      : `${filteredTours.length} تور اختصاصی گیلان یافت شد (برای مشاهده جزئیات و رزرو کلیک کنید)`}
                  </span>
                </div>

                {/* Filtered Results List */}
                <div className="space-y-1.5 max-h-[320px] overflow-y-auto pl-1">
                  {filteredTours.length > 0 ? (
                    filteredTours.map((dest) => {
                      return (
                        <div
                          key={dest.id}
                          onClick={() => handleSelectSearchResult(dest.id)}
                          className="group flex items-center justify-between p-2.5 rounded-xl border border-zinc-100 bg-white hover:bg-emerald-50/80 hover:border-emerald-300 transition-all cursor-pointer"
                          role="button"
                          tabIndex={0}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dest.imageUrl}
                              alt={dest.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0 text-right">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-emerald-950 truncate">
                                  {dest.title}
                                </h4>
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 group-hover:bg-emerald-100 group-hover:text-emerald-900 shrink-0">
                                  {dest.county}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                                📍 {dest.location} • ⏱ {dest.duration} • راهنما: {dest.guide.name}
                              </p>
                            </div>
                          </div>

                          <div className="text-left shrink-0 pr-3 flex flex-col items-end">
                            <div className="text-xs font-black text-emerald-950">
                              {dest.priceFormatted} تومان
                            </div>
                            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                              <span>رزرو آنلاین</span>
                              <span className="rotate-180">←</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-6 text-center text-zinc-500 text-xs">
                      <p className="font-medium text-zinc-700">
                        مقصدی با این عنوان پیدا نشد.
                      </p>
                      <p className="mt-1 text-zinc-400">
                        عباراتی مانند «ماسال»، «ماسوله»، «قلعه رودخان»، «سوباتان»، «لاهیجان» یا «رشت» را امتحان کنید.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="pt-2 mt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 px-1">
                  <span className="text-emerald-800 font-medium">
                    ⚡ با کلیک روی هر نتیجه، به صفحه جزئیات و رزرو آن هدایت می‌شوید
                  </span>
                  <span>Esc برای بستن</span>
                </div>
              </div>
            )}
          </div>

          {/* Minimal Suggestions */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-700">
              محبوب‌ترین مقاصد گیلان:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSelectPopularTag(tag)}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-emerald-100 hover:text-emerald-900 text-zinc-700 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Trust Counters */}
          <div className="mt-10 pt-6 border-t border-zinc-200/70 grid grid-cols-3 gap-4 max-w-md text-right">
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900">
                +۵۰
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                مقصد بکر در گیلان
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900">
                ۴.۹۸★
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                رضایت گردشگران
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900">
                ۱۰۰٪
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                راهنمایان بومی گیلانی
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Destination Image Holder with AUTO SLIDER of RANDOM TOURS */}
        <div
          className="relative h-[460px] sm:h-[530px] lg:h-[620px] w-full rounded-3xl overflow-hidden border border-zinc-200/80 shadow-2xl group text-right order-1 lg:order-2 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image with smooth transition */}
          <img
            key={activeTour.id}
            src={activeTour.imageUrl}
            alt={activeTour.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 animate-in fade-in zoom-in-95 duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white z-10">
            {/* Auto-slider live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${isHovered ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
              <span>{isHovered ? "توقف خودکار (اسلاید در حال مشاهده)" : "تورهای پیشنهادی تصادفی گیلان"}</span>
            </div>

            {/* Rating badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <span className="text-amber-400">★ {activeTour.rating}</span>
              <span className="text-white/80">
                ({activeTour.reviewsCount} نظر)
              </span>
            </div>
          </div>

          {/* Slider Prev / Next Manual Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="تور قبلی"
              className="pointer-events-auto p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="تور بعدی"
              className="pointer-events-auto p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Card Info & Direct Booking CTA */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3 z-10">
            {/* Category & Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-lg bg-emerald-700/90 backdrop-blur-md text-xs font-bold text-white border border-emerald-500/30">
                {activeTour.category} • استان گیلان ({activeTour.county})
              </span>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20">
                ⏱ {activeTour.duration}
              </span>
            </div>

            {/* Tour Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug drop-shadow-md">
              {activeTour.title}
            </h3>

            {/* Short Highlight */}
            <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 max-w-lg font-normal leading-relaxed">
              {activeTour.highlight}
            </p>

            {/* Pricing & Link directly to Detail & Reservation Page */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/20">
              <div>
                <span className="text-[11px] text-zinc-300 block">
                  شروع قیمت تور از
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">
                  {activeTour.priceFormatted}
                  <span className="text-xs font-normal text-zinc-300 mr-1.5">
                    {" "}
                    تومان / هر مسافر
                  </span>
                </span>
              </div>

              {/* Direct Booking Redirect Button */}
              <Link
                href={`/tours/${activeTour.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95 cursor-pointer"
              >
                <span>مشاهده جزئیات و رزرو آنلاین</span>
                <span className="rotate-180">←</span>
              </Link>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {sliderTours.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-7 bg-emerald-400"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
