import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from '../components/animations/ScrollReveal';

const images = [
  { id: 1, src: 'https://picsum.photos/seed/look1/800/1200', category: 'Summer' },
  { id: 2, src: 'https://picsum.photos/seed/look2/800/800', category: 'Autumn' },
  { id: 3, src: 'https://picsum.photos/seed/look3/800/1000', category: 'Winter' },
  { id: 4, src: 'https://picsum.photos/seed/look4/800/1100', category: 'Spring' },
  { id: 5, src: 'https://picsum.photos/seed/look5/800/900', category: 'Summer' },
  { id: 6, src: 'https://picsum.photos/seed/look6/800/1300', category: 'Autumn' },
  { id: 7, src: 'https://picsum.photos/seed/look7/800/800', category: 'Winter' },
  { id: 8, src: 'https://picsum.photos/seed/look8/800/1200', category: 'Spring' },
  { id: 9, src: 'https://picsum.photos/seed/look9/800/1000', category: 'Summer' },
];

const Lookbook = () => {
  const [selectedImg, setSelectedImg] = useState<{ id: number; src: string; category: string } | null>(null);

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Lookbook</h1>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our seasonal collections through an immersive visual journey. A curated gallery of inspiration for the modern wardrobe.
            </p>
          </ScrollReveal>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="break-inside-avoid cursor-pointer rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 bg-white group"
              onClick={() => setSelectedImg(img)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.category}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">View Look</span>
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold text-sm uppercase tracking-widest">{img.category} Collection</p>
                <p className="text-gray-400 text-xs mt-1 font-light">Edition 2026</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 md:p-12"
              onClick={() => setSelectedImg(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-5xl w-full h-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedImg.src}
                  alt={selectedImg.category}
                  className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                />
                <button 
                  onClick={() => setSelectedImg(null)}
                  className="absolute top-0 right-0 md:-top-12 md:-right-12 text-white hover:text-gray-400 transition-colors p-4"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Close</span>
                </button>
                <div className="absolute bottom-0 left-0 md:-bottom-12 md:left-0 text-white">
                  <p className="text-xl font-bold tracking-tighter">{selectedImg.category} Collection</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">LuxeCommerce Edition 2026</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Lookbook;
