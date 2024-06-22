import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full h-16 px-6 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">Mind Monitor</h1>
      <nav>
        <Link href="/" className="mx-2">Home</Link>
        <Link href="/dashboard" className="mx-2">Dashboard</Link>
        <Link href="/login" className="mx-2">Login</Link>
        <Link href="/signup" className="mx-2">Sign Up</Link>
      </nav>
    </header>
  );
}
