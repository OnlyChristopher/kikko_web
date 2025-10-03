import { motion } from 'motion/react';
import { Star, Clock, ChefHat, Heart, Bookmark, Eye, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SocialShare } from './SocialShare';
import { useState } from 'react';
// Nuevas imágenes de productos Kikko sin fondo
import kikkoSalsaSoya from 'figma:asset/8c4cb152f1dc6e82eea9f28ce155aad3f0ecab1e.png';
import kikkoAjoikion from 'figma:asset/e10e0947a765bf64f8f616e60e837953cb9a6f62.png';
import kikkoSalsaMensi from 'figma:asset/554ae9a463f9d3cd6f1ec8ed3b3f799f2df37221.png';

interface Recipe {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  prepTime: string;
  difficulty: string;
  category: string;
  featured?: boolean;
  kikkoProduct: string;
  description: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
  viewMode?: 'grid' | 'list';
  onPreview?: () => void;
  onViewRecipe?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, featured = false, viewMode = 'grid', onPreview, onViewRecipe }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 1000) + 100);
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil':
        return 'var(--kikko-yellow)';
      case 'medio':
        return 'var(--kikko-blue)';
      case 'difícil':
        return 'var(--kikko-red)';
      default:
        return 'var(--kikko-blue)';
    }
  };

  // Seleccionar producto según categoría o tipo de receta con más variedad
  const getProductImage = (category: string, kikkoProduct: string) => {
    // Usar Salsa de Soya tradicional para recetas con fideos, arroz, sopas
    if (category.toLowerCase().includes('fideos') || 
        category.toLowerCase().includes('arroz') || 
        category.toLowerCase().includes('sopas') ||
        kikkoProduct.toLowerCase().includes('soya') ||
        kikkoProduct.toLowerCase().includes('shoyu')) {
      return kikkoSalsaSoya;
    }
    
    // Usar Ajoikion para recetas picantes, carnes, vegetales
    if (category.toLowerCase().includes('picante') || 
        category.toLowerCase().includes('carne') || 
        category.toLowerCase().includes('pollo') ||
        kikkoProduct.toLowerCase().includes('ajoikion') ||
        kikkoProduct.toLowerCase().includes('ajo')) {
      return kikkoAjoikion;
    }
    
    // Usar Salsa Mensi para otras recetas especiales
    return kikkoSalsaMensi;
  };

  const productImage = getProductImage(recipe.category, recipe.kikkoProduct);

  const handleCardClick = () => {
    if (onViewRecipe) {
      onViewRecipe(recipe);
    } else if (onPreview) {
      onPreview();
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        className="relative bg-white overflow-hidden cursor-pointer group flex"
        style={{ 
          borderRadius: '20px', 
          height: '160px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        whileHover={{ 
          y: -4,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Imagen - más compacta */}
        <div className="relative w-40 overflow-hidden" style={{ borderRadius: '20px 0 0 20px' }}>
          <motion.img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          
          {/* Badge de rating compacto */}
          <div className="absolute top-2 left-2">
            <motion.div
              className="bg-kikko-yellow/95 text-kikko-blue px-2 py-1 flex items-center gap-1 font-bold backdrop-blur-sm"
              style={{ borderRadius: '12px' }}
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs">{recipe.rating}</span>
            </motion.div>
          </div>

          {/* Badge de dificultad */}
          <div className="absolute bottom-2 left-2">
            <motion.div
              className="text-white px-2 py-1 font-semibold backdrop-blur-sm text-xs"
              style={{ 
                borderRadius: '12px',
                backgroundColor: getDifficultyColor(recipe.difficulty) + '95'
              }}
            >
              {recipe.difficulty}
            </motion.div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-base text-gray-900 line-clamp-2 leading-tight flex-1 mr-2">
                {recipe.title}
              </h3>
              
              {/* Badge de tiempo compacto */}
              <div className="bg-gray-100 text-gray-600 px-2 py-1 flex items-center gap-1 text-xs" style={{ borderRadius: '10px' }}>
                <Clock className="w-3 h-3" />
                <span>{recipe.prepTime}</span>
              </div>
            </div>
            
            {/* Producto KIKKO */}
            <div className="text-kikko-blue font-medium text-sm mb-2 flex items-center gap-1">
              <ChefHat className="w-3 h-3" />
              {recipe.kikkoProduct}
            </div>
            
            {/* Descripción más corta */}
            <p className="text-gray-600 text-xs mb-2 line-clamp-1">
              {recipe.description || "Deliciosa receta preparada con el auténtico sabor de KIKKO"}
            </p>
          </div>
          
          {/* Footer compacto */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span className="text-xs">{views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span className="text-xs">{recipe.reviews}</span>
              </div>
            </div>
            
            {/* Acciones */}
            <div className="flex items-center gap-2">
              {/* Botón de favorito */}
              <motion.button
                className={`w-7 h-7 flex items-center justify-center transition-all duration-300 ${
                  isLiked 
                    ? 'bg-kikko-red text-white' 
                    : 'bg-gray-100 text-gray-400 hover:bg-kikko-red hover:text-white'
                }`}
                style={{ borderRadius: '50%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`w-3 h-3 transition-all duration-300 ${
                    isLiked ? 'fill-current' : ''
                  }`}
                />
              </motion.button>
              
              {/* Botón CTA */}
              <motion.button
                className="bg-kikko-blue hover:bg-kikko-blue-dark text-white px-3 py-1 text-xs font-medium flex items-center gap-1"
                style={{ borderRadius: '12px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver
                <Plus className="w-3 h-3" strokeWidth={2} />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Indicador de featured */}
        {featured && (
          <div className="absolute top-0 left-0 bg-kikko-red text-white px-2 py-1 text-xs font-bold flex items-center gap-1" style={{ borderRadius: '20px 0 12px 0' }}>
            <Star className="w-3 h-3 fill-current" />
            DESTACADA
          </div>
        )}
      </motion.div>
    );
  }

  // Vista de grid - DISEÑO MODERNO ESTILO APP DE DELIVERY
  return (
    <motion.div
      className="relative bg-white overflow-hidden cursor-pointer group"
      style={{ 
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Imagen principal de la receta - Aspecto más cuadrado como app móvil */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Badge de favorito flotante - esquina superior derecha */}
        <motion.button
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-kikko-red/90 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-kikko-red/90 hover:text-white'
          }`}
          style={{ borderRadius: '50%' }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked ? 'fill-current' : ''
            }`}
          />
        </motion.button>

        {/* Badge de rating - esquina superior izquierda */}
        <div className="absolute top-3 left-3">
          <motion.div
            className="bg-kikko-yellow/95 text-kikko-blue px-2.5 py-1 flex items-center gap-1 font-bold backdrop-blur-sm"
            style={{ borderRadius: '16px' }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-sm">{recipe.rating}</span>
          </motion.div>
        </div>

        {/* Badge de tiempo - esquina inferior izquierda */}
        <div className="absolute bottom-3 left-3">
          <motion.div
            className="bg-black/70 text-white px-2.5 py-1 flex items-center gap-1 backdrop-blur-sm"
            style={{ borderRadius: '16px' }}
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="text-sm font-medium">{recipe.prepTime}</span>
          </motion.div>
        </div>

        {/* Badge de dificultad - esquina inferior derecha */}
        <div className="absolute bottom-3 right-3">
          <motion.div
            className="text-white px-2.5 py-1 font-semibold backdrop-blur-sm text-xs"
            style={{ 
              borderRadius: '16px',
              backgroundColor: getDifficultyColor(recipe.difficulty) + '95'
            }}
            whileHover={{ scale: 1.05 }}
          >
            {recipe.difficulty.toUpperCase()}
          </motion.div>
        </div>

        {/* Indicador de featured - ribbon style */}
        {featured && (
          <div className="absolute top-0 left-0 bg-kikko-red text-white px-3 py-2 text-xs font-bold flex items-center gap-1" style={{ borderRadius: '0 0 16px 0' }}>
            <Star className="w-3 h-3 fill-current" />
            DESTACADA
          </div>
        )}
      </div>
      
      {/* Contenido inferior - diseño limpio y moderno */}
      <div className="p-6">
        {/* Título de la receta */}
        <h3 className="font-bold text-lg text-gray-900 mb-1.5 line-clamp-2 leading-tight">
          {recipe.title}
        </h3>
        
        {/* Producto KIKKO destacado */}
        <div className="text-kikko-blue font-semibold text-sm mb-2 flex items-center gap-1">
          <ChefHat className="w-4 h-4" />
          {recipe.kikkoProduct}
        </div>
        
        {/* Descripción corta */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description || "Deliciosa receta preparada con el auténtico sabor de KIKKO"}
        </p>
        
        {/* Footer con stats y CTA */}
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">{recipe.reviews}</span>
            </div>
          </div>
          
          {/* Botón CTA estilo app móvil */}
          <motion.button
            className="bg-kikko-blue hover:bg-kikko-blue-dark text-white px-4 py-2 font-semibold flex items-center gap-2 transition-all duration-300"
            style={{ borderRadius: '16px' }}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">Ver Receta</span>
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}