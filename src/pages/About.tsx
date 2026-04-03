import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

// Animated number counter component
const AnimatedCounter = ({ from = 0, to, suffix = '' }: { from?: number; to: number; suffix?: string }) => {
  const { val } = useSpring({ from: { val: from }, to: { val: to }, config: { duration: 2000 } });
  return <animated.span>{val.to(n => Math.floor(n).toLocaleString() + suffix)}</animated.span>;
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: 'Happy Customers', value: 12450, suffix: '+' },
    { label: 'Products Sold', value: 89200, suffix: '+' },
    { label: 'Years of Excellence', value: 8, suffix: '' },
  ];

  return (
    <div className="bg-white pt-20">
      {/* Hero Section with parallax */}
      <section className="relative h-[60vh] bg-black flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('https://picsum.photos/seed/about/1920/1080')] bg-cover bg-center opacity-60"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="mt-4 text-xl max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Crafting luxury since 2016
          </motion.p>
        </div>
      </section>

      {/* Stats section with animated counters */}
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.2 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-black tracking-tighter">
                  {isInView && <AnimatedCounter to={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="mt-2 text-gray-500 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 tracking-tighter">The Visionaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['Emma', 'Liam', 'Sophia'].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl"
              >
                <div className="h-96 bg-gray-200 relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/person${i}/800/1000`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold tracking-tight">{name} Chen</h3>
                  <p className="text-gray-500 mt-1 font-light uppercase tracking-widest text-xs">Creative Director</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
