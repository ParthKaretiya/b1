import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, MapPin, Clock, Users, CheckCircle, PartyPopper } from 'lucide-react';
import { Blob, FloatingGifts, MagicalDust, Star } from '../components/DecorativeElements';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    guests: 1,
    attending: 'yes',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rsvps = JSON.parse(localStorage.getItem('bhavya_rsvps') || '[]');
    rsvps.push({ ...form, ts: Date.now() });
    localStorage.setItem('bhavya_rsvps', JSON.stringify(rsvps));
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 md:px-12 relative overflow-hidden"
    >
      {/* Background layers */}
      <MagicalDust count={50} />
      <FloatingGifts count={4} />
      <Blob className="bg-deep-teal top-20 -right-32 w-96 h-96" />
      <Blob className="bg-warm-gold bottom-20 -left-32 w-96 h-96" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            className="text-7xl inline-block mb-4"
            animate={{ rotate: [0, 12, -12, 0], y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          >
            🎟️
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-heading font-black text-center mb-4">
            <span className="text-cream">You're </span>
            <span className="text-gradient-gold shimmer-text">Invited!</span>
          </h1>
          <p className="font-body text-cream/60 max-w-xl mx-auto text-lg leading-relaxed">
            Bhavya is turning 15 TOMORROW — be there to celebrate!
            <br />
            <span className="italic opacity-70">RSVP saved locally on your device</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* EVENT CARD */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden border border-warm-gold/20">
              {/* corner decorations */}
              <div className="absolute -top-4 -left-4">
                <Star className="text-warm-gold w-7 h-7" />
              </div>
              <div className="absolute -bottom-4 -right-4">
                <Star className="text-deep-teal-light w-7 h-7" />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-4xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                🎊
              </motion.div>

              <h2 className="text-3xl font-heading font-black text-cream mb-2">
                The Big 15!
              </h2>
              <p className="text-warm-gold font-heading font-bold text-xl mb-8 flex items-center gap-2">
                <PartyPopper size={22} />
                Bhavya's Birthday Bash
              </p>

              {/* Event info blocks */}
              <div className="space-y-4 mb-8">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal/50 border border-cream/5 hover:border-warm-gold/30 transition-colors"
                >
                  <span className="p-3 rounded-xl bg-warm-gold/15 text-warm-gold flex-shrink-0">
                    <Calendar size={22} />
                  </span>
                  <div>
                    <p className="font-body text-cream/50 text-xs uppercase tracking-wider">Date</p>
                    <p className="font-heading font-bold text-cream text-lg">
                      TOMORROW, August 11th, 2026
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal/50 border border-cream/5 hover:border-warm-gold/30 transition-colors"
                >
                  <span className="p-3 rounded-xl bg-deep-teal-light/15 text-deep-teal-light flex-shrink-0">
                    <Clock size={22} />
                  </span>
                  <div>
                    <p className="font-body text-cream/50 text-xs uppercase tracking-wider">Time</p>
                    <p className="font-heading font-bold text-cream text-lg">
                      6:00 PM onwards 🕕
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal/50 border border-cream/5 hover:border-warm-gold/30 transition-colors"
                >
                  <span className="p-3 rounded-xl bg-pink-400/15 text-pink-400 flex-shrink-0">
                    <MapPin size={22} />
                  </span>
                  <div>
                    <p className="font-body text-cream/50 text-xs uppercase tracking-wider">Venue</p>
                    <p className="font-heading font-bold text-cream text-lg leading-snug">
                      [Family Home / Restaurant]
                      <br />
                      <span className="font-body text-cream/50 text-sm font-normal">
                        Confirm exact location from family
                      </span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal/50 border border-cream/5 hover:border-warm-gold/30 transition-colors"
                >
                  <span className="p-3 rounded-xl bg-violet-400/15 text-violet-300 flex-shrink-0">
                    <Users size={22} />
                  </span>
                  <div>
                    <p className="font-body text-cream/50 text-xs uppercase tracking-wider">Attire</p>
                    <p className="font-heading font-bold text-cream text-lg">
                      Party Wear — Look Legendary ✨
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Perks */}
              <div className="border-t border-cream/10 pt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-3xl mb-1"
                  >
                    🎂
                  </motion.div>
                  <p className="font-body text-cream/60 text-xs">Cake</p>
                </div>
                <div className="p-3">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="text-3xl mb-1"
                  >
                    🎵
                  </motion.div>
                  <p className="font-body text-cream/60 text-xs">Music</p>
                </div>
                <div className="p-3">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="text-3xl mb-1"
                  >
                    🎁
                  </motion.div>
                  <p className="font-body text-cream/60 text-xs">Gifts</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RSVP FORM */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-6 md:p-10 border border-deep-teal-light/20 relative overflow-hidden">
              {/* background emoji */}
              <motion.div
                className="absolute -bottom-10 -right-10 text-[220px] opacity-5 pointer-events-none select-none"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                🎉
              </motion.div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -30 }}
                    onSubmit={handleSubmit}
                    className="relative z-10"
                  >
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-cream mb-2">
                      RSVP <span className="text-gradient-gold">Now</span>
                    </h2>
                    <p className="font-body text-cream/50 mb-8">
                      Drop your deets so we know you're coming! 🎊
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block font-body text-sm font-semibold text-cream/80 mb-2 uppercase tracking-wider">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-charcoal/60 border-2 border-cream/10 rounded-xl px-5 py-3.5 focus:outline-none focus:border-warm-gold transition-all font-body text-cream placeholder:text-cream/30 backdrop-blur-sm text-lg"
                          placeholder="e.g. Rahul Sharma"
                          required
                        />
                      </div>

                      {/* Attending toggle */}
                      <div>
                        <label className="block font-body text-sm font-semibold text-cream/80 mb-3 uppercase tracking-wider">
                          Will You Be There?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { v: 'yes', label: 'HELL YES! 🎉', icon: '🎉' },
                            { v: 'no', label: "Can't make it 😢", icon: '💔' },
                          ].map((opt) => (
                            <button
                              key={opt.v}
                              type="button"
                              onClick={() => setForm({ ...form, attending: opt.v })}
                              className={`relative p-4 rounded-xl font-heading font-bold text-base transition-all border-2 ${
                                form.attending === opt.v
                                  ? 'bg-warm-gold/20 border-warm-gold text-warm-gold scale-[1.02] shadow-xl shadow-warm-gold/20'
                                  : 'bg-charcoal/40 border-cream/10 text-cream/60 hover:border-cream/30 hover:text-cream'
                              }`}
                            >
                              <span className="text-2xl block mb-1">{opt.icon}</span>
                              {opt.label}
                              {form.attending === opt.v && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1.5 -right-1.5"
                                >
                                  <CheckCircle size={22} className="text-warm-gold" fill="#111827" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-body text-sm font-semibold text-cream/80 mb-2 uppercase tracking-wider">
                          Plus How Many? (including you)
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                            className="w-12 h-12 rounded-xl bg-charcoal/50 border border-cream/10 text-cream text-2xl font-bold hover:bg-warm-gold/20 hover:border-warm-gold hover:text-warm-gold transition-all active:scale-95"
                          >
                            −
                          </button>
                          <motion.div
                            key={form.guests}
                            initial={{ scale: 1.4, y: -6, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="text-5xl md:text-6xl font-heading font-black text-gradient-gold min-w-[100px] text-center glow-gold"
                          >
                            {form.guests}
                          </motion.div>
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, guests: Math.min(10, form.guests + 1) })}
                            className="w-12 h-12 rounded-xl bg-charcoal/50 border border-cream/10 text-cream text-2xl font-bold hover:bg-warm-gold/20 hover:border-warm-gold hover:text-warm-gold transition-all active:scale-95"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-body text-cream/40 text-sm mt-2 text-center">
                          Use + / − above (1 – 10)
                        </p>
                      </div>

                      <div>
                        <label className="block font-body text-sm font-semibold text-cream/80 mb-2 uppercase tracking-wider">
                          Message for Bhavya (optional)
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-charcoal/60 border-2 border-cream/10 rounded-xl px-5 py-3.5 focus:outline-none focus:border-warm-gold transition-all font-body text-cream placeholder:text-cream/30 h-28 resize-none backdrop-blur-sm"
                          placeholder="See you there! Bring the vibes..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-celebrate group w-full relative overflow-hidden bg-gradient-to-r from-warm-gold via-warm-gold-light to-warm-gold bg-[length:200%_100%] hover:animate-[shimmer_2s_linear_infinite] text-charcoal-dark font-heading font-black text-xl py-5 rounded-2xl hover:-translate-y-1 transition-all shadow-2xl hover:shadow-warm-gold/40 flex items-center justify-center gap-3"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <Check size={22} className="stroke-[3px]" />
                          Count Me In!
                          <motion.span
                            className="text-2xl"
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                          >
                            🎊
                          </motion.span>
                        </span>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.4 }}
                    className="relative z-10 text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                      className="inline-block p-6 rounded-full bg-gradient-to-br from-warm-gold to-deep-teal-light mb-6 shadow-2xl"
                      style={{ boxShadow: '0 0 80px rgba(245, 158, 11, 0.4)' }}
                    >
                      <Check size={64} className="text-charcoal-dark" strokeWidth={3} />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-heading font-black text-cream mb-3">
                      You're In!
                    </h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="font-body text-cream/60 text-xl mb-8"
                    >
                      Thanks <span className="text-warm-gold font-bold">{form.name}</span>!
                      Can't wait to see you there.
                      <br />
                      <span className="text-deep-teal-light font-bold">{form.guests}</span>{' '}
                      {form.guests === 1 ? 'guest' : 'guests'} {form.attending === 'yes' ? 'confirmed 🎉' : 'noted 💝'}
                    </motion.p>

                    {/* Animated check list */}
                    <div className="inline-flex flex-col gap-3 text-left">
                      {[
                        { icon: '🎂', label: 'Cake has been ordered for you' },
                        { icon: '🎵', label: 'Playlist set to LEGENDARY mode' },
                        { icon: '💫', label: 'Good vibes are guaranteed' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.2 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-charcoal/40 border border-warm-gold/20"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-body text-cream/80">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', guests: 1, attending: 'yes', message: '' });
                      }}
                      className="mt-10 px-8 py-3 rounded-xl font-heading font-bold text-cream/60 border border-cream/10 hover:bg-cream/5 hover:text-cream hover:border-cream/30 transition-all"
                    >
                      ← Add another RSVP
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 font-body text-cream/40"
        >
          🎂 See you TOMORROW — it's gonna be iconic 🎊
        </motion.p>
      </div>
    </motion.div>
  );
}
