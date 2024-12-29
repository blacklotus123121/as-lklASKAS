/*
  # Fix Profile Synchronization

  1. Changes
    - Add trigger to automatically create profiles for new users
    - Ensure existing users have profiles
    - Fix profile creation for the test user
*/

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (new.id, new.email, new.created_at, new.updated_at)
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = EXCLUDED.updated_at;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sync existing users
INSERT INTO public.profiles (id, email, created_at, updated_at)
SELECT 
  id,
  email,
  created_at,
  updated_at
FROM auth.users
ON CONFLICT (id) DO UPDATE
SET email = EXCLUDED.email,
    updated_at = EXCLUDED.updated_at;