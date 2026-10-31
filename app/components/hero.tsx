"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

interface GilanDestination {
  id: string;
  title: string;
  location: string;
  county: string;
  category:
    | "ییلاقات و کوهستان"
    | "جنگل و طبیعت"
    | "فرهنگی و تاریخی"
    | "ساحل و تالاب"
    | "مزارع و بوم‌گردی";
  price: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  highlight: string;
}

const GILAN_DESTINATIONS: GilanDestination[] = [
  {
    id: "masal-clouds",
    title: "ییلاق اولسبلنگاه و اقیانوس رویایی ابر ماسال",
    location: "ارتفاعات ماسال",
    county: "ماسال",
    category: "ییلاقات و کوهستان",
    price: "۱,۴۵۰,۰۰۰",
    duration: "۲ روز و ۱ شب",
    rating: 4.98,
    reviewsCount: 240,
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "تماشای اقیانوس ابر از کلبه‌های تخته‌ای چوبی، آوای دلنشین نی چوپانان تالشی و هوای پاک کوهستان.",
  },
  {
    id: "masouleh-village",
    title: "روستای کهن و پلکانی ماسوله در مه پاییز و بهار",
    location: "ماسوله",
    county: "فومن",
    category: "فرهنگی و تاریخی",
    price: "۹۸۰,۰۰۰",
    duration: "۱ روزه",
    rating: 4.94,
    reviewsCount: 310,
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "معماری پلکانی زردگون با قدمت هزار ساله، بازارهای سنتی، کافه‌های دنج با کلوچه فومن داغ و چای محلی.",
  },
  {
    id: "rudkhan-castle",
    title: "دژ نفوذناپذیر قلعه رودخان در دل جنگل‌های هیرکانی",
    location: "حیدرآلات",
    county: "فومن",
    category: "جنگل و طبیعت",
    price: "۱,۱۵۰,۰۰۰",
    duration: "۱ روزه",
    rating: 4.97,
    reviewsCount: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "پیمایش پله‌های سنگی در مه انبوه جنگل باستانی، دیواره‌های استوار ساسانی و برج‌های نگهبانی باشکوه.",
  },
  {
    id: "lahijan-tea",
    title: "باغات زمردین چای و بام سبز لاهیجان",
    location: "شیطان‌کوه و تپه‌های بیجاربنه",
    county: "لاهیجان",
    category: "مزارع و بوم‌گردی",
    price: "۸۹۰,۰۰۰",
    duration: "۲ روزه",
    rating: 4.93,
    reviewsCount: 195,
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "قدم زدن در مزارع سرسبز چای بهاره، چای‌نوشی در خانه‌های بوم‌گردی و تله‌کابین احرار بر فراز استخر لاهیجان.",
  },
  {
    id: "anzali-lagoon",
    title: "قایق‌رانی در میان نیلوفرهای تالاب بین‌المللی انزلی",
    location: "آبدنگاه و سرخانکل",
    county: "بندرانزلی",
    category: "ساحل و تالاب",
    price: "۱,۲۰۰,۰۰۰",
    duration: "۱ روزه",
    rating: 4.92,
    reviewsCount: 165,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "قایق‌سواری در میان لاله‌های تالابی، پرنده‌نگری لک‌لک‌ها و قوهای مهاجر و طعم ماهی سفید تازه خزر.",
  },
  {
    id: "gisoom-forest",
    title: "تونل بهشتی جنگل گیسوم و تلاقی با ساحل کاسپین",
    location: "پره‌سر و اسالم",
    county: "تالش",
    category: "جنگل و طبیعت",
    price: "۱,۶۵۰,۰۰۰",
    duration: "۲ روز و ۱ شب",
    rating: 4.96,
    reviewsCount: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    highlight:
      "گذر از دالان درختان کهنسال چسبیده به آسمان که ناگهان به امواج فیروزه‌ای دریای خزر ختم می‌شوند.",
  },
];

const CATEGORIES = [
  "همه",
  "ییلاقات و کوهستان",
  "جنگل و طبیعت",
  "فرهنگی و تاریخی",
  "ساحل و تالاب",
  "مزارع و بوم‌گردی",
] as const;

export default function Hero() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [activeDestination, setActiveDestination] = useState<GilanDestination>(
    GILAN_DESTINATIONS[0],
  );
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
    setSelectedCategory("همه");
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  // Real-time filtering matching title, location, county, category, or highlight
  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return GILAN_DESTINATIONS.filter((item) => {
      const matchesCategory =
        selectedCategory === "همه" || item.category === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.county.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.highlight.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const showLiveMenu = isOpen && query.trim().length > 0;

  return (
    <section
      className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Right Side: Content + Live Search */}
        <div className="flex flex-col justify-center py-2 sm:py-6 text-right">
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
                placeholder="جستجوی مقصد در گیلان (ماسال، قلعه رودخان، دیلمان، انزلی)..."
                className="w-full pr-12 pl-10 py-4 bg-white rounded-2xl border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all text-right"
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

            {/* Live Search Menu */}
            {showLiveMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2 border-b border-zinc-100 px-1">
                  <span className="text-xs font-semibold text-zinc-500">
                    {filteredDestinations.length === 0
                      ? `موردی برای «${query}» یافت نشد`
                      : `${filteredDestinations.length} مقصد در گیلان برای «${query}»`}
                  </span>
                </div>

                {/* Filtered Results List */}
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pl-1">
                  {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((dest) => {
                      const isSelected = activeDestination.id === dest.id;
                      return (
                        <div
                          key={dest.id}
                          onClick={() => {
                            setActiveDestination(dest);
                          }}
                          className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-900 text-white border-emerald-900 shadow-xs"
                              : "bg-white text-zinc-800 border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dest.imageUrl}
                              alt={dest.title}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 text-right">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-xs font-bold truncate ${
                                    isSelected ? "text-white" : "text-zinc-900"
                                  }`}
                                >
                                  {dest.title}
                                </h4>
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                    isSelected
                                      ? "bg-emerald-800 text-emerald-100"
                                      : "bg-zinc-100 text-zinc-600"
                                  }`}
                                >
                                  {dest.county}
                                </span>
                              </div>
                              <p
                                className={`text-[11px] truncate mt-0.5 ${
                                  isSelected
                                    ? "text-emerald-100"
                                    : "text-zinc-500"
                                }`}
                              >
                                📍 {dest.location} • {dest.duration}
                              </p>
                            </div>
                          </div>

                          <div className="text-left shrink-0 pr-2">
                            <div
                              className={`text-xs font-bold ${
                                isSelected ? "text-white" : "text-zinc-900"
                              }`}
                            >
                              {dest.price} تومان
                            </div>
                            <div
                              className={`text-[10px] ${
                                isSelected
                                  ? "text-emerald-200"
                                  : "text-zinc-500"
                              }`}
                            >
                              ★ {dest.rating}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-6 text-center text-zinc-500 text-xs">
                      <p className="font-medium text-zinc-700">
                        مقصدی پیدا نشد.
                      </p>
                      <p className="mt-1 text-zinc-400">
                        عباراتی مثل «ماسال»، «ماسوله»، «قلعه رودخان»، «لاهیجان»
                        یا «انزلی» را جستجو کنید.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="pt-2 mt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 px-1">
                  <span>روی نتیجه کلیک کنید تا در تصویر پیش‌نمایش شود</span>
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
            {[
              "ماسال",
              "قلعه رودخان",
              "ماسوله",
              "لاهیجان",
              "تالاب انزلی",
              "دیلمان",
            ].map((tag) => (
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

        {/* Left Side: Destination Image Holder */}
        <div className="relative h-[440px] sm:h-[520px] lg:h-[620px] w-full rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xl group text-right">
          <img
            src={activeDestination.imageUrl}
            alt={activeDestination.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

          {/* Top Tag & Status */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              ظرفیت تورهای این هفته باز است
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <span>★ {activeDestination.rating}</span>
              <span className="text-white/70">
                ({activeDestination.reviewsCount} نظر)
              </span>
            </div>
          </div>

          {/* Bottom Card Holder Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="inline-block px-3 py-1 rounded-lg bg-emerald-700/80 backdrop-blur-md text-xs font-bold text-white border border-emerald-500/30">
              {activeDestination.category} • استان گیلان (
              {activeDestination.county})
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-xs">
              {activeDestination.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 max-w-lg font-normal leading-relaxed">
              {activeDestination.highlight}
            </p>

            <div className="pt-3 flex items-center justify-between border-t border-white/20">
              <div>
                <span className="text-xs text-zinc-300 block">
                  شروع قیمت از
                </span>
                <span className="text-2xl font-black text-white">
                  {activeDestination.price}
                  <span className="text-xs font-normal text-zinc-300 mr-1.5">
                    {" "}
                    تومان / هر نفر
                  </span>
                </span>
              </div>

              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>مشاهده تمام تورها</span>
                <span className="rotate-180">←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
