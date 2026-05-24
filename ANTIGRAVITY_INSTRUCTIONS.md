---
project: LIFE Academy Web Application
platform: Google Antigravity IDE (v2.0)
model: Gemini 3.5 Flash / Claude Sonnet 4.5
stack: Next.js 14 + TypeScript + Supabase + Cloudflare Pages
author: CAP Vision Institute × ครูเด่น มาสเตอร์ฟา
version: 1.0.0
created: พฤษภาคม 2569
---

# 🚀 LIFE Academy — Antigravity IDE
## Agent & Skill Development Instructions

> **สำหรับ Developer / AI Agent ที่รับผิดชอบโปรเจกต์นี้**  
> อ่านทำความเข้าใจก่อนเริ่ม Task ทุกครั้ง — Document นี้คือ "สัญญา" ระหว่างทีม Developer กับ AI Agent

---

## 1. PROJECT OVERVIEW

### ธุรกิจและเป้าหมาย
```
ชื่อ:        LIFE Academy
ประเภท:      สถาบันติวเตอร์ หาดใหญ่ สงขลา
ประสบการณ์:  14 ปี | นักเรียนสำเร็จกว่า 5,000 คน
Facebook:   https://www.facebook.com/LifeHadyai
Demo:       https://dencapvision.github.io/web-Life-Academy-Demo/
```

### Phase ที่พัฒนา
```
Phase 1 — Brand Presence Website      ฿25,000   [เริ่มก่อน]
Phase 2 — Student Management Portal   ฿38,000   [ต่อเนื่อง]
Phase 3 — AI Learning Hub             ฿42,000   [ขั้นสูง]
```

### Tech Stack
```yaml
Frontend:   Next.js 14 (App Router) + TypeScript + Tailwind CSS
Backend:    Supabase (PostgreSQL + Auth + Storage + Realtime)
Hosting:    Cloudflare Pages (ฟรีตลอดชีพ)
Email:      Resend API
LINE:       LINE Messaging API (@denmasterfa)
AI:         Anthropic Claude API (Phase 3)
Domain:     lifeacademy.co.th (ต้องจอง)
```

---

## 2. ANTIGRAVITY WORKSPACE SETUP

### 2.1 ติดตั้งและตั้งค่า
```bash
# 1. ดาวน์โหลด Antigravity IDE
# https://antigravity.google/download

# 2. Sign in ด้วย Google Account
# 3. เลือก Mode: "Agent-Assisted Development" (แนะนำ)
# 4. Terminal Policy: Auto
# 5. Agent Decides: enabled
```

### 2.2 สร้าง Project ใหม่
```
Manager Surface → New Project → "life-academy-webapp"
Working Directory: ~/projects/life-academy/
```

### 2.3 Environment Variables
สร้างไฟล์ `.env.local` ที่ root:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# LINE Messaging API
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=5WNFciKSWla7fY2HxhJmV9R6Mu/...

# Resend Email
RESEND_API_KEY=your_resend_key

# Anthropic (Phase 3)
ANTHROPIC_API_KEY=your_anthropic_key

# App Config
NEXT_PUBLIC_APP_URL=https://lifeacademy.co.th
NEXT_PUBLIC_APP_NAME=LIFE Academy
```

---

## 3. AGENT ROLES & RESPONSIBILITIES

Antigravity IDE รองรับ Multi-Agent — แบ่ง Agents ตามหน้าที่ดังนี้:

### 🏗️ Agent 1: Architect Agent
```yaml
Role: Project Structure & Database Design
Trigger: "design", "schema", "architecture", "setup"
Responsibilities:
  - สร้าง Next.js folder structure
  - ออกแบบ Supabase schema
  - ตั้งค่า Cloudflare deployment
  - สร้าง TypeScript types/interfaces
```

### 🎨 Agent 2: Frontend Agent
```yaml
Role: UI Components & Pages
Trigger: "page", "component", "UI", "design", "responsive"
Responsibilities:
  - สร้าง React components ตาม Design System
  - Implement Tailwind CSS styles
  - สร้าง Responsive layout
  - จัดการ Animation และ Interaction
Color palette: Navy #0f2557 | Blue #1a56db | Gold #f59e0b
Font: IBM Plex Sans Thai (body) + Space Grotesk (UI)
```

### ⚙️ Agent 3: Backend Agent
```yaml
Role: API Routes & Database Operations
Trigger: "API", "database", "server", "auth", "CRUD"
Responsibilities:
  - สร้าง Next.js API Routes
  - เขียน Supabase queries
  - จัดการ Authentication
  - ตั้งค่า Row Level Security (RLS)
```

### 🔗 Agent 4: Integration Agent
```yaml
Role: Third-party Integrations
Trigger: "LINE", "email", "notify", "webhook", "payment"
Responsibilities:
  - LINE Messaging API webhook
  - Resend Email templates
  - Google Analytics integration
  - Cloudflare R2 file storage
```

### 🧪 Agent 5: QA Agent
```yaml
Role: Testing & Verification
Trigger: "test", "verify", "check", "bug", "error"
Responsibilities:
  - สร้าง unit tests
  - E2E testing ด้วย built-in browser
  - Performance audit
  - Mobile responsiveness check
```

---

## 4. PROJECT STRUCTURE

```
life-academy/
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js config + Cloudflare
├── tailwind.config.ts            # Design tokens
├── tsconfig.json
│
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public pages (no auth)
│   │   ├── page.tsx              # หน้าแรก (Hero, About, Courses)
│   │   ├── courses/page.tsx      # หน้าหลักสูตร
│   │   ├── teachers/page.tsx     # หน้าครูผู้สอน
│   │   ├── news/page.tsx         # ข่าวกิจกรรม
│   │   └── contact/page.tsx      # ติดต่อ
│   │
│   ├── (auth)/                   # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── (student)/                # Student Portal (Phase 2)
│   │   ├── dashboard/page.tsx    # หน้าหลักนักเรียน
│   │   ├── schedule/page.tsx     # ตารางเรียน
│   │   ├── results/page.tsx      # ผลการเรียน
│   │   └── booking/page.tsx      # จองคาบเรียน
│   │
│   ├── (admin)/                  # Admin Panel
│   │   ├── dashboard/page.tsx    # สรุปภาพรวม
│   │   ├── students/page.tsx     # จัดการนักเรียน
│   │   ├── teachers/page.tsx     # จัดการครู
│   │   ├── courses/page.tsx      # จัดการหลักสูตร
│   │   └── reports/page.tsx      # รายงาน
│   │
│   └── api/                      # API Routes
│       ├── register/route.ts     # ลงทะเบียน
│       ├── booking/route.ts      # Booking
│       ├── level-test/route.ts   # ทดสอบระดับ
│       ├── line-webhook/route.ts # LINE webhook
│       └── notify/route.ts       # ส่งแจ้งเตือน
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI (Button, Input, Card...)
│   ├── layout/                   # Header, Footer, Nav
│   ├── home/                     # Landing page sections
│   ├── courses/                  # Course cards, filters
│   ├── student/                  # Student portal components
│   └── admin/                    # Admin components
│
├── lib/                          # Utilities
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── line/
│   │   ├── client.ts             # LINE SDK
│   │   └── flex-messages.ts      # Flex templates
│   ├── email/
│   │   └── templates.tsx         # Resend templates
│   └── utils/
│       ├── format.ts             # Date, number formatters
│       └── validators.ts         # Form validation
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase generated types
│   ├── course.ts
│   ├── student.ts
│   └── booking.ts
│
└── public/                       # Static assets
    ├── images/
    └── fonts/
```

---

## 5. DATABASE SCHEMA (Supabase)

### 5.1 Phase 1 Tables

```sql
-- หลักสูตร
CREATE TABLE courses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,                    -- ชื่อหลักสูตร
  name_th     TEXT,                             -- ชื่อภาษาไทย
  level       TEXT NOT NULL,                    -- primary/secondary/high/exam
  subject     TEXT NOT NULL,                    -- math/english/science/thai
  format      TEXT NOT NULL,                    -- onsite/online/private
  price       NUMERIC(10,2) NOT NULL,
  description TEXT,
  max_students INTEGER DEFAULT 10,
  sessions_per_week INTEGER DEFAULT 2,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ครูผู้สอน
CREATE TABLE teachers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  subject     TEXT[],                           -- Array of subjects
  experience_years INTEGER,
  education   TEXT,
  bio         TEXT,
  avatar_url  TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ข้อมูลติดต่อ / Lead
CREATE TABLE inquiries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  level       TEXT,                             -- ระดับชั้น
  subject     TEXT,                             -- วิชาที่สนใจ
  format      TEXT,                             -- รูปแบบเรียน
  message     TEXT,
  status      TEXT DEFAULT 'new',              -- new/contacted/enrolled
  source      TEXT DEFAULT 'website',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ข่าวกิจกรรม
CREATE TABLE news (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  content     TEXT,
  excerpt     TEXT,
  image_url   TEXT,
  category    TEXT DEFAULT 'news',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Phase 2 Tables

```sql
-- นักเรียน
CREATE TABLE students (
  id          UUID REFERENCES auth.users PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  level       TEXT,                             -- ระดับชั้น
  school      TEXT,
  address     TEXT,
  line_id     TEXT,
  avatar_url  TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  is_active   BOOLEAN DEFAULT true
);

-- การลงทะเบียนเรียน
CREATE TABLE enrollments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id  UUID REFERENCES students(id),
  course_id   UUID REFERENCES courses(id),
  teacher_id  UUID REFERENCES teachers(id),
  start_date  DATE NOT NULL,
  end_date    DATE,
  status      TEXT DEFAULT 'active',           -- active/paused/completed
  price_paid  NUMERIC(10,2),
  payment_method TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ตารางเรียน
CREATE TABLE schedules (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id),
  teacher_id  UUID REFERENCES teachers(id),
  course_id   UUID REFERENCES courses(id),
  day_of_week INTEGER[],                        -- 0=Sun, 1=Mon,...
  start_time  TIME,
  end_time    TIME,
  room        TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- การเข้าเรียน (Attendance)
CREATE TABLE attendance (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id),
  session_date DATE NOT NULL,
  status      TEXT DEFAULT 'present',          -- present/absent/late/excused
  note        TEXT,
  recorded_by UUID REFERENCES auth.users,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ผลการทดสอบ
CREATE TABLE test_results (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id  UUID REFERENCES students(id),
  course_id   UUID REFERENCES courses(id),
  test_type   TEXT,                            -- pre/post/monthly/mock
  score       NUMERIC(5,2),
  max_score   NUMERIC(5,2),
  percentage  NUMERIC(5,2) GENERATED ALWAYS AS (score/max_score*100) STORED,
  notes       TEXT,
  test_date   DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Booking คาบเรียน
CREATE TABLE bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id  UUID REFERENCES students(id),
  teacher_id  UUID REFERENCES teachers(id),
  course_id   UUID REFERENCES courses(id),
  booking_date DATE NOT NULL,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  status      TEXT DEFAULT 'pending',          -- pending/confirmed/cancelled
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.3 Row Level Security (RLS)

```sql
-- เปิด RLS ทุกตาราง
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- นักเรียนเห็นข้อมูลตัวเองเท่านั้น
CREATE POLICY "student_own_data" ON students
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "student_own_enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "student_own_results" ON test_results
  FOR SELECT USING (auth.uid() = student_id);

-- Admin เห็นทุกอย่าง
CREATE POLICY "admin_all_access" ON students
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

---

## 6. AGENT TASK PROMPTS

ใช้ Prompt เหล่านี้ใน **Manager Surface** ของ Antigravity IDE:

### Phase 1: Brand Presence Website

#### Task 1.1 — Project Initialization
```
@Architect Agent:

สร้าง Next.js 14 project สำหรับ LIFE Academy โดย:

1. ใช้ `create-next-app` ด้วย TypeScript + Tailwind CSS + App Router
2. ติดตั้ง dependencies:
   - @supabase/supabase-js @supabase/ssr
   - resend
   - lucide-react
   - clsx tailwind-merge

3. สร้าง folder structure ตาม PROJECT STRUCTURE ในเอกสาร
4. ตั้งค่า tailwind.config.ts ด้วย color tokens:
   navy: #0f2557, blue: #1a56db, gold: #f59e0b
5. สร้างไฟล์ types/database.ts พร้อม TypeScript types สำหรับทุก table
6. ตั้งค่า next.config.ts สำหรับ Cloudflare Pages deployment
7. Deploy test ไปที่ Cloudflare Pages และ screenshot ผลลัพธ์

ใช้ browser ตรวจสอบว่า localhost:3000 ขึ้นได้ก่อน commit
```

#### Task 1.2 — Homepage (Hero + About + Stats)
```
@Frontend Agent:

สร้าง homepage (/app/(public)/page.tsx) สำหรับ LIFE Academy โดย:

Design: Clean Academic Theme
Colors: Navy #0f2557, Blue #1a56db, Gold #f59e0b
Font: IBM Plex Sans Thai

Sections ที่ต้องมี:
1. HERO SECTION
   - Headline: "เรียนให้ได้ผล ด้วยครูมืออาชีพที่คุณไว้ใจ"
   - Subheadline + CTA ปุ่ม "ทดสอบระดับฟรี" + "ดูหลักสูตร"
   - Stats: 14+ ปี | 5,000+ นักเรียน | 30+ หลักสูตร
   - Floating "Course Finder" card ด้านขวา (interactive)

2. ABOUT SECTION
   - เรื่องราว 14 ปี
   - 5 จุดเด่น พร้อม checkmark icons
   - รูปภาพ placeholder

3. STATS BAR
   - ตัวเลขสำคัญ animated counter เมื่อ scroll เข้า viewport

ทุก component ต้อง:
- Responsive: mobile-first
- TypeScript strict mode
- ไม่ใช้ inline styles — ใช้ Tailwind เท่านั้น

หลังสร้างเสร็จ เปิด browser ตรวจสอบ mobile view ด้วย DevTools
```

#### Task 1.3 — Courses Section (Tab + Cards)
```
@Frontend Agent:

สร้าง courses section และหน้า /courses โดย:

Component: CourseCard, CourseTabs, CourseFilter
Data: ดึงจาก Supabase table `courses`

Features:
1. Tab switcher: ประถม | มัธยมต้น | มัธยมปลาย | เตรียมสอบ
2. Course card แสดง: ชื่อ, ระดับ, วิชา, ราคา, จำนวนที่นั่ง
3. Filter sidebar (desktop) / Drawer (mobile)
4. Search bar
5. "เริ่มเรียน" CTA ลิงก์ไปหน้า /contact

ใช้ React Server Components สำหรับ initial data fetch
ใช้ Client Component สำหรับ tab switching และ filter

Skeleton loading state ขณะรอข้อมูล
Empty state เมื่อไม่มีผลลัพธ์
```

#### Task 1.4 — Level Test Interactive Feature
```
@Frontend Agent + @Backend Agent:

สร้าง Level Test Quiz (/app/api/level-test/route.ts + component)

Flow:
1. ผู้ใช้เลือก: ระดับชั้น → วิชา → เป้าหมาย
2. แสดงผลลัพธ์: ระดับ + หลักสูตรแนะนำ
3. CTA: "ปรึกษาฟรี" → เปิด modal ลงทะเบียน

Backend (API Route):
POST /api/level-test
Body: { level, subject, goal }
Response: { recommendedLevel, courses[], description }

ใช้ Claude API (Anthropic) สำหรับ recommendation logic (Phase 3)
Phase 1: ใช้ rule-based logic ก่อน

Component ต้อง animated และ smooth transitions
Mobile-friendly: กรอกบนมือถือได้สบาย
```

#### Task 1.5 — Registration Form + LINE Notify
```
@Frontend Agent + @Integration Agent:

สร้าง Registration Form และ LINE notification:

Form Fields:
- ชื่อ-นามสกุลผู้เรียน *
- เบอร์โทรศัพท์ *
- ระดับชั้น * (select)
- วิชาที่สนใจ * (select)
- รูปแบบการเรียน * (radio: ที่สถาบัน/ออนไลน์/ส่วนตัว)
- ข้อความเพิ่มเติม

API Route: POST /api/register
Actions:
1. บันทึกลงตาราง `inquiries` ใน Supabase
2. ส่ง LINE Flex Message ไปที่ @denmasterfa
3. ส่ง confirmation email ด้วย Resend

LINE Flex Message format:
{
  header: "🎓 ลูกค้าใหม่ LIFE Academy",
  body: {
    ชื่อ, ระดับ, วิชา, เบอร์, รูปแบบ
  },
  footer: button "ติดต่อกลับ"
}

LINE Channel Token: 5WNFciKSWla7fY2HxhJmV9R6...
LINE User ID: Ue652c6a963399b81a811eb04fe88c123

Test ด้วย browser: กรอก form → ตรวจสอบ Supabase + LINE ได้รับแจ้งเตือน
```

---

### Phase 2: Student Management Portal

#### Task 2.1 — Authentication System
```
@Backend Agent + @Architect Agent:

ตั้งค่า Supabase Auth สำหรับ Student Portal:

1. เปิดใช้ Email + Phone auth ใน Supabase Dashboard
2. สร้าง middleware.ts:
   - Protected routes: /student/*, /admin/*
   - Redirect ไป /login ถ้ายังไม่ login
   - Role-based: student vs admin

3. สร้าง Auth Components:
   - LoginForm: email + password + "เข้าสู่ระบบด้วย LINE" button
   - RegisterForm: สำหรับนักเรียนใหม่
   - ForgotPassword flow

4. สร้าง Supabase middleware (/lib/supabase/middleware.ts)
5. ทดสอบ: register → login → access /student/dashboard
   ใช้ browser ตรวจสอบ network requests และ cookies
```

#### Task 2.2 — Student Dashboard
```
@Frontend Agent + @Backend Agent:

สร้าง Student Dashboard (/app/(student)/dashboard/page.tsx):

Sections:
1. WELCOME CARD
   - ชื่อนักเรียน, ระดับชั้น, รูป avatar
   - Quick stats: คาบเรียนสัปดาห์นี้, คะแนนล่าสุด, วันเข้าเรียน

2. UPCOMING SCHEDULE
   - ตารางเรียน 7 วันข้างหน้า
   - แสดง: วิชา, ครู, เวลา, ห้อง
   - Live indicator ถ้าเป็นคาบเรียนปัจจุบัน

3. RECENT RESULTS
   - กราฟ Line Chart แสดง score ย้อนหลัง 3 เดือน
   - ใช้ Recharts library
   - Pre/Post Test comparison

4. ATTENDANCE SUMMARY
   - Donut chart: มา/ขาด/ลา
   - Streak counter "เข้าเรียนต่อเนื่อง X วัน"

5. QUICK ACTIONS
   - ปุ่ม: จองคาบ, ดูตาราง, ดูผล, ติดต่อครู

ดึงข้อมูลจาก Supabase ด้วย React Server Components
Real-time updates ด้วย Supabase Realtime สำหรับ attendance
```

#### Task 2.3 — Parent Dashboard (Report System)
```
@Frontend Agent + @Backend Agent + @Integration Agent:

สร้างระบบรายงานให้ผู้ปกครอง:

1. PARENT VIEW (/app/(student)/parent/page.tsx)
   - เข้าถึงด้วย parent_phone ที่ลงทะเบียนไว้
   - OTP verification ผ่าน LINE

2. MONTHLY REPORT
   - สรุปการเข้าเรียน
   - ผลคะแนนทดสอบ
   - ความคิดเห็นจากครู
   - กราฟพัฒนาการ

3. AUTO REPORT (LINE Notify)
   - ส่งรายงานทุกวันจันทร์ 8:00 น.
   - รูปแบบ: LINE Flex Message สวยงาม
   - สรุป: เข้าเรียน X/Y วัน, คะแนนเฉลี่ย X%

4. ALERT SYSTEM
   - แจ้งผู้ปกครองอัตโนมัติเมื่อ:
     * ขาดเรียน → LINE ทันที
     * คะแนนต่ำกว่า 60% → LINE + Email
     * มีการบ้านส่งไม่ทัน → LINE

ใช้ Supabase scheduled functions สำหรับ weekly report
ทดสอบ: trigger manual report → ตรวจสอบ LINE ได้รับ
```

#### Task 2.4 — Admin Panel
```
@Frontend Agent + @Backend Agent:

สร้าง Admin Panel (/app/(admin)/):

1. DASHBOARD OVERVIEW
   - KPIs: นักเรียนทั้งหมด, รายได้เดือนนี้, อัตราเข้าเรียน
   - Charts: นักเรียนใหม่รายสัปดาห์, รายได้รายเดือน
   - Recent inquiries (จาก website form)

2. STUDENT MANAGEMENT
   - Table: search, filter, pagination
   - Actions: ดูประวัติ, แก้ไข, pause, activate
   - Bulk actions: ส่ง LINE ทั้งกลุ่ม

3. SCHEDULE MANAGEMENT  
   - Calendar view (weekly/monthly)
   - Drag-and-drop จัดตาราง
   - Conflict detection อัตโนมัติ

4. REPORTS
   - Export CSV: นักเรียน, การเข้าเรียน, คะแนน
   - Revenue report
   - Performance analytics

ใช้ shadcn/ui components สำหรับ Table, Dialog, Form
ทดสอบทุก CRUD operation ด้วย browser
```

---

### Phase 3: AI Learning Hub

#### Task 3.1 — AI Course Advisor (Chatbot)
```
@Integration Agent + @Backend Agent:

สร้าง AI Chatbot สำหรับแนะนำหลักสูตร:

Backend: /app/api/chat/route.ts
Model: Claude claude-sonnet-4-5 (Anthropic)

System Prompt:
"""
คุณคือที่ปรึกษาการเรียนของ LIFE Academy สถาบันติวเตอร์ชั้นนำในหาดใหญ่
มีประสบการณ์ 14 ปี ช่วยนักเรียนกว่า 5,000 คน

ข้อมูลหลักสูตรที่มี:
[ดึงจาก Supabase courses table แบบ dynamic]

หน้าที่ของคุณ:
1. แนะนำหลักสูตรที่เหมาะกับนักเรียนแต่ละคน
2. ตอบคำถามเกี่ยวกับการเรียน
3. ช่วยวางแผนการเรียนให้บรรลุเป้าหมาย
4. ถ้าลูกค้าสนใจ: แนะนำให้ลงทะเบียนหรือติดต่อ @denmasterfa

ตอบเป็นภาษาไทย สั้น กระชับ เป็นกันเอง
ถ้าไม่รู้คำตอบ ให้บอกว่า "ขอให้ทีมงานติดต่อกลับครับ"
"""

UI: Floating chat widget (bottom-right)
Features:
- Conversation history (localStorage)
- Typing indicator
- Quick reply buttons
- Handoff to LINE: "คุยกับทีมงาน"

ทดสอบ: ถามคำถามต่างๆ ตรวจสอบคำตอบถูกต้อง
```

#### Task 3.2 — AI Level Assessment
```
@Integration Agent + @Backend Agent:

อัปเกรด Level Test ให้ใช้ AI:

1. ADAPTIVE QUIZ
   - เริ่มด้วยคำถาม 5 ข้อ
   - Claude วิเคราะห์คำตอบและปรับระดับความยากแบบ real-time
   - สรุปผล: จุดอ่อน, จุดแข็ง, หลักสูตรแนะนำ

2. PERSONALIZED LEARNING PATH
   - Claude สร้าง learning roadmap เฉพาะบุคคล
   - Timeline: เดือน 1-3-6
   - Milestone checkpoints

Backend: /app/api/ai-assessment/route.ts
ใช้ Anthropic Messages API กับ tool use สำหรับ structured output

ทดสอบ: ทำ assessment ด้วยคำตอบต่างๆ ตรวจสอบ recommendation ถูกต้อง
```

---

## 7. VERIFICATION CHECKLIST

หลังทำแต่ละ Task ให้ QA Agent ตรวจสอบ:

### Phase 1 Checklist
```
□ Homepage โหลดเร็ว < 3 วินาที (Lighthouse Performance > 90)
□ Mobile responsive ทุกหน้า (375px, 768px, 1280px)
□ Form submit ได้และบันทึกลง Supabase
□ LINE notification ถึง @denmasterfa
□ SEO: meta tags ครบ, sitemap, robots.txt
□ Images: WebP format, lazy loading
□ TypeScript: no type errors (tsc --noEmit)
□ Deploy สำเร็จบน Cloudflare Pages
```

### Phase 2 Checklist
```
□ Login/Logout ทำงานถูกต้อง
□ Protected routes redirect ถูกต้อง
□ RLS: นักเรียน A ไม่เห็นข้อมูลนักเรียน B
□ Dashboard ดึงข้อมูล real-time
□ Parent report ส่งผ่าน LINE ถูกต้อง
□ Admin: CRUD operations ทำงานครบ
□ Booking: conflict detection ทำงาน
□ Export CSV ถูกต้อง
```

### Phase 3 Checklist
```
□ Chatbot ตอบคำถามภาษาไทยถูกต้อง
□ AI ไม่ hallucinate ข้อมูลหลักสูตร
□ Level Assessment ให้ผลสมเหตุสมผล
□ Rate limiting API ทำงาน (ป้องกัน abuse)
□ Fallback เมื่อ AI API down
```

---

## 8. DEPLOYMENT

### Cloudflare Pages Configuration
```bash
# Build command
npm run build

# Output directory
.next

# Environment variables
# (ตั้งค่าใน Cloudflare Dashboard)
```

### next.config.ts สำหรับ Cloudflare
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'edge',
  },
  images: {
    domains: ['supabase.co', 'pub-*.r2.dev'],
  },
}

export default nextConfig
```

### Supabase Production Setup
```sql
-- สร้าง indexes สำหรับ performance
CREATE INDEX idx_students_active ON students(is_active);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_attendance_date ON attendance(session_date);
CREATE INDEX idx_test_results_student ON test_results(student_id, test_date DESC);
CREATE INDEX idx_bookings_date ON bookings(booking_date, status);
```

---

## 9. COMMON AGENT COMMANDS

### Shortcuts สำหรับใช้ใน Manager Surface
```
"init phase1"        → Task 1.1 Project Initialization
"build homepage"     → Task 1.2 Homepage
"build courses"      → Task 1.3 Courses Section
"build level-test"   → Task 1.4 Level Test
"build form notify"  → Task 1.5 Registration + LINE
"init phase2"        → Task 2.1 Authentication
"build dashboard"    → Task 2.2 Student Dashboard
"build parent"       → Task 2.3 Parent Reports
"build admin"        → Task 2.4 Admin Panel
"init phase3"        → Task 3.1 AI Chatbot
"build ai-assess"    → Task 3.2 AI Assessment
"verify all"         → QA Agent ตรวจสอบทุกอย่าง
"deploy"             → Build + Deploy Cloudflare
```

---

## 10. IMPORTANT NOTES FOR AGENTS

```yaml
DO:
  ✅ ใช้ TypeScript strict mode เสมอ
  ✅ ทุก component ต้องมี loading/error state
  ✅ ใช้ React Server Components ที่เป็นไปได้
  ✅ Mobile-first CSS (Tailwind sm: md: lg:)
  ✅ Thai language UI ทุกที่ที่ user เห็น
  ✅ Console.log ออกก่อน production
  ✅ ตรวจสอบด้วย browser ทุก Task
  ✅ Commit message เป็นภาษาอังกฤษ

DON'T:
  ❌ อย่า hardcode ข้อมูลใน component — ดึงจาก Supabase
  ❌ อย่าเก็บ secrets ใน code — ใช้ .env.local
  ❌ อย่า bypass TypeScript errors ด้วย "as any"
  ❌ อย่าใช้ inline styles — Tailwind only
  ❌ อย่า fetch ข้อมูลใน Client Component ถ้าไม่จำเป็น
  ❌ อย่า deploy โดยไม่ผ่าน QA checklist

WHEN IN DOUBT:
  → อ่าน SKILL.md ของ kru-den-webdev
  → ดู Demo: https://dencapvision.github.io/web-Life-Academy-Demo/
  → ติดต่อ LINE: @denmasterfa
```

---

## 11. CONTACT & RESOURCES

```
Project Owner:  ครูเด่น มาสเตอร์ฟา (CAP Vision Institute)
LINE OA:        @denmasterfa | https://lin.ee/X9Ch25o
LINE User ID:   Ue652c6a963399b81a811eb04fe88c123

Demo Website:   https://dencapvision.github.io/web-Life-Academy-Demo/
Closing Form:   [Host บน GitHub Pages]
Onboarding:     [Host บน GitHub Pages]

Supabase Project: [สร้างหลัง Onboarding กรอกครบ]
Cloudflare:       [สร้างหลัง Phase 1 เสร็จ]
Domain:           lifeacademy.co.th [จองก่อนเริ่ม Phase 1]
```

---

*Document version 1.0 | CAP Vision Institute × ครูเด่น มาสเตอร์ฟา | พฤษภาคม 2569*
*"Transform Learning, Transform Organization" — Flow Learning: เรียนรู้แบบลื่นไหล เติบโตแบบไร้ขีดจำกัด 💡✨🌱*
