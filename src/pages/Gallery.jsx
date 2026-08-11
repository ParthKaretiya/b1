import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { photos } from '../data/photos';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Blob, Star, FloatingHearts, MagicalDust } from '../components/DecorativeElements';

// Custom card with 3D Tilt Effect and Sharp rendering fixes
function GalleryCard({ photo, originalIndex, heights, openLightbox }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse movement to rotations
  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 85, damping: 15 }
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.3 } }
  };

  const heightClass = heights[originalIndex % heights.length];

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => openLightbox(originalIndex)}
      className={`relative cursor-pointer overflow-hidden rounded-3xl border border-cream/15 bg-charcoal/40 shadow-lg group transform-gpu ${heightClass}`}
    >
      {/* Dynamic light reflection glow overlay */}
      <motion.div
        className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform-gpu"
        style={{
          transform: "translateZ(20px)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
        }}
      />

      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 transform-gpu"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
          imageRendering: "-webkit-optimize-contrast",
        }}
        draggable={false}
      />
      
      {/* Overlay - visible directly on mobile, hover on desktop */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/95 via-charcoal-dark/20 to-transparent md:from-charcoal-dark/85 md:via-charcoal-dark/10 md:to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 transform-gpu"
        style={{ 
          transform: "translateZ(30px)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <div className="flex justify-between items-start">
          <span className="bg-warm-gold/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-charcoal-dark font-heading text-xs font-black flex items-center gap-1.5 shadow-md">
            <Heart size={12} fill="#111827" /> 
            #{originalIndex + 1}
          </span>
          <Star className="text-warm-gold/80 w-5 h-5" />
        </div>
        
        <div>
          <h3 className="text-cream font-heading font-black text-xl leading-snug drop-shadow-md">
            {photo.caption}
          </h3>
          <p className="text-warm-gold/80 text-xs font-body mt-2 flex items-center gap-1">
            <span>Tap to enlarge</span> ✨
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Memoize filtered photos to avoid infinite loops and unnecessary recalculations
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Adventures') return photo.category === 'adventure';
      if (activeCategory === 'Family') return photo.category === 'family';
      if (activeCategory === 'Memories') return photo.category === 'memories';
      return true;
    });
  }, [activeCategory]);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const navigatePhotos = (direction) => {
    if (selectedImageIndex === null || filteredPhotos.length === 0) return;
    const currentFilteredIndex = filteredPhotos.findIndex(p => p.id === photos[selectedImageIndex].id);
    if (currentFilteredIndex === -1) return;
    
    let nextFilteredIndex;
    if (direction === 'next') {
      nextFilteredIndex = currentFilteredIndex === filteredPhotos.length - 1 ? 0 : currentFilteredIndex + 1;
    } else {
      nextFilteredIndex = currentFilteredIndex === 0 ? filteredPhotos.length - 1 : currentFilteredIndex - 1;
    }
    
    const originalIndex = photos.findIndex(p => p.id === filteredPhotos[nextFilteredIndex].id);
    setSelectedImageIndex(originalIndex);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    navigatePhotos('prev');
  };
  
  const showNext = (e) => {
    e?.stopPropagation();
    navigatePhotos('next');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigatePhotos('prev');
      if (e.key === 'ArrowRight') navigatePhotos('next');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImageIndex, filteredPhotos]);

  // Height configurations for beautiful grid layout
  const heights = ['h-[330px]', 'h-[410px]', 'h-[360px]', 'h-[430px]', 'h-[310px]', 'h-[390px]', 'h-[370px]'];

  // Staggered grid container variants
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 md:px-12 relative overflow-hidden"
    >
      <MagicalDust count={40} />
      <FloatingHearts count={10} />

      <Blob className="bg-deep-teal top-10 right-10 w-72 h-72" />
      <Blob className="bg-warm-gold bottom-20 left-20 w-64 h-64" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.span 
            className="text-6xl inline-block mb-4"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            📸
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-center mb-4">
            <span className="text-cream">The </span>
            <span className="text-gradient-gold">Vault</span>
          </h1>
          <p className="font-body text-cream/60 max-w-xl mx-auto text-lg leading-relaxed">
            A curated space of epic moments, mountain vibes, and good times. 
            Tap on any memory to expand.
          </p>
        </motion.div>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-cream/10 pb-4 max-w-md mx-auto">
          {['All', 'Adventures', 'Family', 'Memories'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className="relative px-4 py-2 font-heading font-black text-sm transition-all duration-300 cursor-pointer text-cream/70 hover:text-warm-gold"
              >
                <span className={isActive ? "text-warm-gold" : ""}>{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-warm-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => {
              const originalIndex = photos.findIndex(p => p.id === photo.id);
              return (
                <GalleryCard
                  key={photo.id}
                  photo={photo}
                  originalIndex={originalIndex}
                  heights={heights}
                  openLightbox={openLightbox}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-cream/30 font-body text-sm tracking-widest">
            A PICTURE IS WORTH A THOUSAND STORIES ✨
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-charcoal-dark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            {/* Ambient background rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 0.2 }}
              className="absolute w-[85vmin] h-[85vmin] rounded-full pointer-events-none bg-gradient-radial from-warm-gold to-transparent"
              style={{ mixBlendMode: 'screen' }}
            />

            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-cream/70 hover:text-warm-gold transition-colors p-2 hover:bg-cream/10 rounded-full z-10"
            >
              <X size={32} />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-cream/5 hover:bg-warm-gold hover:text-charcoal-dark rounded-full text-cream transition-all backdrop-blur-md z-10"
            >
              <ChevronLeft size={28} />
            </motion.button>

            {/* Image container with swipe gestures */}
            <motion.div
              key={`container-${selectedImageIndex}`}
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative touch-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, info) => {
                const swipeThreshold = 55;
                if (info.offset.x < -swipeThreshold) {
                  navigatePhotos('next');
                } else if (info.offset.x > swipeThreshold) {
                  navigatePhotos('prev');
                }
              }}
            >
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={photos[selectedImageIndex].src}
                alt={photos[selectedImageIndex].alt}
                className="relative max-h-[72vh] max-w-[86vw] md:max-w-[65vw] object-contain rounded-3xl shadow-2xl border border-cream/10"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-cream/5 hover:bg-warm-gold hover:text-charcoal-dark rounded-full text-cream transition-all backdrop-blur-md z-10"
            >
              <ChevronRight size={28} />
            </motion.button>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <div className="inline-block bg-charcoal-dark/80 border border-cream/10 px-8 py-4 rounded-3xl backdrop-blur-lg">
                <p className="text-cream font-heading text-lg md:text-xl font-black mb-1">{photos[selectedImageIndex].caption}</p>
                <p className="text-warm-gold font-body text-xs tracking-widest font-black uppercase">
                  {filteredPhotos.findIndex(p => p.id === photos[selectedImageIndex].id) + 1} / {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
