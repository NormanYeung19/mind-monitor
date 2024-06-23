import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = supabase.auth.user();
      if (!user) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
