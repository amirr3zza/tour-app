"use client";

import { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface GilanLastMinuteDeal {
  id: string;
  title: string;
  location: string;
  county: string;
  category: string;
  departureNotice: string;
  spotsLeft: number;
  originalPrice: string;
  discountPrice: string;
  discountPercentage: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
}

const LAST_MINUTE_DEALS: GilanLastMinuteDeal[] = [
  {
    id: "lm-1",
    title: "پیمایش ییلاق اولسبلنگاه و ارتفاعات مه‌آلود ماسال",
    location: "اولسبلنگاه",
    county: "ماسال",
    category: "ییلاقات و کوهستان",
    departureNotice: "حرکت تا ۳ روز دیگر",
    spotsLeft: 2,
    originalPrice: "۲,۲۰۰,۰۰۰",
    discountPrice: "۱,۴۳۰,۰۰۰",
    discountPercentage: 35,
    duration: "۲ روز و ۱ شب",
    groupSize: "حداکثر ۱۵ نفر",
    rating: 4.98,
    reviewsCount: 114,
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lm-2",
    title: "قایق‌سواری تالاب انزلی و اقامتگاه سنتی سقالکسار",
    location: "آبدنگاه و سقالکسار",
    county: "انزلی و رشت",
    category: "ساحل و تالاب",
    departureNotice: "حرکت تا ۵ روز دیگر",
    spotsLeft: 3,
    originalPrice: "۱,۶۰۰,۰۰۰",
    discountPrice: "۱,۱۲۰,۰۰۰",
    discountPercentage: 30,
    duration: "۲ روزه",
    groupSize: "حداکثر ۱۲ نفر",
    rating: 4.93,
    reviewsCount: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lm-3",
    title: "صعود به دژ قلعه رودخان و شکم‌گردی در رشت یونسکو",
    location: "حیدرآلات و شهرداری",
    county: "فومن و رشت",
    category: "جنگل و تاریخ",
    departureNotice: "حرکت جمعه همین هفته",
    spotsLeft: 1,
    originalPrice: "۱,۵۰۰,۰۰۰",
    discountPrice: "۹۹۰,۰۰۰",
    discountPercentage: 34,
    duration: "۱ روزه",
    groupSize: "حداکثر ۲۰ نفر",
    rating: 4.96,
    reviewsCount: 142,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lm-4",
    title: "تور عکاسی مزارع چای لاهیجان و جنگل مه دیلمان",
    location: "شیطان‌کوه و سیاهکل",
    county: "لاهیجان",
    category: "مزارع و بوم‌گردی",
    departureNotice: "حرکت تا ۴ روز دیگر",
    spotsLeft: 4,
    originalPrice: "۱,۸۵۰,۰۰۰",
    discountPrice: "۱,۲۹۰,۰۰۰",
    discountPercentage: 30,
    duration: "۲ روزه",
    groupSize: "حداکثر ۱۴ نفر",
    rating: 4.97,
    reviewsCount: 178,
    imageUrl:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lm-5",
    title: "دالان بهشتی جنگل گیسوم، آبشار ویسادار و ساحل خزر",
    location: "پره‌سر و پره‌سر تالش",
    county: "تالش",
    category: "جنگل و آبشار",
    departureNotice: "حرکت در ۶ روز آینده",
    spotsLeft: 2,
    originalPrice: "۲,۱۰۰,۰۰۰",
    discountPrice: "۱,۳۹۰,۰۰۰",
    discountPercentage: 34,
    duration: "۲ روز و ۱ شب",
    groupSize: "حداکثر ۱۵ نفر",
    rating: 4.95,
    reviewsCount: 96,
    imageUrl:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lm-6",
    title: "ییلاق سوباتان و دره رویایی آبشار ورزان تالش",
    location: "سوباتان تالش",
    county: "تالش",
    category: "ییلاقات بکر",
    departureNotice: "حرکت تا ۳ روز دیگر",
    spotsLeft: 1,
    originalPrice: "۲,۴۰۰,۰۰۰",
    discountPrice: "۱,۵۶۰,۰۰۰",
    discountPercentage: 35,
    duration: "۳ روز و ۲ شب",
    groupSize: "حداکثر ۱۰ نفر",
    rating: 4.99,
    reviewsCount: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
];

export default function LastMinuteCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(LAST_MINUTE_DEALS.length - 1);
  const [loaded, setLoaded] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rtl: true,
    slides: {
      perView: 1.15,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.15,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.15,
          spacing: 24,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      setMaxSlide(slider.track.details.maxIdx);
    },
    created(slider) {
      setLoaded(true);
      setMaxSlide(slider.track.details.maxIdx);
    },
    updated(slider) {
      setMaxSlide(slider.track.details.maxIdx);
    },
  });

  const canPrev = loaded && currentSlide > 0;
  const canNext = loaded && currentSlide < maxSlide;

  const handleClaimSpot = (id: string) => {
    setBookedId(id);
    setTimeout(() => {
      setBookedId(null);
    }, 2800);
  };

  return (
    <section id="last-minute" className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 bg-white font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wide border border-red-200/80 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              ظرفیت بسیار محدود • حرکت آخر این هفته
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
              فرصت‌های <span className="font-extrabold text-emerald-900">لحظه آخری گیلان</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl">
              صندلی‌های باقیمانده تورهای گیلان با تا ۴۰٪ تخفیف ویژه. اولویت با اولین پرداخت‌هاست.
            </p>
          </div>

          {/* Carousel Arrows (In RTL: Left arrow advances forward, Right arrow goes backward) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              disabled={!canPrev}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                canPrev
                  ? "border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400 active:scale-95 shadow-xs"
                  : "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-40"
              }`}
              aria-label="تور قبلی"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              disabled={!canNext}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                canNext
                  ? "border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400 active:scale-95 shadow-xs"
                  : "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-40"
              }`}
              aria-label="تور بعدی"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Keen Slider Carousel Container with native RTL */}
        <div
          ref={sliderRef}
          className="keen-slider py-2 cursor-grab active:cursor-grabbing select-none"
        >
          {LAST_MINUTE_DEALS.map((deal) => {
            const isBooked = bookedId === deal.id;
            return (
              <div
                key={deal.id}
                className="keen-slider__slide group relative rounded-3xl bg-zinc-50 border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col text-right"
              >
                {/* Image & Floating Badges */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      {deal.departureNotice}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                      ٪{deal.discountPercentage}-
                    </span>
                  </div>

                  {/* Bottom Badges on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-semibold border border-white/20">
                      {deal.category}
                    </span>

                    <span className="font-semibold text-[11px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-red-200 border border-red-400/30">
                      ⚡ فقط {deal.spotsLeft} صندلی خالی
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
                      <span>📍 استان گیلان، {deal.county}</span>
                      <span className="font-bold text-zinc-700 flex items-center gap-0.5">
                        ★ {deal.rating}
                        <span className="font-normal text-zinc-400">({deal.reviewsCount})</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 group-hover:text-emerald-900 transition-colors line-clamp-1">
                      {deal.title}
                    </h3>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 font-medium">
                      <span>⏱ {deal.duration}</span>
                      <span>•</span>
                      <span>👥 {deal.groupSize}</span>
                    </div>
                  </div>

                  {/* Price & Booking Action */}
                  <div className="pt-4 mt-4 border-t border-zinc-200/70 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-zinc-950">
                          {deal.discountPrice}
                        </span>
                        <span className="text-xs text-zinc-400 line-through">
                          {deal.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500 font-medium">تومان / هر نفر</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleClaimSpot(deal.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        isBooked
                          ? "bg-emerald-700 text-white"
                          : "bg-zinc-950 text-white hover:bg-emerald-900 active:scale-95"
                      }`}
                    >
                      {isBooked ? "✓ جایگاه رزرو شد!" : "رزرو صندلی"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        {loaded && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 bg-emerald-800"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
