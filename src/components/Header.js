"use client"; // Ensure this is the first line in the file

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="flex justify-between items-center w-full h-16 px-6 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">Mind Monitor</h1>
      <nav>
        <Link href="/" className="mx-2">Home</Link>
        <Link href="/dashboard" className="mx-2">Dashboard</Link>
        {!user && <Link href="/login" className="mx-2">Login</Link>}
        {!user && <Link href="/signup" className="mx-2">Sign Up</Link>}
        {user && <button onClick={handleLogout} className="mx-2">Logout</button>}
      </nav>
    </header>
  );
}
