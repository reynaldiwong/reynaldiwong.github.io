import { useState, useEffect } from "preact/hooks";

interface ExperienceTimerProps {
  startDate: string;
}

export default function ExperienceTimer({ startDate }: ExperienceTimerProps) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const start = new Date(startDate);

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      // Calculate time components
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;

      setDuration(
        `${years}Y ${months}M ${finalDays}D ${hours}H ${minutes}m ${seconds}s`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return <span>{duration}</span>;
}
