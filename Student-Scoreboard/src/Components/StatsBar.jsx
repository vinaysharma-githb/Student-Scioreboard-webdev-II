import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;

    if (from === to) return;

    const steps = 20;
    const duration = 400;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(to);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span key={value}>{display}</span>;
}

function StatsBar({ students }) {
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg = total === 0 ? 0 : Math.round(students.reduce((a, s) => a + s.score, 0) / total);

  return (
    <div className="stats-bar">
      <StatCard label="TOTAL" value={total} color="cyan" />
      <div className="stats-bar__divider" />
      <StatCard label="PASSED" value={passed} color="green" />
      <div className="stats-bar__divider" />
      <StatCard label="AVG. SCORE" value={avg} color={avg >= 40 ? 'yellow' : 'red'} />
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">
        <AnimatedNumber value={value} />
      </div>
    </div>
  );
}

export default StatsBar;
