import { useEffect, useState } from "preact/hooks";

export default function NowClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const formatted = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return <span>{formatted}</span>;
}
