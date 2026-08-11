import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

/* ====== STAR SPARKLE ====== */
export function Star({ className }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.4, 1, 0.4],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
    </motion.svg>
  );
}

/* ====== GRADIENT BLOB ====== */
export function Blob({ className }) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-screen filter blur-3xl opacity-30 ${className}`}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

/* ====== FLOATING PARTICLES BACKGROUND ====== */
export function FloatingParticles({ count = 25 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      color: ['#f59e0b', '#fbbf24', '#14b8a6', '#d97706'][Math.floor(Math.random() * 4)],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

/* ====== CONFETTI BURST ====== */
export function ConfettiBurst({ duration = 5000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  const pieces = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6', '#fbbf24', '#ef4444', '#22d3ee', '#d97706'][Math.floor(Math.random() * 8)],
      size: 6 + Math.random() * 8,
      fallDuration: 2 + Math.random() * 3,
      swayDuration: 1 + Math.random() * 2,
      delay: Math.random() * 1.5,
      shape: Math.random() > 0.5 ? '50%' : '2px',
      rotation: Math.random() * 360,
    }));
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 0.6),
            backgroundColor: p.color,
            borderRadius: p.shape,
            animationDuration: `${p.fallDuration}s, ${p.swayDuration}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ====== CLICK CONFETTI CANNON (position-specific) ====== */
export function ClickConfetti({ x, y, onDone }) {
  const pieces = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 60;
      const velocity = 80 + Math.random() * 180;
      return {
        id: i,
        color: ['#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6', '#fbbf24', '#ef4444', '#22d3ee', '#d97706', '#10b981'][Math.floor(Math.random() * 9)],
        size: 5 + Math.random() * 7,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
        xFinal: Math.cos(angle) * velocity,
        yFinal: Math.sin(angle) * velocity - 100,
        rotation: Math.random() * 720 - 360,
        duration: 1.5 + Math.random() * 1.5,
      };
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed pointer-events-none z-[200]" style={{ left: x, top: y }}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.xFinal,
            y: [0, p.yFinal * 0.6, p.yFinal + 200],
            opacity: [1, 1, 0],
            rotate: p.rotation,
            scale: [1, 1, 0.2],
          }}
          transition={{
            duration: p.duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            width: p.size,
            height: p.shape === 'circle' ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
}

/* ====== CLICK CONFETTI MANAGER ====== */
export function ClickConfettiManager() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      setBursts(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const removeBurst = (id) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  };

  return (
    <>
      {bursts.map(b => (
        <ClickConfetti
          key={b.id}
          x={b.x}
          y={b.y}
          onDone={() => removeBurst(b.id)}
        />
      ))}
    </>
  );
}

/* ====== SHOOTING STARS ====== */
export function ShootingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      delay: 3 + i * 5,
      top: 5 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: 0,
            width: '100px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
            animation: `shooting-star ${8 + Math.random() * 5}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ====== CANVAS FIREWORKS ====== */
export function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);

    const particles = [];
    const rockets = [];
    const colors = ['#f59e0b', '#fbbf24', '#14b8a6', '#ec4899', '#8b5cf6', '#ef4444', '#22d3ee', '#10b981', '#f472b6'];

    class Rocket {
      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = 100 + Math.random() * (height * 0.4);
        this.speed = 6 + Math.random() * 3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
        this.exploded = false;
      }
      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift();
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.exploded = true;
          this.explode();
        }
      }
      explode() {
        const particleCount = 80 + Math.floor(Math.random() * 50);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }
      draw() {
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          ctx.globalAlpha = i / this.trail.length;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const angle = Math.PI * 2 * Math.random();
        const speed = 1 + Math.random() * 6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.life = 1;
        this.decay = 0.008 + Math.random() * 0.012;
        this.gravity = 0.04;
        this.size = 2 + Math.random() * 2;
      }
      update() {
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      draw() {
        ctx.globalAlpha = Math.max(this.life, 0);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let lastRocket = 0;
    let animId;

    const loop = (ts) => {
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      if (ts - lastRocket > 1500 + Math.random() * 2000) {
        rockets.push(new Rocket());
        if (Math.random() > 0.6) rockets.push(new Rocket());
        lastRocket = ts;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();
        if (rockets[i].exploded) rockets.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3]"
      style={{ background: 'transparent' }}
    />
  );
}

/* ====== FLOATING BALLOONS (Interactive) ====== */
export function FloatingBalloons({ count = 12 }) {
  const [balloons, setBalloons] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      popped: false,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316'][i % 8],
      size: 50 + Math.random() * 20,
      sway: 20 + Math.random() * 30,
    }))
  );

  const [popBursts, setPopBursts] = useState([]);

  const popBalloon = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const burstId = Date.now();
    setPopBursts(prev => [...prev, { id: burstId, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }]);
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setTimeout(() => setPopBursts(prev => prev.filter(p => p.id !== burstId)), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        {balloons.map(b => !b.popped && (
          <motion.div
            key={b.id}
            className="absolute cursor-pointer pointer-events-auto"
            style={{
              left: `${b.left}%`,
              bottom: '-150px',
              animation: `balloon-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
            }}
            onClick={(e) => popBalloon(b.id, e)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width={b.size} height={b.size * 1.4} viewBox="0 0 50 70">
              <ellipse cx="25" cy="22" rx="22" ry="24" fill={b.color} opacity="0.9" />
              <ellipse cx="18" cy="15" rx="5" ry="8" fill="white" opacity="0.3" />
              <polygon points="23,46 27,46 25,50" fill={b.color} />
              <path d={`M25,50 Q${25 - b.sway / 4},60 ${25 + b.sway / 4},70`} stroke="#9ca3af" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
        ))}
      </div>
      {popBursts.map(burst => (
        <ClickConfetti key={burst.id} x={burst.x} y={burst.y} onDone={() => {}} />
      ))}
    </>
  );
}

/* ====== SPARKLE CURSOR TRAIL ====== */
export function SparkleCursor() {
  const [sparkles, setSparkles] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (dx * dx + dy * dy < 100) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const id = Date.now() + Math.random();
      setSparkles(prev => [...prev, {
        id,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        color: ['#fbbf24', '#f59e0b', '#14b8a6', '#ec4899'][Math.floor(Math.random() * 4)],
        size: 4 + Math.random() * 8,
      }]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[150]">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0, rotate: 0 }}
          animate={{ opacity: 0, scale: 1.5, rotate: 180 }}
          transition={{ duration: 0.8 }}
          className="absolute"
          style={{ left: s.x, top: s.y }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill={s.color}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== FLOATING HEARTS BACKGROUND ====== */
export function FloatingHearts({ count = 20 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 12,
      color: ['#ec4899', '#f472b6', '#fb7185', '#fda4af', '#f9a8d4'][Math.floor(Math.random() * 5)],
      sway: 30 + Math.random() * 40,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute bottom-0"
          style={{
            left: `${h.left}%`,
            animation: `heart-float ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color} style={{ filter: `drop-shadow(0 0 4px ${h.color}88)` }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== RIBBON RAIN ====== */
export function RibbonRain({ count = 25 }) {
  const ribbons = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: 4 + Math.random() * 6,
      height: 40 + Math.random() * 60,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      color: ['#f59e0b', '#ec4899', '#14b8a6', '#8b5cf6', '#fbbf24', '#10b981', '#3b82f6'][Math.floor(Math.random() * 7)],
      rotation: Math.random() * 360,
      sway: 40 + Math.random() * 60,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
      {ribbons.map(r => (
        <div
          key={r.id}
          className="absolute top-0"
          style={{
            left: `${r.left}%`,
            width: r.width,
            height: r.height,
            backgroundColor: r.color,
            borderRadius: '2px',
            transform: `rotate(${r.rotation}deg)`,
            opacity: 0.7,
            animation: `ribbon-fall ${r.duration}s ease-in-out ${r.delay}s infinite`,
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
          }}
        />
      ))}
    </div>
  );
}

const DEFAULT_TARGET_DATE = new Date('2026-08-11T00:00:00');

/* ====== COUNTDOWN TIMER ====== */
export function CountdownTimer({ targetDate = DEFAULT_TARGET_DATE }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetTime = useMemo(() => {
    return targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();
  }, [targetDate]);

  useEffect(() => {
    const calc = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const blocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5 justify-center flex-wrap">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ scale: 0, rotateX: -90 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ delay: 2 + i * 0.1, type: 'spring', bounce: 0.4 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl px-4 md:px-6 py-3 md:py-4 text-center min-w-[70px] md:min-w-[90px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-warm-gold/10 to-transparent" />
            <motion.div
              key={b.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-4xl font-heading font-black text-warm-gold glow-gold"
            >
              {String(b.value).padStart(2, '0')}
            </motion.div>
            <div className="text-xs md:text-sm font-body text-cream/60 uppercase tracking-wider mt-1">{b.label}</div>
          </div>
          {i < blocks.length - 1 && (
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-warm-gold text-2xl font-bold">:</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ====== ANIMATED CAKE (for Home Page) ====== */
export function BirthdayCake() {
  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
    >
      <div className="absolute -inset-8 bg-warm-gold/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <motion.div 
          className="text-center mb-2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl font-heading font-black text-warm-gold glow-gold">15</span>
        </motion.div>

        <div className="flex justify-center gap-3 mb-0.5 relative z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-2.5 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full"
                style={{ animation: 'flame 0.6s ease-in-out infinite, flame-glow 1s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}
              />
              <div className="w-1 h-6 rounded-sm" style={{ background: ['#ec4899', '#8b5cf6', '#14b8a6', '#f59e0b', '#ec4899'][i] }} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-28 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-warm-gold via-yellow-200 to-warm-gold rounded-t-lg" />
          </div>
          <div className="w-36 h-10 bg-gradient-to-b from-amber-200 to-amber-300 relative">
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-warm-gold via-yellow-200 to-warm-gold" />
          </div>
          <div className="w-44 h-10 bg-gradient-to-b from-orange-300 to-orange-400 rounded-b-lg relative">
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-warm-gold via-yellow-200 to-warm-gold" />
          </div>
        </div>
        <div className="w-52 h-2.5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mx-auto mt-0.5 shadow-lg" />
      </div>
    </motion.div>
  );
}

/* ====== TWINKLING STARS BACKGROUND ====== */
export function TwinklingStars({ count = 40 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-warm-gold-light"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ====== BIRTHDAY BUNTING BANNER ====== */
export function BirthdayBunting() {
  const flags = ['🎉', 'H', 'A', 'P', 'P', 'Y', '🎂', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y', '🎈'];
  return (
    <div className="fixed top-16 left-0 right-0 z-[20] pointer-events-none overflow-hidden">
      <div className="flex justify-center gap-1 md:gap-2 perspective-8">
        {flags.map((f, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, rotate: -180, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ delay: 2.2 + i * 0.06, type: 'spring', bounce: 0.6 }}
            className="relative"
            style={{ transformOrigin: 'top center' }}
          >
            <motion.div
              animate={{ rotate: [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 3 : -3, i % 2 === 0 ? -3 : 3] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-10 md:w-10 md:h-12 flex items-center justify-center font-heading font-black text-sm md:text-base"
              style={{
                background: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#14b8a6' : '#ec4899',
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
                color: '#111827',
                borderRadius: '2px 2px 0 0',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              }}
            >
              {f}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ====== GIFT BOXES FLOATING ====== */
export function FloatingGifts({ count = 6 }) {
  const gifts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: 20 + Math.random() * 60,
      size: 40 + Math.random() * 30,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 6,
      boxColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'][i % 5],
      ribbonColor: ['#fbbf24', '#ffffff', '#fbbf24', '#ec4899', '#fbbf24'][i % 5],
      rotate: Math.random() * 20 - 10,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {gifts.map(g => (
        <motion.div
          key={g.id}
          className="absolute"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            animation: `gift-bounce ${g.duration}s ease-in-out ${g.delay}s infinite`,
            transform: `rotate(${g.rotate}deg)`,
          }}
        >
          <svg width={g.size} height={g.size} viewBox="0 0 64 64">
            <rect x="4" y="24" width="56" height="36" rx="4" fill={g.boxColor} />
            <rect x="4" y="20" width="56" height="10" rx="2" fill={g.boxColor} style={{ filter: 'brightness(0.9)' }} />
            <rect x="28" y="24" width="8" height="36" fill={g.ribbonColor} />
            <rect x="4" y="38" width="56" height="6" fill={g.ribbonColor} opacity="0.8" />
            <path d="M24 20 Q32 8 40 20 Q48 8 40 20 Q32 8 24 20 Q16 12 24 20" fill={g.ribbonColor} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== MAGICAL DUST PARTICLES ====== */
export function MagicalDust({ count = 50 }) {
  const dustRef = useRef(null);

  useEffect(() => {
    const canvas = dustRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 1 + Math.random() * 2,
      color: ['#fbbf24', '#f59e0b', '#14b8a6', '#f472b6'][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
    }));

    let animId;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.03;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = 0.3 + Math.sin(p.phase) * 0.5;
        ctx.globalAlpha = Math.max(alpha, 0.1);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={dustRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ background: 'transparent' }}
    />
  );
}
