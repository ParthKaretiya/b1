import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircleHeart, Users } from 'lucide-react';
import {
  Blob,
  FloatingHearts,
  MagicalDust,
  Star,
} from '../components/DecorativeElements';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [justPosted, setJustPosted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Real-time listener for wishes from Firestore
  useEffect(() => {
    const q = query(collection(db, 'bhavy'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.()?.toLocaleDateString?.() ?? 'Just now',
      }));
      setWishes(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'bhavy'), {
        wishesh: message.trim(),
        name: name.trim(),
        createdAt: serverTimestamp(),
      });
      setJustPosted(docRef.id);
      setTimeout(() => setJustPosted(null), 2500);
      setName('');
      setMessage('');
    } catch (err) {
      console.error('Error posting wish:', err);
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 md:px-12 relative overflow-hidden"
    >
      {/* Background layers */}
      <MagicalDust count={45} />
      <FloatingHearts count={12} />
      <Blob className="bg-warm-gold top-40 -left-20 w-80 h-80" />
      <Blob className="bg-deep-teal bottom-20 -right-20 w-80 h-80" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            className="text-6xl inline-block mb-4"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            💌
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-heading font-black text-center mb-4">
            <span className="text-cream">Hype </span>
            <span className="text-gradient-gold shimmer-text">Him Up!</span>
          </h1>
          <p className="font-body text-cream/60 max-w-xl mx-auto text-lg leading-relaxed">
            Leave a birthday wish, a funny memory, or just some good vibes for Bhavy's 15th!
          </p>

          {/* Live wish count badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 mt-4 bg-warm-gold/15 border border-warm-gold/30 px-5 py-2 rounded-full backdrop-blur-sm"
          >
            <Users size={16} className="text-warm-gold" />
            <span className="font-heading font-black text-warm-gold text-lg">
              {loading ? '...' : wishes.length}
            </span>
            <span className="font-body text-cream/70 text-sm">
              {wishes.length === 1 ? 'wish sent' : 'wishes sent'} 🎉
            </span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10">
          {/* FORM */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden border border-warm-gold/20">
              {/* floating sparkles */}
              <div className="absolute -top-3 -right-3 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
                🎉
              </div>
              <div className="absolute top-6 -left-2">
                <Star className="text-warm-gold w-5 h-5" />
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-cream mb-6 flex items-center gap-3">
                <span className="p-2 bg-warm-gold/20 rounded-xl">
                  <MessageCircleHeart size={22} className="text-warm-gold" />
                </span>
                Drop a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-body text-sm font-semibold text-cream/80 mb-2 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-charcoal/60 border-2 border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:border-warm-gold transition-all font-body text-cream placeholder:text-cream/30 backdrop-blur-sm"
                    placeholder="e.g. Uncle John"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-cream/80 mb-2 uppercase tracking-wider">
                    Your Wish
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-charcoal/60 border-2 border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:border-warm-gold transition-all font-body text-cream placeholder:text-cream/30 h-36 resize-none backdrop-blur-sm"
                    placeholder="Happy Birthday Bhavy! Hope you..."
                    required
                    disabled={submitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-celebrate group w-full relative overflow-hidden bg-gradient-to-r from-warm-gold via-warm-gold-light to-warm-gold bg-[length:200%_100%] text-charcoal-dark font-heading font-bold text-lg py-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl hover:shadow-warm-gold/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? 'Sending...' : 'Post Wish'}
                    <motion.span
                      className="inline-block"
                      animate={submitting ? { rotate: 360 } : { x: [0, 4, 0] }}
                      transition={{ duration: submitting ? 0.8 : 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Send size={18} />
                    </motion.span>
                  </span>
                </button>
              </form>

              {/* Fun stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-cream/10 flex items-center justify-between text-sm font-body text-cream/50"
              >
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-400" fill="#f472b6" />
                  <span>{loading ? '...' : wishes.length} wishes sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-warm-gold" />
                  <span>More the merrier ✨</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* WISHES LIST */}
          <div className="md:col-span-7">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10">
                <motion.span
                  className="text-6xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  ⭐
                </motion.span>
                <p className="text-cream/60 font-body text-lg">Loading wishes...</p>
              </div>
            ) : wishes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-warm-gold/30 rounded-3xl bg-charcoal/30 backdrop-blur-sm"
              >
                <motion.span
                  className="text-7xl mb-4"
                  animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ✨
                </motion.span>
                <h3 className="text-2xl font-heading font-bold text-cream mb-2">
                  No wishes yet!
                </h3>
                <p className="text-cream/60 font-body text-lg">
                  Be the first to hype Bhavy up — he'll love it! 💝
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={wish.id}
                      layout
                      initial={{ opacity: 0, x: 40, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.95 }}
                      transition={{
                        delay: justPosted === wish.id ? 0 : Math.min(index * 0.04, 0.4),
                        type: 'spring',
                        stiffness: 200,
                        damping: 22,
                      }}
                      whileHover={{ x: -6, transition: { duration: 0.2 } }}
                      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-md transition-all ${
                        justPosted === wish.id
                          ? 'border-2 border-warm-gold bg-warm-gold/10 shadow-2xl shadow-warm-gold/30 scale-[1.01]'
                          : 'border border-warm-gold/20 bg-charcoal/50 hover:border-warm-gold/40'
                      }`}
                    >
                      {/* Left accent bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${
                          justPosted === wish.id
                            ? 'bg-gradient-to-b from-warm-gold via-pink-400 to-warm-gold'
                            : 'bg-warm-gold'
                        }`}
                      />

                      {/* Floating sparkle for new posts */}
                      {justPosted === wish.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 1.2 }}
                          className="absolute -top-2 -right-2"
                        >
                          <span className="text-2xl">💖</span>
                        </motion.div>
                      )}

                      <div className="pl-4">
                        <motion.p
                          className="font-body text-cream/90 text-base md:text-lg mb-4 leading-relaxed italic"
                          initial={justPosted === wish.id ? { y: -10, opacity: 0 } : {}}
                          animate={justPosted === wish.id ? { y: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.1 }}
                        >
                          "{wish.wishesh || wish.message}"
                        </motion.p>
                        <div className="flex justify-between items-center text-sm font-body">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-gold to-deep-teal-light flex items-center justify-center text-charcoal-dark font-heading font-bold text-sm">
                              {(wish.name || '?').charAt(0).toUpperCase()}
                            </span>
                            <span className="font-bold text-deep-teal-light text-base">
                              {wish.name || 'Anonymous'}
                            </span>
                          </div>
                          <span className="text-cream/40 flex items-center gap-1">
                            <Heart size={12} className="text-pink-400" fill="#f472b6" />
                            {wish.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Footer tag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 font-body text-cream/40 text-sm"
        >
          Every word counts — make it legendary 💫
        </motion.p>
      </div>
    </motion.div>
  );
}
