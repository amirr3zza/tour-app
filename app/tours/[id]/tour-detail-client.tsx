"use client";

import { useState } from "react";
import Link from "next/link";
import { Tour, DepartureDate } from "@/app/data/tours";

interface TourDetailClientProps {
  tour: Tour;
  relatedTours: Tour[];
}

interface BookingDetails {
  trackingCode: string;
  fullName: string;
  phone: string;
  nationalCode: string;
  notes: string;
  selectedDate: DepartureDate;
  adultsCount: number;
  childrenCount: number;
  totalTravelers: number;
  totalPrice: number;
  discountAmount: number;
  createdAt: string;
}

export default function TourDetailClient({
  tour,
  relatedTours,
}: TourDetailClientProps) {
  // Gallery state
  const [activeImage, setActiveImage] = useState<string>(tour.imageUrl);

  // Reservation state
  const [selectedDate, setSelectedDate] = useState<DepartureDate>(
    tour.availableDates[0] || {
      id: "def",
      dateStr: "هفته جاری",
      dayOfWeek: "آخر هفته",
      remainingSpots: 6,
    }
  );
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  // Form Inputs
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [notes, setNotes] = useState("");

  // Discount code
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Reservation status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] =
    useState<BookingDetails | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Price calculations
  const totalTravelers = adultsCount + childrenCount;
  const basePricePerPerson = tour.price;
  const rawTotal = basePricePerPerson * adultsCount + (basePricePerPerson * 0.7 * childrenCount);
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalPrice = Math.max(0, rawTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "GILAN2026" || code === "SHOMAL") {
      setDiscountPercent(15);
      setCouponMessage({
        type: "success",
        text: "کد تخفیف ۱۵ درصدی با موفقیت اعمال شد!",
      });
    } else if (code === "BAHAR") {
      setDiscountPercent(10);
      setCouponMessage({
        type: "success",
        text: "کد تخفیف ۱۰ درصدی با موفقیت اعمال شد!",
      });
    } else {
      setCouponMessage({
        type: "error",
        text: "کد تخفیف نامعتبر یا منقضی شده است.",
      });
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errors.fullName = "لطفاً نام و نام خانوادگی معتبر وارد کنید";
    }
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود (مانند ۰۹۱۲۳۴۵۶۷۸۹)";
    }
    if (nationalCode.trim() && nationalCode.trim().length !== 10) {
      errors.nationalCode = "کد ملی مسافر باید ۱۰ رقم باشد";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode =
        "GLN-" + Math.floor(10000 + Math.random() * 90000).toString();
      setBookingConfirmed({
        trackingCode: randomCode,
        fullName: fullName.trim(),
        phone: phone.trim(),
        nationalCode: nationalCode.trim() || "ثبت در محل",
        notes: notes.trim(),
        selectedDate,
        adultsCount,
        childrenCount,
        totalTravelers,
        totalPrice: finalPrice,
        discountAmount,
        createdAt: new Date().toLocaleDateString("fa-IR"),
      });
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafc] font-sans text-right" dir="rtl">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="w-full bg-white border-b border-zinc-200/80 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-emerald-900 transition-colors">
              صفحه اصلی
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/tours" className="hover:text-emerald-900 transition-colors">
              تورهای گیلان
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {tour.shortTitle}
            </span>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-medium transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copiedLink ? "لینک کپی شد!" : "اشتراک‌گذاری"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                isSaved
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <svg
                className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : "fill-none"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{isSaved ? "نشان شده" : "نشان کردن"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Top Info Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs">
              {tour.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-xs">
              📍 گیلان، {tour.county} ({tour.location})
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs flex items-center gap-1">
              ★ {tour.rating}
              <span className="text-zinc-500 font-normal">({tour.reviewsCount} نظر تاییدشده مسافران)</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs">
              {tour.badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
            {tour.title}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed">
            {tour.highlight}
          </p>
        </div>

        {/* Gallery Section */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 h-[340px] sm:h-[440px] lg:h-[480px]">
            {/* Main Feature Image */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-sm group">
              <img
                src={activeImage}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 text-white">
                <span className="text-xs bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  تصویر واقعی از منطقه {tour.location}
                </span>
              </div>
            </div>

            {/* Thumbnail Column */}
            <div className="hidden lg:flex flex-col gap-3 h-full">
              {tour.gallery.map((img, idx) => {
                const isActive = activeImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative flex-1 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isActive ? "border-emerald-700 ring-2 ring-emerald-500/40" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${tour.title} - تصویر ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Thumbnails Row */}
          <div className="flex lg:hidden items-center gap-2.5 mt-3 overflow-x-auto pb-2">
            {tour.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === img ? "border-emerald-700" : "border-transparent opacity-70"
                }`}
              >
                <img src={img} alt="نمای کوچک" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* 2-Column Content Layout: Left details + Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Details (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Quick Fact Strip Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="text-zinc-400 text-xs font-medium">مدت سفر</div>
                <div className="mt-1 font-bold text-zinc-950 text-sm sm:text-base flex items-center gap-1.5">
                  <span>⏱</span>
                  <span>{tour.duration}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="text-zinc-400 text-xs font-medium">درجه سختی</div>
                <div className="mt-1 font-bold text-zinc-950 text-sm sm:text-base flex items-center gap-1.5">
                  <span>🏔</span>
                  <span>{tour.difficulty}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="text-zinc-400 text-xs font-medium">ظرفیت گروه</div>
                <div className="mt-1 font-bold text-zinc-950 text-sm sm:text-base flex items-center gap-1.5">
                  <span>👥</span>
                  <span>{tour.groupSize}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="text-zinc-400 text-xs font-medium">کنسلی</div>
                <div className="mt-1 font-bold text-emerald-800 text-sm sm:text-base flex items-center gap-1.5">
                  <span>✓</span>
                  <span>تا ۴۸ ساعت رایگان</span>
                </div>
              </div>
            </div>

            {/* Guide Card */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={tour.guide.avatarUrl}
                  alt={tour.guide.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-300 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-zinc-950 text-base">
                      {tour.guide.name}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-800 text-white">
                      راهنمای رسمی
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {tour.guide.role} • <span dir="ltr">{tour.guide.handle}</span>
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-md">
                    {tour.guide.bio}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <div className="text-xs text-zinc-500 text-left">امتیاز گردشگران</div>
                <div className="text-lg font-black text-emerald-950 text-left">
                  {tour.guide.rating} ★
                </div>
              </div>
            </div>

            {/* Overview / Story Section */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-800 rounded-full" />
                درباره این ماجراجویی در بهشت گیلان
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                {tour.fullDescription}
              </p>
            </section>

            {/* Step-by-Step Itinerary Timeline */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-800 rounded-full" />
                برنامه سفر و گشت‌های زمان‌بندی شده
              </h2>

              <div className="space-y-6 relative before:absolute before:right-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                {tour.itinerary.map((step, idx) => (
                  <div key={idx} className="relative pr-9">
                    {/* Timeline dot */}
                    <div className="absolute right-1 top-0.5 w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs ring-4 ring-emerald-100">
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {step.step}
                        </span>
                        {step.activityType && (
                          <span className="text-[11px] text-zinc-500">
                            🏷 {step.activityType}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-zinc-900">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Included & Excluded Grid */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-800 rounded-full" />
                خدمات تور و پذیرایی‌های سفر
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                      ✓
                    </span>
                    خدمات رایگان و شامل در پکیج
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                    {tour.includedServices.map((srv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold shrink-0">✓</span>
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meals */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                      🍽
                    </span>
                    وعده‌های غذایی اصیل بومی
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                    {tour.mealsIncluded.map((meal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 shrink-0">🍲</span>
                        <span>{meal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements & What to bring */}
              <div className="mt-8 pt-6 border-t border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-900 mb-3 flex items-center gap-1.5">
                  <span>🎒</span>
                  لوازم ضروری و توصیه‌شده برای همسفران
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tour.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200"
                    >
                      • {req}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-emerald-800 rounded-full" />
                  دیدگاه‌های مسافران قبلی ({tour.reviewsCount})
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold text-emerald-950">
                  <span>امتیاز کلی:</span>
                  <span className="text-amber-500">★ {tour.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {tour.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2 text-right"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-zinc-900 text-xs sm:text-sm">
                            {rev.author}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {rev.location ? `از ${rev.location}` : "مسافر تور"} • {rev.date}
                          </div>
                        </div>
                      </div>

                      <div className="text-amber-500 text-xs font-bold">
                        {"★".repeat(rev.rating)}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pt-1">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Booking & Reservation Card (4-5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-32">
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl p-6 sm:p-7 relative overflow-hidden">
              
              {/* Header Ribbon / Discount if any */}
              {tour.discountPercentage ? (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[11px] font-bold px-4 py-1 rounded-br-2xl shadow-xs">
                  تخفیف ویژه ٪{tour.discountPercentage}
                </div>
              ) : null}

              {/* Price Row */}
              <div className="mb-6 pb-5 border-b border-zinc-100">
                <span className="text-xs text-zinc-500 block mb-1">قیمت هر مسافر</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-zinc-950">
                    {tour.priceFormatted}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">تومان</span>
                  {tour.originalPriceFormatted && (
                    <span className="text-xs text-zinc-400 line-through mr-2">
                      {tour.originalPriceFormatted}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span>✓</span>
                  <span>تضمین کمترین قیمت بومی + رزرو مستقیم</span>
                </div>
              </div>

              {/* Reservation Form */}
              <form onSubmit={handleReservationSubmit} className="space-y-5">
                
                {/* 1. Date Selection */}
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-2">
                    ۱. تاریخ برگزاری و حرکت تور:
                  </label>
                  <div className="space-y-2">
                    {tour.availableDates.map((date) => {
                      const isSelected = selectedDate.id === date.id;
                      return (
                        <div
                          key={date.id}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "border-emerald-800 bg-emerald-50/70 shadow-2xs"
                              : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-emerald-800 bg-emerald-800"
                                  : "border-zinc-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-zinc-900">
                                {date.dateStr}
                              </div>
                              <div className="text-[10px] text-zinc-500">
                                {date.dayOfWeek}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                              date.remainingSpots <= 3
                                ? "bg-red-100 text-red-700"
                                : "bg-zinc-200/80 text-zinc-700"
                            }`}
                          >
                            {date.remainingSpots} صندلی خالی
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Number of Travelers Counters */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-900">
                        بزرگسال (۱۲ سال به بالا)
                      </div>
                      <div className="text-[10px] text-zinc-500">نرخ کامل</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-sm text-zinc-900">
                        {adultsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdultsCount(adultsCount + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60">
                    <div>
                      <div className="text-xs font-bold text-zinc-900">
                        کودک (۳ تا ۱۲ سال)
                      </div>
                      <div className="text-[10px] text-zinc-500">۳۰٪ تخفیف ویژه کودک</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-sm text-zinc-900">
                        {childrenCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Traveler Contact Information */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-zinc-900">
                    ۲. مشخصات مسافر اصلی جهت صدور بیمه و پیامک:
                  </label>

                  <div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="نام و نام خانوادگی کامل مسافر اصلی *"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-right ${
                        formErrors.fullName ? "border-red-400 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="شماره موبایل (مانند ۰۹۱۲۳۴۵۶۷۸۹) *"
                      dir="ltr"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-right ${
                        formErrors.phone ? "border-red-400 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                      placeholder="کد ملی مسافر (اختیاری جهت بیمه فوری)"
                      dir="ltr"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-right ${
                        formErrors.nationalCode ? "border-red-400" : "border-zinc-200"
                      }`}
                    />
                    {formErrors.nationalCode && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.nationalCode}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="یادداشت یا رژیم غذایی خاص (اختیاری)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all resize-none text-right"
                    />
                  </div>
                </div>

                {/* 4. Discount Code Box */}
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف (مثلاً GILAN2026)"
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800 text-right uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3.5 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-950 transition-colors cursor-pointer"
                    >
                      اعمال
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] mt-1 font-semibold ${
                        couponMessage.type === "success"
                          ? "text-emerald-700"
                          : "text-red-500"
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>
                      هزینه سفر ({totalTravelers} نفر مسافر):
                    </span>
                    <span className="font-bold text-zinc-900">
                      {rawTotal.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>تخفیف ویژه ({discountPercent}٪):</span>
                      <span>-{discountAmount.toLocaleString("fa-IR")} تومان</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                    <span>مبلغ نهایی قابل پرداخت:</span>
                    <span className="text-emerald-950 text-base">
                      {finalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-emerald-900 text-white font-extrabold text-sm sm:text-base hover:bg-emerald-800 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>در حال ثبت رزرو و بررسی ظرفیت...</span>
                    </>
                  ) : (
                    <>
                      <span>تایید و رزرو آنلاین جایگاه</span>
                      <span className="rotate-180">←</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-400 text-center leading-tight">
                  🔒 اطلاعات پرداخت مسافران در درگاه امن بانکی رمزنگاری می‌شود.
                </p>
              </form>
            </div>
          </div>

        </div>

        {/* Related / Alternative Tours */}
        {relatedTours.length > 0 && (
          <section className="mt-16 pt-12 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-zinc-950">
                  تورهای پیشنهادی دیگر در گیلان
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  مسافران این تور از این مقاصد نیز استقبال کرده‌اند
                </p>
              </div>
              <Link
                href="/tours"
                className="text-xs sm:text-sm font-bold text-emerald-900 hover:underline"
              >
                مشاهده همه تورها ←
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/tours/${rel.id}`}
                  className="group flex flex-col rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-2xs hover:shadow-md transition-all"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                      {rel.category}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold">
                      {rel.duration}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 group-hover:text-emerald-900 transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 truncate">
                        📍 گیلان، {rel.county} • ★ {rel.rating}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-950">
                        {rel.priceFormatted} تومان
                      </span>
                      <span className="text-xs font-semibold text-emerald-800">
                        مشاهده و رزرو ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Reservation Confirmation Modal */}
      {bookingConfirmed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          dir="rtl"
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-right">
            
            {/* Header Badge */}
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-center text-zinc-950">
              رزرو شما با موفقیت ثبت گردید!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 text-center mt-1">
              پیامک تایید حاوی اطلاعات راهنما و لوکیشن حرکت به شماره «{bookingConfirmed.phone}» ارسال شد.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-6 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <span className="text-zinc-500">کد پیگیری اختصاصی:</span>
                <span className="font-mono font-black text-emerald-950 text-base" dir="ltr">
                  {bookingConfirmed.trackingCode}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">عنوان تور:</span>
                <span className="font-bold text-zinc-900 truncate max-w-[200px]">
                  {tour.title}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">تاریخ حرکت:</span>
                <span className="font-bold text-zinc-900">
                  {bookingConfirmed.selectedDate.dateStr} ({bookingConfirmed.selectedDate.dayOfWeek})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">مسافر اصلی:</span>
                <span className="font-bold text-zinc-900">
                  {bookingConfirmed.fullName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">تعداد همراهان:</span>
                <span className="font-bold text-zinc-900">
                  {bookingConfirmed.totalTravelers} نفر ({bookingConfirmed.adultsCount} بزرگسال{bookingConfirmed.childrenCount > 0 ? ` + ${bookingConfirmed.childrenCount} کودک` : ""})
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-sm font-black">
                <span className="text-zinc-800">مبلغ پرداخت شده:</span>
                <span className="text-emerald-900 text-base">
                  {bookingConfirmed.totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            {/* Guide Info */}
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={tour.guide.avatarUrl}
                  alt={tour.guide.name}
                  className="w-9 h-9 rounded-full object-cover border border-emerald-300"
                />
                <div>
                  <div className="font-bold text-zinc-900">لیدر شما: {tour.guide.name}</div>
                  <div className="text-zinc-500 text-[11px]">پشتیبانی ۲۴ ساعته سفر</div>
                </div>
              </div>
              <a
                href={`tel:${tour.guide.phone || "09110000000"}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
              >
                تماس با راهنما
              </a>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingConfirmed(null)}
                className="flex-1 py-3 rounded-xl bg-emerald-900 text-white font-bold text-xs sm:text-sm hover:bg-emerald-800 transition-colors text-center cursor-pointer"
              >
                بستن و ادامه گشت‌وگذار
              </button>
              
              <Link
                href="/tours"
                className="px-4 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-bold text-xs sm:text-sm hover:bg-zinc-50 transition-colors text-center"
              >
                مشاهده سایر تورها
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
