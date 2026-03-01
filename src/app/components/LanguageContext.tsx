import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

type Translations = {
  [key: string]: { id: string; en: string };
};

const t: Translations = {
  // Navbar
  navDiscover: { id: "Layanan", en: "Services" },
  navAbout: { id: "Tentang", en: "About" },
  navDestinations: { id: "Destinasi", en: "Destinations" },
  navExperience: { id: "Testimoni", en: "Testimonials" },
  navContact: { id: "Kontak", en: "Contact" },

  // Hero
  heroOverline: { id: "Driver Pribadi — Bali, Indonesia", en: "Private Driver — Bali, Indonesia" },
  heroTitle1: { id: "Jelajahi", en: "Explore" },
  heroTitle2: { id: "Pulau Dewata", en: "the Island" },
  heroSub: {
    id: "Layanan driver pribadi di Bali sejak 2017. Anda tentukan tujuan, kami yang menyetir — aman, nyaman, dan fleksibel.",
    en: "Personal driver service in Bali since 2017. You decide where to go, we drive — safe, comfortable, and flexible.",
  },
  heroBtn: { id: "Pesan Sekarang", en: "Book Now" },
  heroMore: { id: "Selengkapnya", en: "Learn More" },
  heroYears: { id: "8+ Tahun", en: "8+ Years" },
  heroTrips: { id: "2000+ Perjalanan", en: "2000+ Trips" },

  // Services
  svcOverline: { id: "Layanan Kami", en: "Our Services" },
  svcTitle1: { id: "Cara nyaman", en: "A comfortable way" },
  svcTitle2: { id: "keliling Bali", en: "around Bali" },
  svc1Title: { id: "Antar Jemput Bandara", en: "Airport Transfer" },
  svc1Desc: {
    id: "Antar jemput dari/ke Bandara Ngurah Rai ke hotel, villa, atau lokasi manapun di Bali. Tepat waktu, tanpa ribet.",
    en: "Pick-up and drop-off from/to Ngurah Rai Airport to any hotel, villa, or location in Bali. On time, hassle-free.",
  },
  svc2Title: { id: "Sewa Driver Harian", en: "Full Day Charter" },
  svc2Desc: {
    id: "Sewa driver seharian 8–10 jam. Anda bebas tentukan rute dan destinasi, kami yang menyetir dengan aman.",
    en: "Hire a driver for a full day (8–10 hours). You set the route and destinations, we drive safely.",
  },
  svc3Title: { id: "Sewa Beberapa Hari", en: "Multi-Day Charter" },
  svc3Desc: {
    id: "Sewa driver untuk 2 hari atau lebih. Cocok untuk honeymoon, liburan keluarga, atau perjalanan bisnis di Bali.",
    en: "Hire a driver for 2 or more days. Perfect for honeymoons, family vacations, or business trips around Bali.",
  },
  svc4Title: { id: "Rute Custom", en: "Custom Route" },
  svc4Desc: {
    id: "Mau ke mana saja? Sunrise, waterfall, tempat tersembunyi — kami tahu jalan-jalan di Bali luar dalam.",
    en: "Want to go anywhere? Sunrise spots, waterfalls, hidden places — we know every road in Bali inside out.",
  },

  // Destinations
  destOverline: { id: "Destinasi", en: "Destinations" },
  destTitle1: { id: "Mau ke mana", en: "Where do you" },
  destTitle2: { id: "hari ini", en: "want to go" },
  destNote: {
    id: "Harga sudah termasuk driver, BBM & parkir.",
    en: "Prices include driver, fuel & parking.",
  },
  destIncluded: { id: "Sudah Termasuk", en: "What's Included" },
  destDuration: { id: "Durasi", en: "Duration" },
  destDistance: { id: "Jarak", en: "Distance" },
  destFrom: { id: "Mulai dari", en: "Starting from" },
  destBook: { id: "Pesan Sekarang", en: "Book Now" },
  destClose: { id: "Tutup", en: "Close" },
  destDriver: { id: "Driver berpengalaman", en: "Experienced driver" },
  destFuel: { id: "BBM (bensin)", en: "Fuel (gasoline)" },
  destParking: { id: "Biaya parkir", en: "Parking fees" },
  destWater: { id: "Air mineral", en: "Mineral water" },
  destFlexible: { id: "Rute fleksibel", en: "Flexible route" },
  destAC: { id: "Mobil ber-AC & bersih", en: "Clean AC car" },
  destNotIncluded: { id: "Belum Termasuk", en: "Not Included" },
  destEntrance: { id: "Tiket masuk wisata", en: "Attraction entrance fees" },
  destMeals: { id: "Makan & minum pribadi", en: "Personal meals & drinks" },
  destTips: { id: "Tips (opsional)", en: "Tips (optional)" },

  // Stats
  statYears: { id: "Tahun Pengalaman", en: "Years Experience" },
  statYearsSub: { id: "Sejak 2017", en: "Since 2017" },
  statTrips: { id: "Perjalanan Selesai", en: "Trips Completed" },
  statTripsSub: { id: "Dan terus bertambah", en: "And counting" },
  statRoutes: { id: "Rute di Bali", en: "Routes in Bali" },
  statRoutesSub: { id: "Dari utara ke selatan", en: "From north to south" },
  statSatisfaction: { id: "Tingkat Kepuasan", en: "Satisfaction Rate" },
  statSatisfactionSub: { id: "Dari seluruh pelanggan", en: "From all customers" },

  // Testimonials
  testOverline: { id: "Testimoni", en: "Testimonials" },

  // About
  aboutOverline: { id: "Tentang Kami", en: "About Us" },
  aboutTitle1: { id: "Di balik", en: "The story" },
  aboutTitle2: { id: "kemudi", en: "behind the wheel" },
  aboutP1: {
    id: "Saya memulai perjalanan sebagai driver di Bali sejak tahun 2017. Berawal dari kecintaan terhadap pulau ini dan keinginan membantu wisatawan menikmati Bali dengan aman dan nyaman.",
    en: "I started my journey as a driver in Bali back in 2017. It all began with my love for this island and the desire to help travelers enjoy Bali safely and comfortably.",
  },
  aboutP2: {
    id: "Selama lebih dari 8 tahun, saya sudah mengantar ribuan penumpang — dari keluarga lokal, pasangan honeymoon, hingga traveler dari seluruh dunia. Saya bukan pemandu wisata, tapi saya tahu setiap jalan, jalan pintas, dan waktu terbaik untuk mengunjungi setiap tempat di Bali.",
    en: "For over 8 years, I've driven thousands of passengers — from local families, honeymooners, to travelers from around the world. I'm not a tour guide, but I know every road, shortcut, and the best time to visit every place in Bali.",
  },
  aboutP3: {
    id: "Berbasis di Jimbaran, Kuta Selatan — saya siap menjemput Anda dari manapun di Bali. Yang Anda perlu lakukan hanyalah duduk santai, nikmati perjalanan, dan biarkan saya yang menyetir.",
    en: "Based in Jimbaran, South Kuta — I'm ready to pick you up from anywhere in Bali. All you need to do is sit back, enjoy the ride, and let me take the wheel.",
  },
  aboutYears: { id: "Tahun di jalan", en: "Years on the road" },
  aboutBase: { id: "Berbasis di", en: "Based in" },
  aboutPromise: { id: "Janji kami", en: "Our promise" },
  aboutPromiseText: { id: "Aman, tepat waktu, dan selalu bersih.", en: "Safe, on time, and always clean." },

  // Contact
  ctaOverline: { id: "Hubungi Kami", en: "Get in Touch" },
  ctaTitle1: { id: "Rencanakan", en: "Let's plan your" },
  ctaTitle2: { id: "perjalanan Anda", en: "Bali journey" },
  ctaSub: {
    id: "Isi form atau hubungi langsung via WhatsApp. Kami akan membalas dalam hitungan menit.",
    en: "Fill the form or contact us directly via WhatsApp. We'll reply within minutes.",
  },
  ctaName: { id: "Nama lengkap", en: "Full name" },
  ctaPhone: { id: "No. WhatsApp", en: "WhatsApp number" },
  ctaDest: { id: "Destinasi tujuan", en: "Destination" },
  ctaMsg: { id: "Pesan tambahan...", en: "Additional message..." },
  ctaSend: { id: "Kirim Pesan", en: "Send Message" },
  ctaSent: { id: "Terkirim!", en: "Sent!" },

  // Footer
  footerRights: { id: "Hak cipta", en: "All rights reserved" },
};

export const WA_NUMBER = "6281353552955";
export const WA_DISPLAY = "+62 813-5355-2955";
export const EMAIL = "Glorygrebjimb@gmail.com";
export const BASE_LOCATION = { id: "Kuta Selatan, Jimbaran, Badung, Bali", en: "South Kuta, Jimbaran, Badung, Bali" };

export function buildWaUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LangCtx>({
  lang: "id",
  setLang: () => { },
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  const translate = (key: string) => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}