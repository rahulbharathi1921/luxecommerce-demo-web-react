import { useState, useEffect, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import Hero from '../components/ui/Hero';
import ProductCard3D from '../components/ui/ProductCard3D';
import ScrollReveal from '../components/animations/ScrollReveal';
import FloatingElements from '../components/ui/FloatingElements';
import { Product } from '../store/useCartStore';
import { ArrowRight, ShieldCheck, Truck, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

// Lazy-load heavy 3D components to reduce initial bundle
const CursorParticles = lazy(() => import('../components/3d/CursorParticles'));
const FloatingOrbs = lazy(() => import('../components/3d/FloatingOrbs'));

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D render slightly so above-the-fold content paints first
    const timer = requestAnimationFrame(() => setShow3D(true));
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error('Home fetch error:', err);
        setFeaturedProducts([
          { id: 1, name: "Minimalist Leather Watch", price: 199, image: "https://picsum.photos/seed/watch/800/800", description: "A timeless piece for the modern professional." },
          { id: 2, name: "Premium Wireless Headphones", price: 349, image: "https://picsum.photos/seed/headphones/800/800", description: "Experience sound like never before." }
        ]);
      });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="relative bg-white">
      {/* Background 3D Canvas */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {show3D && (
          <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <FloatingOrbs />
                <CursorParticles />
              </Suspense>
            </Suspense>
          </Canvas>
        )}
      </div>

      <FloatingElements />
      <Hero />

      {/* Bento Grid Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" className="mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Experience</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Curated Excellence</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
            {/* Large Feature */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-gray-100"
              data-cursor-text="Explore"
            >
              <img
                src="https://picsum.photos/seed/bento1/1200/1600"
                alt="Luxury"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="text-4xl font-bold tracking-tighter mb-4">The Masterpiece Collection</h3>
                <p className="text-gray-300 font-light max-w-sm mb-6">Hand-selected pieces that define the pinnacle of modern craftsmanship.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                  Shop Now <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-black text-white p-12 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Play size={20} fill="white" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Live Lookbook</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tighter mb-4">Visual Storytelling</h3>
                <p className="text-gray-400 font-light max-w-xs mb-6">Immerse yourself in our seasonal narrative through high-fidelity visuals.</p>
                <Link to="/lookbook" className="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
                  View Lookbook
                </Link>
              </div>
            </motion.div>

            {/* Bottom Middle */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-gray-50 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="text-5xl font-bold tracking-tighter mb-2">150+</div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Global Boutiques</p>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer"
            >
              <img
                src="https://picsum.photos/seed/bento2/800/800"
                alt="Luxury"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">Our Story</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <ScrollReveal direction="left">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Essentials</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Trending Now</h2>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right">
              <Link to="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all group">
                View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={index * 0.1}>
                <ProductCard3D product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Brand Story */}
      <section className="py-40 bg-black text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <span className="text-[30vw] font-bold tracking-tighter leading-none select-none">LUXE</span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-10">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                  Beyond <br /> <span className="text-gray-500 italic">Fashion</span>
                </h2>
                <p className="text-gray-400 font-light text-xl leading-relaxed max-w-md">
                  We don't just create products; we craft legacies. Every stitch, every curve, every detail is a testament to our commitment to perfection.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Lifetime Warranty</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Priority Delivery</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group">
                <img
                  src="https://picsum.photos/seed/story/1000/1250"
                  alt="Brand Story"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2">Since 2016</p>
                    <h3 className="text-2xl font-bold tracking-tight">The Milan Studio</h3>
                  </div>
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play size={24} fill="black" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
