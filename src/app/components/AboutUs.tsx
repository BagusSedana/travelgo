import { motion } from "motion/react";
import { MapPin, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang } from "./LanguageContext";

const driverImg =
  "https://images.unsplash.com/photo-1549904912-6d235f6fc07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwZHJpdmVyJTIwY2FyJTIwcm9hZCUyMHNjZW5pY3xlbnwxfHx8fDE3NzIzNjI4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function AboutUs() {
  const { t } = useLang();

  return (
    <section id="tentang" className="py-32 px-8 md:px-12 bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-neutral-300" />
          <span
            className="text-neutral-400 uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
            }}
          >
            {t("aboutOverline")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[#0a0a0a] mb-20"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 200,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {t("aboutTitle1")}
          <br />
          {t("aboutTitle2")}
          <span className="text-neutral-300">.</span>
        </motion.h2>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <ImageWithFallback
                src={driverImg}
                alt="Bali road"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center flex-shrink-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "18px",
                      fontWeight: 200,
                    }}
                  >
                    8+
                  </div>
                  <div>
                    <p
                      className="text-[#0a0a0a]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {t("aboutYears")}
                    </p>
                    <p
                      className="text-neutral-400 mt-0.5"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 300,
                      }}
                    >
                      2017 — 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#0a0a0a] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(16px, 1.8vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: "-0.01em",
              }}
            >
              {t("aboutP1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-500 mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.9,
              }}
            >
              {t("aboutP2")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-500 mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.9,
              }}
            >
              {t("aboutP3")}
            </motion.p>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Clock size={18} />,
                  label: t("aboutYears"),
                  value: "8+",
                  sub: "2017 — 2026",
                },
                {
                  icon: <MapPin size={18} />,
                  label: t("aboutBase"),
                  value: "Jimbaran",
                  sub: "Kuta Selatan, Badung",
                },
                {
                  icon: <Shield size={18} />,
                  label: t("aboutPromise"),
                  value: t("aboutPromiseText"),
                  sub: "",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 hover:bg-white transition-all"
                >
                  <div className="text-neutral-300 mb-4 group-hover:text-[#0a0a0a] transition-colors">
                    {item.icon}
                  </div>
                  <p
                    className="text-neutral-400 mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[#0a0a0a]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {item.value}
                  </p>
                  {item.sub && (
                    <p
                      className="text-neutral-400 mt-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 300,
                      }}
                    >
                      {item.sub}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
