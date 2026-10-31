"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface GilanTour {
  id: string;
  title: string;
  location: string;
  county: string;
  category: string;
  duration: string;
  price: number;
  priceFormatted: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  imageUrl: string;
  guide: {
    name: string;
    handle: string;
    avatarUrl: string;
    role: string;
  };
  highlight: string;
  mealsIncluded: string[];
  itinerary: string[];
}

const GILAN_CATEGORIES = [
  "همه تورها",
  "ییلاقات و ابر",
  "جنگل‌های هیرکانی",
  "ساحل و تالاب کاسپین",
  "روستاهای تاریخی",
  "شکم‌گردی رشت",
  "مزارع چای و بوم‌گردی",
  "آبشارها و دره‌ها",
  "کمپینگ و چادرخوابی",
  "کلبه‌های چوبی جنگلی",
  "تورهای خانوادگی",
  "عکاسی طبیعت",
] as const;

const GILAN_TOURS_DATA: GilanTour[] = [
  {
    id: "gilan-1",
    title: "پیمایش ییلاق اولسبلنگاه و ارتفاعات مه‌آلود ماسال",
    location: "اولسبلنگاه و سوچاله",
    county: "ماسال",
    category: "ییلاقات و ابر",
    duration: "۲ روز و ۱ شب",
    price: 1850000,
    priceFormatted: "۱,۸۵۰,۰۰۰",
    rating: 4.98,
    reviewsCount: 214,
    badge: "کنسلی رایگان",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "مهدی تالشی",
      handle: "@Mehdi.Taleshi",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای تخصصی ییلاقات تالش و ماسال",
    },
    highlight:
      "اقامت در کلبه‌های چوبی سنتی اولسبلنگاه بدون برق شهری، تماشای طلوع خورشید از روی اقیانوس متراکم ابر و صرف سرشیر و عسل تازه کوهی.",
    mealsIncluded: ["صبحانه محلی محلی سرشیر عسل", "ناهار کته کباب تالشی", "شام میرزاقاسمی ذغالی"],
    itinerary: [
      "حرکت از رشت به سمت ارتفاعات جنگلی ماسال",
      "صعود با نیسان‌های محلی به ییلاق اولسبلنگاه",
      "پیاده‌روی عصرگاهی در دشت شنبه‌راه و سوچاله",
      "شب‌نشینی دور آتش و موسیقی زنده تالشی",
      "تماشای اقیانوس طلوع ابر و بازگشت از جاده بام ماسال",
    ],
  },
  {
    id: "gilan-2",
    title: "قایق‌سواری اختصاصی تالاب انزلی و اقامتگاه سقالکسار",
    location: "تالاب انزلی و دریاچه سقالکسار",
    county: "بندرانزلی و رشت",
    category: "ساحل و تالاب کاسپین",
    duration: "۲ روزه",
    price: 1450000,
    priceFormatted: "۱,۴۵۰,۰۰۰",
    rating: 4.93,
    reviewsCount: 180,
    badge: "رزرو فوری",
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "سارا گیلانی",
      handle: "@Sara.Anzali",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      role: "طبیعت‌شناس تالاب و پرنده‌نگر",
    },
    highlight:
      "قایق‌رانی آرام در میان نیزارها و لاله‌های آبی تالاب انزلی، پیاده‌روی دورتادور دریاچه پاک سقالکسار و طعم چای هیزمی.",
    mealsIncluded: ["ناهار ماهی سفید دریای خزر و کته قالبی", "عصرانه چای محلی و باقلوای انزلی"],
    itinerary: [
      "حرکت به سمت اسکله تالاب بین‌المللی انزلی",
      "قایق‌سواری ۱.۵ ساعته در بخش پناهگاه حیات وحش سرخانکل",
      "صرف ناهار دریایی در رستوران سنتی روی آب",
      "عصر: بازدید از دریاچه جنگلی سقالکسار و عکاسی انعکاس درختان",
    ],
  },
  {
    id: "gilan-3",
    title: "تور شکم‌گردی در شهر خلاق خوراک‌شناسی یونسکو رشت",
    location: "بازار سنتی و پیاده‌راه شهرداری",
    county: "رشت",
    category: "شکم‌گردی رشت",
    duration: "۱ روزه",
    price: 890000,
    priceFormatted: "۸۹۰,۰۰۰",
    rating: 4.99,
    reviewsCount: 310,
    badge: "پرفروش‌ترین",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "نیما رشتی",
      handle: "@Nima.RashtFood",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای میراث غذایی و سرآشپز بومی",
    },
    highlight:
      "کشف عطر و طعم ۲۲۰ نوع غذای سنتی ثبت‌شده رشت در بازار کهن ماهی‌فروشان، تست گرم میرزاقاسمی، ترش تره، باقلاقاتوق و رشته‌خشکار داغ.",
    mealsIncluded: ["صبحانه املت شاپوری در چایخانه حاج حسین", "ناهار کته کباب ترش با اشپل و گردو", "تست رشته‌خشکار طاهر"],
    itinerary: [
      "آغاز گشت صبحگاهی در میدان شهرداری سنگفرش و کاروانسرای طاقی بزرگ",
      "گشت ادویه‌فروشان، سبزی‌های معطر چوچاق و خالواش در بازار رشت",
      "کارگاه عملی تهیه میرزاقاسمی با بادمجان کبابی روی هیزم",
      "پایان با دورهمی در کافه‌های نوستالژیک سبزه میدان",
    ],
  },
  {
    id: "gilan-4",
    title: "فتح دژ قلعه رودخان و جنگل‌های مه تاریک فومن",
    location: "حیدرآلات و دژ حسامی",
    county: "فومن",
    category: "جنگل‌های هیرکانی",
    duration: "۱ روزه",
    price: 950000,
    priceFormatted: "۹۵۰,۰۰۰",
    rating: 4.97,
    reviewsCount: 250,
    badge: "کنسلی رایگان",
    imageUrl:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "امیرحسین فومنی",
      handle: "@Amir.Rudkhan",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای باستان‌شناسی و جنگل‌پیمایی",
    },
    highlight:
      "پیمایش هزار پله سنگی در دل جنگل هیرکانی پوشیده از خزه، فتح بزرگ‌ترین دژ آجری نظامی ایران و خرید کلوچه فومن گرم و تازه.",
    mealsIncluded: ["ناهار دیزی سنتی سفالی در آلاچیق‌های جنگلی", "کلوچه داغ فومن با چای دارچین"],
    itinerary: [
      "ورود به پارک جنگلی قلعه رودخان و آغاز مسیر پله‌ها",
      "توقف در ایستگاه‌های آب انار جنگلی و تمشک تازه",
      "ورود به دروازه اصلی دژ، برج‌های دیده‌بانی و ارگ مرکزی",
      "عکاسی پانوراما از جنگل‌های هیرکانی زیر مه",
      "توقف در شهر فومن و بازدید از مجسمه‌های تاریخی",
    ],
  },
  {
    id: "gilan-5",
    title: "مزارع سبز چای لاهیجان و جنگل‌های کوهستانی دیلمان",
    location: "شیطان‌کوه، لونک و دیلمان",
    county: "لاهیجان و سیاهکل",
    category: "مزارع چای و بوم‌گردی",
    duration: "۲ روز و ۱ شب",
    price: 1750000,
    priceFormatted: "۱,۷۵۰,۰۰۰",
    rating: 4.96,
    reviewsCount: 198,
    badge: "پیشنهاد ویژه",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "الهام لاهیجانی",
      handle: "@Elham.TeaMaster",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      role: "کارشناس چای ارگانیک و بوم‌گردی",
    },
    highlight:
      "چیدن دستی برگ‌های لطیف چای بهاره در تپه‌های سبز، تله‌کابین بر فراز استخر لاهیجان، گذر از آبشار لونک و اقامت شبانه در ییلاق دیلمان.",
    mealsIncluded: ["صبحانه کره محلی و نان خلفه", "ناهار مرغ ترش گیلکی با برنج طارم هاشمی", "شام کباب چنجه دیلمانی"],
    itinerary: [
      "پیاده‌روی صبحگاهی در باغات چای و آموزش فرآوری سنتی چای",
      "سوار شدن بر تله‌کابین احرار و تماشای وسعت لاهیجان",
      "حرکت در جاده بهشتی سیاهکل به دیلمان و توقف در آبشار لونک",
      "اقامت شبانه در اقامتگاه بوم‌گردی کاهگلی با چشم‌انداز دشت دیلمان",
    ],
  },
  {
    id: "gilan-6",
    title: "روستای تاریخی و کهن ماسوله و آبشار کوشم",
    location: "ماسوله و دره خلیل‌دشت",
    county: "فومن",
    category: "روستاهای تاریخی",
    duration: "۱ روزه",
    price: 850000,
    priceFormatted: "۸۵۰,۰۰۰",
    rating: 4.95,
    reviewsCount: 260,
    badge: "کنسلی رایگان",
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "فرشاد ماسوله‌ای",
      handle: "@Farshad.Masouleh",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای بومی معماری تاریخی ماسوله",
    },
    highlight:
      "گشت در پشت‌بام خانه‌های زرد رنگ که حیاط خانه بالایی است، عکاسی با لباس‌های سنتی تالشی، پیاده‌روی جنگلی تا آبشار زیبای کوشم.",
    mealsIncluded: ["ناهار فسنجان محلی با اردک و رب انار ترش", "چای قندپه‌لو در بام سنتی"],
    itinerary: [
      "ورود به دره ماسوله در مه صبحگاهی",
      "پیاده‌روی در چهار سطح بازار سنتی ماسوله و کارگاه‌های چاقوسازی",
      "پیمایش سبک ۴۰ دقیقه‌ای در مسیر آبشار کوشم",
      "خرید سوغات: چموش دوزی، عروسک‌های بافتنی و گلاب کوهی",
    ],
  },
  {
    id: "gilan-7",
    title: "ییلاق سوباتان تالش و دشت شقایق‌های ورزان",
    location: "سوباتان، دره ورزان و لیسار",
    county: "تالش",
    category: "ییلاقات و ابر",
    duration: "۳ روز و ۲ شب",
    price: 2600000,
    priceFormatted: "۲,۶۰۰,۰۰۰",
    rating: 4.99,
    reviewsCount: 165,
    badge: "رزرو فوری",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "رامین سوباتانی",
      handle: "@Ramin.Soubatan",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      role: "سرپرست برنامه‌های آفرود و کوهستان تالش",
    },
    highlight:
      "سفر به یکی از بکرترین ییلاقات ایران با پاترول و نیسان، پیمایش دره آبشار خروشان ورزان، اسب‌سواری در مراتع سرسبز و خواب در چادرهای عشایری پاتوق.",
    mealsIncluded: ["تمام وعده‌ها بر پایه خوراک عشایر تالش: پنیر کوزه، کباب بره و سوجادوق"],
    itinerary: [
      "حرکت آفرودی از لیسار تالش به سمت خط الراس سوباتان",
      "اسکان در کلبه‌های تخته‌ای ییلاق گزنه هونی",
      "پیمایش تا آبشار ۶۰ متری ورزان و غار گنج‌خانه",
      "دیدار با عشایر تالش و تجربه دوشیدن شیر و کره محلی",
      "بازگشت از جاده کم‌نظیر سوباتان به دریاچه نئور",
    ],
  },
  {
    id: "gilan-8",
    title: "آبشار خروشان ویسادار و تونل جنگلی گیسوم تا دریا",
    location: "پره‌سر و پره‌سر تالش",
    county: "تالش و رضوانشهر",
    category: "آبشارها و دره‌ها",
    duration: "۱ روزه",
    price: 990000,
    priceFormatted: "۹۹۰,۰۰۰",
    rating: 4.94,
    reviewsCount: 175,
    badge: "کنسلی رایگان",
    imageUrl:
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "کیوان رضوانشهری",
      handle: "@Keyvan.Visadar",
      avatarUrl:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      role: "طبیعت‌گرد و لیدر آبشارهای شمال",
    },
    highlight:
      "شگفتی دیواره‌های لایه‌لایه سنگی آبشار ویسادار که آب از ارتفاع ۱۵ متری درون حوضچه فیروزه‌ای می‌ریزد، همراه با عبور از دالان درختان گیسوم تا ساحل صدف.",
    mealsIncluded: ["ناهار جوجه کباب جنگلی با کته و مخلفات ترش"],
    itinerary: [
      "حرکت صبحگاهی به سمت جنگل‌های پره‌سر",
      "ایستادن روی پل فلزی معلق روبروی آبشار ویسادار و عکاسی",
      "رانندگی آرام در تونل فوق‌العاده درختان گیسوم",
      "استراحت عصرگاهی در ساحل شنی گیسوم و قایق‌سواری موتوری",
    ],
  },
  {
    id: "gilan-9",
    title: "جنگل رویایی سراوان، قایق قورباغه‌ای و روستای استخرگاه",
    location: "سراوان و استخرگاه رودبار",
    county: "رشت و رودبار",
    category: "کلبه‌های چوبی جنگلی",
    duration: "۱ روزه",
    price: 880000,
    priceFormatted: "۸۸۰,۰۰۰",
    rating: 4.96,
    reviewsCount: 190,
    badge: "پیشنهاد ویژه",
    imageUrl:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "حسین حسینی",
      handle: "@Hossein.Saravan",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "لیدر اکوتوریسم گیلان",
    },
    highlight:
      "قایق‌سواری روی مرداب سراوان که با فرشی از خزه‌های زمردین پوشیده شده، و سفر به روستای استخرگاه (خانه روی آب زیر کوهستان درفک).",
    mealsIncluded: ["ناهار شامی رودباری سنتی با روغن زیتون اعلا", "زیتون پرورده اصل رودبار"],
    itinerary: [
      "حضور در پارک جنگلی سراوان و قایق‌سواری روی آب سبز مرداب",
      "بازدید از موزه میراث روستایی گیلان (معماری اصیل ۱۰۰ سال پیش)",
      "عصر: حرکت به روستای استخرگاه رودبار و عکاسی کلبه چوبی روی دریاچه",
    ],
  },
  {
    id: "gilan-10",
    title: "ساحل شنی چمخاله و تالاب نیلوفرهای لنگرود",
    location: "چمخاله و لیلاکوه",
    county: "لنگرود",
    category: "ساحل و تالاب کاسپین",
    duration: "۲ روز و ۱ شب",
    price: 1350000,
    priceFormatted: "۱,۳۵۰,۰۰۰",
    rating: 4.92,
    reviewsCount: 145,
    badge: "کنسلی رایگان",
    imageUrl:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "مهرداد لنگرودی",
      handle: "@Mehrdad.Langroud",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای گردشگری شرق گیلان",
    },
    highlight:
      "اقامت در هتل‌های ساحلی تمیزترین ساحل گیلان (چمخاله)، شب‌نشینی کنار موج‌های آرام خزر، و نوشیدن چای در کوهستان باغات مرکبات لیلاکوه.",
    mealsIncluded: ["صبحانه سلف سرویس ساحلی", "ناهار کباب ماهی قزل‌آلا و زیتون پرورده"],
    itinerary: [
      "ورود به لنگرود و عبور از پل خشتی تاریخی ساسانی",
      "صعود تفریحی به تپه‌های باغات مرکبات لیلاکوه",
      "استقرار در ساحل مجهز چمخاله و تفریحات دریایی جت اسکی",
      "شب‌نشینی و آتش‌بازی ملایم کنار ساحل خزر",
    ],
  },
  {
    id: "gilan-11",
    title: "بهشت چابکسر، روستای سرولات و طعم خاورخانم",
    location: "سرولات و لیمنجوب",
    county: "رودسر",
    category: "شکم‌گردی رشت",
    duration: "۱ روزه",
    price: 920000,
    priceFormatted: "۹۲۰,۰۰۰",
    rating: 4.98,
    reviewsCount: 280,
    badge: "پرفروش‌ترین",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "بهار رودسری",
      handle: "@Bahar.Sarvelat",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای محلی شرق گیلان و شکم‌گردی",
    },
    highlight:
      "تجربه کم‌نظیر کوتاه‌ترین فاصله کوهستان جنگلی با دریای خزر در چابکسر، ناهار اسطوره‌ای کباب ترش و مرغ شکم‌پر در بالکن رو به دره سرولات.",
    mealsIncluded: ["ناهار شاهانه در رستوران خاورخانم با باقلاقاتوق و ترش کباب", "آب نارنج و پرتقال تازه"],
    itinerary: [
      "حرکت از جاده ساحلی رودسر به سمت دامنه‌های سبز چابکسر",
      "بالا رفتن از جاده کوهستانی پرپیچ‌وخم دره آچیرود تا سرولات",
      "صرف ناهار اصیل محلی با چشم‌انداز خیره‌کننده دره جنگلی تا دریای خزر",
      "خرید سوغات پرتقال، چای بهاره و رب انار جنگلی خانگی",
    ],
  },
  {
    id: "gilan-12",
    title: "صعود به قله درفک (بام گیلان) و غار یخی آتشفشانی",
    location: "رستم‌آباد و توتکابن",
    county: "رودبار",
    category: "جنگل‌های هیرکانی",
    duration: "۲ روز و ۱ شب",
    price: 2100000,
    priceFormatted: "۲,۱۰۰,۰۰۰",
    rating: 4.97,
    reviewsCount: 130,
    badge: "رزرو فوری",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    guide: {
      name: "آرش درفکی",
      handle: "@Arash.Dorfak",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "مربی فدراسیون کوهنوردی و هیمالیانورد",
    },
    highlight:
      "صعود به قله ۲۷۰۰ متری درفک، دیدن کاسه آتشفشانی که کل گیلان زیر پایتان در ابرها شناور است و ورود به دهانه غار یخی دائمی درفک.",
    mealsIncluded: ["صبحانه کوهستانی املت ذغالی", "غذای گرم کوهنوردی پرکالری", "چای آویشن کوهی"],
    itinerary: [
      "حرکت نیسان‌سواری از شیرکوه تا دشت لارنه",
      "پیمایش جنگلی میان درختان راش کهنسال تا کاسه قله",
      "کمپینگ شبانه زیر سقف کهکشان راه شیری در کاسه درفک",
      "طلوع آفتاب بر فراز اقیانوس بیکران ابر گیلان و قله سماموس",
    ],
  },
];

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه تورها");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [savedTourIds, setSavedTourIds] = useState<Set<string>>(new Set());
  const [activeModalTour, setActiveModalTour] = useState<GilanTour | null>(null);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const toggleSave = (tourId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTourIds((prev) => {
      const next = new Set(prev);
      if (next.has(tourId)) {
        next.delete(tourId);
      } else {
        next.add(tourId);
      }
      return next;
    });
  };

  const filteredTours = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GILAN_TOURS_DATA.filter((tour) => {
      const matchesCategory =
        selectedCategory === "همه تورها" || tour.category === selectedCategory;

      const matchesPrice = tour.price <= maxPrice;

      const matchesQuery =
        !q ||
        tour.title.toLowerCase().includes(q) ||
        tour.location.toLowerCase().includes(q) ||
        tour.county.toLowerCase().includes(q) ||
        tour.category.toLowerCase().includes(q) ||
        tour.guide.name.toLowerCase().includes(q) ||
        tour.guide.handle.toLowerCase().includes(q) ||
        tour.highlight.toLowerCase().includes(q);

      return matchesCategory && matchesPrice && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const handleBook = (tour: GilanTour) => {
    setBookingSuccessId(tour.id);
    setTimeout(() => {
      setBookingSuccessId(null);
      setActiveModalTour(null);
    }, 2200);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-right" dir="rtl">
      {/* Search & Filter Bar Section */}
      <section className="w-full pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-zinc-100 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 self-start sm:self-center">
            <Link href="/" className="hover:text-emerald-800 transition-colors">
              صفحه اصلی
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-emerald-950 font-bold">تورهای استان گیلان</span>
          </nav>

          {/* Centered Search Pill with Filter Icon Button */}
          <div className="w-full max-w-2xl flex items-center gap-3">
            {/* Search Input Pill */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در تورهای گیلان (مثلاً ماسال، لاهیجان، قلعه رودخان، انزلی)..."
                className="w-full h-13 pr-6 pl-12 rounded-full bg-[#f1f1f5] text-zinc-900 placeholder:text-zinc-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all shadow-2xs text-right"
              />
              
              {/* Search Icon on Left (RTL) */}
              <button
                type="button"
                className="absolute left-4 p-1.5 text-zinc-600 hover:text-emerald-950 transition-colors cursor-pointer"
                aria-label="جستجو"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-13 h-13 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                isFilterOpen
                  ? "bg-emerald-900 text-white"
                  : "bg-[#f1f1f5] text-zinc-700 hover:bg-zinc-200"
              }`}
              aria-label="تنظیمات فیلتر"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M7 12h10M10 18h4" />
              </svg>
            </button>
          </div>

          {/* Expandable Filter Drawer */}
          {isFilterOpen && (
            <div className="w-full max-w-2xl mt-4 p-5 rounded-2xl bg-[#f8f8fa] border border-zinc-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Max Price Range */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-1.5">
                    <span>حداکثر بودجه هر نفر:</span>
                    <span className="font-extrabold text-emerald-900">{maxPrice.toLocaleString("fa-IR")} تومان</span>
                  </div>
                  <input
                    type="range"
                    min="800000"
                    max="3000000"
                    step="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-emerald-800 cursor-pointer"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-600">مرتب‌سازی:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "popular" | "price-asc" | "price-desc" | "rating"
                      )
                    }
                    className="text-xs font-semibold bg-white px-3 py-1.5 rounded-xl border border-zinc-200 text-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                  >
                    <option value="popular">محبوب‌ترین تورها</option>
                    <option value="rating">بالاترین امتیاز مسافران</option>
                    <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
                    <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
                  </select>
                </div>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => {
                    setMaxPrice(3000000);
                    setSelectedCategory("همه تورها");
                    setSearchQuery("");
                    setSortBy("popular");
                  }}
                  className="text-xs font-semibold text-zinc-500 hover:text-emerald-900 underline underline-offset-4 cursor-pointer"
                >
                  بازنشانی فیلترها
                </button>
              </div>
            </div>
          )}

          {/* Cloud of Category Pills */}
          <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {GILAN_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-emerald-900 text-white shadow-xs"
                      : "bg-[#f1f1f5] text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Content: Tours Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              تورهای پرطرفدار گیلان
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              نمایش {filteredTours.length} سفر برگزیده در سراسر استان سرسبز گیلان
              {selectedCategory !== "همه تورها" && ` • دسته: ${selectedCategory}`}
            </p>
          </div>

          {selectedCategory !== "همه تورها" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("همه تورها")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>✕ {selectedCategory}</span>
            </button>
          )}
        </div>

        {/* 3-Column Cards Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {filteredTours.map((tour) => {
              const isSaved = savedTourIds.has(tour.id);
              return (
                <article
                  key={tour.id}
                  onClick={() => setActiveModalTour(tour)}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Top Thumbnail Image Container */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 shadow-2xs group-hover:shadow-md transition-all">
                    <img
                      src={tour.imageUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    {/* Top-Right Badge: e.g. "♥ کنسلی رایگان" */}
                    <button
                      type="button"
                      onClick={(e) => toggleSave(tour.id, e)}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 transition-transform active:scale-90"
                      aria-label="نشان کردن تور"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-colors ${
                          isSaved ? "fill-red-500 text-red-500" : "fill-none text-white"
                        }`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{tour.badge}</span>
                    </button>

                    {/* Bottom-Left Pill Badge: Duration */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[11px] font-bold tracking-wide">
                      {tour.duration}
                    </div>
                  </div>

                  {/* Below Image Metadata */}
                  <div className="mt-3.5 flex items-start gap-3">
                    {/* Guide Circular Avatar */}
                    <img
                      src={tour.guide.avatarUrl}
                      alt={tour.guide.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-zinc-200 mt-0.5"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-zinc-950 group-hover:text-emerald-900 transition-colors line-clamp-1 leading-snug">
                        {tour.title}
                      </h3>

                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                        <span className="font-semibold text-emerald-800">{tour.guide.handle}</span>
                        <span className="mx-1.5">•</span>
                        <span>{tour.category}</span>
                      </p>

                      <div className="mt-2 flex items-center justify-between text-xs pt-1.5 border-t border-zinc-100">
                        <div className="flex items-baseline gap-1">
                          <span className="font-extrabold text-zinc-950 text-sm">{tour.priceFormatted}</span>
                          <span className="text-zinc-500 text-[11px]">تومان / نفر</span>
                        </div>

                        <div className="flex items-center gap-1 text-zinc-600">
                          <span className="text-amber-500 font-bold">★</span>
                          <span className="font-bold text-zinc-800">{tour.rating}</span>
                          <span className="text-zinc-400">({tour.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 text-2xl">
              🌿
            </div>
            <h3 className="text-lg font-bold text-zinc-900">توری با این مشخصات در گیلان یافت نشد</h3>
            <p className="mt-1 text-sm text-zinc-500">
              لطفاً عنوان جستجو را تغییر دهید یا سقف بودجه فیلتر را افزایش دهید.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("همه تورها");
                setMaxPrice(3000000);
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer"
            >
              مشاهده دوباره همه تورهای گیلان
            </button>
          </div>
        )}
      </main>

      {/* Tour Detail & Quick Booking Modal */}
      {activeModalTour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalTour(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-right"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalTour(null)}
              className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="بستن پنجره"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-6">
              <img
                src={activeModalTour.imageUrl}
                alt={activeModalTour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-emerald-800/90 backdrop-blur-md text-white text-xs font-bold border border-emerald-500/30">
                  {activeModalTour.badge}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 left-4 text-white">
                <div className="text-xs font-semibold text-emerald-200">
                  {activeModalTour.category} • استان گیلان، {activeModalTour.county}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-1">
                  {activeModalTour.title}
                </h3>
              </div>
            </div>

            {/* Guide Info Strip */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={activeModalTour.guide.avatarUrl}
                  alt={activeModalTour.guide.name}
                  className="w-12 h-12 rounded-full object-cover border border-emerald-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">{activeModalTour.guide.name}</h4>
                  <p className="text-xs text-zinc-600">{activeModalTour.guide.role} • {activeModalTour.guide.handle}</p>
                </div>
              </div>

              <div className="text-left">
                <div className="text-xs text-zinc-500">مدت زمان تور</div>
                <div className="text-sm font-bold text-emerald-950">{activeModalTour.duration}</div>
              </div>
            </div>

            {/* Tour Highlights & Meals */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5">
                  درباره این سفر گیلان
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed font-normal">
                  {activeModalTour.highlight}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                  وعده‌های غذایی بومی پذیرایی
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalTour.mealsIncluded.map((meal, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200">
                      🍽 {meal}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                  برنامه زمان‌بندی و گشت‌ها
                </h4>
                <div className="space-y-2">
                  {activeModalTour.itinerary.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Success Booking Notice */}
            {bookingSuccessId === activeModalTour.id && (
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold text-center animate-in fade-in duration-150">
                ✓ جایگاه شما در تور «{activeModalTour.title}» با موفقیت رزرو شد! پیامک تایید ارسال گردید.
              </div>
            )}

            {/* Pricing & Booking Footer */}
            <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">هزینه نهایی هر مسافر</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-zinc-950">{activeModalTour.priceFormatted}</span>
                  <span className="text-xs text-zinc-500 font-semibold">تومان</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => toggleSave(activeModalTour.id, e)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    savedTourIds.has(activeModalTour.id)
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
                  aria-label="نشان کردن تور"
                >
                  <svg
                    className={`w-5 h-5 ${
                      savedTourIds.has(activeModalTour.id) ? "fill-red-500" : "fill-none"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleBook(activeModalTour)}
                  disabled={bookingSuccessId === activeModalTour.id}
                  className="px-6 py-3 rounded-xl bg-emerald-900 text-white text-sm font-bold hover:bg-emerald-800 active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  {bookingSuccessId === activeModalTour.id ? "جایگاه رزرو شد!" : "رزرو آنلاین جایگاه"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
