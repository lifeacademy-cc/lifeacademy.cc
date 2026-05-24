export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          name: string
          name_th: string | null
          level: string
          subject: string
          format: string
          price: number
          description: string | null
          max_students: number
          sessions_per_week: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          name_th?: string | null
          level: string
          subject: string
          format: string
          price: number
          description?: string | null
          max_students?: number
          sessions_per_week?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_th?: string | null
          level?: string
          subject?: string
          format?: string
          price?: number
          description?: string | null
          max_students?: number
          sessions_per_week?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          id: string
          name: string
          subject: string[]
          experience_years: number | null
          education: string | null
          bio: string | null
          avatar_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string[]
          experience_years?: number | null
          education?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string[]
          experience_years?: number | null
          education?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          level: string | null
          subject: string | null
          format: string | null
          message: string | null
          status: string
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          level?: string | null
          subject?: string | null
          format?: string | null
          message?: string | null
          status?: string
          source?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          level?: string | null
          subject?: string | null
          format?: string | null
          message?: string | null
          status?: string
          source?: string
          created_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          id: string
          title: string
          content: string | null
          excerpt: string | null
          image_url: string | null
          category: string
          is_published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          category?: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          category?: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          name: string
          phone: string | null
          parent_name: string | null
          parent_phone: string | null
          level: string | null
          school: string | null
          address: string | null
          line_id: string | null
          avatar_url: string | null
          enrolled_at: string
          is_active: boolean
        }
        Insert: {
          id: string
          name: string
          phone?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          level?: string | null
          school?: string | null
          address?: string | null
          line_id?: string | null
          avatar_url?: string | null
          enrolled_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          level?: string | null
          school?: string | null
          address?: string | null
          line_id?: string | null
          avatar_url?: string | null
          enrolled_at?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          teacher_id: string | null
          start_date: string
          end_date: string | null
          status: string
          price_paid: number | null
          payment_method: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          teacher_id?: string | null
          start_date: string
          end_date?: string | null
          status?: string
          price_paid?: number | null
          payment_method?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          teacher_id?: string | null
          start_date?: string
          end_date?: string | null
          status?: string
          price_paid?: number | null
          payment_method?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      schedules: {
        Row: {
          id: string
          enrollment_id: string
          teacher_id: string
          course_id: string
          day_of_week: number[]
          start_time: string
          end_time: string
          room: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          enrollment_id: string
          teacher_id: string
          course_id: string
          day_of_week: number[]
          start_time: string
          end_time: string
          room?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          enrollment_id?: string
          teacher_id?: string
          course_id?: string
          day_of_week?: number[]
          start_time?: string
          end_time?: string
          room?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_enrollment_id_fkey"
            columns: ["enrollment_id"]
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      attendance: {
        Row: {
          id: string
          enrollment_id: string
          session_date: string
          status: string
          note: string | null
          recorded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          enrollment_id: string
          session_date: string
          status?: string
          note?: string | null
          recorded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          enrollment_id?: string
          session_date?: string
          status?: string
          note?: string | null
          recorded_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_enrollment_id_fkey"
            columns: ["enrollment_id"]
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          }
        ]
      }
      test_results: {
        Row: {
          id: string
          student_id: string
          course_id: string
          test_type: string | null
          score: number
          max_score: number
          notes: string | null
          test_date: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          test_type?: string | null
          score: number
          max_score: number
          notes?: string | null
          test_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          test_type?: string | null
          score?: number
          max_score?: number
          notes?: string | null
          test_date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_results_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          id: string
          student_id: string
          teacher_id: string
          course_id: string
          booking_date: string
          start_time: string
          end_time: string
          status: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          teacher_id: string
          course_id: string
          booking_date: string
          start_time: string
          end_time: string
          status?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          teacher_id?: string
          course_id?: string
          booking_date?: string
          start_time?: string
          end_time?: string
          status?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
