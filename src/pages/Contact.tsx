import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Get in Touch</h1>
          <p className="text-gray-500 mt-6 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            We’d love to hear from you. Whether you have a question about our collections, shipping, or just want to say hello.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Visit Us</h3>
                <p className="text-gray-500 font-light mt-1">123 Luxury Ave, Milan, Italy</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Email</h3>
                <p className="text-gray-500 font-light mt-1">hello@luxecommerce.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Call</h3>
                <p className="text-gray-500 font-light mt-1">+1 (555) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Animated form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="peer w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-transparent" 
                  placeholder="Your Name"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest font-bold"
                >
                  Your Name
                </label>
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="peer w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-transparent" 
                  placeholder="Email Address"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest font-bold"
                >
                  Email Address
                </label>
              </div>
              <div className="relative group">
                <textarea 
                  id="message" 
                  rows={4} 
                  required 
                  className="peer w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-black transition-colors placeholder-transparent resize-none" 
                  placeholder="Message"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest font-bold"
                >
                  Message
                </label>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl"
              >
                <Send size={18} />
                Send Message
              </motion.button>
              
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-600 p-4 rounded-2xl text-center text-sm font-medium"
                >
                  Thanks! We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
