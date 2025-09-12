// Import React and necessary hooks for lifecycle, memoization, and refs
import React, { useEffect, useMemo, useRef } from 'react';
// Import createPortal to render the canvas at document.body (above app content)
import { createPortal } from 'react-dom';

// Export a React component that draws a starfield with occasional shooting stars
export default function ShootingStars({
  // Number of twinkling stars to render
  starCount = 140,
  // Base radius (in CSS pixels) for stars; scaled by device pixel ratio in the canvas transform
  starBaseSize = 1.1,
  // Per-frame star drift speed (in CSS px/frame)
  starSpeed = 0.12,
  // Probability per animation frame that a comet (shooting star) spawns
  cometChance = 0.015,
  // Minimum comet speed (px/frame @ DPR=1)
  cometMinSpeed = 8,
  // Maximum comet speed (px/frame @ DPR=1)
  cometMaxSpeed = 16,
  // Gradient colors used for stars and comet trails/heads
  tint = ['#ffffff', '#a5b4fc'],
  // Optional extra CSS classes (e.g., Tailwind utilities)
  className = '',
  // z-index to position the canvas in the stacking context (kept behind content by default)
  zIndex = 0,
}) {
  // Ref to the <canvas> element in the DOM
  const canvasRef = useRef(null);
  // Ref to store the current requestAnimationFrame id for cleanup
  const rafRef = useRef(null);
  // Ref to store the 2D canvas rendering context
  const ctxRef = useRef(null);

  // Compute whether the user prefers reduced motion; if so, disable the animation loop
  const prefersReducedMotion = useMemo(() => {
    // SSR guard and feature detection
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    // Query OS/browser reduced motion preference
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Track current and target parallax offsets in CSS pixels for a subtle mouse-move parallax effect
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Store the collection of stars being animated
  const starsRef = useRef([]);
  // Store the collection of active comets (shooting stars)
  const cometsRef = useRef([]);

  // Resize the canvas to match the viewport and set DPR-aware transform
  const resize = () => {
    // Get canvas element
    const canvas = canvasRef.current;
    // Bail if not mounted yet
    if (!canvas) return;
    // Use integer DPR >= 1 for crisp rendering while limiting overdraw
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    // Viewport width in CSS pixels
    const w = window.innerWidth;
    // Viewport height in CSS pixels
    const h = window.innerHeight;
    // Size the canvas visually (CSS pixels)
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    // Size the backing store (device pixels)
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    // Acquire 2D drawing context
    const ctx = canvas.getContext('2d');
    // Save context ref for reuse in loop
    ctxRef.current = ctx;
    // Scale drawing so that 1 unit == 1 CSS pixel while remaining DPR-sharp
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  // Create a single star with random position, radius, velocity, and twinkle parameters
  const makeStar = (w, h) => {
    // Random angle for drift direction
    const angle = Math.random() * Math.PI * 2;
    // Return a star object with position, radius, velocity, and twinkle state
    return {
      // X position in CSS pixels
      x: Math.random() * w,
      // Y position in CSS pixels
      y: Math.random() * h,
      // Radius of the star core
      r: starBaseSize + Math.random() * 1.2,
      // X velocity based on angle and configured speed
      vx: Math.cos(angle) * starSpeed,
      // Y velocity based on angle and configured speed
      vy: Math.sin(angle) * starSpeed,
      // Twinkle phase angle
      tw: Math.random() * Math.PI * 2,
      // Twinkle amplitude (how strong the twinkle is)
      ta: 0.6 + Math.random() * 0.4,
    };
  };

  // Create a comet (shooting star) starting from the top/left edges moving ~down-right
  const makeComet = (w, h) => {
    // Randomize whether to spawn from left edge (more common) vs top edge
    const fromLeft = Math.random() < 0.6;
    // Starting X coordinate: offscreen to the left if fromLeft, otherwise anywhere across width
    const startX = fromLeft ? -40 : Math.random() * w;
    // Starting Y coordinate: somewhere near the top if fromLeft, else offscreen above
    const startY = fromLeft ? Math.random() * (h * 0.4) : -40;
    // Random speed within configured bounds
    const speed = cometMinSpeed + Math.random() * (cometMaxSpeed - cometMinSpeed);
    // Base angle ~45°, with some jitter to avoid uniformity
    const angle = (Math.PI / 4) + (Math.random() * 0.35 - 0.175);
    // Trail length for visual streak
    const len = 120 + Math.random() * 220;
    // Return a comet object with position, velocity, trail length, and life alpha
    return {
      // X position
      x: startX,
      // Y position
      y: startY,
      // X velocity component
      vx: Math.cos(angle) * speed,
      // Y velocity component
      vy: Math.sin(angle) * speed,
      // Trail length in pixels
      len,
      // Life factor used for fading (1 → 0)
      life: 1,
    };
  };

  // Main setup and animation effect; runs on mount and when dependencies change
  useEffect(() => {
    // Get the canvas element
    const canvas = canvasRef.current;
    // If not mounted, do nothing
    if (!canvas) return;
    // Initialize canvas sizing and context
    resize();

    // Cache viewport width
    const w = window.innerWidth;
    // Cache viewport height
    const h = window.innerHeight;
    // Seed the starfield with the configured number of stars
    starsRef.current = Array.from({ length: starCount }, () => makeStar(w, h));

    // Handle browser window resizes to keep canvas and stars aligned to viewport
    const handleResize = () => {
      // Resize canvas and reset DPR transform
      resize();
      // Re-generate stars to fill the new dimensions uniformly
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      // Replace the star array with fresh positions
      starsRef.current = Array.from({ length: starCount }, () => makeStar(nw, nh));
    };

    // Handle mouse movement to set target parallax offsets based on cursor position
    const handleMouseMove = (e) => {
      // Center X of the viewport
      const cx = window.innerWidth / 2;
      // Center Y of the viewport
      const cy = window.innerHeight / 2;
      // Normalized horizontal offset in range [-1, 1]
      const dx = (e.clientX - cx) / cx;
      // Normalized vertical offset in range [-1, 1]
      const dy = (e.clientY - cy) / cy;
      // Set target parallax offsets (in pixels) scaled for subtle effect
      parallaxRef.current.tx = dx * 8;
      parallaxRef.current.ty = dy * 8;
    };

    // Listen for viewport resizes
    window.addEventListener('resize', handleResize);
    // Listen for mouse movement to update parallax target
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop to update and render the scene each frame
    const loop = () => {
      // Get 2D context
      const ctx = ctxRef.current;
      // If no context, skip frame
      if (!ctx) return;

      // Current viewport width
      const w = window.innerWidth;
      // Current viewport height
      const h = window.innerHeight;

      // Smoothly interpolate current parallax offset toward its target
      const pr = parallaxRef.current;
      // Lerp X toward target (easing factor)
      pr.x += (pr.tx - pr.x) * 0.06;
      // Lerp Y toward target (easing factor)
      pr.y += (pr.ty - pr.y) * 0.06;

      // Save context state before applying fills and translations
      ctx.save();
      // Draw normally over previous frame
      ctx.globalCompositeOperation = 'source-over';
      // Fill with a translucent black to leave gentle persistence (subtle motion blur)
      ctx.fillStyle = 'rgba(0,0,0,0.20)';
      // Clear the frame with the translucent fill
      ctx.fillRect(0, 0, w, h);
      // Apply the parallax translation so stars/comets shift slightly with the cursor
      ctx.translate(pr.x, pr.y);

      // Iterate over each star to twinkle, draw glow/core, and drift
      for (const s of starsRef.current) {
        // Advance the twinkle phase
        s.tw += 0.02;
        // Compute alpha modulation based on sine wave and amplitude
        const alpha = 0.5 + Math.sin(s.tw) * s.ta * 0.5;

        // Create a radial gradient for a soft glow around the star
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
        // Inner color stop with alpha based on twinkle
        grd.addColorStop(0, `${hexToRgba(tint[0], 0.9 * alpha)}`);
        // Outer stop fades to transparent to create the glow falloff
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        // Use the gradient as fill style
        ctx.fillStyle = grd;
        // Begin path for the glow disc
        ctx.beginPath();
        // Draw the glow disc (larger than the core)
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        // Fill the glow disc
        ctx.fill();

        // Set fill for the star core using a higher base alpha
        ctx.fillStyle = hexToRgba(tint[0], 0.85 + 0.15 * alpha);
        // Begin path for the core
        ctx.beginPath();
        // Draw the star core circle
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Fill the core
        ctx.fill();

        // Update star position by its velocity
        s.x += s.vx;
        s.y += s.vy;

        // Wrap stars around the edges to create an endless field
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
      }

      // Randomly decide whether to spawn a new comet this frame
      if (Math.random() < cometChance) {
        // Push a newly created comet into the active list
        cometsRef.current.push(makeComet(w, h));
      }

      // Iterate through comets from back to front so we can remove faded/out-of-bounds ones
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        // Current comet
        const c = cometsRef.current[i];
        // Compute the trail tail position by extending backward along the velocity direction
        const tx = c.x - Math.cos(Math.atan2(c.vy, c.vx)) * c.len;
        const ty = c.y - Math.sin(Math.atan2(c.vy, c.vx)) * c.len;

        // Create a gradient for the comet trail (bright at head, fading to transparent)
        const trail = ctx.createLinearGradient(c.x, c.y, tx, ty);
        // Start color near the comet head with current life alpha
        trail.addColorStop(0, hexToRgba(tint[1], 0.95 * c.life));
        // End fully transparent at the tail
        trail.addColorStop(1, hexToRgba('#000000', 0.0));

        // Set a rounded thin stroke to draw the trail
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = trail;
        // Begin path for the trail line
        ctx.beginPath();
        // Move to comet head
        ctx.moveTo(c.x, c.y);
        // Draw to computed tail position
        ctx.lineTo(tx, ty);
        // Stroke the trail
        ctx.stroke();

        // Create a radial gradient for the bright comet head
        const head = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 10);
        // Inner bright core based on life alpha
        head.addColorStop(0, hexToRgba('#ffffff', 0.95 * c.life));
        // Outer edge fades to tint color transparent
        head.addColorStop(1, hexToRgba(tint[1], 0.0));
        // Use the head gradient as fill
        ctx.fillStyle = head;
        // Begin path for the head circle
        ctx.beginPath();
        // Draw a small circular head
        ctx.arc(c.x, c.y, 2.8, 0, Math.PI * 2);
        // Fill the head
        ctx.fill();

        // Advance comet position by its velocity
        c.x += c.vx;
        c.y += c.vy;
        // Fade comet slightly each frame
        c.life -= 0.01;

        // Remove the comet if fully faded or far off-screen to free memory/work
        if (c.life <= 0 || c.x > w + 200 || c.y > h + 200) {
          cometsRef.current.splice(i, 1);
        }
      }

      // Restore drawing state to what it was before the frame's transforms/fills
      ctx.restore();
      // Queue the next animation frame
      rafRef.current = requestAnimationFrame(loop);
    };

    // Start the animation loop if motion is allowed
    if (!prefersReducedMotion) {
      // Prime the background with opaque black on first render
      const ctx = ctxRef.current;
      if (ctx) {
        // Set background fill
        ctx.fillStyle = 'rgba(0,0,0,1)';
        // Fill full viewport
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      // Kick off the animation loop
      rafRef.current = requestAnimationFrame(loop);
    } else {
      // If reduced motion is preferred, render a single static starfield frame
      const ctx = ctxRef.current;
      if (ctx) {
        // Solid black background
        ctx.fillStyle = 'rgba(0,0,0,1)';
        // Fill full viewport
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // Draw non-animated stars without glow/trails for simplicity
        for (const s of starsRef.current) {
          // Use tint color with high alpha
          ctx.fillStyle = hexToRgba(tint[0], 0.9);
          // Begin path for the star core
          ctx.beginPath();
          // Draw the star core circle
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          // Fill the star
          ctx.fill();
        }
      }
    }

    // Cleanup event listeners and any scheduled animation frame on unmount/deps change
    return () => {
      // Remove resize listener
      window.removeEventListener('resize', handleResize);
      // Remove mousemove listener
      window.removeEventListener('mousemove', handleMouseMove);
      // Cancel the in-flight RAF if any
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // Re-run effect if any of these tunables or preferences change
  }, [starCount, starBaseSize, starSpeed, cometChance, cometMinSpeed, cometMaxSpeed, tint, prefersReducedMotion]);

  // Define the canvas element with positioning and accessibility props
  const canvasElement = (
    // The drawing surface, fixed to cover the viewport and ignore pointer events
    <canvas
      // Attach ref so we can draw to this canvas
      ref={canvasRef}
      // Fixed, full-screen; allow consumer to pass extra classes
      className={`pointer-events-none fixed inset-0 ${className}`}
      // Use provided zIndex to position behind/above other elements as needed
      style={{ zIndex }}
      // Hide from screen readers (purely decorative)
      aria-hidden="true"
    />
  );

  // If running in the browser and document.body exists, portal the canvas there; otherwise render inline
  return (typeof document !== 'undefined' && document.body)
    ? createPortal(canvasElement, document.body)
    : canvasElement;
}

// Convert a hex color (e.g., "#fff" or "#aabbcc") and alpha to an rgba() CSS string
function hexToRgba(hex, alpha = 1) {
  // Remove leading '#' if present
  let c = hex.replace('#', '');
  // Expand shorthand #rgb to full #rrggbb
  if (c.length === 3) {
    c = c.split('').map((ch) => ch + ch).join('');
  }
  // Parse the hex string into a number
  const num = parseInt(c, 16);
  // Extract red channel
  const r = (num >> 16) & 255;
  // Extract green channel
  const g = (num >> 8) & 255;
  // Extract blue channel
  const b = num & 255;
  // Return CSS rgba() string with supplied alpha
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}