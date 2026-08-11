import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/', emoji: '🏠' },
  { name: 'Gallery', path: '/gallery', emoji: '📸' },
  { name: 'Wishes', path: '/wishes', emoji: '💌' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full z-40 transition-all duration-500',
        scrolled 
          ? 'bg-charcoal-dark/90 backdrop-blur-xl shadow-lg shadow-warm-gold/5 py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <NavLink to="/" className="group flex items-center gap-2">
          <motion.span 
            className="text-2xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎂
          </motion.span>
          <span className="text-2xl font-heading font-extrabold text-cream group-hover:text-warm-gold transition-colors">
            Bhavy
          </span>
          <span className="text-2xl font-heading font-black text-warm-gold glow-gold">15</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center font-body font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'relative text-cream/70 hover:text-warm-gold transition-colors pb-1 flex items-center gap-1.5',
                  isActive && 'text-warm-gold'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.emoji}</span>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-warm-gold to-deep-teal-light rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-cream p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-dark/95 backdrop-blur-xl border-t border-warm-gold/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6 font-heading text-xl">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'text-cream/70 hover:text-warm-gold transition-colors flex items-center gap-2',
                        isActive && 'text-warm-gold font-bold'
                      )
                    }
                  >
                    <span>{link.emoji}</span>
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
