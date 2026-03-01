import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang } from "./LanguageContext";

const carImg =
  "https://images.unsplash.com/photo-1547731269-e4073e054f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMHRyYXZlbCUyMGNvbWZvcnRhYmxlfGVufDF8fHx8MTc3MjM2MTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Services() {
  const { t } = useLang();

  const services = [
    { num: "01", title: t("svc1Title"), desc: t("svc1Desc") },
    { num: "02", title: t("svc2Title"), desc: t("svc2Desc") },
    { num: "03", title: t("svc3Title"), desc: t("svc3Desc") },
    { num: "04", title: t("svc4Title"), desc: t("svc4Desc") },
  ];

  return (
    <section id="layanan" className="py-32 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-neutral-300" />
              <span
                className="text-neutral-400 uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.3em" }}
              >
                {t("svcOverline")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-[#0a0a0a]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 200,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {t("svcTitle1")}
              <br />
              {t("svcTitle2")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-end"
          >
            <div className="rounded-2xl overflow-hidden aspect-[16/10] w-full max-w-md ml-auto">
              <ImageWithFallback src={carImg} alt="Comfortable travel" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="border-t border-neutral-200">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-[60px_1fr_1fr] gap-4 md:gap-8 py-8 border-b border-neutral-200 hover:bg-neutral-50/50 transition-colors cursor-default px-2"
            >
              <span
                className="text-neutral-300 group-hover:text-[#0a0a0a] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 400 }}
              >
                {s.num}
              </span>
              <h3
                className="text-[#0a0a0a]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 300, letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p
                className="text-neutral-400 md:max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.8 }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
