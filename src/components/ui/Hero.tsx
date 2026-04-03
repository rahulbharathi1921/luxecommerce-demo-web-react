import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import FloatingModel from '../3d/FloatingModel';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 bg-[url('https://picsum.photos/seed/luxury/1920/1080')] bg-cover bg-center opacity-30"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="text-center lg:text-left max-w-2xl">
          <motion.span
            className="inline-block text-sm uppercase tracking-[0.3em] mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Spring / Summer 2026
          </motion.span>
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate Your <br /> <span className="text-gray-500 italic">Everyday</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 text-gray-300 font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover a curated collection of high-end essentials designed for the modern individual who values both form and function.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            >
              Explore Collection
            </Link>
            <Link
              to="/lookbook"
              className="inline-block bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
            >
              Lookbook
            </Link>
          </motion.div>
        </div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-full lg:w-[500px] ml-auto"
        >
          <FloatingModel />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
