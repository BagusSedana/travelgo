import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang } from "./LanguageContext";
import { DestinationModal, type Destination } from "./DestinationModal";
import { getDestinationsWithPrices, DEFAULT_DESTINATIONS } from "./store";

export function Destinations() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>(DEFAULT_DESTINATIONS);

  useEffect(() => {
    getDestinationsWithPrices().then(setDestinations);
  }, []);

  return (
    <>
      <section id="destinasi" className="bg-[#0a0a0a] py-32 px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-white/20" />
              <span
                className="text-white/30 uppercase"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                }}
              >
                {t("destOverline")}
              </span>
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 200,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                {t("destTitle1")}
                <br />
                {t("destTitle2")}
                <span className="text-white/20">?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/30 max-w-xs"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {t("destNote")}
              </motion.p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelected(d)}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <ImageWithFallback
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5">
                    <span
                      className="text-white"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {d.price}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="text-white/50 mb-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {d.tag}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3
                        className="text-white"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "22px",
                          fontWeight: 300,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {d.name}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowRight size={15} className="text-white" />
                      </div>
                    </div>

                    {/* Duration bar */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span
                        className="text-white/40"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        {d.duration.id}
                      </span>
                      <span
                        className="text-white/40"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        {d.distance.id}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DestinationModal dest={selected} onClose={() => setSelected(null)} />
    </>
  );
}