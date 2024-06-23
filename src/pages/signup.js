import { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Updated import path
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, username }]);
      if (profileError) {
        console.error('Error creating profile:', profileError.message);
      } else {
        console.log('Signed up user:', user);
        router.push('/login');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-2 p-2 border"
      />
      <button onClick={handleSignup} className="p-2 bg-blue-500 text-white">
        Sign Up
      </button>
    </div>
  );
}
