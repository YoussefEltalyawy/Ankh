import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hjocpxcjickltdhgqbkd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqb2NweGNqaWNrbHRkaGdxYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NDE2MDgsImV4cCI6MjA0MTUxNzYwOH0.4hH0L3eC4NIfi2Jt7KGMiAe6LHpxZzMWT4ByW32bVFY'
);

type User = {
  id: string;
  email: string | undefined;
  user_metadata?: {
    [key: string]: unknown;
  };
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUser(user as User);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      // Clear localStorage and reset other states
      localStorage.clear();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return { user, loading, handleLogout };
}
