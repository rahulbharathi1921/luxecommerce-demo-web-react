import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import Cart from '../ui/Cart';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50">
            <span className={`text-2xl font-bold tracking-tighter ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}>
              LUXE<span className="font-light">COMMERCE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-cursor-text={link.name}
                className={`text-sm font-bold tracking-widest uppercase transition-colors hover:opacity-70 ${
                  isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-50">
            <button 
              data-cursor-text="Search"
              className={`hover:opacity-70 transition-opacity ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
            >
              <Search size={20} />
            </button>
            <button 
              data-cursor-text="Account"
              className={`hidden sm:block hover:opacity-70 transition-opacity ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
            >
              <User size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              data-cursor-text="Cart"
              className={`relative group hover:opacity-70 transition-opacity ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className={`md:hidden hover:opacity-70 transition-opacity ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-3xl font-bold tracking-tighter text-black hover:text-gray-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
