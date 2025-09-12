import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ShootingStars({
  // Tunables (safe defaults)
  starCount = 140,          // total twinkling stars
  starBaseSize = 1.1,       // base radius in px (scaled by DPR)
  starSpeed = 0.12,         // drift speed
  cometChance = 0.015,      // spawn probability per frame
  cometMinSpeed = 8,        // min comet speed (px/frame @ DPR=1)
  cometMaxSpeed = 16,       // max comet speed
  tint = ['#ffffff', '#a5b4fc'], // star/comet gradient colors
  className = '',           // extra classes if needed (Tailwind etc.)
  zIndex = 0,               // canvas z-index (kept behind content)
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const ctxRef = useRef(null);

  // Motion preference: if user prefers reduced motion, we draw static stars (no loop)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Parallax target from mouse move
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Scene state
  const starsRef = useRef([]);
  const cometsRef = useRef([]);

  // Utility: DPR scaling + safe resize
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels, stay crisp
  };

  // Star factory
  const makeStar = (w, h) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: starBaseSize + Math.random() * 1.2, // radius
      vx: Math.cos(angle) * starSpeed,
      vy: Math.sin(angle) * starSpeed,
      tw: Math.random() * Math.PI * 2, // twinkle phase
      ta: 0.6 + Math.random() * 0.4,   // twinkle amplitude
    };
  };

  // Comet factory (shooting star)
  const makeComet = (w, h) => {
    // spawn along top/left edges, travel down-right at ~45deg (varied)
    const fromLeft = Math.random() < 0.6;
    const startX = fromLeft ? -40 : Math.random() * w;
    const startY = fromLeft ? Math.random() * (h * 0.4) : -40;
    const speed = cometMinSpeed + Math.random() * (cometMaxSpeed - cometMinSpeed);
    const angle = (Math.PI / 4) + (Math.random() * 0.35 - 0.175); // ~45° ±10°
    const len = 120 + Math.random() * 220;
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len,
      life: 1, // 1 -> 0 fade
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resize();

    // Init stars
    const w = window.innerWidth;
    const h = window.innerHeight;
    starsRef.current = Array.from({ length: starCount }, () => makeStar(w, h));

    const handleResize = () => {
      resize();
      // Re-seed stars to fill new area without stretching old positions
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      starsRef.current = Array.from({ length: starCount }, () => makeStar(nw, nh));
    };

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // [-1, 1]
      const dy = (e.clientY - cy) / cy; // [-1, 1]
      // target parallax offset in px
      parallaxRef.current.tx = dx * 8;
      parallaxRef.current.ty = dy * 8;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Smoothly move parallax toward target
      const pr = parallaxRef.current;
      pr.x += (pr.tx - pr.x) * 0.06;
      pr.y += (pr.ty - pr.y) * 0.06;

      // Clear with slight translucency for a very soft persistence (modern glow)
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.20)'; // subtle motion blur/persistence
      ctx.fillRect(0, 0, w, h);
      ctx.translate(pr.x, pr.y);

      // Draw stars (twinkle + tiny soft glow)
      for (const s of starsRef.current) {
        s.tw += 0.02;
        const alpha = 0.5 + Math.sin(s.tw) * s.ta * 0.5;

        // soft glow
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
        grd.addColorStop(0, `${hexToRgba(tint[0], 0.9 * alpha)}`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = hexToRgba(tint[0], 0.85 + 0.15 * alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // drift
        s.x += s.vx;
        s.y += s.vy;

        // wrap-around edges
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
      }

      // Maybe spawn a comet
      if (Math.random() < cometChance) {
        cometsRef.current.push(makeComet(w, h));
      }

      // Draw/update comets with gradient trail
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i];
        // trail vector (pointing backward)
        const tx = c.x - Math.cos(Math.atan2(c.vy, c.vx)) * c.len;
        const ty = c.y - Math.sin(Math.atan2(c.vy, c.vx)) * c.len;

        const trail = ctx.createLinearGradient(c.x, c.y, tx, ty);
        trail.addColorStop(0, hexToRgba(tint[1], 0.95 * c.life));
        trail.addColorStop(1, hexToRgba('#000000', 0.0));

        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = trail;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // bright head
        const head = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 10);
        head.addColorStop(0, hexToRgba('#ffffff', 0.95 * c.life));
        head.addColorStop(1, hexToRgba(tint[1], 0.0));
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // advance & fade
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.01;

        // remove when off-screen or faded
        if (c.life <= 0 || c.x > w + 200 || c.y > h + 200) {
          cometsRef.current.splice(i, 1);
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    if (!prefersReducedMotion) {
      // prime background and start loop
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      rafRef.current = requestAnimationFrame(loop);
    } else {
      // Static render only
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        for (const s of starsRef.current) {
          ctx.fillStyle = hexToRgba(tint[0], 0.9);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [starCount, starBaseSize, starSpeed, cometChance, cometMinSpeed, cometMaxSpeed, tint, prefersReducedMotion]);

  const canvasElement = (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    />
  );

  return (typeof document !== 'undefined' && document.body)
    ? createPortal(canvasElement, document.body)
    : canvasElement;
}

// Helper: convert hex to rgba string with alpha
function hexToRgba(hex, alpha = 1) {
  // support #rgb, #rrggbb
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((ch) => ch + ch).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}