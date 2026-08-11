import React from 'react';
import { motion } from 'framer-motion';
import {
  Blob,
  Star,
  BirthdayCake,
  ConfettiBurst,
  FloatingBalloons,
  FloatingHearts,
  RibbonRain,
  FloatingGifts,
  MagicalDust,
  BirthdayBunting,
  CountdownTimer,
} from '../components/DecorativeElements';
import { Link } from 'react-router-dom';

export default function Home() {
  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -90, rotateZ: -10 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateZ: 0,
      transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.7,
      type: "spring",
      bounce: 0.45,
    },
  }),
};

  const name = "BHAVY".split("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-20 pb-16"
    >
      {/* ============ ADVANCED BACKGROUND LAYERS ============ */}
      <MagicalDust count={60} />
      <FloatingHearts count={15} />
      <RibbonRain count={20} />
      <FloatingGifts count={5} />
      <FloatingBalloons count={14} />
      <BirthdayBunting />

      {/* Initial confetti burst */}
      <ConfettiBurst duration={8000} />

      {/* Ambient blobs */}
      <Blob className="bg-warm-gold top-20 left-10 w-72 h-72" />
      <Blob className="bg-deep-teal-light bottom-20 right-10 w-96 h-96" />
      <Blob className="bg-warm-gold-dark bottom-40 left-1/4 w-56 h-56" />
      <Blob className="bg-deep-teal top-1/3 right-1/4 w-64 h-64" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Birthday tag */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="px-6 py-2 bg-warm-gold/20 border border-warm-gold/40 rounded-full text-warm-gold font-body text-sm tracking-[0.3em] uppercase radiant-glow">
            🎂 BIRTHDAY CELEBRATION! 🎉 AUG 11, 2026 🎂
          </span>
        </motion.div>

        {/* HAPPIEST BIRTHDAY */}
        <motion.h2
          initial={{ opacity: 0, y: 20, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-3xl font-heading text-deep-teal-light glow-teal tracking-[0.4em] mb-4"
        >
          HAPPIEST BIRTHDAY
        </motion.h2>

        {/* BHAVY — staggered 3D letter animation with hover */}
        <div className="flex justify-center gap-1 md:gap-3 mb-8 overflow-hidden perspective-8">
          {name.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="name-letter text-6xl md:text-[9rem] font-heading font-black text-warm-gold glow-gold leading-none inline-block cursor-default select-none"
              style={{ display: "inline-block" }}
              whileHover={{
                scale: 1.2,
                rotateY: 20,
                rotateX: -10,
                y: -15,
                color: '#fbbf24',
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Animated cake */}
        <div className="flex justify-center mb-10">
          <BirthdayCake />
        </div>

        {/* ============ COUNTDOWN TIMER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mb-12"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-sm md:text-base font-body text-cream/50 uppercase tracking-[0.3em] mb-4"
          >
            🎊 Celebration countdown 🎊
          </motion.p>
          <CountdownTimer />
        </motion.div>

        {/* Hero photo with animated border and 3D tilt */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="relative inline-block mb-10"
        >
          {/* Outer rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 rounded-full border-2 border-dashed border-warm-gold/20 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 rounded-full border border-deep-teal-light/15 pointer-events-none"
          />

          {/* Rotating gradient border */}
          <div className="animated-border inline-block rainbow-border-pulse photo-tilt">
            <img
              src="/photos/bhavya4.jpeg"
              alt="Bhavy posing in Manali"
              className="rounded-[1.3rem] w-[280px] h-[370px] md:w-[340px] md:h-[450px] object-cover block photo-tilt"
              draggable={false}
            />
          </div>

          {/* Sparkle decorations */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
            className="absolute -inset-4 pointer-events-none"
          >
            <Star className="text-warm-gold w-14 h-14 absolute -top-10 -right-10 z-20" />
            <Star className="text-deep-teal-light w-10 h-10 absolute -bottom-8 -left-8 z-20" />
            <Star className="text-warm-gold-light w-6 h-6 absolute top-1/3 -right-12 z-20" />
            <Star className="text-warm-gold w-8 h-8 absolute top-2/3 -left-10 z-20" />
          </motion.div>

          {/* Emoji stickers floating around the photo */}
          <motion.span
            className="absolute -top-6 left-4 text-3xl"
            animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >🎉</motion.span>
          <motion.span
            className="absolute -bottom-4 right-6 text-3xl"
            animate={{ y: [0, -12, 0], rotate: [0, -18, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >🔥</motion.span>
          <motion.span
            className="absolute top-1/2 -right-14 text-2xl"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >⭐</motion.span>
          <motion.span
            className="absolute top-1/4 -left-12 text-2xl"
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >💫</motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-lg md:text-2xl font-body text-cream/80 mb-4 max-w-2xl mx-auto leading-relaxed">
            15 years of being absolutely <span className="text-warm-gold font-bold">legendary</span>.
            From snow-capped mountains to golden sunsets,
            every moment has been a whole <span className="text-deep-teal-light font-bold">vibe</span>.
          </p>
          <motion.p
            className="text-2xl md:text-4xl font-heading font-bold shimmer-text mb-12"
            animate={{ scale: [1, 1.04, 1], y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Here's to the legend turning 15! 🎉
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/gallery"
            className="btn-celebrate group relative px-10 py-5 overflow-hidden rounded-full font-heading text-xl font-bold shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-warm-gold via-warm-gold-light to-warm-gold bg-[length:200%_100%] group-hover:animate-[shimmer_2s_linear_infinite] transition-all" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-box-gold" />
            <span className="relative z-10 text-charcoal-dark flex items-center gap-2">
              Explore the Memories
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </Link>
          <Link
            to="/wishes#make-a-wish"
            className="group px-10 py-5 rounded-full border-2 border-warm-gold text-cream font-heading text-xl font-bold transition-all hover:-translate-y-1 hover:bg-warm-gold hover:text-charcoal-dark hover:shadow-xl hover:shadow-warm-gold/20"
          >
            <span className="flex items-center gap-2">
              Make a Wish <span aria-hidden="true">💌</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
