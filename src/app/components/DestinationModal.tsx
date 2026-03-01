import { motion, AnimatePresence } from "motion/react";
import { X, Check, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang, buildWaUrl } from "./LanguageContext";
import { addBooking } from "./store";

export type Destination = {
  name: string;
  tag: string;
  price: string;
  image: string;
  duration: { id: string; en: string };
  distance: { id: string; en: string };
  highlights: { id: string; en: string }[];
};

interface Props {
  dest: Destination | null;
  onClose: () => void;
}

export function DestinationModal({ dest, onClose }: Props) {
  const { lang, t } = useLang();

  const included = [
    t("destDriver"),
    t("destFuel"),
    t("destParking"),
    t("destWater"),
    t("destFlexible"),
    t("destAC"),
  ];

  const notIncluded = [
    t("destEntrance"),
    t("destMeals"),
    t("destTips"),
  ];

  return (
    <AnimatePresence>
      {dest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center cursor-pointer border-none text-white hover:bg-black/40 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative h-56 md:h-72 overflow-hidden">
              <ImageWithFallback
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="text-white/50 mb-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.05em" }}
                >
                  {dest.tag}
                </p>
                <h2
                  className="text-white"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "32px", fontWeight: 200, letterSpacing: "-0.03em" }}
                >
                  {dest.name}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Quick info */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-neutral-100">
                <div>
                  <p className="text-neutral-400 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t("destFrom")}
                  </p>
                  <p className="text-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 300 }}>
                    {dest.price}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t("destDuration")}
                  </p>
                  <p className="text-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400 }}>
                    {dest.duration[lang]}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t("destDistance")}
                  </p>
                  <p className="text-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400 }}>
                    {dest.distance[lang]}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              {dest.highlights.length > 0 && (
                <div className="mb-8 pb-8 border-b border-neutral-100">
                  <p className="text-neutral-400 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Highlights
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-full"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 400 }}
                      >
                        {h[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Two columns: Included / Not included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-neutral-400 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t("destIncluded")}
                  </p>
                  <div className="space-y-3">
                    {included.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-emerald-500" />
                        </div>
                        <span className="text-neutral-600" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t("destNotIncluded")}
                  </p>
                  <div className="space-y-3">
                    {notIncluded.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                          <AlertCircle size={11} className="text-neutral-400" />
                        </div>
                        <span className="text-neutral-400" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  const isId = lang === "id";
                  const hlId = dest.highlights.map((h) => h.id).join(", ");
                  const hlEn = dest.highlights.map((h) => h.en).join(", ");

                  // Full card info — included & not included
                  const inclId = [
                    "Driver berpengalaman",
                    "BBM (bensin)",
                    "Biaya parkir",
                    "Air mineral",
                    "Rute fleksibel",
                    "Mobil ber-AC & bersih",
                  ];
                  const notInclId = [
                    "Tiket masuk wisata",
                    "Makan & minum pribadi",
                    "Tips (opsional)",
                  ];
                  const inclEn = [
                    "Experienced driver",
                    "Fuel (gasoline)",
                    "Parking fees",
                    "Mineral water",
                    "Flexible route",
                    "Clean AC car",
                  ];
                  const notInclEn = [
                    "Attraction entrance fees",
                    "Personal meals & drinks",
                    "Tips (optional)",
                  ];

                  const msg = isId
                    ? `Halo TravelJimb!\nSaya ingin memesan driver untuk perjalanan ke *${dest.name}*.\n\n` +
                    `═══════════════════\n` +
                    `   *${dest.name.toUpperCase()}*\n` +
                    `   ${dest.tag}\n` +
                    `═══════════════════\n\n` +
                    `💰 *Harga:* ${dest.price}\n` +
                    `⏱ *Durasi:* ${dest.duration.id}\n` +
                    `📍 *Jarak:* ${dest.distance.id}\n\n` +
                    `🗺 *Rute / Highlights:*\n` +
                    dest.highlights.map((h) => `   • ${h.id}`).join("\n") + `\n\n` +
                    `✅ *Sudah Termasuk:*\n` +
                    inclId.map((x) => `   • ${x}`).join("\n") + `\n\n` +
                    `⛔ *Belum Termasuk:*\n` +
                    notInclId.map((x) => `   • ${x}`).join("\n") + `\n\n` +
                    `Mohon info lebih lanjut. Terima kasih!`
                    : `Hello TravelJimb!\nI'd like to book a driver for a trip to *${dest.name}*.\n\n` +
                    `═══════════════════\n` +
                    `   *${dest.name.toUpperCase()}*\n` +
                    `   ${dest.tag}\n` +
                    `═══════════════════\n\n` +
                    `💰 *Price:* ${dest.price}\n` +
                    `⏱ *Duration:* ${dest.duration.en}\n` +
                    `📍 *Distance:* ${dest.distance.en}\n\n` +
                    `🗺 *Route / Highlights:*\n` +
                    dest.highlights.map((h) => `   • ${h.en}`).join("\n") + `\n\n` +
                    `✅ *What's Included:*\n` +
                    inclEn.map((x) => `   • ${x}`).join("\n") + `\n\n` +
                    `⛔ *Not Included:*\n` +
                    notInclEn.map((x) => `   • ${x}`).join("\n") + `\n\n` +
                    `Please send me more details. Thank you!\n\n` +
                    `──────────────────\n` +
                    `📋 *Terjemahan untuk driver:*\n\n` +
                    `Tamu ini mau pesan ke *${dest.name}* (${dest.tag})\n` +
                    `💰 Harga: ${dest.price}\n` +
                    `⏱ Durasi: ${dest.duration.id}\n` +
                    `📍 Jarak: ${dest.distance.id}\n` +
                    `🗺 Rute: ${hlId}\n` +
                    `✅ Termasuk: ${inclId.join(", ")}\n` +
                    `⛔ Tidak termasuk: ${notInclId.join(", ")}`;

                  await addBooking({ destination: dest.name, tag: dest.tag, price: dest.price, source: "modal" });
                  window.open(buildWaUrl(msg), "_blank");
                }}
                className="w-full bg-[#25D366] text-white py-4 cursor-pointer border-none rounded-lg flex items-center justify-center gap-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("destBook")} via WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}