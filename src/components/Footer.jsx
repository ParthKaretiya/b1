import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-warm-gold/10 bg-charcoal-dark text-center relative overflow-hidden">
      {/* Subtle gradient line on top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-warm-gold/50 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3"
      >
        <motion.span
          className="text-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💛
        </motion.span>
        <p className="font-body text-sm text-cream/50">
          Made with love for <span className="text-warm-gold font-semibold">Bhavy's</span> 15th Birthday
        </p>
        <div className="flex gap-1 text-xs text-cream/30">
          <span>🎂</span>
          <span>🎉</span>
          <span>🎊</span>
          <span>✨</span>
          <span>🎁</span>
        </div>
      </motion.div>
    </footer>
  );
}
