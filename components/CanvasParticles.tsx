// components/CanvasParticles.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface CanvasParticlesProps {
  particleCount?: number;
  particleColor?: string | string[];
  particleSize?: number | { min: number; max: number };
  speed?: number;
  connectLines?: boolean;
  lineColor?: string;
  maxLineDistance?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const CanvasParticles: React.FC<CanvasParticlesProps> = ({
  particleCount = 70, // Jumlah partikel default
  particleColor = "rgba(59, 130, 246, 0.7)", // Default: biru Tailwind bg-blue-600 dengan alpha
  particleSize = { min: 0.8, max: 2.2 },
  speed = 0.15,
  connectLines = true,
  lineColor = "rgba(59, 130, 246, 0.15)", // Garis juga biru dengan alpha lebih rendah
  maxLineDistance = 110,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesArray = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const getParticleColor = useCallback(() => {
    if (Array.isArray(particleColor)) {
      return particleColor[Math.floor(Math.random() * particleColor.length)];
    }
    return particleColor;
  }, [particleColor]);

  const getParticleSize = useCallback(() => {
    if (typeof particleSize === "number") {
      return particleSize;
    }
    return (
      Math.random() * (particleSize.max - particleSize.min) + particleSize.min
    );
  }, [particleSize]);

  const createParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      particlesArray.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesArray.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: getParticleSize(),
          color: getParticleColor(),
        });
      }
    },
    [particleCount, speed, getParticleSize, getParticleColor]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.current.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.radius < 0) p.x = canvas.width + p.radius;
        if (p.x - p.radius > canvas.width) p.x = 0 - p.radius;
        if (p.y + p.radius < 0) p.y = canvas.height + p.radius;
        if (p.y - p.radius > canvas.height) p.y = 0 - p.radius;

        if (connectLines) {
          for (let j = index + 1; j < particlesArray.current.length; j++) {
            const p2 = particlesArray.current[j];
            const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (distance < maxLineDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.2;
              const opacity = 1 - distance / maxLineDistance;
              ctx.globalAlpha = opacity > 0 ? opacity : 0;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      });
    },
    [connectLines, lineColor, maxLineDistance]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawParticles(ctx, canvas);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        createParticles(canvas); // Recreate particles on resize
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      // Initial setup
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      createParticles(canvas);
    }

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
      resizeObserver.disconnect();
    };
  }, [createParticles, animate]); // createParticles dan animate ditambahkan sebagai dependensi

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block", // Untuk menghilangkan space di bawah canvas jika ada
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default CanvasParticles;
