import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MoodLogForm from '../components/MoodLogForm';
import MoodChart from '../components/MoodChart';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mind Monitor</title>
        <meta name="description" content="Track your mental health and mood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Welcome to Mind Monitor</h1>
        <p className="text-xl mb-6">Track your mental health and mood trends</p>

        <div className="w-full max-w-2xl">
          <MoodLogForm />
          <MoodChart />
        </div>
      </main>

      <Footer />
    </div>
  );
}
