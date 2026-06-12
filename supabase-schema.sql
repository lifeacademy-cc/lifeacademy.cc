-- ================================================================
-- LIFE Academy — Supabase Database Schema
-- Run in Supabase SQL Editor (Dashboard > SQL Editor)
-- ================================================================

-- ─── EXTENSION ────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PHASE 1 TABLES ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS courses (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  name_th             TEXT,
  level               TEXT NOT NULL CHECK (level IN ('kg','p1','p2','p3','p4','p5','p6','m1','m2','m3','future_skill','primary','secondary','high','exam')),
  subject             TEXT NOT NULL CHECK (subject IN ('math','english','science','thai','social','physics','chemistry','biology','mind','exam_m1','exam_m4','exam_m1_pccp','life_skill')),
  format              TEXT NOT NULL CHECK (format IN ('onsite','online','private','elearning')),
  price               NUMERIC(10,2) NOT NULL,
  description         TEXT,
  max_students        INTEGER DEFAULT 10,
  sessions_per_week   INTEGER DEFAULT 2,
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teachers (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  subject             TEXT[],
  experience_years    INTEGER,
  education           TEXT,
  bio                 TEXT,
  avatar_url          TEXT,
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  phone               TEXT NOT NULL,
  email               TEXT,
  level               TEXT,
  subject             TEXT,
  format              TEXT,
  message             TEXT,
  status              TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','enrolled','closed')),
  source              TEXT DEFAULT 'website',
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title               TEXT NOT NULL,
  content             TEXT,
  excerpt             TEXT,
  image_url           TEXT,
  category            TEXT DEFAULT 'news' CHECK (category IN ('news','activity','success','announcement')),
  is_published        BOOLEAN DEFAULT false,
  published_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADMIN & CONTENT TABLES ──────────────────────────────────

CREATE TABLE IF NOT EXISTS settings (
  key                 TEXT PRIMARY KEY,
  value               TEXT,
  description         TEXT,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title               TEXT NOT NULL,
  description         TEXT,
  icon                TEXT,
  image_url           TEXT,
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title               TEXT,
  image_url           TEXT NOT NULL,
  category            TEXT DEFAULT 'activity',
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_videos (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id           UUID REFERENCES courses(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  video_url           TEXT NOT NULL,
  thumbnail_url       TEXT,
  is_published        BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PHASE 2 TABLES ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS students (
  id                  UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name                TEXT NOT NULL,
  phone               TEXT,
  parent_name         TEXT,
  parent_phone        TEXT,
  level               TEXT,
  school              TEXT,
  address             TEXT,
  line_id             TEXT,
  avatar_url          TEXT,
  enrolled_at         TIMESTAMPTZ DEFAULT NOW(),
  is_active           BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS enrollments (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id          UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id           UUID REFERENCES courses(id),
  teacher_id          UUID REFERENCES teachers(id),
  start_date          DATE NOT NULL,
  end_date            DATE,
  status              TEXT DEFAULT 'active' CHECK (status IN ('active','paused','completed','cancelled')),
  price_paid          NUMERIC(10,2),
  payment_method      TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedules (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id       UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  teacher_id          UUID REFERENCES teachers(id),
  course_id           UUID REFERENCES courses(id),
  day_of_week         INTEGER[],
  start_time          TIME,
  end_time            TIME,
  room                TEXT,
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id       UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  session_date        DATE NOT NULL,
  status              TEXT DEFAULT 'present' CHECK (status IN ('present','absent','late','excused')),
  note                TEXT,
  recorded_by         UUID REFERENCES auth.users(id),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, session_date)
);

CREATE TABLE IF NOT EXISTS test_results (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id          UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id           UUID REFERENCES courses(id),
  test_type           TEXT CHECK (test_type IN ('pre','post','monthly','mock','midterm','final')),
  score               NUMERIC(5,2) NOT NULL,
  max_score           NUMERIC(5,2) NOT NULL DEFAULT 100,
  percentage          NUMERIC(5,2) GENERATED ALWAYS AS (
                        CASE WHEN max_score > 0 THEN ROUND((score / max_score) * 100, 2) ELSE 0 END
                      ) STORED,
  notes               TEXT,
  test_date           DATE DEFAULT CURRENT_DATE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id          UUID REFERENCES students(id) ON DELETE CASCADE,
  teacher_id          UUID REFERENCES teachers(id),
  course_id           UUID REFERENCES courses(id),
  booking_date        DATE NOT NULL,
  start_time          TIME NOT NULL,
  end_time            TIME NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_courses_level_active ON courses(level, is_active);
CREATE INDEX IF NOT EXISTS idx_courses_subject      ON courses(subject);
CREATE INDEX IF NOT EXISTS idx_students_active      ON students(is_active);
CREATE INDEX IF NOT EXISTS idx_enrollments_student  ON enrollments(student_id, status);
CREATE INDEX IF NOT EXISTS idx_enrollments_course   ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date      ON attendance(session_date);
CREATE INDEX IF NOT EXISTS idx_attendance_enrollment ON attendance(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_results_student_date ON test_results(student_id, test_date DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(booking_date, status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status     ON inquiries(status, created_at DESC);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────

ALTER TABLE students     ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance   ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries    ENABLE ROW LEVEL SECURITY;

-- Public read for non-sensitive tables
ALTER TABLE courses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE news     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_public_read"  ON courses  FOR SELECT USING (is_active = true);
CREATE POLICY "teachers_public_read" ON teachers FOR SELECT USING (is_active = true);
CREATE POLICY "news_public_read"     ON news     FOR SELECT USING (is_published = true);

-- Students: own data only
CREATE POLICY "student_own_profile"     ON students     FOR ALL    USING (auth.uid() = id);
CREATE POLICY "student_own_enrollments" ON enrollments  FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_own_attendance"  ON attendance   FOR SELECT
  USING (enrollment_id IN (SELECT id FROM enrollments WHERE student_id = auth.uid()));
CREATE POLICY "student_own_results"     ON test_results FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_own_bookings"    ON bookings     FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_own_booking_insert" ON bookings  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Inquiries: insert only (public form)
CREATE POLICY "inquiries_insert_public" ON inquiries FOR INSERT WITH CHECK (true);

-- Admin: full access via service role
-- (Use service role key from backend only — bypasses RLS automatically)

-- ─── SEED DATA (Demo) ─────────────────────────────────────────

INSERT INTO courses (name, name_th, level, subject, format, price, description, max_students, sessions_per_week) VALUES
  ('คอร์ส “อ่านออกเขียนได้”', 'อ่านออกเขียนได้', 'p1', 'thai', 'onsite', 1500, 'สำหรับนักเรียนชั้น อนุบาล 3 - ป.1 ที่สะกดคำยังไม่เป็น หรือยังอ่านไม่ออกเขียนไม่ได้', 8, 2),
  ('คณิตศาสตร์ ประถม 1–3 (ปูพื้นฐาน)', 'คณิต ประถมต้น', 'p3', 'math', 'onsite', 1500, 'เน้นปูพื้นฐานคณิตศาสตร์และพัฒนาทักษะการคิดคำนวณเบื้องต้นอย่างเป็นระบบ', 10, 2),
  ('ภาษาอังกฤษ ประถม 1–3 (Fun with English)', 'อังกฤษ ประถมต้น', 'p3', 'english', 'onsite', 1500, 'เรียนรู้ภาษาอังกฤษผ่านกิจกรรมแสนสนุก สร้างความคุ้นเคยกับสำเนียงธรรมชาติ', 10, 2),
  ('คณิตศาสตร์ ประถม 4–6 (พื้นฐานแข็งแกร่ง)', 'คณิต ประถมปลาย', 'p6', 'math', 'onsite', 1500, 'เสริมพื้นฐานคณิตศาสตร์ สร้างความเข้าใจที่มั่นคงในโจทย์ปัญหาและสมการ ปูทางสู่ ม.ต้น', 10, 2),
  ('ภาษาอังกฤษ ประถม 4–6 (Grammar & Communication)', 'อังกฤษ ประถมปลาย', 'p6', 'english', 'onsite', 1500, 'เน้นโครงสร้างไวยากรณ์พื้นฐาน คำศัพท์ และฝึกการสนทนาโต้ตอบอย่างมั่นใจ', 10, 2),
  ('วิทยาศาสตร์ ประถม 4–6 (กระบวนการคิด)', 'วิทย์ ประถมปลาย', 'p6', 'science', 'onsite', 1500, 'เน้นกระบวนการทางวิทยาศาสตร์ การทดลอง และเนื้อหาชีววิทยา เคมี ฟิสิกส์พื้นฐาน', 10, 2),
  ('คอร์สประถมเตรียมสอบเข้า ม.1 (คณิต-วิทย์-อังกฤษ)', 'เตรียมสอบเข้า ม.1', 'p6', 'math', 'onsite', 1800, 'ติวเข้มและตะลุยโจทย์ 3 วิชาหลักเพื่อสอบเข้า ม.1 โรงเรียนดังระดับจังหวัด', 8, 2),
  ('คณิตศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', 'คณิต เตรียมสอบ ม.4', 'm3', 'math', 'onsite', 1800, 'เตรียมสอบเข้า ม.4 โรงเรียนชั้นนำ ตะลุยโจทย์จริงและเทคนิคพิเศษคณิตศาสตร์ ม.1-3', 8, 2),
  ('วิทยาศาสตร์ ม.ต้น (เตรียมสอบเข้า ม.4)', 'วิทย์ เตรียมสอบ ม.4', 'm3', 'science', 'onsite', 1800, 'สรุปวิชาวิทยาศาสตร์ (ฟิสิกส์ เคมี ชีววิทยา ดาราศาสตร์) พร้อมข้อสอบเก่าเข้า ม.4', 8, 2),
  ('ภาษาอังกฤษ ม.ต้น (เตรียมสอบเข้า ม.4)', 'อังกฤษ เตรียมสอบ ม.4', 'm3', 'english', 'onsite', 1800, 'เจาะลึก Grammar ศัพท์ระดับสูง และแนวข้อสอบ Reading & Conversation สำหรับสอบเข้า ม.4', 8, 2),
  ('Mind & Brain Booster', 'พัฒนาสมาธิและโฟกัส', 'future_skill', 'mind', 'onsite', 1500, 'ฝึกสติและสมาธิเบื้องต้นผ่านกิจกรรมแสนสนุก ช่วยแก้ภาวะใจลอย สมาธิสั้น เพิ่มโฟกัสในการเรียนและการใช้ชีวิต (ทดลองเรียนฟรี!)', 8, 2)
ON CONFLICT DO NOTHING;

INSERT INTO teachers (name, subject, experience_years, education, bio) VALUES
  ('อาจารย์สมชาย ใจดี',    ARRAY['math','physics'],         8,  'ปริญญาโท คณิตศาสตร์ ม.สงขลา',   'เชี่ยวชาญคณิตและฟิสิกส์ สอนมากกว่า 8 ปี'),
  ('อาจารย์มาลี สดใส',     ARRAY['english'],                12, 'ปริญญาโท ภาษาอังกฤษ ม.สงขลา',  'เชี่ยวชาญภาษาอังกฤษสื่อสาร IELTS/TOEIC'),
  ('อาจารย์สมหญิง รักเรียน', ARRAY['chemistry','biology'],  6,  'ปริญญาตรี วิทยาศาสตร์ ม.สงขลา', 'เชี่ยวชาญเคมีและชีวฯ เน้น TCAS')
ON CONFLICT DO NOTHING;
