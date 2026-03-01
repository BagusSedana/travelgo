import { motion } from "motion/react";
import { useLang } from "./LanguageContext";

export function Footer() {
  const { t } = useLang();

  const links = [
    { label: t("navDiscover"), id: "layanan" },
    { label: t("navAbout"), id: "tentang" },
    { label: t("navDestinations"), id: "destinasi" },
    { label: t("navExperience"), id: "testimoni" },
    { label: t("navContact"), id: "kontak" },
  ];

  return (
    <footer className="bg-[#0a0a0a] pt-24 pb-8 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/[0.03] mb-16 select-none"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(60px, 12vw, 160px)",
            fontWeight: 200,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          TravelGo
        </motion.p>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <span
              className="text-white/20"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              TravelGo
            </span>
            <div className="flex gap-8">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-white/15 hover:text-white/50 transition-colors no-underline"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 400 }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <p
            className="text-white/10"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 400 }}
          >
            &copy; 2026 TravelGo. Bali, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}