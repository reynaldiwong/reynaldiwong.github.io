import { useState, useEffect } from "preact/hooks";

interface HeroJsonProps {
  startDate: string;
}

interface TimeState {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Token {
  text: string;
  type: 'punctuation' | 'key' | 'string' | 'plain' | 'value';
  key?: keyof TimeState;
}

const staticTokens: Token[] = [
  { text: '{', type: 'punctuation' },
  { text: '\n  ', type: 'plain' },
  { text: '"name"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '"Reynaldi Wong"', type: 'string' },
  { text: ',', type: 'punctuation' },
  { text: '\n  ', type: 'plain' },
  { text: '"class"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '"DevOps Engineer"', type: 'string' },
  { text: ',', type: 'punctuation' },
  { text: '\n  ', type: 'plain' },
  { text: '"origin"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '"Mechatronics Engineering"', type: 'string' },
  { text: ',', type: 'punctuation' },
  { text: '\n  ', type: 'plain' },
  { text: '"playtime"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '{', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"years"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '0', type: 'value', key: 'years' },
  { text: ',', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"months"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '0', type: 'value', key: 'months' },
  { text: ',', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"days"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '0', type: 'value', key: 'days' },
  { text: ',', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"hours"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '0', type: 'value', key: 'hours' },
  { text: ',', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"minutes"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '0', type: 'value', key: 'minutes' },
  { text: ',', type: 'punctuation' },
  { text: '\n    ', type: 'plain' },
  { text: '"seconds"', type: 'key' },
  { text: ': ', type: 'punctuation' },
  { text: '00', type: 'value', key: 'seconds' },
  { text: '\n  ', type: 'plain' },
  { text: '}', type: 'punctuation' },
  { text: '\n', type: 'plain' },
  { text: '}', type: 'punctuation' },
];

export default function HeroJson({ startDate }: HeroJsonProps) {
  const [duration, setDuration] = useState<TimeState>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const totalStaticLength = staticTokens.reduce((acc, token) => acc + token.text.length, 0);
  
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const speed = 30; 
    
    const typeWriter = () => {
      if (index < totalStaticLength) {
        setCharIndex(prev => prev + 1);
        index++;
        setTimeout(typeWriter, speed);
      }
    };
    
    typeWriter();
  }, [totalStaticLength]);

  useEffect(() => {
    const start = new Date(startDate);

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(daysTotal / 365);
      const remainingDays = daysTotal % 365;
      const months = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;

      setDuration({
        years,
        months,
        days: finalDays,
        hours,
        minutes,
        seconds
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const renderStaticPart = () => {
    let currentLength = 0;
    const renderedTokens = [];

    for (let i = 0; i < staticTokens.length; i++) {
      const token = staticTokens[i];
      const tokenStart = currentLength;
      const tokenEnd = currentLength + token.text.length;

      if (charIndex > tokenStart) {
        let textToRender = token.text;
        
        if (token.type === 'value' && token.key) {
           textToRender = duration[token.key].toString();
        }

        if (charIndex < tokenEnd) {
           const sliceLength = charIndex - tokenStart;
           textToRender = textToRender.slice(0, sliceLength);
        }
      
        const className = 
          token.type === 'key' ? 'json-key' :
          token.type === 'string' ? 'json-string' :
          token.type === 'punctuation' ? 'json-punctuation' :
          token.type === 'value' ? 'json-number' :
          '';

        renderedTokens.push(
          <span key={i} className={className}>{textToRender}</span>
        );
      }
      currentLength += token.text.length;
    }
    return renderedTokens;
  };

  return (
    <div className="hero-json-container">
      <pre className="hero-json-code">
        <code>
          {renderStaticPart()}
          <span className="cursor">|</span>
        </code>
      </pre>
    </div>
  );
}
