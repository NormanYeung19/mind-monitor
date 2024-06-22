import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full h-16 px-6 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">Mind Monitor</h1>
      <nav>
        <Link href="/"><a className="mx-2">Home</a></Link>
        <Link href="/dashboard"><a className="mx-2">Dashboard</a></Link>
        <Link href="/login"><a className="mx-2">Login</a></Link>
        <Link href="/signup"><a className="mx-2">Sign Up</a></Link>
      </nav>
    </header>
  );
}
