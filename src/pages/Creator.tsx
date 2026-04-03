import { motion } from 'motion/react';
import { Github, ExternalLink, Code2, Brain, Globe, Cpu, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { Link } from 'react-router-dom';

const Creator = () => {
  const skills = [
    { icon: <Code2 size={24} />, label: 'Web Development', desc: 'React, Next.js, Vite, TypeScript, Tailwind' },
    { icon: <Globe size={24} />, label: 'App Development', desc: 'Cross-platform, responsive, performant' },
    { icon: <Brain size={24} />, label: 'Machine Learning', desc: 'Model training, pipelines, deployment' },
    { icon: <Cpu size={24} />, label: 'Deep Learning & RAG', desc: 'Neural networks, retrieval-augmented generation' },
  ];

  const highlights = [
    { value: '3+', label: 'Years Experience' },
    { value: '25+', label: 'Projects Delivered' },
    { value: '50+', label: 'Models Trained' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] bg-black flex items-center justify-center overflow-hidden pt-24">
        <motion.div
          className="absolute inset-0 bg-[url('https://picsum.photos/seed/rahuldev/1920/1080')] bg-cover bg-center opacity-40"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.span
            className="inline-block text-sm uppercase tracking-[0.3em] mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Mind Behind the Machine
          </motion.span>
          <motion.h1
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Rahul Bharathi
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto font-light text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            AI Engineer &amp; Full-Stack Developer
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://github.com/rahulbharathi1921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://rahulbharathi1921.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              <ExternalLink size={18} />
              Portfolio
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {highlights.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-6"
              >
                <div className="text-5xl md:text-6xl font-bold text-black tracking-tighter">{stat.value}</div>
                <div className="mt-2 text-gray-500 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" className="mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">What I Build</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map(({ icon, label, desc }, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 transition-all hover:shadow-xl group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">{label}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-10">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">The Story</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                  Who Am I?
                </h2>
                <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed">
                  <p>
                    Hey, I'm Rahul. I build things that are smart and look good.
                  </p>
                  <p>
                    I'm an AI Engineer with a background in web development, mobile apps, machine learning, and deep learning. I've spent the last few years training models, building RAG pipelines, shipping React apps, and figuring out how to make software feel natural instead of clunky.
                  </p>
                  <p>
                    This LuxeCommerce site? I built it to show what's possible when you combine clean code with real visual design. The 3D hero scene, the scroll animations, the product cards that tilt when you hover; all of it is running in the browser with no backend. Pure frontend craft.
                  </p>
                  <p>
                    I started in web dev, fell into ML &amp; DL, and now I work at the intersection of both. I don't just ship features; I care about how they feel when someone uses them. That's what separates good software from great software.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group bg-gray-200">
                <img
                  src="https://picsum.photos/seed/rahulcreator/800/1000"
                  alt="Rahul Bharathi"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">AI Engineer</p>
                  <h3 className="text-3xl font-bold tracking-tight">Rahul Bharathi</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <span className="text-[20vw] font-bold tracking-tighter leading-none select-none">AI</span>
        </motion.div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Got an Idea?
              <br />
              <span className="text-gray-500 italic">Let&apos;s Talk.</span>
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Need an AI model trained, a web app shipped, or a RAG pipeline built? I&apos;m always up for interesting problems. Reach out &mdash; I&apos;d love to hear what you&apos;re working on.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://github.com/rahulbharathi1921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
              >
                <Github size={20} />
                Follow on GitHub
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                View This Project <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer credit */}
      <div className="bg-black text-center py-8 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          Designed &amp; Developed by <span className="text-white font-medium">Rahul Bharathi</span> &mdash; AI Engineer
        </p>
      </div>
    </div>
  );
};

export default Creator;
