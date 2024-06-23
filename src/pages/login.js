import { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Updated import path
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();
    
    if (profileError) {
      console.error('Error fetching profile:', profileError.message);
    } else {
      const { user, error: loginError } = await supabase.auth.signIn({
        email: profile.email,
        password: password,
      });
      if (loginError) {
        console.error('Error logging in:', loginError.message);
      } else {
        console.log('Logged in user:', user);
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 p-2 border"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
        Login
      </button>
    </div>
  );
}
