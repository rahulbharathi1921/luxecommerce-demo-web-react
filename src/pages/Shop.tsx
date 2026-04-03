import { useState, useEffect } from 'react';
import ProductCard3D from '../components/ui/ProductCard3D';
import ScrollReveal from '../components/animations/ScrollReveal';
import { Product } from '../store/useCartStore';
import { Filter, ChevronDown, Search, X } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Using absolute path from root to ensure it works on all routes
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Invalid data format');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Shop fetch error:', err);
        // Fallback to some hardcoded products if fetch fails
        setProducts([
          { id: 1, name: "Minimalist Leather Watch", price: 199, image: "https://picsum.photos/seed/watch/800/800", description: "A timeless piece for the modern professional." },
          { id: 2, name: "Premium Wireless Headphones", price: 349, image: "https://picsum.photos/seed/headphones/800/800", description: "Experience sound like never before." }
        ]);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Collection</h1>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
              Explore our full range of meticulously designed essentials, crafted for those who appreciate the finer things in life.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 py-6 border-y border-gray-100">
          <div className="flex items-center gap-8 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity">
              <Filter size={16} />
              <span>Filters</span>
            </div>
            <div className="relative group flex-1 md:w-64">
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-2 pl-6 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-8 pl-2 py-1 text-sm font-bold uppercase tracking-widest focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="py-32 flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={(index % 3) * 0.1}>
                <ProductCard3D product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-gray-400 text-lg mb-6">No products found matching your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
