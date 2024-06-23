import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        console.log('Logged out successfully');
        router.push('/login'); // Redirect to login page after successful logout
      }
    };

    handleLogout();
  }, [router]);

  return <div>Logging out...</div>;
}
