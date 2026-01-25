import { useState, useEffect } from 'preact/hooks';

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export default function BallWave() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ display: 'inline-block', width: '2ch', textAlign: 'center', color: '#9cdcfe' }}>
      {frames[frameIndex]}
    </span>
  );
}
