import { motion } from 'motion/react';
import { Eye, ChefHat, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  badges: string[];
  features: string[];
  nutritionalInfo: {
    servingSize: string;
    servingsPerContainer: string;
    calories: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    carbohydrates: number;
    sodium: number;
    sugars: number;
  };
  ingredients: string;
  uses: string[];
  recipes: string[];
}

interface EnhancedProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
  onNavigateToRecipes?: () => void;
}

export function EnhancedProductCard({ 
  product, 
  index, 
  onSelect, 
  onNavigateToRecipes 
}: EnhancedProductCardProps) {
  
  const handleInfoButtonClick = () => {
    onSelect(product);
  };

  const handleRecipesButtonClick = () => {
    if (onNavigateToRecipes) {
      onNavigateToRecipes();
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.7,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* Main Card Container */}
      <div className="relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full min-h-[600px]">
        
        {/* Subtle Kikko Background Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{
            background: `linear-gradient(135deg, 
              rgba(5, 149, 211, 0.05) 0%, 
              rgba(255, 215, 0, 0.05) 50%, 
              rgba(220, 53, 69, 0.05) 100%)`
          }}
        ></div>
        
        {/* Premium Badge Floating */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          className="absolute top-4 left-4 z-10"
        >
          <div 
            className="text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg"
            style={{ backgroundColor: 'var(--kikko-blue)' }}
          >
            <Sparkles className="w-3 h-3" />
            <span className="uppercase tracking-wide">{product.category}</span>
          </div>
        </motion.div>

        {/* Badges Stack */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {product.badges.slice(0, 2).map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 + idx * 0.1, duration: 0.4 }}
            >
              <Badge 
                variant="secondary" 
                className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Product Image - EMPHASIS ON PRODUCT - MUCH LARGER */}
        <div className="relative pt-12 pb-6 px-6">
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotateY: [0, 8, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Product Spotlight Background */}
            <div className="absolute inset-0 bg-gradient-radial from-white via-gray-50 to-transparent rounded-3xl opacity-60"></div>
            
            {/* Main Product Image - MUCH LARGER & MORE PROMINENT */}
            <div className="relative z-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-6 shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 lg:h-96 object-contain mx-auto filter drop-shadow-2xl group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15)) brightness(1.05)'
                }}
              />
              
              {/* Product Reflection Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100/50 to-transparent rounded-b-2xl opacity-40"></div>
            </div>

            {/* Floating Elements Around Product */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-kikko-yellow rounded-full opacity-60 blur-sm"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 0.8, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-kikko-red rounded-full opacity-40 blur-sm"
            />
          </motion.div>
        </div>

        {/* Product Information - Minimalist Design */}
        <div className="px-6 pb-6 flex-1 flex flex-col">
          {/* Product Title & Subtitle - Simplified */}
          <div className="text-center mb-8">
            <motion.h3 
              className="text-3xl font-klein-bold mb-3 group-hover:scale-105 transition-transform duration-300"
              style={{ color: 'var(--kikko-blue)' }}
              whileHover={{ scale: 1.05 }}
            >
              {product.name}
            </motion.h3>
            <p className="text-lg text-gray-600 font-medium">
              {product.subtitle}
            </p>
            <div 
              className="w-16 h-1 rounded-full mx-auto mt-4 group-hover:w-24 transition-all duration-300"
              style={{ backgroundColor: 'var(--kikko-red)' }}
            ></div>
          </div>

          {/* Action Buttons - Estilo rectangular moderno Kikko */}
          <div className="flex gap-3 mt-auto">
            <motion.button
              type="button"
              onClick={handleInfoButtonClick}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-300 hover:shadow-md cursor-pointer font-klein-bold text-sm"
              style={{
                backgroundColor: 'var(--kikko-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue)';
              }}
            >
              <Eye className="w-4 h-4" />
              <span>VER DETALLES</span>
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleRecipesButtonClick}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-300 hover:shadow-md cursor-pointer font-klein-bold text-sm"
              style={{
                backgroundColor: 'var(--kikko-red)',
                color: 'white',
                border: 'none',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-red-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-red)';
              }}
            >
              <ChefHat className="w-4 h-4" />
              <span>VER RECETAS</span>
            </motion.button>
          </div>
        </div>

        {/* Subtle Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>


      </div>
    </motion.div>
  );
}