'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return <div className="countdown" aria-hidden="true" />;

  const diff = new Date(target).getTime() - now;

  if (diff <= 0) {
    return <p className="countdown__out">Out now</p>;
  }

  const units = [
    { label: 'Days', value: Math.floor(diff / 86400000) },
    { label: 'Hrs', value: Math.floor(diff / 3600000) % 24 },
    { label: 'Min', value: Math.floor(diff / 60000) % 60 },
    { label: 'Sec', value: Math.floor(diff / 1000) % 60 },
  ];

  return (
    <div className="countdown" role="timer">
      {units.map((u) => (
        <div key={u.label} className="countdown__unit">
          <span className="countdown__value">{String(u.value).padStart(2, '0')}</span>
          <span className="countdown__label">{u.label}</span>
        </div>
      ))}
    </div>
  );
}