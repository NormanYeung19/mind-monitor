"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function MoodChart() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from('MoodLogs')
        .select('mood_score, timestamp')
        .eq('user_id', user.id);
      if (error) console.error('Error fetching mood data:', error.message);
      else setMoodData(data);
    };

    fetchMoodData();
  }, []);

  const chartData = {
    labels: moodData.map((log) => new Date(log.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Score',
        data: moodData.map((log) => log.mood_score),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
}
