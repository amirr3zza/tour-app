export interface TourGuide {
  name: string;
  handle: string;
  avatarUrl: string;
  role: string;
  bio?: string;
  phone?: string;
  rating?: number;
}

export interface ItineraryStep {
  step: string;
  title: string;
  description: string;
  time?: string;
  activityType?: string;
}

export interface DepartureDate {
  id: string;
  dateStr: string;
  dayOfWeek: string;
  remainingSpots: number;
  isFull?: boolean;
}

export interface TourReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
  location?: string;
}

export interface Tour {
  id: string;
  aliases?: string[];
  title: string;
  shortTitle: string;
  location: string;
  county: string;
  category:
    | "ییلاقات و ابر"
    | "جنگل‌های هیرکانی"
    | "ساحل و تالاب کاسپین"
    | "روستاهای تاریخی"
    | "شکم‌گردی رشت"
    | "مزارع چای و بوم‌گردی"
    | "آبشارها و دره‌ها"
    | "کلبه‌های چوبی جنگلی";
  duration: string;
  durationDays: number;
  difficulty: "آسان" | "متوسط" | "نیمه‌سنگین" | "طبیعت‌گردی سبک";
  groupSize: string;
  transportation: string;
  price: number;
  priceFormatted: string;
  originalPrice?: number;
  originalPriceFormatted?: string;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  imageUrl: string;
  gallery: string[];
  guide: TourGuide;
  highlight: string;
  fullDescription: string;
  mealsIncluded: string[];
  includedServices: string[];
  excludedServices: string[];
  requirements: string[];
  itinerary: ItineraryStep[];
  availableDates: DepartureDate[];
  reviews: TourReview[];
}

export const TOURS_DATA: Tour[] = [
  {
    id: "masal-clouds",
    aliases: ["gilan-1", "lm-1"],
    title: "پیمایش ییلاق اولسبلنگاه و ارتفاعات مه‌آلود ماسال",
    shortTitle: "ییلاق اولسبلنگاه ماسال",
    location: "اولسبلنگاه و سوچاله",
    county: "ماسال",
    category: "ییلاقات و ابر",
    duration: "۲ روز و ۱ شب",
    durationDays: 2,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۶ نفر",
    transportation: "میدل‌باس توریستی VIP + نیسان محلی برای صعود ییلاقی",
    price: 1850000,
    priceFormatted: "۱,۸۵۰,۰۰۰",
    originalPrice: 2200000,
    originalPriceFormatted: "۲,۲۰۰,۰۰۰",
    discountPercentage: 16,
    rating: 4.98,
    reviewsCount: 240,
    badge: "پرفروش‌ترین و محبوب‌ترین",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "مهدی تالشی",
      handle: "@Mehdi.Taleshi",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای رسمی طبیعت‌گردی تالش و ماسال",
      bio: "بومی تالش با بیش از ۱۲ سال سابقه پیمایش دشت‌ها، خط‌الراس‌های هیرکانی و ییلاقات مرتفع گیلان.",
      phone: "۰۹۱۲۹۹۹۴۴۲۱",
      rating: 4.99,
    },
    highlight:
      "اقامت رویایی در کلبه‌های تخته‌ای اولسبلنگاه بدون آلودگی نوری، تماشای طلوع آفتاب بر فراز اقیانوس متراکم ابر و صرف سرشیر و عسل تازه کوهی همراه با موسیقی نی تالشی.",
    fullDescription:
      "ماسال، سرزمین آبشارها و ییلاقات افسانه‌ای در غرب استان گیلان است. در این برنامه اختصاصی، شما پس از گذر از جنگل‌های بکر راش و ممرز با نیسان‌های ییلاقی، به ارتفاع ۱۸۰۰ متری ییلاق اولسبلنگاه و سوچاله خواهید رسید. شب را در کلبه‌های چوبی سنتی بدون دکل‌های برق شهری با گرمای بخاری هیزمی و تماشای ستارگان سپری می‌کنید. صبحگاهان، با گشودن پنجره‌های چوبی، دریایی از ابرهای سفید زیر پاهایتان گسترده خواهد بود.",
    mealsIncluded: [
      "صبحانه محلی با سرشیر طبیعی و عسل وحشی ماسال",
      "ناهار کته کباب تالشی با مخلفات محلی زیتون پرورده و باقلا",
      "شام میرزاقاسمی ذغالی سنتی کنار آتش",
      "صبحانه روز دوم با پنیر سیاهمزگی و نان گرم تنوری",
    ],
    includedServices: [
      "ترانسفر رفت و برگشت میدل‌باس توریستی VIP از رشت",
      "ترانسفر محلی پاترول و نیسان تا ارتفاعات اولسبلنگاه",
      "یک شب اقامت اختصاصی در کلبه چوبی سنتی ییلاقی",
      "بیمه حوادث و مسئولیت مدنی گردشگری سامان",
      "راهنمای رسمی وزارت گردشگری و لیدر محلی تالشی",
      "پذیرایی میان‌وعده، دمنوش‌های کوهی و چای ذغالی نامحدود",
    ],
    excludedServices: [
      "هزینه اسب‌سواری تفریحی در مراتع سوچاله (اختیاری)",
      "خریدهای شخصی و سوغات (عسل و لبنیات محلی)",
    ],
    requirements: [
      "کفش مناسب کوه‌پیمایی سبک یا ترکینگ",
      "لباس گرم، کاپشن بادگیر یا پلار (هوای ییلاق شب‌ها خنک است)",
      "کارت شناسایی معتبر مسافر (کارت ملی)",
      "داروهای شخصی و پاوربانک",
    ],
    itinerary: [
      {
        step: "روز اول - ۰۷:۳۰ صبح",
        title: "تجمع و حرکت از رشت به سمت بام سبز ماسال",
        description:
          "دیدار همسفران، صرف صبحانه در مسیر جاده صومعه‌سرا و ورود به دره زیبای ماسال در کنار رودخانه خالکایی.",
        activityType: "ترانسفر و طبیعت",
      },
      {
        step: "روز اول - ۱۲:۰۰ ظهر",
        title: "صعود ییلاقی و تحویل کلبه‌های چوبی اولسبلنگاه",
        description:
          "انتقال بارها به نیسان‌های محلی، صعود به ارتفاعات مه‌آلود، اسکان در کلبه‌ها و صرف ناهار کته کباب سنتی تالشی.",
        activityType: "اسکان و ناهار",
      },
      {
        step: "روز اول - ۱۶:۳۰ عصر",
        title: "پیمایش مراتع سوچاله و تماشای غروب خورشید",
        description:
          "پیاده‌روی سبک در اقیانوس دشت‌های سبز، عکاسی از معماری کلبه‌ها و غرق شدن در مه غلیظ عصرگاهی ماسال.",
        activityType: "عکاسی و پیاده‌روی",
      },
      {
        step: "روز اول - ۲۰:۳۰ شب",
        title: "شب‌نشینی دور آتش، چای آتشی و نوای نی تالشی",
        description:
          "صرف شام محلی میرزاقاسمی، گپ‌وگفت همسفران در سکوت بی‌نظیر کوهستان و رصد آسمان پرستاره.",
        activityType: "دورهمی و موسیقی",
      },
      {
        step: "روز دوم - ۰۶:۰۰ صبح",
        title: "شکار طلوع خورشید و اقیانوس بیکران ابر",
        description:
          "دیدن رویایی‌ترین پدیده طبیعی ایران؛ پرواز ابرها زیر نور خورشید زرین، صرف صبحانه با سرشیر و عسل طبیعی ماسال.",
        activityType: "شگفتی طبیعت",
      },
      {
        step: "روز دوم - ۱۵:۰۰ عصر",
        title: "خرید سوغات و بازگشت به سمت رشت",
        description:
          "فرود از ییلاق، توقف در بازار سنتی ماسال برای خرید عسل و گیاهان دارویی و بازگشت با آرامش خاطر به رشت.",
        activityType: "بازگشت",
      },
    ],
    availableDates: [
      { id: "d1", dateStr: "پنج‌شنبه ۱۵ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 4 },
      { id: "d2", dateStr: "چهارشنبه ۲۱ آبان", dayOfWeek: "تعطیلات آخر هفته", remainingSpots: 7 },
      { id: "d3", dateStr: "پنج‌شنبه ۲۹ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 2 },
      { id: "d4", dateStr: "پنج‌شنبه ۶ آذر", dayOfWeek: "پاییز رویایی ماسال", remainingSpots: 10 },
    ],
    reviews: [
      {
        id: "r1",
        author: "فرناز رضوی",
        date: "۳ روز پیش",
        rating: 5,
        comment:
          "یکی از خاص‌ترین سفرهای زندگی‌ام بود. صبح که بیدار شدیم اقیانوس ابر دقیقاً زیر پای کلبه بود! راهنما آقا مهدی فوق‌العاده باحوصله و خوش‌برخورد بودند.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
      {
        id: "r2",
        author: "سامان ابراهیمی",
        date: "هفته گذشته",
        rating: 5,
        comment:
          "کیفیت غذاهای محلی، کته کباب و میرزاقاسمی بی‌نظیر بود. کلبه‌ها گرم و تمیز بودند. حتماً دوباره شرکت می‌کنم.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
        location: "کرج",
      },
      {
        id: "r3",
        author: "نیلوفر کریمی",
        date: "۲ هفته پیش",
        rating: 5,
        comment:
          "عکاسی در سوچاله و سکوت مطلق شب ماسال روح انسان رو زنده می‌کنه. ممنون از تیم تور گیلان بابت نظم و هماهنگی دقیق.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        location: "اصفهان",
      },
    ],
  },
  {
    id: "anzali-lagoon",
    aliases: ["gilan-2", "lm-2"],
    title: "قایق‌سواری اختصاصی تالاب انزلی و اقامتگاه سقالکسار",
    shortTitle: "تالاب انزلی و سقالکسار",
    location: "تالاب انزلی و دریاچه سقالکسار",
    county: "بندرانزلی و رشت",
    category: "ساحل و تالاب کاسپین",
    duration: "۲ روزه",
    durationDays: 2,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۲ نفر",
    transportation: "میدل‌باس توریستی کولردار + قایق‌های موتوری اختصاصی مبله",
    price: 1450000,
    priceFormatted: "۱,۴۵۰,۰۰۰",
    originalPrice: 1600000,
    originalPriceFormatted: "۱,۶۰۰,۰۰۰",
    discountPercentage: 10,
    rating: 4.93,
    reviewsCount: 180,
    badge: "رزرو فوری • خانوادگی",
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "سارا گیلانی",
      handle: "@Sara.Anzali",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      role: "طبیعت‌شناس تالاب و لیدر تخصصی پرنده‌نگری",
      bio: "کارشناس محیط زیست و حافظ تالاب انزلی با ۸ سال سابقه اجرای گشت‌های بوم‌شناختی در گیلان.",
      phone: "۰۹۱۱۸۳۰۲۹۱۱",
      rating: 4.95,
    },
    highlight:
      "قایق‌سواری آرام در میان نیزارها و لاله‌های آبی تالاب بین‌المللی انزلی، تماشای پرندگان مهاجر، پیاده‌روی دورتادور دریاچه پاک سقالکسار و طعم ماهی سفید تازه خزر.",
    fullDescription:
      "تالاب بین‌المللی بندرانزلی یکی از ارزشمندترین زیست‌بوم‌های آبی جهان است. در این برنامه ویژه، به دور از شلوغی‌های تجاری، با قایق‌های ایمن به دل پناهگاه حیات وحش سرخانکل می‌رویم تا رویشگاه نیلوفرهای آبی و پرندگان نایاب را مشاهده کنیم. در بخش دوم سفر، به پاک‌ترین دریاچه گیلان یعنی سقالکسار رفته و در هوای با طراوت جنگل کاج قدم می‌زنیم.",
    mealsIncluded: [
      "ناهار دریایی ماهی سفید صید روز خزر با کته قالبی و سیرترشی",
      "عصرانه چای لاهیجان با باقلوای سنتی انزلی",
      "شام سبک گیلکی در اقامتگاه بوم‌گردی",
    ],
    includedServices: [
      "ترانسفر کامل میدل‌باس توریستی VIP",
      "قایق‌سواری ۱.۵ ساعته دربست با تجهیزات کامل نجات",
      "ورودی پناهگاه حیات‌وحش سرخانکل و دریاچه سقالکسار",
      "بیمه مسافرتی و راهنمای زیست‌شناس",
    ],
    excludedServices: ["تفریحات آبی اختیاری (شاتل یا جت‌اسکی در بندر)"],
    requirements: ["کلاه آفتاب‌گیر و عینک آفتابی", "دوربین عکاسی", "لباس نخی راحت"],
    itinerary: [
      {
        step: "روز اول - ۰۸:۰۰ صبح",
        title: "اسکله تالاب انزلی و حرکت به سوی سرخانکل",
        description: "شروع قایق‌سواری در پهنه آبی تالاب، گذر از دالان نیلوفرها و پرنده‌نگری.",
      },
      {
        step: "روز اول - ۱۳:۰۰ ظهر",
        title: "صرف ناهار ماهی سفید در رستوران سنتی روی آب",
        description: "طعم اصیل ماهی سفید برشته شده به روش بومی با برنج درجه یک هاشمی گیلان.",
      },
      {
        step: "روز دوم - ۰۹:۰۰ صبح",
        title: "پیمایش آرام دریاچه سقالکسار و جنگل هیرکانی",
        description: "عکاسی از انعکاس تماشایی درختان جنگلی در آب فیروزه‌ای دریاچه و استراحت در کافه‌های ساحلی.",
      },
    ],
    availableDates: [
      { id: "a1", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه", remainingSpots: 5 },
      { id: "a2", dateStr: "پنج‌شنبه ۲۲ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 8 },
      { id: "a3", dateStr: "جمعه ۳۰ آبان", dayOfWeek: "جمعه", remainingSpots: 3 },
    ],
    reviews: [
      {
        id: "r1",
        author: "کامران مهرابی",
        date: "۴ روز پیش",
        rating: 5,
        comment: "قایق‌سواری تالاب بی‌نهایت آرامش‌بخش بود. اطلاعات علمی خانم گیلانی سفر رو دوچندان جذاب کرد.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        location: "شیراز",
      },
    ],
  },
  {
    id: "rudkhan-castle",
    aliases: ["gilan-4", "lm-3"],
    title: "فتح دژ قلعه رودخان و جنگل‌های مه تاریک فومن",
    shortTitle: "دژ باستانی قلعه رودخان",
    location: "حیدرآلات و دژ حسامی",
    county: "فومن",
    category: "جنگل‌های هیرکانی",
    duration: "۱ روزه",
    durationDays: 1,
    difficulty: "متوسط",
    groupSize: "حداکثر ۲۰ نفر",
    transportation: "اتوبوس توریستی مجهز و کولردار",
    price: 950000,
    priceFormatted: "۹۵۰,۰۰۰",
    originalPrice: 1150000,
    originalPriceFormatted: "۱,۱۵۰,۰۰۰",
    discountPercentage: 17,
    rating: 4.97,
    reviewsCount: 280,
    badge: "کنسلی رایگان • تاریخی",
    imageUrl:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "امیرحسین فومنی",
      handle: "@Amir.Rudkhan",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای باستان‌شناسی و جنگل‌پیمایی هیرکانی",
      bio: "پژوهشگر تاریخ دژهای گیلان با ۱۰ سال تجربه برگزاری صعودهای تاریخی در ارتفاعات فومنات.",
      phone: "۰۹۱۲۷۴۴۳۲۹۰",
      rating: 4.97,
    },
    highlight:
      "پیمایش پله‌های سنگی در مه انبوه جنگل باستانی هیرکانی، ورود به دژ تسخیرناپذیر ساسانی-سلجوقی، برج‌های دیده‌بانی باشکوه و طعم کلوچه داغ فومن با چای دارچین.",
    fullDescription:
      "قلعه رودخان بزرگ‌ترین قلعه آجری ایران و یکی از شگفت‌انگیزترین دژهای نظامی جهان است که بر فراز کوهستان سرسبز فومن و در میان جنگل‌های هیرکانی جا خوش کرده است. مسیر صعود با حدود ۹۳۵ پله سنگی از کنار رودخانه‌ای زلال، درختان پوشیده از خزه و دکه‌های سنتی فروش آلوچه جنگلی و نان محلی می‌گذرد.",
    mealsIncluded: [
      "ناهار دیزی سنتی سفالی در آلاچیق‌های جنگلی",
      "کلوچه داغ فومن مغزدار با چای تازه دم هیزمی",
      "آب انار ترش محلی به عنوان میان‌وعده انرژی‌بخش",
    ],
    includedServices: [
      "وسیله نقلیه توریستی رفت و برگشت",
      "بلیت ورودی کامل مجموعه تاریخی قلعه رودخان",
      "لیدر مجرب تاریخ‌دان و امدادگر همراه",
      "بیمه حوادث کامل سفر",
    ],
    excludedServices: ["انعام و خریدهای سوغات"],
    requirements: ["کفش پیاده‌روی با عاج مناسب پله", "عصای کوهنوردی (باتوم)", "بطری آب معدنی"],
    itinerary: [
      {
        step: "۰۷:۰۰ صبح",
        title: "حرکت از میدان شهرداری رشت به فومن",
        description: "گذر از باغات چای و شالیزارهای صومعه‌سرا و فومن به سمت منطقه حیدرآلات.",
      },
      {
        step: "۰۹:۰۰ صبح",
        title: "آغاز پله‌نوردی در جنگل‌های مه‌آلود",
        description: "پیمایش آرام پله‌های سنگی، استراحت‌های کوتاه در کنار ایستگاه‌های آب انار جنگلی.",
      },
      {
        step: "۱۱:۳۰ ظهر",
        title: "ورود به دژ حسامی و گشت در شاه‌نشین",
        description: "بازدید از دیوارهای تدافعی ۱.۵ کیلومتری، ارگ مرکزی و برج‌های مراقبت قلعه.",
      },
      {
        step: "۱۴:۳۰ ظهر",
        title: "فرود و صرف دیزی سنتی در آلاچیق",
        description: "استراحت دلچسب بعد از پیمایش و صرف غذای سنتی در هوای کوهپایه‌ای جنگل.",
      },
    ],
    availableDates: [
      { id: "rd1", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 6 },
      { id: "rd2", dateStr: "جمعه ۲۳ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 12 },
      { id: "rd3", dateStr: "جمعه ۳۰ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 4 },
    ],
    reviews: [
      {
        id: "r1",
        author: "حسین کاظمی",
        date: "۵ روز پیش",
        rating: 5,
        comment: "مسیر پله‌ها کمی نفس‌گیر بود اما وقتی به بالای قلعه می‌رسی منظره فراتر از رویاست!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
  {
    id: "lahijan-tea",
    aliases: ["gilan-5", "lm-4"],
    title: "مزارع سبز چای لاهیجان و جنگل‌های کوهستانی دیلمان",
    shortTitle: "مزارع چای لاهیجان و دیلمان",
    location: "شیطان‌کوه، لونک و دیلمان",
    county: "لاهیجان و سیاهکل",
    category: "مزارع چای و بوم‌گردی",
    duration: "۲ روز و ۱ شب",
    durationDays: 2,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۴ نفر",
    transportation: "مینی‌بوس توریستی هیوندای VIP",
    price: 1750000,
    priceFormatted: "۱,۷۵۰,۰۰۰",
    originalPrice: 1950000,
    originalPriceFormatted: "۱,۹۵۰,۰۰۰",
    discountPercentage: 10,
    rating: 4.96,
    reviewsCount: 198,
    badge: "پیشنهاد ویژه • عکاسی",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "الهام لاهیجانی",
      handle: "@Elham.TeaMaster",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      role: "کارشناس تخصصی چای ارگانیک و بوم‌گردی شرق گیلان",
      bio: "فرزند خانواده‌ای با نسل‌ها سابقه باغداری چای، متخصص ارزیابی عطر چای بهاره ایرانی.",
      phone: "۰۹۱۱۳۴۱۹۸۷۶",
      rating: 4.98,
    },
    highlight:
      "قدم زدن در مزارع سرسبز چای بهاره، تله‌کابین احرار بر فراز استخر لاهیجان، گذر از آبشار باطراوت لونک و اقامت شبانه در اقامتگاه کاهگلی دشت دیلمان.",
    fullDescription:
      "لاهیجان، پایتخت معطر چای ایران و عروس شهرهای گیلان است. در این تور جذاب، شما نه تنها در میان ردیف‌های منظم بوته‌های سبز چای قدم می‌زنید و شیوه اصیل دست‌چین کردن برگ‌های سرگل را فرا می‌گیرید، بلکه با تله‌کابین از بام سبز لاهیجان به کوه فلاح صعود می‌کنید و سپس در جاده دالان جنگلی سیاهکل به دیلمان حرکت خواهید کرد.",
    mealsIncluded: [
      "صبحانه محلی با کره دست‌ساز گیلانی و نان خلفه لاهیجان",
      "ناهار مرغ ترش اصیل گیلکی با برنج دودی هاشمی",
      "شام چنجه گوسفندی در ییلاق دیلمان",
      "تست طعم ۵ نوع چای ممتاز در کارگاه سنتی",
    ],
    includedServices: [
      "سرویس رفت و برگشت توریستی کامل",
      "بلیت تله‌کابین رفت و برگشت لاهیجان",
      "یک شب اقامت در خانه سنتی بوم‌گردی مجهز در دیلمان",
      "ورودی آبشار لونک و کاروانسرای تی‌تی",
      "بیمه کامل مسافران",
    ],
    excludedServices: ["خرید چای سرگل یا کوکی‌های لاهیجان"],
    requirements: ["دوربین یا موبایل با شارژ کامل برای عکاسی", "لباس گرم برای شب دیلمان"],
    itinerary: [
      {
        step: "روز اول - ۰۸:۰۰ صبح",
        title: "حضور در باغات چای و تجربه برداشت سنتی",
        description: "همراه با سبدهای بامبو، آموزش چیدن برگ‌های لطیف چای و عکاسی پرتره میان باغات سبز.",
      },
      {
        step: "روز اول - ۱۳:۰۰ ظهر",
        title: "تله‌کابین بام سبز و ناهار گیلکی",
        description: "پرواز بر فراز شیطان‌کوه و تماشای وسعت شالیزارها و باغات تا ساحل خزر.",
      },
      {
        step: "روز دوم - ۱۰:۰۰ صبح",
        title: "آبشار لونک و حرکت به سوی دشت دیلمان",
        description: "توقف در آبشار دوقلوی لونک میان درختان توسکا و راش و تنفس هوای پاک کوهستان.",
      },
    ],
    availableDates: [
      { id: "lh1", dateStr: "پنج‌شنبه ۱۵ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 4 },
      { id: "lh2", dateStr: "پنج‌شنبه ۲۹ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 9 },
    ],
    reviews: [
      {
        id: "r1",
        author: "مهسا اکبری",
        date: "۱ هفته پیش",
        rating: 5,
        comment: "کارگاه چای فوق‌العاده آموزنده بود و عطر چای دست‌ساز هیچ‌وقت از یادم نمیره.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
  {
    id: "masouleh-village",
    aliases: ["gilan-6"],
    title: "روستای کهن و پلکانی ماسوله در مه پاییز و بهار",
    shortTitle: "روستای پلکانی ماسوله",
    location: "ماسوله و دره خلیل‌دشت",
    county: "فومن",
    category: "روستاهای تاریخی",
    duration: "۱ روزه",
    durationDays: 1,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۸ نفر",
    transportation: "میدل‌باس توریستی مدرن",
    price: 850000,
    priceFormatted: "۸۵۰,۰۰۰",
    originalPrice: 980000,
    originalPriceFormatted: "۹۸۰,۰۰۰",
    discountPercentage: 13,
    rating: 4.94,
    reviewsCount: 310,
    badge: "میراث ملی • عکاسی",
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "فرشاد ماسوله‌ای",
      handle: "@Farshad.Masouleh",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای بومی معماری تاریخی ماسوله",
      bio: "متولد و ساکن محله کشه‌سر ماسوله، با تسلط کامل به تاریخ هزار ساله این شهرک تاریخی.",
      phone: "۰۹۱۱۹۳۳۲۱۱۸",
      rating: 4.96,
    },
    highlight:
      "معماری پلکانی زردگون با قدمت هزار ساله، گشت در بازار سنتی چهار سطحی، کافه‌های دنج با کلوچه فومن داغ و چای محلی، پیاده‌روی جنگلی تا آبشار خروشان کوشم.",
    fullDescription:
      "ماسوله، نگین پلکانی البرز و گیلان، جایی است که پشت‌بام هر خانه، حیاط خانه بالایی است و هیچ وسیله نقلیه موتوری حق تردد در کوچه‌های سنگفرش آن را ندارد. هوای مه‌آلود، عطر شمعدانی‌های پشت پنجره‌های ارسی و صفای مردم تالشی، تجربه‌ای فراموش‌نشدنی از سفر به دل تاریخ را برای شما رقم می‌زند.",
    mealsIncluded: [
      "ناهار فسنجان محلی با اردک ترش و اناردان",
      "چای قندپهلو در کافه سنتی بام ماسوله",
      "کلوچه داغ فومن به عنوان عصرانه",
    ],
    includedServices: [
      "ترانسفر رفت و برگشت توریستی کامل",
      "ورودی موزه مردم‌شناسی ماسوله",
      "راهنمای محلی تالشی مسلط به بافت روستا",
      "بیمه حوادث کامل",
    ],
    excludedServices: ["کرایه لباس محلی سنتی جهت عکاسی آتلیه‌ای"],
    requirements: ["کفش راحت پیاده‌روی برای شیب‌های سنگی روستا", "لباس گرم سبک"],
    itinerary: [
      {
        step: "۰۸:۰۰ صبح",
        title: "حرکت به سمت دره ماسوله",
        description: "گذر از پیچ‌های جنگلی سرسبز و غوطه‌ور در مه صبحگاهی.",
      },
      {
        step: "۱۰:۰۰ صبح",
        title: "گشت بافت کهن و بازار چهار سطح ماسوله",
        description: "بازدید از راسته آهنگران، عروسک‌بافان تالشی و خانه‌های ارسی‌دار کهن.",
      },
      {
        step: "۱۲:۳۰ ظهر",
        title: "پیمایش سبک ۴۰ دقیقه‌ای تا آبشار کوشم",
        description: "پیاده‌روی در مسیر دره جنگلی با طراوت و عکاسی کنار آبشار صخره‌ای.",
      },
      {
        step: "۱۴:۳۰ ظهر",
        title: "صرف ناهار سنتی با چشم‌انداز دره",
        description: "چشیدن فسنجان اصیل گیلکی در ایوان چوبی رو به کوهستان شاه‌معلم.",
      },
    ],
    availableDates: [
      { id: "m1", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه", remainingSpots: 8 },
      { id: "m2", dateStr: "پنج‌شنبه ۲۲ آبان", dayOfWeek: "پنج‌شنبه", remainingSpots: 11 },
      { id: "m3", dateStr: "جمعه ۳۰ آبان", dayOfWeek: "جمعه", remainingSpots: 5 },
    ],
    reviews: [
      {
        id: "r1",
        author: "بهاره شمس",
        date: "۶ روز پیش",
        rating: 5,
        comment: "هوای مه‌آلود ماسوله مثل یک تابلوی نقاشی بود. پیشنهاد می‌کنم حتماً چای روی بام‌ها رو امتحان کنید.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        location: "همدان",
      },
    ],
  },
  {
    id: "gisoom-forest",
    aliases: ["gilan-8", "lm-5"],
    title: "تونل بهشتی جنگل گیسوم و آبشار خروشان ویسادار تا ساحل خزر",
    shortTitle: "جنگل گیسوم و آبشار ویسادار",
    location: "پره‌سر و اسالم",
    county: "تالش و رضوانشهر",
    category: "جنگل‌های هیرکانی",
    duration: "۲ روز و ۱ شب",
    durationDays: 2,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۶ نفر",
    transportation: "میدل‌باس VIP دربست",
    price: 1650000,
    priceFormatted: "۱,۶۵۰,۰۰۰",
    originalPrice: 1900000,
    originalPriceFormatted: "۱,۹۰۰,۰۰۰",
    discountPercentage: 13,
    rating: 4.96,
    reviewsCount: 220,
    badge: "طبیعت بکر • جنگل و ساحل",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "کیوان رضوانشهری",
      handle: "@Keyvan.Visadar",
      avatarUrl:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      role: "طبیعت‌گرد و لیدر تخصصی آبشارهای شمال",
      bio: "بومی منطقه تالش، راهنمای تخصصی دره‌های صخره‌ای و سواحل دست‌نخورده غرب گیلان.",
      phone: "۰۹۱۲۸۸۲۹۹۴۰",
      rating: 4.97,
    },
    highlight:
      "گذر از دالان درختان کهنسال چسبیده به آسمان در تونل جنگلی گیسوم که ناگهان به امواج فیروزه‌ای دریای خزر ختم می‌شوند، همراه با ایستادن روی پل معلق آبشار ویسادار.",
    fullDescription:
      "یکی از کمیاب‌ترین جاذبه‌های طبیعت جهان، تلاقی بی‌واسطه جنگل‌های انبوه هیرکانی با ساحل شنی دریاست. در این تور دو روزه، ابتدا از شگفتی صخره‌های لایه‌لایه آبشار ویسادار که آب از ارتفاع ۱۵ متری درون حوضچه فیروزه‌ای سرازیر می‌شود دیدن می‌کنیم و سپس به پارک جنگلی گیسوم و ساحل اختصاصی آن خواهیم رفت.",
    mealsIncluded: [
      "ناهار جوجه کباب ذغالی جنگلی با کته و مخلفات ترش",
      "شام دریایی ماهی قزل‌آلا و زیتون پرورده اعلا",
      "صبحانه محلی ساحلی با نان تنوری تازه",
    ],
    includedServices: [
      "ترانسفر کامل میدل‌باس توریستی VIP",
      "یک شب اقامت در کلبه‌های تمیز چوبی در جوار جنگل و دریا",
      "ورودی مناطق تحت پوشش گردشگری",
      "بیمه حوادث کامل و لیدر مسلط محلی",
    ],
    excludedServices: ["تفریحات موتورسواری چهارچرخ در ساحل گیسوم"],
    requirements: ["کفش پیاده‌روی ضدآب", "لباس اضافه", "حوله و لوازم شنا در صورت تمایل"],
    itinerary: [
      {
        step: "روز اول - ۰۸:۰۰ صبح",
        title: "حرکت به سوی آبشار ویسادار پره‌سر",
        description: "ایستادن روی پل فلزی روبروی آبشار و تماشای حوضچه شگفت‌انگیز سنگ‌های حلقوی.",
      },
      {
        step: "روز اول - ۱۳:۳۰ ظهر",
        title: "ورود به تونل سبز گیسوم و ناهار جنگلی",
        description: "حرکت در دالان سحرانگیز درختان به هم پیوسته و صرف ناهار در دل طبیعت.",
      },
      {
        step: "روز دوم - ۱۰:۰۰ صبح",
        title: "آرامش ساحل صدف و تفریحات دریایی خزر",
        description: "پیاده‌روی پابرهنه روی ماسه‌های نرم ساحل، تماشای امواج خزر و جمع‌آوری صدف‌های رنگارنگ.",
      },
    ],
    availableDates: [
      { id: "g1", dateStr: "پنج‌شنبه ۱۵ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 3 },
      { id: "g2", dateStr: "پنج‌شنبه ۲۹ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 6 },
    ],
    reviews: [
      {
        id: "r1",
        author: "سهراب امینی",
        date: "۳ روز پیش",
        rating: 5,
        comment: "پل معلق ویسادار و تونل گیسوم فوق‌العاده بودند. اقامتگاه چوبی شبانه هم بسیار دنج و تمیز بود.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
        location: "رشت",
      },
    ],
  },
  {
    id: "rasht-foodie",
    aliases: ["gilan-3"],
    title: "تور شکم‌گردی در شهر خلاق خوراک‌شناسی یونسکو رشت",
    shortTitle: "شکم‌گردی رشت یونسکو",
    location: "بازار سنتی و پیاده‌راه شهرداری",
    county: "رشت",
    category: "شکم‌گردی رشت",
    duration: "۱ روزه",
    durationDays: 1,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۵ نفر",
    transportation: "پیاده‌روی تخصصی شهری + ون لوکس شهری",
    price: 890000,
    priceFormatted: "۸۹۰,۰۰۰",
    originalPrice: 990000,
    originalPriceFormatted: "۹۹۰,۰۰۰",
    discountPercentage: 10,
    rating: 4.99,
    reviewsCount: 310,
    badge: "پرفروش‌ترین • طعم‌های اصیل",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "نیما رشتی",
      handle: "@Nima.RashtFood",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای میراث خوراک‌شناسی و سرآشپز بومی رشت",
      bio: "پژوهشگر غذاهای ثبت ملی گیلان با سابقه همکاری با نهادهای یونسکو در معرفی فرهنگ خوراک رشت.",
      phone: "۰۹۱۲۲۲۳۳۴۴۵",
      rating: 4.99,
    },
    highlight:
      "کشف عطر و طعم ۲۲۰ نوع خوراک سنتی ثبت‌شده رشت، پرسه در بازار بزرگ ماهی‌فروشان، تست گرم میرزاقاسمی، ترش تره، باقلاقاتوق و رشته‌خشکار داغ با دارچین.",
    fullDescription:
      "رشت تنها شهر ایران است که به عنوان شهر خلاق خوراک‌شناسی در سازمان جهانی یونسکو ثبت شده است. در این تور یک‌روزه پر از عطر و طعم، همراه با سرآشپز بومی، کوچه‌پس‌کوچه‌های تاریخی رشت، کاروانسراهای طاقی بزرگ، بازار کهن ادویه‌فروشان و سبزی‌های بومی چوچاق و خالواش را زیر پا می‌گذاریم و در قدیمی‌ترین چایخانه‌ها و رستوران‌های سنتی، اصیل‌ترین طعم‌های شمال را تست می‌کنیم.",
    mealsIncluded: [
      "صبحانه املت شاپوری با لوبیای چیتی در چایخانه حاج حسین",
      "ناهار کته کباب ترش سنتی با مخلفات اشپل، باقلا مازندرانی و گردو",
      "تست رشته‌خشکار داغ طاهر و فالوده گیلکی",
      "شام سبک ترش‌تره و کباب کوبیده سنتی",
    ],
    includedServices: [
      "تمام وعده‌های غذایی و تست‌های خوراکی بازار در طول برنامه",
      "راهنمای سرآشپز تخصصی فرهنگ خوراک",
      "کارگاه نیم‌ساعته ساخت سنتی رشته‌خشکار",
      "بیمه گردشگری کامل",
    ],
    excludedServices: ["خرید ادویه‌جات و زیتون بسته‌بندی برای سوغات"],
    requirements: ["کفش راحت پیاده‌روی شهری", "اشتهای فراوان و ذائقه باز برای چشیدن طعم‌های ترش و لذیذ"],
    itinerary: [
      {
        step: "۰۸:۳۰ صبح",
        title: "دیدار در میدان شهرداری سنگفرش و صبحانه شاپوری",
        description: "شروع روز با صبحانه معروف رشتی در چایخانه تاریخی با بیش از ۷۰ سال قدمت.",
      },
      {
        step: "۱۰:۳۰ صبح",
        title: "گشت بازار سنتی رشت و معرفی سبزی‌های انحصاری",
        description: "شناخت سبزی‌های معطر گیلان نظیر چوچاق، وارنگ‌بو، خالواش و راسته ماهی‌فروشان تازه خزر.",
      },
      {
        step: "۱۳:۳۰ ظهر",
        title: "ناهار شاهانه کباب ترش در رستوران خانگی محلی",
        description: "چشیدن گوشت راسته خوابانده در رب انار ترش، گردوی ساییده و چوچاق با برنج کته دودی.",
      },
      {
        step: "۱۶:۳۰ عصر",
        title: "کارگاه تهیه رشته‌خشکار و چای قندپهلو",
        description: "ریختن خمیر برنجی روی سینی مسی داغ و چشیدن آن با شهد گلاب و دارچین.",
      },
    ],
    availableDates: [
      { id: "rf1", dateStr: "پنج‌شنبه ۱۵ آبان", dayOfWeek: "پنج‌شنبه", remainingSpots: 4 },
      { id: "rf2", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه", remainingSpots: 2 },
      { id: "rf3", dateStr: "پنج‌شنبه ۲۲ آبان", dayOfWeek: "پنج‌شنبه", remainingSpots: 6 },
    ],
    reviews: [
      {
        id: "r1",
        author: "پژمان دانشیار",
        date: "۴ روز پیش",
        rating: 5,
        comment: "اگر عاشق غذاهای گیلکی هستید این تور رو از دست ندید. انتخاب رستوران‌ها و تست‌های بازار عالی بود.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
  {
    id: "soubatan-plains",
    aliases: ["gilan-7", "lm-6"],
    title: "ییلاق سوباتان تالش و دشت شقایق‌های ورزان",
    shortTitle: "ییلاق افسانه‌ای سوباتان",
    location: "سوباتان، دره ورزان و لیسار",
    county: "تالش",
    category: "ییلاقات و ابر",
    duration: "۳ روز و ۲ شب",
    durationDays: 3,
    difficulty: "متوسط",
    groupSize: "حداکثر ۱۲ نفر",
    transportation: "پاترول و نیسان‌های مجهز آفرود کوهستانی",
    price: 2600000,
    priceFormatted: "۲,۶۰۰,۰۰۰",
    originalPrice: 2900000,
    originalPriceFormatted: "۲,۹۰۰,۰۰۰",
    discountPercentage: 10,
    rating: 4.99,
    reviewsCount: 165,
    badge: "آفرود کوهستان • بکرترین ییلاق",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "رامین سوباتانی",
      handle: "@Ramin.Soubatan",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      role: "سرپرست برنامه‌های آفرود و کوهستان تالش",
      bio: "بومی سوباتان، کارشناس بقا در طبیعت کوهستان و راه‌بلد مسیرهای عشایری تالش به نئور.",
      phone: "۰۹۱۲۷۷۷۳۳۸۸",
      rating: 4.99,
    },
    highlight:
      "سفر به یکی از بکرترین ییلاقات ایران با خودروهای دو دیفرانسیل، پیمایش دره آبشار ۶۰ متری ورزان، اسب‌سواری در مراتع سرسبز و خواب در کلبه‌های تخته‌ای عشایر پاتوق.",
    fullDescription:
      "سوباتان یکی از دست‌نخورده‌ترین و با شکوه‌ترین ییلاقات ایران در دل رشته‌کوه‌های تالش است. دسترسی به این بهشت پنهان تنها از طریق خودروهای آفرود یا پیمایش‌های کوهستانی امکان‌پذیر است. در این برنامه، از جاده صخره‌ای لیسار صعود می‌کنیم، شب را در خانه‌های چوبی سنتی می‌خوابیم و روز بعد به تماشای آبشار مهیب ورزان و چشمه‌های خنک کوهی می‌رویم.",
    mealsIncluded: [
      "صبحانه‌های کامل بر پایه لبنیات عشایر تالش (کره حیوانی، پنیر کوزه، عسل کوهی)",
      "ناهار کباب بره تازه ییلاقی در دشت ورزان",
      "شام سوجادوق (غذای اصیل محلی تالش) و آش دوغ محلی",
    ],
    includedServices: [
      "تمام ترانسفرهای آفرود دو دیفرانسیل از تالش به سوباتان و بالعکس",
      "دو شب اقامت در کلبه‌های چوبی اختصاصی ییلاقی مجهز به سیستم گرمایشی",
      "تمامی وعده‌های غذایی و پذیرایی‌های بین راه",
      "بیمه ورزشی و مسئولیت مدنی حوادث",
    ],
    excludedServices: ["کرایه اسب برای گشت‌های انفرادی"],
    requirements: ["کیسه خواب یا ملحفه شخصی", "کاپشن بادگیر ضدآب و لباس پلار", "کفش ترکینگ ضدآب"],
    itinerary: [
      {
        step: "روز اول",
        title: "صعود آفرودی از لیسار به دشت سوباتان",
        description: "حرکت هیجان‌انگیز در پیچ‌های سرسبز جنگلی و صعود به ارتفاع ۱۹۰۰ متری، اسکان در کلبه‌ها.",
      },
      {
        step: "روز دوم",
        title: "پیمایش دره و آبشار ورزان و غار گنج‌خانه",
        description: "پیاده‌روی در دشت‌های فراخ پر از اسب‌های وحشی و توقف در کنار آبشار خروشان ورزان.",
      },
      {
        step: "روز سوم",
        title: "دیدار با عشایر، خرید پنیر کوزه و بازگشت",
        description: "آشنایی با زندگی کهن دامداران تالشی و فرود به سمت دریای خزر.",
      },
    ],
    availableDates: [
      { id: "sb1", dateStr: "چهارشنبه ۲۱ آبان", dayOfWeek: "۳ روزه تعطیلات", remainingSpots: 3 },
      { id: "sb2", dateStr: "چهارشنبه ۵ آذر", dayOfWeek: "۳ روزه", remainingSpots: 5 },
    ],
    reviews: [
      {
        id: "r1",
        author: "علیرضا رادپور",
        date: "۱ هفته پیش",
        rating: 5,
        comment: "سوباتان واقعاً قطعه‌ای از بهشت روی زمینه. مسیر آفرود پرهیجان و کباب بره لذیذترین تجربه سفرم بود.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
  {
    id: "gilan-9",
    title: "جنگل رویایی سراوان، قایق قورباغه‌ای و روستای استخرگاه",
    shortTitle: "مرداب سراوان و استخرگاه",
    location: "سراوان و استخرگاه رودبار",
    county: "رشت و رودبار",
    category: "کلبه‌های چوبی جنگلی",
    duration: "۱ روزه",
    durationDays: 1,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۸ نفر",
    transportation: "میدل‌باس مدرن توریستی",
    price: 880000,
    priceFormatted: "۸۸۰,۰۰۰",
    originalPrice: 980000,
    originalPriceFormatted: "۹۸۰,۰۰۰",
    discountPercentage: 10,
    rating: 4.96,
    reviewsCount: 190,
    badge: "پیشنهاد ویژه • عکاسی",
    imageUrl:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "حسین حسینی",
      handle: "@Hossein.Saravan",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "لیدر اکوتوریسم گیلان",
      bio: "راهنمای تخصصی پارک‌های جنگلی و روستاهای کهن رودبار و رشت با ۷ سال تجربه.",
      phone: "۰۹۱۱۲۴۰۹۸۷۱",
      rating: 4.96,
    },
    highlight:
      "قایق‌سواری روی مرداب سراوان که با فرشی از خزه‌های زمردین پوشیده شده، و سفر به روستای استخرگاه (خانه روی آب زیر کوهستان درفک).",
    fullDescription:
      "سراوان یکی از زیباترین جلوه‌های طبیعت گیلان است؛ دریاچه‌ای که به خاطر پوشش متراکم گیاهان آبزی، مانند چمنی زمردین و متحرک به نظر می‌رسد. در کنار آن، موزه میراث روستایی گیلان بازسازی صادقانه‌ای از خانه‌های بومی ۱۰۰ ساله است. در ادامه به روستای استخرگاه می‌رویم، جایی که کلبه چوبی نوستالژیک در میان استخری کوهستانی و زیر پای قله درفک چشم‌ها را خیره می‌کند.",
    mealsIncluded: [
      "ناهار شامی رودباری سنتی با روغن زیتون اعلا",
      "زیتون پرورده اصل رودبار با برنج کته",
      "چای هیزمی در آلاچیق‌های جنگلی",
    ],
    includedServices: [
      "ترانسفر کامل رفت و برگشت توریستی",
      "بلیت قایق‌سواری اختصاصی مرداب سراوان",
      "ورودی موزه میراث روستایی گیلان",
      "بیمه حوادث کامل",
    ],
    excludedServices: ["پینت‌بال یا موتور چهارچرخ در پارک سراوان"],
    requirements: ["کفش پیاده‌روی راحت", "عینک آفتابی و کلاه"],
    itinerary: [
      {
        step: "۰۸:۳۰ صبح",
        title: "پارک جنگلی سراوان و قایق‌سواری مرداب سبز",
        description: "قایق‌سواری آرام روی آب سبز زمردی پوشیده از خزه و عکاسی حرفه‌ای.",
      },
      {
        step: "۱۱:۳۰ ظهر",
        title: "گشت موزه میراث روستایی گیلان",
        description: "آشنایی با زندگی کهن، کندوج‌ها و خانه‌های کاهگلی روستاییان شمال.",
      },
      {
        step: "۱۴:۳۰ ظهر",
        title: "روستای استخرگاه رودبار و ناهار سنتی",
        description: "تماشای خانه روی آب در پس‌زمینه کوهستان درفک و صرف شامی رودباری.",
      },
    ],
    availableDates: [
      { id: "sr1", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 5 },
      { id: "sr2", dateStr: "جمعه ۲۳ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 8 },
    ],
    reviews: [
      {
        id: "r1",
        author: "فرشته باقری",
        date: "۴ روز پیش",
        rating: 5,
        comment: "قایق‌سواری روی مرداب سراوان واقعاً حیرت‌انگیز بود. عکس‌های استخرگاه هم محشر شدند.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        location: "قزوین",
      },
    ],
  },
  {
    id: "gilan-10",
    title: "ساحل شنی چمخاله و تالاب نیلوفرهای لنگرود",
    shortTitle: "ساحل چمخاله و لیلاکوه",
    location: "چمخاله و لیلاکوه",
    county: "لنگرود",
    category: "ساحل و تالاب کاسپین",
    duration: "۲ روز و ۱ شب",
    durationDays: 2,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۶ نفر",
    transportation: "میدل‌باس توریستی VIP کولردار",
    price: 1350000,
    priceFormatted: "۱,۳۵۰,۰۰۰",
    originalPrice: 1550000,
    originalPriceFormatted: "۱,۵۵۰,۰۰۰",
    discountPercentage: 12,
    rating: 4.92,
    reviewsCount: 145,
    badge: "کنسلی رایگان • آرامش ساحلی",
    imageUrl:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "مهرداد لنگرودی",
      handle: "@Mehrdad.Langroud",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای گردشگری شرق گیلان",
      bio: "بومی لنگرود، متخصص تاریخ پل‌های خشتی و اکوسیستم سواحل کاسپین.",
      phone: "۰۹۱۲۳۴۵۶۹۸۷",
      rating: 4.93,
    },
    highlight:
      "اقامت در هتل‌های ساحلی تمیزترین ساحل گیلان (چمخاله)، شب‌نشینی کنار موج‌های آرام خزر، و نوشیدن چای در کوهستان باغات مرکبات لیلاکوه.",
    fullDescription:
      "چمخاله پس از انزلی، قطب ساحلی استان گیلان است که به ساحل ماسه‌ای کم‌عمق، تمیز و امکانات ورزش‌های آبی شناخته می‌شود. در این برنامه، از پل خشتی کهن لنگرود عبور می‌کنیم، به ارتفاعات باغات پرتقال و چای لیلاکوه رفته و در کافه‌های رو به جلگه چای می‌نوشیم. شب را در نزدیکی موج‌های دریا سپری کرده و روز بعد به تالاب چمخاله می‌رویم.",
    mealsIncluded: [
      "صبحانه سلف‌سرویس ساحلی",
      "ناهار کباب ماهی قزل‌آلا و زیتون پرورده اعلا",
      "شام سبک گیلکی در ساحل",
    ],
    includedServices: [
      "ترانسفر رفت و برگشت VIP",
      "یک شب اقامت در هتل ساحلی مجهز",
      "بیمه مسافرتی و راهنمای همراه",
    ],
    excludedServices: ["جت اسکی و قایق موتوری"],
    requirements: ["لباس ساحلی", "دمپایی یا صندل", "کرم ضدآفتاب"],
    itinerary: [
      {
        step: "روز اول",
        title: "پل خشتی لنگرود و باغات مرکبات لیلاکوه",
        description: "بازدید از پل دوره صفوی و صعود به تپه‌های لیلاکوه همراه با صرف چای.",
      },
      {
        step: "روز دوم",
        title: "آرامش در ساحل چمخاله و تفریحات دریایی",
        description: "پیاده‌روی روی شن‌های طلایی، تماشای امواج خزر و بازگشت عصرگاهی.",
      },
    ],
    availableDates: [
      { id: "ck1", dateStr: "پنج‌شنبه ۱۵ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 6 },
    ],
    reviews: [
      {
        id: "r1",
        author: "داوود صادقی",
        date: "۱ هفته پیش",
        rating: 5,
        comment: "هتل ساحلی تمیز بود و آرامش ساحل چمخاله خستگی کار رو کاملاً برطرف کرد.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        location: "کرج",
      },
    ],
  },
  {
    id: "gilan-11",
    title: "بهشت چابکسر، روستای سرولات و طعم خاورخانم",
    shortTitle: "سرولات و چابکسر",
    location: "سرولات و لیمنجوب",
    county: "رودسر",
    category: "شکم‌گردی رشت",
    duration: "۱ روزه",
    durationDays: 1,
    difficulty: "آسان",
    groupSize: "حداکثر ۱۶ نفر",
    transportation: "میدل‌باس توریستی مدرن",
    price: 920000,
    priceFormatted: "۹۲۰,۰۰۰",
    originalPrice: 1050000,
    originalPriceFormatted: "۱,۰۵۰,۰۰۰",
    discountPercentage: 12,
    rating: 4.98,
    reviewsCount: 280,
    badge: "پرفروش‌ترین • طعم به یادماندنی",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "بهار رودسری",
      handle: "@Bahar.Sarvelat",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "راهنمای محلی شرق گیلان و شکم‌گردی",
      bio: "بومی چابکسر، عاشق معرفی طعم‌های سنتی و دره‌های سرسبز کوهپایه‌ای شرق گیلان.",
      phone: "۰۹۱۱۲۴۵۶۷۸۹",
      rating: 4.98,
    },
    highlight:
      "تجربه کم‌نظیر کوتاه‌ترین فاصله کوهستان جنگلی با دریای خزر در چابکسر، ناهار اسطوره‌ای کباب ترش و مرغ شکم‌پر در بالکن رو به دره سرولات.",
    fullDescription:
      "روستای کوهستانی سرولات در چابکسر جایی است که کوه‌های پوشیده از درختان مرکبات و جنگل در فاصله‌ای کمتر از چند کیلومتر به دریای خزر متصل می‌شوند. ناهار در بالکن‌های رو به دره خروشان آچیرود با ترش کباب داغ، باقلاقاتوق و برنج کته، یکی از ناب‌ترین خاطرات سفر به شمال را پدید می‌آورد.",
    mealsIncluded: [
      "ناهار شاهانه در رستوران سنتی با ترش کباب و باقلاقاتوق",
      "آب نارنج و پرتقال تازه چیده‌شده باغی",
      "چای بهاره در کافه دره‌ای",
    ],
    includedServices: [
      "ترانسفر رفت و برگشت کامل",
      "ناهار با تمامی مخلفات بومی",
      "راهنمای محلی و بیمه سفر",
    ],
    excludedServices: ["خرید مرکبات و رب انار خانگی"],
    requirements: ["کفش راحت پیاده‌روی", "دوربین برای ثبت مناظر دره"],
    itinerary: [
      {
        step: "۰۸:۰۰ صبح",
        title: "حرکت به سوی چابکسر و دره سرولات",
        description: "پیمایش جاده پرپیچ‌وخم کوهپایه‌ای میان باغات پرتقال و رودخانه آچیرود.",
      },
      {
        step: "۱۲:۳۰ ظهر",
        title: "صرف ناهار معروف خاورخانم با چشم‌انداز دره",
        description: "چشیدن اصیل‌ترین مرغ شکم‌پر و ترش کباب با نمای اقیانوس سبز دره تا دریا.",
      },
    ],
    availableDates: [
      { id: "sv1", dateStr: "جمعه ۱۶ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 4 },
      { id: "sv2", dateStr: "جمعه ۲۳ آبان", dayOfWeek: "جمعه یک‌روزه", remainingSpots: 7 },
    ],
    reviews: [
      {
        id: "r1",
        author: "سیمین تقوی",
        date: "۳ روز پیش",
        rating: 5,
        comment: "طعم ترش کباب و منظره بالکن سرولات فوق‌العاده بود. حتماً پیشنهاد می‌کنم.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
  {
    id: "gilan-12",
    title: "صعود به قله درفک (بام گیلان) و غار یخی آتشفشانی",
    shortTitle: "قله درفک و غار یخی",
    location: "رستم‌آباد و توتکابن",
    county: "رودبار",
    category: "جنگل‌های هیرکانی",
    duration: "۲ روز و ۱ شب",
    durationDays: 2,
    difficulty: "نیمه‌سنگین",
    groupSize: "حداکثر ۱۲ نفر",
    transportation: "میدل‌باس توریستی + نیسان‌های کوهستانی",
    price: 2100000,
    priceFormatted: "۲,۱۰۰,۰۰۰",
    originalPrice: 2400000,
    originalPriceFormatted: "۲,۴۰۰,۰۰۰",
    discountPercentage: 12,
    rating: 4.97,
    reviewsCount: 130,
    badge: "صعود حرفه‌ای • بام گیلان",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    guide: {
      name: "آرش درفکی",
      handle: "@Arash.Dorfak",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "مربی فدراسیون کوهنوردی و هیمالیانورد",
      bio: "بومی دامنه درفک با بیش از ۱۵۰ صعود موفق به بام گیلان در چهار فصل سال.",
      phone: "۰۹۱۲۹۹۸۸۷۷۱",
      rating: 4.97,
    },
    highlight:
      "صعود به قله ۲۷۰۰ متری درفک، دیدن کاسه آتشفشانی که کل گیلان زیر پایتان در ابرها شناور است و ورود به دهانه غار یخی دائمی درفک.",
    fullDescription:
      "درفک آتشفشان خاموش و بام رویایی گیلان است. بر فراز کاسه قله درفک، تمام جلگه گیلان، جنگل‌های هیرکانی و خط ساحلی خزر زیر اقیانوسی از ابرها نمایان است. شب را در کمپینگ زیر سقف پرستاره کهکشان راه شیری سپری می‌کنیم و صبح طلوع خیره‌کننده آفتاب را تماشا خواهیم کرد.",
    mealsIncluded: [
      "صبحانه کوهستانی املت ذغالی با پنیر گوسفندی",
      "غذای گرم کوهنوردی پرکالری",
      "چای آویشن کوهی تازه دم",
    ],
    includedServices: [
      "ترانسفر کامل تا دامنه و نیسان‌سواری کوهستانی",
      "تجهیزات کمپینگ گروهی (چادر و زیرانداز)",
      "مربی رسمی فدراسیون کوهنوردی و بیمه ورزشی",
    ],
    excludedServices: ["کیسه خواب و کوله‌پشتی شخصی"],
    requirements: ["کفش کوهنوردی ساقدار", "کاپشن گورتکس یا ضدباد", "کیسه خواب مناسب دمای ۵ درجه"],
    itinerary: [
      {
        step: "روز اول",
        title: "نیسان‌سواری از شیرکوه و پیمایش جنگل راش تا کاسه قله",
        description: "صعود از میان درختان کهنسال هیرکانی تا کاسه آتشفشانی درفک و برپایی کمپ.",
      },
      {
        step: "روز دوم",
        title: "طلوع خورشید بر فراز اقیانوس ابر و غار یخی",
        description: "تماشای طلوع خورشید، ورود به دهانه غار یخی دائمی و فرود آرام.",
      },
    ],
    availableDates: [
      { id: "df1", dateStr: "پنج‌شنبه ۲۱ آبان", dayOfWeek: "پنج‌شنبه و جمعه", remainingSpots: 4 },
    ],
    reviews: [
      {
        id: "r1",
        author: "احسان مرادی",
        date: "۲ هفته پیش",
        rating: 5,
        comment: "منظره اقیانوس ابر از کاسه درفک نفس‌گیرترین صحنه‌ای بود که تا به حال دیده بودم.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
        location: "تهران",
      },
    ],
  },
];

// Helper functions
export function getAllTours(): Tour[] {
  return TOURS_DATA;
}

export function getTourById(id: string): Tour | undefined {
  const cleanId = id.trim().toLowerCase();
  return TOURS_DATA.find(
    (t) =>
      t.id.toLowerCase() === cleanId ||
      t.aliases?.some((a) => a.toLowerCase() === cleanId)
  );
}

export function getRandomTours(count: number = 5): Tour[] {
  const shuffled = [...TOURS_DATA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
