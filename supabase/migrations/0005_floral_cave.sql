/*
  # Create test user and profile

  1. Changes
    - Add test user account
    - Create corresponding profile
*/

-- Insert test user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'teste@teste.com'
  ) THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    )
    VALUES (
      gen_random_uuid(),
      'teste@teste.com',
      crypt('1234', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      'authenticated'
    );
  END IF;
END $$;

-- Create profile for test user
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'teste@teste.com';
  
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = v_user_id
  ) THEN
    INSERT INTO profiles (id, email, created_at, updated_at)
    VALUES (v_user_id, 'teste@teste.com', now(), now());
  END IF;
END $$;