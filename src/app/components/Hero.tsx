import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang, buildWaUrl } from "./LanguageContext";
import { addBooking } from "./store";

const heroImg =
  "https://images.unsplash.com/photo-1769442872237-eda97981ddee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYWVyaWFsJTIwb2NlYW4lMjBjbGlmZiUyMGRyYW1hdGljfGVufDF8fHx8MTc3MjM2MTUyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Hero() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <ImageWithFallback src={heroImg} alt="Bali" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-[1400px] mx-auto"
        style={{ opacity, y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-white/40" />
          <span
            className="text-white/50 uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.3em" }}
          >
            {t("heroOverline")}
          </span>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(42px, 8vw, 100px)",
              fontWeight: 200,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {t("heroTitle1")}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(42px, 8vw, 100px)",
              fontWeight: 200,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {t("heroTitle2")}<span className="text-white/30">.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-white/40 max-w-md mb-12"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.8 }}
        >
          {t("heroSub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="flex items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const isId = lang === "id";
              const msg = isId
                ? "Halo TravelJimb!\nSaya tertarik untuk memesan driver di Bali. Boleh minta info lebih lanjut?"
                : "Hello TravelJimb!\nI'm interested in booking a driver in Bali. Could you send me more info?\n\n──────────────────\nTerjemahan untuk driver:\n\nTamu ini tertarik memesan driver di Bali. Mohon ditindaklanjuti.";
              addBooking({ destination: "General Inquiry", tag: "Hero CTA", price: "-", source: "hero" });
              window.open(buildWaUrl(msg), "_blank");
            }}
            className="bg-white text-[#0a0a0a] px-8 py-4 cursor-pointer border-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {t("heroBtn")}
          </motion.button>
          <button
            onClick={() => document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-transparent text-white/50 hover:text-white transition-colors cursor-pointer border-none"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 400, letterSpacing: "0.05em" }}
          >
            {t("heroMore")} &darr;
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-8 md:left-12 right-8 md:right-12 flex items-end justify-between z-10"
      >
        <div className="flex items-center gap-8">
          {[t("heroYears"), t("heroTrips"), "Bali"].map((txt) => (
            <span
              key={txt}
              className="text-white/25"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.1em" }}
            >
              {txt}
            </span>
          ))}
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-8 bg-white/20"
        />
      </motion.div>
    </section>
  );
}