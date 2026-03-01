import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageContext";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) return animate(count, target, { duration: 2.5, ease: "easeOut" }).stop;
  }, [inView, target, count]);

  useEffect(() => rounded.on("change", (v) => setDisplay(String(v))), [rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function Stats() {
  const { t } = useLang();

  const stats = [
    { val: 8, suf: "+", label: t("statYears"), sub: t("statYearsSub") },
    { val: 2000, suf: "+", label: t("statTrips"), sub: t("statTripsSub") },
    { val: 50, suf: "+", label: t("statRoutes"), sub: t("statRoutesSub") },
    { val: 99, suf: "%", label: t("statSatisfaction"), sub: t("statSatisfactionSub") },
  ];

  return (
    <section className="py-32 px-8 md:px-12 bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#fafaf9] p-8 md:p-12 flex flex-col"
            >
              <p
                className="text-[#0a0a0a] mb-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 200,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                <Counter target={s.val} suffix={s.suf} />
              </p>
              <p
                className="text-[#0a0a0a] mb-1"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}
              >
                {s.label}
              </p>
              <p
                className="text-neutral-400"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 300 }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
