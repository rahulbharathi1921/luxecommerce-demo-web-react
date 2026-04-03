import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-full font-semibold">
          Go to Shop
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-4xl font-bold tracking-tighter mb-4">Order Confirmed!</h2>
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
          Thank you for your purchase. We've sent a confirmation email to your inbox. Your order is being prepared for shipment.
        </p>
        <Link to="/" className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Link to="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal direction="up">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">1</span>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">2</span>
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="First Name" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    <input required type="text" placeholder="Last Name" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    <input required type="text" placeholder="Address" className="col-span-2 px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    <input required type="text" placeholder="City" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    <input required type="text" placeholder="Postal Code" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">3</span>
                    Payment Details
                  </h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input required type="text" placeholder="Card Number" className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM / YY" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                      <input required type="text" placeholder="CVC" className="px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all" />
                    </div>
                  </div>
                </div>

                <button
                  disabled={isProcessing}
                  type="submit"
                  className="w-full bg-black text-white py-6 rounded-full font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${totalPrice() + 25}`
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
                <h3 className="text-xl font-bold mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold mt-2">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${totalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">$25.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>${totalPrice() + 25}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <ShieldCheck size={16} />
                    Secure SSL encrypted payment
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <Truck size={16} />
                    Estimated delivery: 3-5 business days
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
