"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function MoodLogForm() {
  const [moodScore, setMoodScore] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError.message);
      return;
    }

    const user = session?.user;

    if (user) {
      const { data, error } = await supabase
        .from('MoodLogs')
        .insert([{ user_id: user.id, mood_score: moodScore, note }]);

      if (error) {
        console.error('Error inserting mood log:', error.message);
      } else {
        console.log('Mood log inserted:', data);
        setMoodScore('');
        setNote('');
      }
    } else {
      console.error('No user session found');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label htmlFor="moodScore" className="block mb-2 text-sm font-medium text-gray-700">Mood Score</label>
        <input
          id="moodScore"
          type="number"
          min="1"
          max="10"
          value={moodScore}
          onChange={(e) => setMoodScore(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-700">Note</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
