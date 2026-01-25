import { useEffect, useRef } from 'preact/hooks';

interface DotProfileProps {
  src: string;
}

export default function DotProfile({ src }: DotProfileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";

    let animationFrameId: number;
    let time = 0;

    image.onload = () => {
      const width = 432; 
      const height = 576; 
      canvas.width = width;
      canvas.height = height;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const imgAspect = image.width / image.height;
      const canvasAspect = width / height;
      
      let renderW, renderH, offsetX, offsetY;
      
      if (imgAspect > canvasAspect) {
        renderH = height;
        renderW = height * imgAspect;
        offsetX = -(renderW - width) / 2;
        offsetY = 0;
      } else {
        renderW = width;
        renderH = width / imgAspect;
        offsetX = 0;
        offsetY = -(renderH - height) / 2;
      }

      offCtx.drawImage(image, offsetX, offsetY, renderW, renderH);
      const imageData = offCtx.getImageData(0, 0, width, height).data;

      const gap = 6;
      const baseRadius = 2;

      const render = () => {
        time += 0.03;
        
        ctx.fillStyle = '#16181D';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#ffffffff';

        for (let y = 0; y < height; y += gap) {
          for (let x = 0; x < width; x += gap) {
            const index = (y * width + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            
            const brightness = (r + g + b) / 3 / 255;
            
            const wave = Math.sin(x * 0.02 + y * 0.02 - time) * 0.5 + 0.5;
            
            if (brightness > 0.1) {
              const size = (brightness * baseRadius) * (0.8 + 0.4 * wave);
              
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [src]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        objectFit: 'contain'
      }} 
    />
  );
}
