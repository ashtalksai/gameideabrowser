'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gamepad2, Target, Users, TrendingUp, DollarSign, Rocket, CheckCircle2 } from 'lucide-react';

// Slide content structure - marketer will fill these in
const slides = [
  {
    id: 1,
    type: 'title',
    title: 'GameIdeaBrowser',
    subtitle: 'Research-Backed Game Concepts for Indie Developers',
    tagline: 'Stop guessing. Build games that have a market.',
    icon: Gamepad2,
  },
  {
    id: 2,
    type: 'problem',
    title: 'The Problem',
    icon: Target,
    points: [
      'Indie developers waste weeks on ideas with no market',
      'Most games fail not from bad execution, but bad concept selection',
      'Market research is time-consuming and expensive',
      'No trusted source for validated game concepts',
    ],
  },
  {
    id: 3,
    type: 'solution',
    title: 'The Solution',
    icon: CheckCircle2,
    points: [
      'Daily research-backed game concepts',
      'Market data, competition analysis, build estimates',
      'Scoring system: market opportunity, difficulty, monetization',
      'Save months of wasted development time',
    ],
  },
  {
    id: 4,
    type: 'market',
    title: 'Market Opportunity',
    icon: TrendingUp,
    stats: [
      { label: 'Indie Game Market (2025)', value: '$11.14B' },
      { label: 'Market Growth (CAGR)', value: '12.5%' },
      { label: 'Mobile Revenue Share', value: '51%' },
      { label: 'Indie Devs Worldwide', value: '500K+' },
    ],
  },
  {
    id: 5,
    type: 'audience',
    title: 'Target Audience',
    icon: Users,
    segments: [
      { name: 'Solo Indie Devs', desc: 'Choosing their next project', size: 'Primary' },
      { name: 'Game Entrepreneurs', desc: 'Non-devs commissioning games', size: 'Secondary' },
      { name: 'Small Studios', desc: 'Need validated concepts for pitches', size: 'Tertiary' },
      { name: 'Game Jam Participants', desc: 'Want an edge on concept selection', size: 'Tertiary' },
    ],
  },
  {
    id: 6,
    type: 'pricing',
    title: 'Business Model',
    icon: DollarSign,
    tiers: [
      { name: 'Free', price: '$0', features: ['Idea of the Day', 'Title + hook + score only'] },
      { name: 'Pro', price: '$19/mo', features: ['Full database', 'All details', 'Daily new ideas'] },
      { name: 'Lifetime', price: '$149', features: ['Same as Pro', 'One-time payment', '200 seats'] },
    ],
  },
  {
    id: 7,
    type: 'traction',
    title: 'Go-to-Market',
    icon: Rocket,
    channels: [
      'Product Hunt launch',
      'r/gamedev (1.5M members)',
      'Twitter/X indie dev community',
      'Discord game dev servers',
      'YouTube indie dev channels',
    ],
    metrics: [
      { label: 'Target MRR (Month 6)', value: '$5-6K' },
      { label: 'Pro Subscribers Goal', value: '300' },
      { label: 'Free-to-Pro Conversion', value: '>8%' },
    ],
  },
  {
    id: 8,
    type: 'cta',
    title: 'Get Started Today',
    subtitle: 'gameideabrowser.com',
    tagline: 'Build games that have a market.',
    icon: Gamepad2,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function PitchDeckPage() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = useCallback((newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slides.length) {
      setPage([newPage, newDirection]);
    }
  }, [page]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const currentSlide = slides[page];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-700 z-50">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((page + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed top-4 right-4 text-sm text-slate-400 z-50">
        {page + 1} / {slides.length}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => paginate(-1)}
        disabled={page === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        disabled={page === slides.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slides container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center px-8 md:px-16"
          >
            <SlideContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-all ${
              i === page ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function SlideContent({ slide }: { slide: typeof slides[number] }) {
  const Icon = slide.icon;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.2 },
    }),
  };

  if (slide.type === 'title' || slide.type === 'cta') {
    return (
      <div className="text-center max-w-4xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 mb-8"
        >
          <Icon className="w-12 h-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          {slide.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-300 mb-6"
        >
          {slide.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-primary font-medium"
        >
          {slide.tagline}
        </motion.p>
      </div>
    );
  }

  if (slide.type === 'problem' || slide.type === 'solution') {
    return (
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              slide.type === 'problem' ? 'bg-red-500/20' : 'bg-green-500/20'
            }`}
          >
            <Icon className={`w-8 h-8 ${slide.type === 'problem' ? 'text-red-400' : 'text-green-400'}`} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {slide.title}
          </motion.h2>
        </div>
        <ul className="space-y-4">
          {slide.points?.map((point, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-4 text-xl md:text-2xl"
            >
              <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                slide.type === 'problem' ? 'bg-red-400' : 'bg-green-400'
              }`} />
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    );
  }

  if (slide.type === 'market') {
    return (
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-4 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-blue-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {slide.title}
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {slide.stats?.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'audience') {
    return (
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-4 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {slide.title}
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {slide.segments?.map((segment, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{segment.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  segment.size === 'Primary' ? 'bg-primary/20 text-primary' : 'bg-slate-600/50 text-slate-400'
                }`}>
                  {segment.size}
                </span>
              </div>
              <p className="text-slate-400">{segment.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'pricing') {
    return (
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-4 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 rounded-xl bg-amber-500/20 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-amber-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {slide.title}
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {slide.tiers?.map((tier, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-xl p-6 ${
                i === 1 ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-primary mb-4">{tier.price}</div>
              <ul className="space-y-2">
                {tier.features.map((feature, j) => (
                  <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary/70" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'traction') {
    return (
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-4 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-16 h-16 rounded-xl bg-orange-500/20 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-orange-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {slide.title}
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-slate-400 mb-4">Distribution Channels</h3>
            <ul className="space-y-3">
              {slide.channels?.map((channel, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  {channel}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-slate-400 mb-4">Target Metrics</h3>
            <div className="space-y-4">
              {slide.metrics?.map((metric, i) => (
                <motion.div
                  key={i}
                  custom={i + 5}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
