import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Fallback interactive grid/particles animation if video fails to load or offline
  useEffect(() => {
    if (!videoFailed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const numParticles = 60;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      ctx.fillStyle = "rgba(129, 140, 248, 0.25)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [videoFailed]);

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-[#030712]">
      {/* Background Radial Gradient Overlay to give modern contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,rgba(3,7,18,0.95)_90%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06)_0%,transparent_50%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.04)_0%,transparent_50%)] z-10 pointer-events-none" />

      {!videoFailed ? (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none transition-opacity duration-1000"
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
        >
          <source
            src={import.meta.env.VITE_BACKGROUND_VIDEO_URL || "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41804-large.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
}
