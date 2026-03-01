import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang } from "./LanguageContext";

const sunsetImg =
  "https://images.unsplash.com/photo-1613228355059-54c7d611358e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwc3Vuc2V0JTIwb2NlYW4lMjBnb2xkZW58ZW58MXx8fHwxNzcyMzYxNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const reviews = [
  {
    text: {
      id: "Pengalaman luar biasa dari awal hingga akhir. Driver kami tahu setiap jalan di Ubud, dan sangat sabar menunggu kami di setiap titik. Honeymoon kami jadi tak terlupakan.",
      en: "An incredible experience from start to finish. Our driver knew every road in Ubud, and was very patient waiting for us at every stop. Our honeymoon was truly unforgettable.",
    },
    name: "Rina & Anto",
    from: "Jakarta, Indonesia",
  },
  {
    text: {
      id: "Sudah 3 kali pakai TravelGo dan makin bagus setiap kunjungan. Tepat waktu, mobil bersih, harga fair. Drivernya sudah seperti keluarga — sesantai itu pelayanannya.",
      en: "Third time using TravelGo and it gets better every visit. Punctual, clean car, fair prices. The driver feels like family — that's how personal the service is.",
    },
    name: "Budi Hartono",
    from: "Surabaya, Indonesia",
  },
  {
    text: {
      id: "Kami awalnya khawatir keliling Bali dengan anak-anak, tapi driver kami sangat sabar dan mengakomodasi semua kebutuhan. Sunrise di Kintamani adalah highlight yang tak terlupakan.",
      en: "We were nervous about traveling Bali with kids, but our driver was so patient and accommodating. The sunrise at Kintamani was a highlight we'll never forget.",
    },
    name: "Sarah & Wayan",
    from: "Melbourne, Australia",
  },
  {
    text: {
      id: "Trip ke Nusa Penida berjalan sempurna. Timing tepat, spot foto bagus, dan driver kami bahkan merekomendasikan warung lokal yang luar biasa untuk makan siang.",
      en: "Nusa Penida day trip was flawless. Perfect timing, great photo spots, and our driver even recommended an amazing local warung for lunch. Highly recommend!",
    },
    name: "Jessica Liu",
    from: "Singapore",
  },
];

export function Testimonials() {
  const { lang, t } = useLang();
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((p) => (p === 0 ? reviews.length - 1 : p - 1));
  const next = () => setIdx((p) => (p === reviews.length - 1 ? 0 : p + 1));

  return (
    <section id="testimoni" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="relative hidden lg:block">
          <ImageWithFallback src={sunsetImg} alt="Bali sunset" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="bg-[#0a0a0a] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-white/20" />
            <span
              className="text-white/30 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.3em" }}
            >
              {t("testOverline")}
            </span>
          </motion.div>

          <div className="min-h-[200px] mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  className="text-white/80 mb-8"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 200,
                    lineHeight: 1.7,
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;{reviews[idx].text[lang]}&rdquo;
                </p>
                <div>
                  <p
                    className="text-white"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500 }}
                  >
                    {reviews[idx].name}
                  </p>
                  <p
                    className="text-white/30 mt-1"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 300 }}
                  >
                    {reviews[idx].from}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
            <span
              className="text-white/20 ml-4"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 400 }}
            >
              {String(idx + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
