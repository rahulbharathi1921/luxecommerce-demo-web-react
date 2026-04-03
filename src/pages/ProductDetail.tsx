import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Star, Share2, Heart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useCartStore, Product } from '../store/useCartStore';
import ScrollReveal from '../components/animations/ScrollReveal';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((p: Product) => p.id === Number(id));
          if (found) {
            setProduct(found);
          } else {
            navigate('/shop');
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('ProductDetail fetch error:', err);
        // Fallback for demo purposes if fetch fails
        const fallbackProducts = [
          { id: 1, name: "Minimalist Leather Watch", price: 199, image: "https://picsum.photos/seed/watch/800/800", description: "A timeless piece for the modern professional." },
          { id: 2, name: "Premium Wireless Headphones", price: 349, image: "https://picsum.photos/seed/headphones/800/800", description: "Experience sound like never before." }
        ];
        const found = fallbackProducts.find((p) => p.id === Number(id));
        if (found) setProduct(found);
        else navigate('/shop');
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link to="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Section */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50">
                <motion.img
                  layoutId={`product-image-${product.id}`}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={`${product.image}?sig=${i}`}
                      alt={`${product.name} detail ${i}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.background = '#d1d5db'; t.src = ''; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Info Section */}
          <ScrollReveal direction="left">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    New Arrival
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-gray-400 text-xs ml-2">(48 Reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{product.name}</h1>
                <p className="text-3xl font-light text-gray-900">${product.price}</p>
              </div>

              <p className="text-gray-500 font-light text-lg leading-relaxed">
                {product.description} This exquisite piece combines modern aesthetics with traditional craftsmanship. Made from the finest materials, it's designed to last a lifetime and elevate your personal style effortlessly.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-black text-white py-5 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 group"
                  >
                    <ShoppingBag size={20} />
                    Add to Cart
                    <span className="w-px h-4 bg-white/20 mx-2" />
                    ${product.price}
                  </button>
                  <button className="p-5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="p-5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Free Shipping</p>
                      <p className="text-[10px] text-gray-500">On orders over $500</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCcw size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Easy Returns</p>
                      <p className="text-[10px] text-gray-500">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Secure Checkout</p>
                      <p className="text-[10px] text-gray-500">100% encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
