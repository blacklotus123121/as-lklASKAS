/*
  # Update test user password

  1. Changes
    - Updates the password for teste@teste.com user to '123456'
*/

DO $$
BEGIN
  UPDATE auth.users
  SET encrypted_password = crypt('123456', gen_salt('bf'))
  WHERE email = 'teste@teste.com';
END $$;