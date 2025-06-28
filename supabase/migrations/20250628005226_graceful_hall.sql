/*
  # EventFlow Database Schema

  1. New Tables
    - `profiles` - User profiles with extended information
    - `venues` - Event venues and organizers
    - `events` - Main events table
    - `event_categories` - Event categories
    - `event_tickets` - Ticket types for events
    - `event_tables` - Table reservations for restaurant/nightclub events
    - `event_attendees` - Track who's attending events
    - `event_likes` - Track event likes
    - `event_comments` - Comments on events
    - `follows` - User following relationships
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE event_type AS ENUM ('general', 'restaurant', 'nightclub', 'concert');
CREATE TYPE ticket_type AS ENUM ('standard', 'table', 'mixed');
CREATE TYPE table_type AS ENUM ('standard', 'vip', 'premium');
CREATE TYPE notification_type AS ENUM ('like', 'comment', 'follow', 'event_reminder', 'event_update');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  location text DEFAULT '',
  website text DEFAULT '',
  is_venue boolean DEFAULT false,
  venue_type text DEFAULT '',
  phone text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event categories
CREATE TABLE IF NOT EXISTS event_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  icon text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  website text DEFAULT '',
  venue_type text DEFAULT '',
  capacity integer DEFAULT 0,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  venue_id uuid REFERENCES venues(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES event_categories(id) ON DELETE SET NULL,
  event_type event_type DEFAULT 'general',
  ticket_type ticket_type DEFAULT 'standard',
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text NOT NULL,
  address text DEFAULT '',
  image_url text DEFAULT '',
  images text[] DEFAULT '{}',
  price decimal(10,2) DEFAULT 0,
  capacity integer DEFAULT 0,
  age_restriction text DEFAULT 'all',
  dress_code text DEFAULT '',
  special_instructions text DEFAULT '',
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  attendees_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event tickets
CREATE TABLE IF NOT EXISTS event_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  capacity integer DEFAULT 0,
  sold_count integer DEFAULT 0,
  is_available boolean DEFAULT true,
  sale_start_date timestamptz DEFAULT now(),
  sale_end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Event tables (for restaurant/nightclub events)
CREATE TABLE IF NOT EXISTS event_tables (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  table_type table_type DEFAULT 'standard',
  seats integer NOT NULL,
  price decimal(10,2) NOT NULL,
  description text DEFAULT '',
  amenities text[] DEFAULT '{}',
  position_x integer DEFAULT 0,
  position_y integer DEFAULT 0,
  is_available boolean DEFAULT true,
  reserved_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  reserved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Event attendees
CREATE TABLE IF NOT EXISTS event_attendees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  ticket_id uuid REFERENCES event_tickets(id) ON DELETE SET NULL,
  table_id uuid REFERENCES event_tables(id) ON DELETE SET NULL,
  quantity integer DEFAULT 1,
  total_amount decimal(10,2) DEFAULT 0,
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Event likes
CREATE TABLE IF NOT EXISTS event_likes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Event comments
CREATE TABLE IF NOT EXISTS event_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES event_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comment likes
CREATE TABLE IF NOT EXISTS comment_likes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id uuid REFERENCES event_comments(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Follows
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Insert default categories
INSERT INTO event_categories (name, icon, description) VALUES
  ('Music', '🎵', 'Concerts, festivals, and live music events'),
  ('Food & Drink', '🍽️', 'Food festivals, wine tastings, and culinary events'),
  ('Nightlife', '🌙', 'Clubs, bars, and late-night entertainment'),
  ('Art & Culture', '🎨', 'Art galleries, museums, and cultural events'),
  ('Sports', '⚽', 'Sports events, tournaments, and fitness activities'),
  ('Business', '💼', 'Networking, conferences, and professional events'),
  ('Comedy', '😂', 'Stand-up comedy and entertainment shows'),
  ('Fitness', '💪', 'Fitness classes, yoga, and wellness events'),
  ('Tech', '💻', 'Technology meetups and conferences'),
  ('Entertainment', '🎭', 'Theater, shows, and general entertainment')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Event categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON event_categories FOR SELECT
  TO authenticated
  USING (true);

-- Venues policies
CREATE POLICY "Anyone can view venues"
  ON venues FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Venue owners can manage their venues"
  ON venues FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

-- Events policies
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Event organizers can manage their events"
  ON events FOR ALL
  TO authenticated
  USING (organizer_id = auth.uid());

-- Event tickets policies
CREATE POLICY "Anyone can view event tickets"
  ON event_tickets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Event organizers can manage tickets"
  ON event_tickets FOR ALL
  TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE organizer_id = auth.uid()
    )
  );

-- Event tables policies
CREATE POLICY "Anyone can view event tables"
  ON event_tables FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Event organizers can manage tables"
  ON event_tables FOR ALL
  TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE organizer_id = auth.uid()
    )
  );

-- Event attendees policies
CREATE POLICY "Users can view event attendees"
  ON event_attendees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own attendance"
  ON event_attendees FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Event likes policies
CREATE POLICY "Users can view event likes"
  ON event_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own likes"
  ON event_likes FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Event comments policies
CREATE POLICY "Users can view event comments"
  ON event_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own comments"
  ON event_comments FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Comment likes policies
CREATE POLICY "Users can view comment likes"
  ON comment_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own comment likes"
  ON comment_likes FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Follows policies
CREATE POLICY "Users can view follows"
  ON follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own follows"
  ON follows FOR ALL
  TO authenticated
  USING (follower_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Functions and triggers for updating counts
CREATE OR REPLACE FUNCTION update_event_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events SET likes_count = likes_count + 1 WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events SET likes_count = likes_count - 1 WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_event_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events SET comments_count = comments_count + 1 WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events SET comments_count = comments_count - 1 WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_event_attendees_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events SET attendees_count = attendees_count + NEW.quantity WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE events SET attendees_count = attendees_count - OLD.quantity + NEW.quantity WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events SET attendees_count = attendees_count - OLD.quantity WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE event_comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE event_comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER event_likes_count_trigger
  AFTER INSERT OR DELETE ON event_likes
  FOR EACH ROW EXECUTE FUNCTION update_event_likes_count();

CREATE TRIGGER event_comments_count_trigger
  AFTER INSERT OR DELETE ON event_comments
  FOR EACH ROW EXECUTE FUNCTION update_event_comments_count();

CREATE TRIGGER event_attendees_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON event_attendees
  FOR EACH ROW EXECUTE FUNCTION update_event_attendees_count();

CREATE TRIGGER comment_likes_count_trigger
  AFTER INSERT OR DELETE ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_category_id ON events(category_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_event_likes_event_id ON event_likes(event_id);
CREATE INDEX IF NOT EXISTS idx_event_likes_user_id ON event_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_event_comments_event_id ON event_comments(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON event_attendees(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);