import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      set({ items: items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (id) => set({ items: get().items.filter(item => item.id !== id) }),
  updateQuantity: (id, quantity) => set({ 
    items: get().items.map(item => item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item).filter(item => item.quantity > 0)
  }),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
}));
