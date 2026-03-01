import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LanguageContext";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [t("navDiscover"), t("navAbout"), t("navDestinations"), t("navExperience"), t("navContact")];
  const sectionIds = ["layanan", "tentang", "destinasi", "testimoni", "kontak"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (idx: number) => {
    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const toggleLang = () => setLang(lang === "id" ? "en" : "id");

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-2xl" : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-transparent border-none cursor-pointer tracking-widest uppercase transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              color: scrolled ? "#0a0a0a" : "#fff",
            }}
          >
            TravelJimb
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l, i) => (
              <button
                key={l}
                onClick={() => go(i)}
                className="bg-transparent border-none cursor-pointer transition-colors relative group"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: scrolled ? "#999" : "rgba(255,255,255,0.6)",
                }}
              >
                <span
                  className="group-hover:opacity-100 transition-opacity"
                  style={{ color: scrolled ? "#0a0a0a" : "#fff" }}
                >
                  {l}
                </span>
              </button>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-1.5 rounded-full border cursor-pointer bg-transparent transition-all hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                borderColor: scrolled ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                color: scrolled ? "#0a0a0a" : "#fff",
              }}
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border cursor-pointer bg-transparent transition-all"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                borderColor: scrolled ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                color: scrolled ? "#0a0a0a" : "#fff",
              }}
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
            <button
              className="bg-transparent border-none cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className={`block h-px transition-all duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}
                  style={{ backgroundColor: scrolled ? "#0a0a0a" : "#fff" }}
                />
                <span
                  className={`block h-px transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
                  style={{ backgroundColor: scrolled ? "#0a0a0a" : "#fff" }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-7 right-8 bg-transparent border-none cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className="block h-px bg-white rotate-45 translate-y-[3.5px]" />
                <span className="block h-px bg-white -rotate-45 -translate-y-[3.5px]" />
              </div>
            </button>
            {links.map((l, i) => (
              <motion.button
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => go(i)}
                className="bg-transparent border-none cursor-pointer text-white mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "28px",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                }}
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}