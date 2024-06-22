import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
      <nav>
        <Link href="/privacy" className="mx-2">Privacy Policy</Link>
        <Link href="/terms" className="mx-2">Terms of Service</Link>
      </nav>
      <p>Powered by Next.js & Supabase</p>
    </footer>
  );
}
