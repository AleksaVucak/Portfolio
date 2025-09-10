import React, { useEffect, useRef } from 'react';

const ShootingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    canvas.width = width;
    canvas.height = height;

    const stars = [];

    function createStar() {
      const fromLeft = Math.random() < 0.5; // 50/50 chance to spawn from left or top
      const startX = fromLeft ? 0 : Math.random() * width;
      const startY = fromLeft ? Math.random() * height : 0;

      return {
        x: startX,
        y: startY,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 4 + 2,
        angle: Math.PI / 4 // diagonal
      };
    }

    for (let i = 0; i < 20; i++) {
      stars.push(createStar());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // transparent bg

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - s.length * Math.cos(s.angle),
          s.y - s.length * Math.sin(s.angle)
        );
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;

        if (s.x > width || s.y > height) {
          stars[i] = createStar();
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
        width = window.innerWidth;
        height = document.documentElement.scrollHeight;
        canvas.width = width;
        canvas.height = height;
      };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default ShootingStars;
