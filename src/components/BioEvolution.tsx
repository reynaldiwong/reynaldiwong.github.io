export default function BioEvolution() {
  return (
    <svg width="100%" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <path 
        id="infinity-path"
        d="M150,250 
           C 290,250 290,50 150,50 
           C 10,50 10,250 150,250 
           C 290,250 290,450 150,450 
           C 10,450 10,250 150,250 Z" 
        stroke="var(--border-color)" 
        stroke-width="1" 
        stroke-opacity="0.1"
        fill="none" 
      />

      {Array.from({ length: 25 }).map((_, rawIndex) => {
        const i = 24 - rawIndex; 
        return (
          <circle 
            key={i}
            r={8 - (i * 0.3)} 
            fill="var(--primary-color)" 
            opacity={0.6 - (i * 0.02)} 
            filter="url(#glow)"
          >
            <animateMotion 
              dur="10s" 
              begin={`${-10 + (i + 1) * 0.08}s`} 
              repeatCount="indefinite" 
              rotate="auto"
            >
               <mpath href="#infinity-path" />
            </animateMotion>
          </circle>
        );
      })}

      <circle r="9" fill="var(--primary-color)" filter="url(#glow)">
        <animateMotion 
          dur="10s" 
          begin="0s"
          repeatCount="indefinite" 
          rotate="auto"
        >
           <mpath href="#infinity-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}