import { AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Email or password is incorrect');
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error('Authentication failed. Please try again.');
    }
    throw error;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('This email is already registered');
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error('Registration failed. Please try again.');
    }
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Failed to sign out');
  }
}