import { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from '@use-gesture/react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../store/useCartStore';

interface ProductCard3DProps {
  product: Product;
}

const ProductCard3D = ({ product }: ProductCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  
  // 3D tilt and floating animation
  const [{ rotateX, rotateY, y, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
    config: { mass: 2, tension: 400, friction: 30 },
  }));

  // Gesture types need explicit annotation due to useGesture/react-spring incompatibility
  type GestureBindings = Parameters<typeof useGesture>[0];
  const gestureHandlers: GestureBindings = {
    onMove: ({ xy: [mx, my] }) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (mx - centerX) / (rect.width / 2);
      const deltaY = (my - centerY) / (rect.height / 2);

      const newRotateY = Math.min(Math.max(deltaX * 15, -15), 15);
      const newRotateX = Math.min(Math.max(-deltaY * 15, -15), 15);

      api.start({ rotateX: newRotateX, rotateY: newRotateY, y: -10, scale: 1.05 });
    },
    onHover: ({ hovering }) => {
      setHovered(hovering || false);
      if (!hovering) {
        api.start({ rotateX: 0, rotateY: 0, y: 0, scale: 1 });
      }
    },
  };

  const bind = useGesture(gestureHandlers);

  return (
    <animated.div
      ref={ref}
      {...bind()}
      style={{
        transform: rotateX.to((rx) => `perspective(1200px) rotateX(${rx}deg) translateY(${y.get()}px) rotateY(${rotateY.get()}deg) scale(${scale.get()})`),
        boxShadow: hovered ? '0 30px 60px -12px rgba(0,0,0,0.3)' : '0 10px 20px -5px rgba(0,0,0,0.05)',
      }}
      className="bg-white rounded-[2.5rem] overflow-hidden cursor-pointer border border-gray-100 transition-shadow duration-300 group"
      onClick={() => navigate(`/product/${product.id}`)}
      data-cursor-text="View"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold tracking-tight text-gray-900">{product.name}</h3>
          <p className="text-lg font-semibold text-gray-900">${product.price}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-1 font-light">{product.description}</p>
      </div>
    </animated.div>
  );
};

export default ProductCard3D;
