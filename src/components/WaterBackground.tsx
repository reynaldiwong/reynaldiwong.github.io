import React, { useEffect, useRef } from 'react';

const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;

      // Pseudo-random function
      vec2 random2(float p) {
        return fract(sin(vec2(p * 12.9898, p * 78.233)) * 43758.5453);
      }

      void main() {
        // Normalize coordinates
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        
        // Correct aspect ratio to ensure circles are circular
        st.x *= uResolution.x / uResolution.y;

        float minDist = 10000.0;
        
        // Number of points matches sketch.js (36)
        // We scale the loop to cover the screen density roughly
        for (int i = 0; i < 36; i++) {
            float fi = float(i);
            // Generate random initial position for this point
            // We use a fixed seed per point index to keep them consistent
            vec2 origin = random2(fi);
            
            // Map origin to screen space (roughly)
            // We multiply by larger numbers to spread them out
            // sketch.js used random(width), random(height)
            // Here we map 0..1 to a wider range to cover aspect ratio
            vec2 posBase = origin * vec2(uResolution.x / uResolution.y * 1.5, 1.5);

            // Circular motion
            // pX = 50*sin(...) + initX
            // 50px in 600px canvas is ~0.08 in normalized 0..1 space (if 600px=1.0)
            // Let's use a relative size. 50/600 = 0.0833.
            // But we work in "pixel-like" coords in the color step, so let's keep things normalized first.
            
            float angle = uTime * 2.0 + origin.x * 6.0; // Adjust speed and phase
            float radius = 0.1; // roughly 50px/600px
            
            vec2 pos = posBase + vec2(sin(angle), cos(angle)) * radius;
            
            // Calculate distance
            float d = distance(st, pos);
            minDist = min(minDist, d);
        }

        // Convert normalized distance back to "pixel" units for the color formula
        // sketch.js was based on 600x600.
        // So we multiply minDist by 600.0 to get comparable values.
        float dVal = minDist * 600.0; // Scale factor

        // Nighttime Color Formula from sketch.js
        // wave[f][index+0] = waveColor(noise, 40, 32, 2.2);
        // wave[f][index+1] = waveColor(noise, 30, 55, 3.34);
        // wave[f][index+2] = waveColor(noise, 30, 68, 3.55);
        
        // waveColor(x, a, b, e) => pow(x/a, e) + b
        // Increased divisors (40->60, 30->45) to make the gradient rise slower (more dark area)
        // Reduced base offsets (32->20, 55->40, 68->50) to make the deepest parts darker
        
        float r = pow(dVal / 60.0, 2.2) + 20.0;
        float g = pow(dVal / 45.0, 3.34) + 40.0;
        float b = pow(dVal / 45.0, 3.55) + 50.0;

        // Normalize to 0.0 - 1.0
        gl_FragColor = vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
      }
    `;

    // Shader compilation helpers
    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return;
    }

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
        uResolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
      },
    };

    // Buffer setup
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    let startTime = Date.now();
    let animationFrameId: number;

    const render = () => {
      // Resize handling - Low resolution for pixel art look
      const pixelScale = 24; // Increased scale for more obvious pixelation
      const displayWidth = Math.max(1, Math.ceil(canvas.clientWidth / pixelScale));
      const displayHeight = Math.max(1, Math.ceil(canvas.clientHeight / pixelScale));
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      // Clear with dark blue (theme color) instead of black
      gl.clearColor(0.04, 0.1, 0.18, 1.0); // #0a1a2f (matches var(--koi-dark))
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      const currentTime = (Date.now() - startTime) * 0.001;
      gl.uniform1f(programInfo.uniformLocations.uTime, currentTime);
      gl.uniform2f(programInfo.uniformLocations.uResolution, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated', background: 'var(--koi-dark)' }}
    />
  );
};

export default WaterBackground;
