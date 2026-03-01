import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useState } from "react";
import { useLang, WA_DISPLAY, EMAIL, BASE_LOCATION, buildWaUrl } from "./LanguageContext";
import { addBooking } from "./store";

export function Contact() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", dest: "", date: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isId = lang === "id";
    const msg = isId
      ? `Halo TravelJimb!\n\nSaya ingin memesan driver.\n\n` +
      `--- Detail Pemesanan ---\n` +
      `Nama: ${form.name}\n` +
      `WA: ${form.phone}` +
      `${form.dest ? `\nDestinasi: ${form.dest}` : ""}` +
      `${form.date ? `\nTanggal: ${form.date}` : ""}` +
      `${form.msg ? `\nPesan: ${form.msg}` : ""}` +
      `\n\nMohon info lebih lanjut. Terima kasih!`
      : `Hello TravelJimb!\n\nI'd like to book a driver.\n\n` +
      `--- Booking Details ---\n` +
      `Name: ${form.name}\n` +
      `WA: ${form.phone}` +
      `${form.dest ? `\nDestination: ${form.dest}` : ""}` +
      `${form.date ? `\nDate: ${form.date}` : ""}` +
      `${form.msg ? `\nMessage: ${form.msg}` : ""}` +
      `\n\nPlease send me more details. Thank you!\n\n` +
      `──────────────────\n` +
      `Terjemahan untuk driver:\n\n` +
      `Tamu ini ingin memesan driver.\n` +
      `Nama: ${form.name}\n` +
      `WA: ${form.phone}` +
      `${form.dest ? `\nDestinasi: ${form.dest}` : ""}` +
      `${form.date ? `\nTanggal: ${form.date}` : ""}` +
      `${form.msg ? `\nPesan: ${form.msg}` : ""}`;
    window.open(buildWaUrl(msg), "_blank");

    await addBooking({
      destination: form.dest || "Custom",
      tag: "Contact Form",
      price: "-",
      source: "form",
      formData: { ...form },
    });

    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", phone: "", dest: "", date: "", msg: "" });
  };

  const inputCls =
    "w-full bg-transparent border-b border-neutral-200 focus:border-[#0a0a0a] outline-none py-4 text-[#0a0a0a] placeholder:text-neutral-300 transition-colors";
  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    borderRadius: 0,
  };

  return (
    <section id="kontak" className="py-32 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
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
              {t("ctaOverline")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[#0a0a0a] mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 200,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            {t("ctaTitle1")}
            <br />
            {t("ctaTitle2")}<span className="text-neutral-300">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-neutral-400 mb-12 max-w-sm"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.8 }}
          >
            {t("ctaSub")}
          </motion.p>

          <div className="space-y-4">
            {[
              { label: "WhatsApp", value: WA_DISPLAY },
              { label: "Email", value: EMAIL },
              { label: "Base", value: BASE_LOCATION[lang] },
            ].map((c) => (
              <div key={c.label} className="flex items-baseline gap-6">
                <span
                  className="text-neutral-300 w-20 flex-shrink-0"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {c.label}
                </span>
                <span
                  className="text-neutral-600"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400 }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          className="flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <input
              type="text"
              placeholder={t("ctaName")}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder={t("ctaPhone")}
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputCls}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder={t("ctaDest")}
              value={form.dest}
              onChange={(e) => setForm({ ...form, dest: e.target.value })}
              className={inputCls}
              style={inputStyle}
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <textarea
            rows={3}
            placeholder={t("ctaMsg")}
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            className={`${inputCls} resize-none mt-0`}
            style={inputStyle}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-10 bg-[#0a0a0a] text-white py-4 px-8 cursor-pointer border-none flex items-center justify-center gap-3 self-start"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {sent ? t("ctaSent") : <><span>{t("ctaSend")}</span><Send size={13} /></>}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}