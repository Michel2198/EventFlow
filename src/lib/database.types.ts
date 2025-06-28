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
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          bio: string
          avatar_url: string
          location: string
          website: string
          is_venue: boolean
          venue_type: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          bio?: string
          avatar_url?: string
          location?: string
          website?: string
          is_venue?: boolean
          venue_type?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          bio?: string
          avatar_url?: string
          location?: string
          website?: string
          is_venue?: boolean
          venue_type?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      event_categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string
          created_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          profile_id: string
          name: string
          description: string
          address: string
          city: string
          state: string
          zip_code: string
          phone: string
          email: string
          website: string
          venue_type: string
          capacity: number
          amenities: string[]
          images: string[]
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          description?: string
          address: string
          city: string
          state: string
          zip_code?: string
          phone?: string
          email?: string
          website?: string
          venue_type?: string
          capacity?: number
          amenities?: string[]
          images?: string[]
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          name?: string
          description?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          phone?: string
          email?: string
          website?: string
          venue_type?: string
          capacity?: number
          amenities?: string[]
          images?: string[]
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          organizer_id: string
          venue_id: string | null
          title: string
          description: string
          category_id: string | null
          event_type: 'general' | 'restaurant' | 'nightclub' | 'concert'
          ticket_type: 'standard' | 'table' | 'mixed'
          start_date: string
          end_date: string | null
          location: string
          address: string
          image_url: string
          images: string[]
          price: number
          capacity: number
          age_restriction: string
          dress_code: string
          special_instructions: string
          tags: string[]
          is_featured: boolean
          is_published: boolean
          likes_count: number
          comments_count: number
          attendees_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizer_id: string
          venue_id?: string | null
          title: string
          description: string
          category_id?: string | null
          event_type?: 'general' | 'restaurant' | 'nightclub' | 'concert'
          ticket_type?: 'standard' | 'table' | 'mixed'
          start_date: string
          end_date?: string | null
          location: string
          address?: string
          image_url?: string
          images?: string[]
          price?: number
          capacity?: number
          age_restriction?: string
          dress_code?: string
          special_instructions?: string
          tags?: string[]
          is_featured?: boolean
          is_published?: boolean
          likes_count?: number
          comments_count?: number
          attendees_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizer_id?: string
          venue_id?: string | null
          title?: string
          description?: string
          category_id?: string | null
          event_type?: 'general' | 'restaurant' | 'nightclub' | 'concert'
          ticket_type?: 'standard' | 'table' | 'mixed'
          start_date?: string
          end_date?: string | null
          location?: string
          address?: string
          image_url?: string
          images?: string[]
          price?: number
          capacity?: number
          age_restriction?: string
          dress_code?: string
          special_instructions?: string
          tags?: string[]
          is_featured?: boolean
          is_published?: boolean
          likes_count?: number
          comments_count?: number
          attendees_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      event_tickets: {
        Row: {
          id: string
          event_id: string
          name: string
          description: string
          price: number
          capacity: number
          sold_count: number
          is_available: boolean
          sale_start_date: string
          sale_end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          description?: string
          price: number
          capacity?: number
          sold_count?: number
          is_available?: boolean
          sale_start_date?: string
          sale_end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          name?: string
          description?: string
          price?: number
          capacity?: number
          sold_count?: number
          is_available?: boolean
          sale_start_date?: string
          sale_end_date?: string | null
          created_at?: string
        }
      }
      event_tables: {
        Row: {
          id: string
          event_id: string
          name: string
          table_type: 'standard' | 'vip' | 'premium'
          seats: number
          price: number
          description: string
          amenities: string[]
          position_x: number
          position_y: number
          is_available: boolean
          reserved_by: string | null
          reserved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          table_type?: 'standard' | 'vip' | 'premium'
          seats: number
          price: number
          description?: string
          amenities?: string[]
          position_x?: number
          position_y?: number
          is_available?: boolean
          reserved_by?: string | null
          reserved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          name?: string
          table_type?: 'standard' | 'vip' | 'premium'
          seats?: number
          price?: number
          description?: string
          amenities?: string[]
          position_x?: number
          position_y?: number
          is_available?: boolean
          reserved_by?: string | null
          reserved_at?: string | null
          created_at?: string
        }
      }
      event_attendees: {
        Row: {
          id: string
          event_id: string
          user_id: string
          ticket_id: string | null
          table_id: string | null
          quantity: number
          total_amount: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          ticket_id?: string | null
          table_id?: string | null
          quantity?: number
          total_amount?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          ticket_id?: string | null
          table_id?: string | null
          quantity?: number
          total_amount?: number
          status?: string
          created_at?: string
        }
      }
      event_likes: {
        Row: {
          id: string
          event_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          created_at?: string
        }
      }
      event_comments: {
        Row: {
          id: string
          event_id: string
          user_id: string
          parent_id: string | null
          content: string
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          parent_id?: string | null
          content: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          parent_id?: string | null
          content?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      comment_likes: {
        Row: {
          id: string
          comment_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          comment_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          comment_id?: string
          user_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'like' | 'comment' | 'follow' | 'event_reminder' | 'event_update'
          title: string
          message: string
          data: Json
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'like' | 'comment' | 'follow' | 'event_reminder' | 'event_update'
          title: string
          message: string
          data?: Json
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'like' | 'comment' | 'follow' | 'event_reminder' | 'event_update'
          title?: string
          message?: string
          data?: Json
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_type: 'general' | 'restaurant' | 'nightclub' | 'concert'
      ticket_type: 'standard' | 'table' | 'mixed'
      table_type: 'standard' | 'vip' | 'premium'
      notification_type: 'like' | 'comment' | 'follow' | 'event_reminder' | 'event_update'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}