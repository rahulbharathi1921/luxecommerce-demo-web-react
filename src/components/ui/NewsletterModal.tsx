import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ArrowRight } from 'lucide-react';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenNewsletter');
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletter', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(handleClose, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-[2.5rem] overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="hidden md:block w-1/2 bg-gray-100 relative">
              <img
                src="https://picsum.photos/seed/newsletter/800/1200"
                alt="Newsletter"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content Side */}
            <div className="p-10 md:p-12 flex-1 relative flex flex-col justify-center">
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4"
                  >
                    <h2 className="text-3xl font-bold tracking-tighter">Welcome to the Club!</h2>
                    <p className="text-gray-500 font-light">Check your inbox for your 15% discount code.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter leading-tight">Join the <br />Inner Circle</h2>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Get 15% off your first order and exclusive access to new collections, events, and private sales.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address" 
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-sm" 
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-all group"
                      >
                        Subscribe Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                      No spam, just inspiration. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
