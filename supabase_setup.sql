-- Create price_overrides table
CREATE TABLE price_overrides (
  dest_name text PRIMARY KEY,
  price text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  destination text NOT NULL,
  tag text,
  price text,
  source text,
  form_name text,
  form_phone text,
  form_dest text,
  form_date text,
  form_msg text
);

-- Enable RLS
ALTER TABLE price_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for price_overrides
CREATE POLICY "Public can read price_overrides" ON price_overrides
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert/update price_overrides" ON price_overrides
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for bookings
CREATE POLICY "Public can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');
