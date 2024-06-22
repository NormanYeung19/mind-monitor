"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Corrected import path

export default function MoodLogForm() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('MoodLogs')
      .insert([{ mood_score: mood, note, user_id: user.id }]);
    if (error) console.error('Error logging mood:', error.message);
    else console.log('Mood logged:', data);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-4">Log Your Mood</h2>
      <input
        type="number"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        min="1"
        max="10"
        className="mb-2 p-2 border"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note..."
        className="mb-2 p-2 border"
      ></textarea>
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white">
        Submit
      </button>
    </div>
  );
}
