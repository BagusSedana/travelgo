import { supabase } from './supabase';

export type DestinationData = {
  id?: string;
  name: string;
  tag: string;
  price: string;
  image: string;
  duration: { id: string; en: string };
  distance: { id: string; en: string };
  highlights: { id: string; en: string }[];
};

export type BookingEntry = {
  id: string;
  timestamp: string;
  destination: string;
  tag: string;
  price: string;
  source: "modal" | "form" | "hero" | "floating";
  status: "pending" | "sukses" | "cancel";
  formData?: {
    name?: string;
    phone?: string;
    dest?: string;
    date?: string;
    msg?: string;
  };
};

// Default destinations data
export const DEFAULT_DESTINATIONS: DestinationData[] = [
  {
    name: "Ubud",
    tag: "Culture & Rice Terraces",
    price: "Rp 450k",
    image: "https://images.unsplash.com/photo-1578754067449-838743bcec20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2UlMjBhZXJpYWwlMjBncmVlbiUyMGx1c2h8ZW58MXx8fHwxNzcyMzYxNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "8–10 jam", en: "8–10 hours" },
    distance: { id: "~30 km dari Jimbaran", en: "~30 km from Jimbaran" },
    highlights: [
      { id: "Sawah Tegallalang", en: "Tegallalang Rice Terrace" },
      { id: "Monkey Forest", en: "Monkey Forest" },
      { id: "Pasar Seni Ubud", en: "Ubud Art Market" },
      { id: "Puri Ubud", en: "Ubud Palace" },
    ],
  },
  {
    name: "Nusa Penida",
    tag: "Cliffs & Hidden Beaches",
    price: "Rp 600k",
    image: "https://images.unsplash.com/photo-1711786120068-63c4306d8d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwa2VsaW5na2luZyUyMGJlYWNoJTIwbnVzYSUyMHBlbmlkYXxlbnwxfHx8fDE3NzIzNjE1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "10–12 jam (termasuk ferry)", en: "10–12 hours (incl. ferry)" },
    distance: { id: "~55 km + ferry", en: "~55 km + ferry" },
    highlights: [
      { id: "Kelingking Beach", en: "Kelingking Beach" },
      { id: "Angel's Billabong", en: "Angel's Billabong" },
      { id: "Broken Beach", en: "Broken Beach" },
      { id: "Crystal Bay", en: "Crystal Bay" },
    ],
  },
  {
    name: "Kintamani",
    tag: "Volcano & Lake View",
    price: "Rp 500k",
    image: "https://images.unsplash.com/photo-1566149190185-4d4997a8e413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwZm9nJTIwbW9ybmluZyUyMG1vb2R5fGVufDF8fHx8MTc3MjM2MTUyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "8–10 jam", en: "8–10 hours" },
    distance: { id: "~65 km dari Jimbaran", en: "~65 km from Jimbaran" },
    highlights: [
      { id: "Gunung Batur", en: "Mount Batur" },
      { id: "Danau Batur", en: "Lake Batur" },
      { id: "Pura Ulun Danu Batur", en: "Ulun Danu Batur Temple" },
      { id: "Kedisan Hot Spring", en: "Kedisan Hot Spring" },
    ],
  },
  {
    name: "Tanah Lot",
    tag: "Iconic Sea Temple",
    price: "Rp 400k",
    image: "https://images.unsplash.com/photo-1669545192473-f4d88714fe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5haCUyMGxvdCUyMGJhbGklMjB0ZW1wbGUlMjBzdW5zZXR8ZW58MXx8fHwxNzcyMzYyODAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "6–8 jam", en: "6–8 hours" },
    distance: { id: "~25 km dari Jimbaran", en: "~25 km from Jimbaran" },
    highlights: [
      { id: "Pura Tanah Lot", en: "Tanah Lot Temple" },
      { id: "Sunset Point", en: "Sunset Point" },
      { id: "Taman Ayun", en: "Taman Ayun Temple" },
      { id: "Alas Kedaton", en: "Alas Kedaton" },
    ],
  },
  {
    name: "Seminyak",
    tag: "Beach & Lifestyle",
    price: "Rp 350k",
    image: "https://images.unsplash.com/photo-1627430635950-39227803c696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pbnlhayUyMGJhbGklMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NzIzNjI4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "6–8 jam", en: "6–8 hours" },
    distance: { id: "~15 km dari Jimbaran", en: "~15 km from Jimbaran" },
    highlights: [
      { id: "Pantai Seminyak", en: "Seminyak Beach" },
      { id: "Petitenget", en: "Petitenget Area" },
      { id: "Double Six Beach", en: "Double Six Beach" },
      { id: "Sunset Dinner", en: "Sunset Dinner" },
    ],
  },
  {
    name: "Uluwatu",
    tag: "Cliff Temple & Kecak",
    price: "Rp 400k",
    image: "https://images.unsplash.com/photo-1676878912863-2849fe9fb18c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdWx1d2F0dSUyMGNsaWZmJTIwdGVtcGxlJTIwb2NlYW58ZW58MXx8fHwxNzcyMzYyODAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "6–8 jam", en: "6–8 hours" },
    distance: { id: "~15 km dari Jimbaran", en: "~15 km from Jimbaran" },
    highlights: [
      { id: "Pura Uluwatu", en: "Uluwatu Temple" },
      { id: "Tari Kecak Sunset", en: "Kecak Sunset Dance" },
      { id: "Padang Padang Beach", en: "Padang Padang Beach" },
      { id: "Dreamland Beach", en: "Dreamland Beach" },
    ],
  },
  {
    name: "Ulun Danu",
    tag: "Temple on the Lake",
    price: "Rp 500k",
    image: "https://images.unsplash.com/photo-1656295987187-22f5f0d11c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdWx1biUyMGRhbnUlMjB0ZW1wbGUlMjBsYWtlfGVufDF8fHx8MTc3MjM2MTUyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "8–10 jam", en: "8–10 hours" },
    distance: { id: "~55 km dari Jimbaran", en: "~55 km from Jimbaran" },
    highlights: [
      { id: "Pura Ulun Danu Beratan", en: "Ulun Danu Beratan Temple" },
      { id: "Danau Beratan", en: "Lake Beratan" },
      { id: "Kebun Strawberry", en: "Strawberry Farm" },
      { id: "Handara Gate", en: "Handara Gate" },
    ],
  },
  {
    name: "Lempuyang",
    tag: "Gates of Heaven",
    price: "Rp 650k",
    image: "https://images.unsplash.com/photo-1693649113183-283327208912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwbGVtcHV5YW5nJTIwdGVtcGxlJTIwZ2F0ZSUyMG1vdW50YWlufGVufDF8fHx8MTc3MjM2MjgwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "10–12 jam", en: "10–12 hours" },
    distance: { id: "~85 km dari Jimbaran", en: "~85 km from Jimbaran" },
    highlights: [
      { id: "Pura Lempuyang", en: "Lempuyang Temple" },
      { id: "Gates of Heaven", en: "Gates of Heaven" },
      { id: "Tirta Gangga", en: "Tirta Gangga Water Palace" },
      { id: "Taman Ujung", en: "Taman Ujung Palace" },
    ],
  },
  {
    name: "Tegenungan",
    tag: "Waterfall & Jungle",
    price: "Rp 400k",
    image: "https://images.unsplash.com/photo-1552301726-af49f3010981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwd2F0ZXJmYWxsJTIwdHJvcGljYWwlMjBqdW5nbGV8ZW58MXx8fHwxNzcyMzYxNTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: { id: "6–8 jam", en: "6–8 hours" },
    distance: { id: "~25 km dari Jimbaran", en: "~25 km from Jimbaran" },
    highlights: [
      { id: "Air Terjun Tegenungan", en: "Tegenungan Waterfall" },
      { id: "Sawah Ceking", en: "Ceking Rice Terrace" },
      { id: "Goa Gajah", en: "Elephant Cave" },
      { id: "Tirta Empul", en: "Tirta Empul Temple" },
    ],
  },
];

export async function getDestinations(): Promise<DestinationData[]> {
  const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: true });

  if (error || !data || data.length === 0) {
    if (!error && data?.length === 0) {
      // Seed the table if empty
      const inserts = DEFAULT_DESTINATIONS.map(d => ({
        name: d.name,
        tag: d.tag,
        price: d.price,
        image: d.image,
        duration_id: d.duration.id,
        duration_en: d.duration.en,
        distance_id: d.distance.id,
        distance_en: d.distance.en,
        highlights: d.highlights
      }));
      await supabase.from('destinations').insert(inserts);
      return getDestinations(); // fetch again after seeding
    }
    return DEFAULT_DESTINATIONS;
  }

  return data.map((row: any) => ({
    id: row.id,
    name: row.name,
    tag: row.tag,
    price: row.price,
    image: row.image,
    duration: { id: row.duration_id, en: row.duration_en },
    distance: { id: row.distance_id, en: row.distance_en },
    highlights: row.highlights || []
  }));
}

export async function updateDestination(id: string, data: Partial<Omit<DestinationData, 'id'>>) {
  const updatePayload: any = {};
  if (data.name !== undefined) updatePayload.name = data.name;
  if (data.tag !== undefined) updatePayload.tag = data.tag;
  if (data.price !== undefined) updatePayload.price = data.price;
  if (data.image !== undefined) updatePayload.image = data.image;
  if (data.duration) {
    updatePayload.duration_id = data.duration.id;
    updatePayload.duration_en = data.duration.en;
  }
  if (data.distance) {
    updatePayload.distance_id = data.distance.id;
    updatePayload.distance_en = data.distance.en;
  }
  if (data.highlights) updatePayload.highlights = data.highlights;

  updatePayload.updated_at = new Date().toISOString();

  await supabase.from('destinations').update(updatePayload).eq('id', id);
}

export async function addDestination(data: Omit<DestinationData, 'id'>) {
  const insertPayload = {
    name: data.name,
    tag: data.tag,
    price: data.price,
    image: data.image,
    duration_id: data.duration.id,
    duration_en: data.duration.en,
    distance_id: data.distance.id,
    distance_en: data.distance.en,
    highlights: data.highlights
  };
  await supabase.from('destinations').insert([insertPayload]);
}

export async function deleteDestination(id: string) {
  await supabase.from('destinations').delete().eq('id', id);
}

export async function getBookings(): Promise<BookingEntry[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('timestamp', { ascending: false });
  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    timestamp: row.timestamp,
    destination: row.destination,
    tag: row.tag || '',
    price: row.price || '',
    source: row.source,
    status: row.status || 'pending',
    formData: row.form_name ? {
      name: row.form_name,
      phone: row.form_phone,
      dest: row.form_dest,
      date: row.form_date,
      msg: row.form_msg
    } : undefined
  }));
}

export async function addBooking(entry: Omit<BookingEntry, "id" | "timestamp" | "status">) {
  const insertData = {
    destination: entry.destination,
    tag: entry.tag,
    price: entry.price,
    source: entry.source,
    status: "pending",
    form_name: entry.formData?.name || null,
    form_phone: entry.formData?.phone || null,
    form_dest: entry.formData?.dest || null,
    form_date: entry.formData?.date || null,
    form_msg: entry.formData?.msg || null,
  };

  await supabase.from('bookings').insert([insertData]);
}

export async function updateBookingStatus(id: string, status: "pending" | "sukses" | "cancel") {
  await supabase.from('bookings').update({ status }).eq('id', id);
}

export async function clearBookings() {
  await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
}

export async function getTodayBookings(): Promise<BookingEntry[]> {
  const today = new Date().toISOString().slice(0, 10);
  const bookings = await getBookings();
  return bookings.filter((b) => b.timestamp.slice(0, 10) === today);
}

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return !error;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
}

export async function checkSession(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}
