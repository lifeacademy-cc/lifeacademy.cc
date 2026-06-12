-- ================================================================
-- Migration: Create book_orders table
-- ================================================================

-- 1. สร้างตารางเก็บข้อมูลการสั่งซื้อหนังสือ
CREATE TABLE IF NOT EXISTS book_orders (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name       TEXT NOT NULL,
  phone               TEXT NOT NULL,
  address             TEXT NOT NULL,
  book_title          TEXT NOT NULL,
  total_price         NUMERIC(10,2) NOT NULL,
  payment_method      TEXT NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ตั้งค่าความปลอดภัย (RLS) ให้บุคคลทั่วไปสามารถกรอกฟอร์มได้
ALTER TABLE book_orders ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'book_orders' AND policyname = 'book_orders_insert_public'
    ) THEN
        CREATE POLICY "book_orders_insert_public" ON book_orders FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- 3. (ทางเลือก) สร้าง Index เพื่อความรวดเร็วในการค้นหาสำหรับ Admin
CREATE INDEX IF NOT EXISTS idx_book_orders_status ON book_orders(status);
CREATE INDEX IF NOT EXISTS idx_book_orders_created_at ON book_orders(created_at DESC);
