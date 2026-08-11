import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=building cake, 1=lighting candles, 2=done

  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => onCompleteRef.current(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const candles = [0, 1, 2, 3, 4];

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-charcoal-dark overflow-hidden"
    >
      {/* Background sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-warm-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Cake */}
      <div className="relative mb-12">
        {/* Candles */}
        <div className="flex justify-center gap-4 mb-1 relative z-10">
          {candles.map((i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {/* Flame */}
              <motion.div
                className="w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full mb-0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase >= 1 ? { 
                  scale: [0, 1.2, 1], 
                  opacity: 1 
                } : {}}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{ animation: phase >= 1 ? 'flame 0.8s ease-in-out infinite, flame-glow 1.2s ease-in-out infinite' : 'none' }}
              />
              {/* Candle stick */}
              <div className="w-1.5 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-sm" />
            </motion.div>
          ))}
        </div>

        {/* Cake layers */}
        <motion.div
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Top layer */}
          <div className="w-32 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-warm-gold via-yellow-300 to-warm-gold rounded-t-xl" />
            {/* Sprinkles */}
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="absolute w-1 h-2 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${30 + (i % 3) * 15}%`,
                  backgroundColor: ['#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6'][i % 4],
                  transform: `rotate(${i * 30}deg)`
                }}
              />
            ))}
          </div>
          
          {/* Middle layer */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-40 h-12 bg-gradient-to-b from-amber-200 to-amber-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-warm-gold via-yellow-300 to-warm-gold" />
            <div className="absolute bottom-2 left-0 right-0 flex justify-around">
              {['🍓', '🫐', '🍓', '🫐', '🍓'].map((e, i) => (
                <span key={i} className="text-xs">{e}</span>
              ))}
            </div>
          </motion.div>
          
          {/* Bottom layer */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-48 h-14 bg-gradient-to-b from-orange-300 to-orange-400 rounded-b-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-warm-gold via-yellow-300 to-warm-gold" />
            {/* Dripping frosting */}
            {[15, 30, 50, 70, 85].map((left, i) => (
              <motion.div
                key={i}
                className="absolute bg-warm-gold rounded-b-full"
                style={{ left: `${left}%`, top: 0, width: '8px' }}
                initial={{ height: 0 }}
                animate={{ height: `${12 + (i % 3) * 6}px` }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Plate */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className="w-56 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mx-auto mt-0.5 shadow-lg"
        />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-heading font-black text-warm-gold glow-gold tracking-wider">
          BHAVY
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-lg font-body text-cream/70 mt-2 tracking-widest"
        >
          is turning 15...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
