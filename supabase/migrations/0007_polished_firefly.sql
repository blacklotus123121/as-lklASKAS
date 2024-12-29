/*
  # Fix test user password

  1. Changes
    - Properly updates the password for teste@teste.com user
    - Uses raw_user_meta_data to ensure proper user setup
*/

-- First ensure the user exists with proper metadata
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'teste@teste.com'
  ) THEN
    -- Update existing user
    UPDATE auth.users
    SET 
      encrypted_password = crypt('123456', gen_salt('bf')),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}',
      raw_user_meta_data = '{}',
      updated_at = now(),
      email_confirmed_at = now(),
      is_super_admin = false,
      role = 'authenticated'
    WHERE email = 'teste@teste.com';
  ELSE
    -- Create new user if doesn't exist
    INSERT INTO auth.users (
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
      'teste@teste.com',
      crypt('123456', gen_salt('bf')),
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