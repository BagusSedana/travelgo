import { useState, useEffect } from "react";
import {
  Lock,
  LayoutDashboard,
  Tag,
  ClipboardList,
  LogOut,
  ArrowLeft,
  Save,
  Trash2,
  MapPin,
  Clock,
  MessageSquare,
  Phone,
  User,
  Calendar,
  TrendingUp,
  Eye,
  Menu,
  X as CloseIcon
} from "lucide-react";
import {
  loginAdmin,
  logoutAdmin,
  checkSession,
  getDestinations,
  updateDestination,
  getBookings,
  getTodayBookings,
  clearBookings,
  updateBookingStatus,
  type BookingEntry,
  type DestinationData,
} from "../store";

const font: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

// ─── Login Screen ─────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await loginAdmin(email, password);
    setLoading(false);

    if (success) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6" style={font}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-white/40" />
          </div>
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 200, letterSpacing: "-0.03em" }}
          >
            Admin Panel
          </h1>
          <p className="text-white/30" style={{ fontSize: "13px", fontWeight: 300 }}>
            TravelJimb — Masuk dengan akun Supabase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Admin"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
            style={{ fontSize: "14px", fontWeight: 300 }}
            autoFocus
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"
              } rounded-xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors`}
            style={{ fontSize: "16px", fontWeight: 300, letterSpacing: "0.1em" }}
            required
          />
          {error && (
            <p className="text-red-400 text-center mt-3" style={{ fontSize: "12px", fontWeight: 400 }}>
              Email atau Password salah. Coba lagi.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-[#0a0a0a] py-4 rounded-xl border-none transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-white/90 cursor-pointer"
              }`}
            style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <a
          href="/"
          className="flex items-center justify-center gap-2 text-white/20 hover:text-white/40 transition-colors mt-8 no-underline"
          style={{ fontSize: "12px", fontWeight: 400 }}
        >
          <ArrowLeft size={14} /> Kembali ke Landing Page
        </a>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────
type Tab = "dashboard" | "destinations" | "orders";

function Sidebar({
  active,
  setActive,
  onLogout,
  isOpen,
  setIsOpen,
}: {
  active: Tab;
  setActive: (t: Tab) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
}) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "destinations", label: "Destinasi", icon: <Tag size={18} /> },
    { id: "orders", label: "Riwayat Order", icon: <ClipboardList size={18} /> },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col min-h-screen z-50 transform transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={font}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <a href="/" className="no-underline flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="text-white/60" style={{ fontSize: "12px", fontWeight: 600 }}>
                TG
              </span>
            </div>
            <div>
              <p className="text-white" style={{ fontSize: "14px", fontWeight: 500 }}>
                TravelJimb
              </p>
              <p className="text-white/30" style={{ fontSize: "10px", fontWeight: 400 }}>
                Admin Panel
              </p>
            </div>
          </a>
          <button className="md:hidden bg-transparent border-none text-white/50 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}>
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-none cursor-pointer transition-all ${active === tab.id
                ? "bg-white/10 text-white"
                : "bg-transparent text-white/30 hover:text-white/60 hover:bg-white/5"
                }`}
              style={{ fontSize: "13px", fontWeight: 400 }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-none cursor-pointer bg-transparent text-white/20 hover:text-red-400 hover:bg-red-500/5 transition-all"
            style={{ fontSize: "13px", fontWeight: 400 }}
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard Tab ───────────────────────────────────────
function DashboardTab() {
  const [todayBookings, setTodayBookings] = useState<BookingEntry[]>([]);
  const [allBookings, setAllBookings] = useState<BookingEntry[]>([]);
  const [destinations, setDestinations] = useState<DestinationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [today, all, dests] = await Promise.all([
        getTodayBookings(),
        getBookings(),
        getDestinations(),
      ]);
      setTodayBookings(today);
      setAllBookings(all);
      setDestinations(dests);
      setLoading(false);
    }
    loadData();
  }, []);

  // Most popular destination
  const destCount: Record<string, number> = {};
  allBookings.forEach((b) => {
    if (b.destination !== "Custom") {
      destCount[b.destination] = (destCount[b.destination] || 0) + 1;
    }
  });
  const topDest = Object.entries(destCount).sort((a, b) => b[1] - a[1])[0];

  const stats = [
    {
      label: "Order Hari Ini",
      value: todayBookings.length,
      icon: <Calendar size={20} />,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Total Order",
      value: allBookings.length,
      icon: <TrendingUp size={20} />,
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Destinasi Aktif",
      value: destinations.length,
      icon: <MapPin size={20} />,
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      label: "Terpopuler",
      value: topDest ? topDest[0] : "-",
      sub: topDest ? `${topDest[1]} order` : "",
      icon: <TrendingUp size={20} />,
      color: "bg-amber-500/10 text-amber-400",
    },
  ];

  if (loading) {
    return <div className="p-10 text-center text-white/50">Memuat data...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white mb-1" style={{ fontSize: "24px", fontWeight: 200, letterSpacing: "-0.03em" }}>
          Dashboard
        </h2>
        <p className="text-white/30" style={{ fontSize: "13px", fontWeight: 300 }}>
          Ringkasan aktivitas TravelJimb hari ini
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
              {s.icon}
            </div>
            <p className="text-white/30 mb-1" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {s.label}
            </p>
            <p className="text-white" style={{ fontSize: "24px", fontWeight: 200 }}>
              {s.value}
            </p>
            {"sub" in s && s.sub && (
              <p className="text-white/20 mt-1" style={{ fontSize: "11px", fontWeight: 300 }}>
                {s.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h3 className="text-white" style={{ fontSize: "14px", fontWeight: 500 }}>
            Order Terbaru
          </h3>
          <span className="text-white/20" style={{ fontSize: "11px", fontWeight: 400 }}>
            {allBookings.length} total
          </span>
        </div>
        {allBookings.length === 0 ? (
          <div className="p-10 text-center">
            <ClipboardList size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/20" style={{ fontSize: "13px", fontWeight: 300 }}>
              Belum ada order masuk
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {allBookings.slice(0, 8).map((b) => (
              <div key={b.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate" style={{ fontSize: "13px", fontWeight: 400 }}>
                    {b.destination}
                    {b.formData?.name && (
                      <span className="text-white/30 ml-2">— {b.formData.name}</span>
                    )}
                  </p>
                  <p className="text-white/20" style={{ fontSize: "11px", fontWeight: 300 }}>
                    {b.source === "modal" ? "Dari halaman destinasi" : b.source === "form" ? "Dari form kontak" : "Lainnya"}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/40" style={{ fontSize: "11px", fontWeight: 400 }}>
                    {new Date(b.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 300 }}>
                    {new Date(b.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Destinations Tab ────────────────────────────────────
function DestinationsTab() {
  const [destinations, setDestinations] = useState<DestinationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<DestinationData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dests = await getDestinations();
      setDestinations(dests);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData || !editData.id) return;
    setSaving(true);
    await updateDestination(editData.id, editData);
    const dests = await getDestinations();
    setDestinations(dests);
    setEditData(null);
    setSaving(false);
  };

  if (loading) {
    return <div className="p-10 text-center text-white/50">Memuat data...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white mb-1" style={{ fontSize: "24px", fontWeight: 200, letterSpacing: "-0.03em" }}>
          Destinasi
        </h2>
        <p className="text-white/30" style={{ fontSize: "13px", fontWeight: 300 }}>
          Kelola informasi destinasi yang ditampilkan di website.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
        <div>
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-5 py-3 border-b border-white/5">
            {["Destinasi", "Tag", "Durasi", "Harga", "Aksi"].map((h, i) => (
              <div
                key={h || i}
                className={`${i === 0 ? "col-span-5 sm:col-span-3" :
                  i === 4 ? "col-span-4 sm:col-span-3 text-right" :
                    i === 3 ? "col-span-3 sm:col-span-2" :
                      "hidden sm:block sm:col-span-2"
                  } text-white/20 px-1 sm:px-2`}
                style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {h}
              </div>
            ))}
          </div>

          <div className="divide-y divide-white/5">
            {destinations.map((d) => (
              <div key={d.id} className="grid grid-cols-12 gap-2 sm:gap-4 items-center px-4 sm:px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="col-span-5 sm:col-span-3 flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${d.image})` }}
                  />
                  <span className="text-white truncate" style={{ fontSize: "13px", fontWeight: 400 }}>
                    {d.name}
                  </span>
                </div>
                <div className="hidden sm:block sm:col-span-2 px-2">
                  <span className="text-white/30" style={{ fontSize: "12px", fontWeight: 300 }}>{d.tag}</span>
                </div>
                <div className="hidden sm:block sm:col-span-2 px-2">
                  <span className="text-white/30" style={{ fontSize: "12px", fontWeight: 300 }}>{d.duration.id}</span>
                </div>
                <div className="col-span-3 sm:col-span-2 px-1 sm:px-2">
                  <span className="text-white/90" style={{ fontSize: "12px", fontWeight: 400 }}>{d.price}</span>
                </div>
                <div className="col-span-4 sm:col-span-3 flex justify-end">
                  <button
                    onClick={() => setEditData(d)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/15 transition-colors border-none cursor-pointer"
                    style={{ fontSize: "11px", fontWeight: 500 }}
                  >
                    <span className="sm:hidden">Edit</span>
                    <span className="hidden sm:inline">Edit Lengkap</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between flex-shrink-0">
              <h3 className="text-white" style={{ fontSize: "18px", fontWeight: 400 }}>Edit Destinasi</h3>
              <button
                onClick={() => setEditData(null)}
                className="text-white/40 hover:text-white bg-transparent border-none cursor-pointer text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form id="edit-dest-form" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Nama</label>
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Harga</label>
                    <input
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Tag</label>
                  <input
                    value={editData.tag}
                    onChange={(e) => setEditData({ ...editData, tag: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>URL Gambar</label>
                  <input
                    value={editData.image}
                    onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Durasi (ID)</label>
                    <input
                      value={editData.duration.id}
                      onChange={(e) => setEditData({ ...editData, duration: { ...editData.duration, id: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Durasi (EN)</label>
                    <input
                      value={editData.duration.en}
                      onChange={(e) => setEditData({ ...editData, duration: { ...editData.duration, en: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Jarak (ID)</label>
                    <input
                      value={editData.distance.id}
                      onChange={(e) => setEditData({ ...editData, distance: { ...editData.distance, id: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-1" style={{ fontSize: "11px" }}>Jarak (EN)</label>
                    <input
                      value={editData.distance.en}
                      onChange={(e) => setEditData({ ...editData, distance: { ...editData.distance, en: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/5 flex justify-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                Batal
              </button>
              <button
                form="edit-dest-form"
                type="submit"
                disabled={saving}
                className={`px-6 py-3 rounded-xl bg-white text-[#0a0a0a] border-none transition-colors ${saving ? "opacity-50 cursor-not-allowed" : "hover:bg-white/90 cursor-pointer"}`}
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Orders Tab ──────────────────────────────────────────
function OrdersTab() {
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "today">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "pending" | "sukses" | "cancel") => {
    await updateBookingStatus(id, newStatus);
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const getStatusColor = (status: string) => {
    if (status === "sukses") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "cancel") return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  const getStatusLabel = (status: string) => {
    if (status === "sukses") return "Sukses";
    if (status === "cancel") return "Cancel";
    return "Pending";
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const filtered = filter === "today" ? bookings.filter(b => b.timestamp.slice(0, 10) === todayStr) : bookings;

  const handleClear = async () => {
    if (window.confirm("Yakin hapus semua riwayat order?")) {
      await clearBookings();
      setBookings([]);
    }
  };

  const sourceLabel = (s: string) => {
    switch (s) {
      case "modal": return "Halaman Destinasi";
      case "form": return "Form Kontak";
      case "hero": return "Hero Section";
      case "floating": return "Tombol WA";
      default: return s;
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-white/50">Memuat riwayat order...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-white mb-1" style={{ fontSize: "24px", fontWeight: 200, letterSpacing: "-0.03em" }}>
            Riwayat Order
          </h2>
          <p className="text-white/30" style={{ fontSize: "13px", fontWeight: 300 }}>
            Semua pemesanan yang masuk lewat website
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-xl overflow-hidden border border-white/5">
            {(["all", "today"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 border-none cursor-pointer transition-colors ${filter === f ? "bg-white/10 text-white" : "bg-transparent text-white/30 hover:text-white/50"
                  }`}
                style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                {f === "all" ? "Semua" : "Hari Ini"}
              </button>
            ))}
          </div>
          {bookings.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl border border-red-500/20 bg-transparent text-red-400/60 hover:text-red-400 hover:border-red-500/40 cursor-pointer transition-colors flex items-center gap-2"
              style={{ fontSize: "11px", fontWeight: 500 }}
            >
              <Trash2 size={13} />
              Hapus Semua
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-16 text-center">
          <ClipboardList size={40} className="text-white/10 mx-auto mb-4" />
          <p className="text-white/20 mb-1" style={{ fontSize: "14px", fontWeight: 400 }}>
            {filter === "today" ? "Belum ada order hari ini" : "Belum ada order"}
          </p>
          <p className="text-white/10" style={{ fontSize: "12px", fontWeight: 300 }}>
            Order akan muncul saat pengunjung klik "Pesan Sekarang"
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => {
            const isExpanded = expandedId === b.id;
            return (
              <div
                key={b.id}
                className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : b.id)}
                  className="w-full flex items-center gap-4 p-5 bg-transparent border-none cursor-pointer text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-white/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-0">
                      <span className="text-white bg-white/5" style={{ fontSize: "14px", fontWeight: 400 }}>
                        {b.destination}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/30" style={{ fontSize: "10px", fontWeight: 400 }}>
                        {sourceLabel(b.source)}
                      </span>
                      {b.price !== "-" && (
                        <span className="text-white/20" style={{ fontSize: "12px", fontWeight: 300 }}>
                          {b.price}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-1">
                      <span className={`w-fit px-2 py-0.5 rounded-full border ${getStatusColor(b.status)}`} style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {getStatusLabel(b.status)}
                      </span>
                      <span className="text-white/20 flex items-center gap-1.5" style={{ fontSize: "11px", fontWeight: 300 }}>
                        <Calendar size={11} />
                        {new Date(b.timestamp).toLocaleDateString("id-ID", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-white/20 flex items-center gap-1.5" style={{ fontSize: "11px", fontWeight: 300 }}>
                        <Clock size={11} />
                        {new Date(b.timestamp).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Eye size={16} className={`transition-colors flex-shrink-0 ${isExpanded ? "text-white/40" : "text-white/10"}`} />
                </button>

                {/* Expanded detail */}
                {isExpanded && b.formData && (
                  <div className="border-t border-white/5 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Status updater */}
                    <div className="sm:col-span-2 mb-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
                      <span className="text-white/40" style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Ubah Status:</span>
                      <div className="flex bg-black/20 rounded-lg overflow-hidden border border-white/5">
                        <button
                          onClick={() => handleStatusChange(b.id, "pending")}
                          className={`px-3 py-1.5 border-none cursor-pointer transition-colors ${b.status === "pending" ? "bg-amber-500/20 text-amber-400" : "bg-transparent text-white/30 hover:text-white/50"}`}
                          style={{ fontSize: "11px", fontWeight: 500 }}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(b.id, "sukses")}
                          className={`px-3 py-1.5 border-none cursor-pointer transition-colors ${b.status === "sukses" ? "bg-emerald-500/20 text-emerald-400" : "bg-transparent text-white/30 hover:text-white/50"}`}
                          style={{ fontSize: "11px", fontWeight: 500 }}
                        >
                          Sukses
                        </button>
                        <button
                          onClick={() => handleStatusChange(b.id, "cancel")}
                          className={`px-3 py-1.5 border-none cursor-pointer transition-colors ${b.status === "cancel" ? "bg-red-500/20 text-red-400" : "bg-transparent text-white/30 hover:text-white/50"}`}
                          style={{ fontSize: "11px", fontWeight: 500 }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {b.formData.name && (
                      <div className="flex items-center gap-3">
                        <User size={14} className="text-white/20" />
                        <div>
                          <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Nama</p>
                          <p className="text-white/60" style={{ fontSize: "13px", fontWeight: 300 }}>{b.formData.name}</p>
                        </div>
                      </div>
                    )}
                    {b.formData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={14} className="text-white/20" />
                        <div>
                          <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>WhatsApp</p>
                          <p className="text-white/60" style={{ fontSize: "13px", fontWeight: 300 }}>{b.formData.phone}</p>
                        </div>
                      </div>
                    )}
                    {b.formData.date && (
                      <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-white/20" />
                        <div>
                          <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tanggal</p>
                          <p className="text-white/60" style={{ fontSize: "13px", fontWeight: 300 }}>{b.formData.date}</p>
                        </div>
                      </div>
                    )}
                    {b.formData.dest && (
                      <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-white/20" />
                        <div>
                          <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Destinasi</p>
                          <p className="text-white/60" style={{ fontSize: "13px", fontWeight: 300 }}>{b.formData.dest}</p>
                        </div>
                      </div>
                    )}
                    {b.formData.msg && (
                      <div className="flex items-start gap-3 sm:col-span-2">
                        <MessageSquare size={14} className="text-white/20 mt-0.5" />
                        <div>
                          <p className="text-white/20" style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Pesan</p>
                          <p className="text-white/60" style={{ fontSize: "13px", fontWeight: 300 }}>{b.formData.msg}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Panel ────────────────────────────────────
export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function verifySession() {
      const activeSession = await checkSession();
      setLoggedIn(activeSession);
      setCheckingSession(false);
    }
    verifySession();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    setLoggedIn(false);
  };

  if (checkingSession) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">Memeriksa sesi...</div>;
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#111] text-white overflow-hidden" style={font}>
      <Sidebar active={tab} setActive={(t) => { setTab(t); setMobileMenuOpen(false); }} onLogout={handleLogout} isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#0a0a0a] border-b border-white/5 p-4 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setMobileMenuOpen(true)} className="bg-transparent border-none text-white/50 cursor-pointer">
            <Menu size={24} />
          </button>
          <div className="font-medium text-white/90">TravelJimb Admin</div>
        </header>

        <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "destinations" && <DestinationsTab />}
          {tab === "orders" && <OrdersTab />}
        </main>
      </div>
    </div>
  );
}
