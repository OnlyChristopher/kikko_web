import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Heart, Plus, Star, ChefHat, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

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

interface RecipeModalCardProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  onViewRecipe: (recipe: Recipe) => void;
  relatedRecipes?: Recipe[];
}

export function RecipeModalCard({ 
  recipe, 
  isOpen, 
  onClose, 
  onViewRecipe, 
  relatedRecipes = [] 
}: RecipeModalCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(recipe);
  
  // Bloquear scroll de la página cuando el modal está abierto
  useBodyScrollLock(isOpen);

  const handleRecipeSelect = (newRecipe: Recipe) => {
    setSelectedRecipe(newRecipe);
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fondo borroso */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Contenedor principal */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 w-full max-w-6xl h-[90vh] max-h-[800px] overflow-hidden shadow-2xl"
            style={{ borderRadius: '24px' }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {/* Botón de cerrar */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 flex items-center justify-center shadow-lg border border-gray-200/50"
              style={{ borderRadius: '50%' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="flex h-full flex-col lg:flex-row">
              {/* Panel izquierdo - Lista de recetas relacionadas */}
              <div className="w-full lg:w-80 bg-white/50 backdrop-blur-sm border-r border-gray-200/50 p-6 overflow-y-auto lg:block hidden">
                <h3 className="font-bold text-kikko-blue mb-6 text-lg">
                  RECETAS SIMILARES
                </h3>
                
                <div className="space-y-4">
                  {relatedRecipes.slice(0, 6).map((relatedRecipe, index) => (
                    <motion.div
                      key={relatedRecipe.id}
                      className={`p-3 cursor-pointer transition-all duration-300 ${
                        selectedRecipe.id === relatedRecipe.id
                          ? 'bg-kikko-blue/10 border-kikko-blue/30'
                          : 'bg-white/70 hover:bg-white/90 border-gray-200/50'
                      } border backdrop-blur-sm`}
                      style={{ borderRadius: '16px' }}
                      onClick={() => handleRecipeSelect(relatedRecipe)}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-16 h-16 bg-cover bg-center flex-shrink-0"
                          style={{ 
                            backgroundImage: `url(${relatedRecipe.image})`,
                            borderRadius: '12px'
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                            {relatedRecipe.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{relatedRecipe.prepTime}</span>
                            <span className="mx-1">•</span>
                            <Star className="w-3 h-3 fill-current text-kikko-yellow" />
                            <span>{relatedRecipe.rating}</span>
                          </div>
                          <div className="text-xs text-kikko-blue font-medium mt-1">
                            {relatedRecipe.kikkoProduct}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Panel derecho - Receta principal */}
              <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                  {/* Imagen principal de la receta */}
                  <motion.div
                    className="relative aspect-[4/3] mb-8 shadow-xl overflow-hidden"
                    style={{ borderRadius: '20px' }}
                    layoutId={`recipe-image-${selectedRecipe.id}`}
                  >
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Badge de tiempo */}
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        className="bg-black/80 text-white px-3 py-2 flex items-center gap-2"
                        style={{ borderRadius: '20px' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{selectedRecipe.prepTime}</span>
                      </motion.div>
                    </div>
                    
                    {/* Badge de rating */}
                    <div className="absolute top-4 left-4 z-10">
                      <motion.div
                        className="bg-kikko-yellow text-kikko-blue px-3 py-2 flex items-center gap-2 font-bold shadow-lg"
                        style={{ borderRadius: '20px' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span>{selectedRecipe.rating}</span>
                      </motion.div>
                    </div>

                    {/* Badge de dificultad */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <motion.div
                        className="text-white px-3 py-2 font-bold shadow-lg"
                        style={{ 
                          borderRadius: '20px',
                          backgroundColor: getDifficultyColor(selectedRecipe.difficulty)
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <ChefHat className="w-4 h-4 inline mr-2" />
                        {selectedRecipe.difficulty.toUpperCase()}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Información de la receta */}
                  <div className="space-y-6">
                    {/* Título y categoría */}
                    <div>
                      <motion.h1
                        className="font-klein-bold text-kikko-blue mb-2"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: '1.1' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedRecipe.title}
                      </motion.h1>
                      
                      <motion.div
                        className="inline-block bg-kikko-blue/10 text-kikko-blue px-3 py-1 font-semibold uppercase tracking-wide text-sm"
                        style={{ borderRadius: '12px' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedRecipe.category}
                      </motion.div>
                    </div>

                    {/* Descripción */}
                    <motion.p
                      className="text-gray-700 text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {selectedRecipe.description}
                    </motion.p>

                    {/* Estadísticas */}
                    <motion.div
                      className="grid grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-center bg-white/70 backdrop-blur-sm p-4 border border-gray-200/50" style={{ borderRadius: '16px' }}>
                        <div className="font-bold text-kikko-blue text-xl">{selectedRecipe.rating}</div>
                        <div className="text-gray-600 text-sm">Rating</div>
                      </div>
                      <div className="text-center bg-white/70 backdrop-blur-sm p-4 border border-gray-200/50" style={{ borderRadius: '16px' }}>
                        <div className="font-bold text-kikko-blue text-xl">{selectedRecipe.reviews}</div>
                        <div className="text-gray-600 text-sm">Reviews</div>
                      </div>
                      <div className="text-center bg-white/70 backdrop-blur-sm p-4 border border-gray-200/50" style={{ borderRadius: '16px' }}>
                        <div className="font-bold text-kikko-blue text-xl">{selectedRecipe.prepTime}</div>
                        <div className="text-gray-600 text-sm">Tiempo</div>
                      </div>
                    </motion.div>

                    {/* Producto KIKKO */}
                    <motion.div
                      className="bg-gradient-to-r from-kikko-blue to-kikko-blue-light text-white p-6 shadow-lg"
                      style={{ borderRadius: '20px' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-2">PRODUCTO KIKKO</h3>
                          <p className="text-white/90 text-lg font-semibold">
                            {selectedRecipe.kikkoProduct}
                          </p>
                          <p className="text-white/80 text-sm mt-1">
                            El ingrediente secreto para el sabor auténtico
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">ES MÁS RICO</div>
                          <div className="text-kikko-yellow font-bold text-lg">CON KIKKO</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Botones de acción */}
                    <motion.div
                      className="flex items-center justify-between gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.button
                          onClick={() => setIsLiked(!isLiked)}
                          className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${
                            isLiked 
                              ? 'bg-kikko-red border-kikko-red text-white' 
                              : 'bg-white border-gray-200 text-gray-400 hover:border-kikko-red hover:text-kikko-red'
                          }`}
                          style={{ borderRadius: '50%' }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            className={`w-5 h-5 transition-all duration-300 ${
                              isLiked ? 'fill-current' : ''
                            }`}
                          />
                        </motion.button>

                        <div className="text-gray-600">
                          <div className="font-semibold">{selectedRecipe.reviews} personas</div>
                          <div className="text-sm">han cocinado esto</div>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => onViewRecipe(selectedRecipe)}
                        className="bg-kikko-blue hover:bg-kikko-blue-dark text-white px-8 py-4 font-bold shadow-lg flex items-center gap-3 transition-all duration-300 w-full justify-center lg:w-auto"
                        style={{ borderRadius: '20px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChefHat className="w-5 h-5" />
                        <span className="text-lg">VER RECETA COMPLETA</span>
                        <Plus className="w-5 h-5" strokeWidth={3} />
                      </motion.button>
                    </motion.div>

                    {/* Recetas relacionadas en mobile */}
                    <motion.div
                      className="block lg:hidden mt-8 pt-6 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="font-bold text-kikko-blue mb-4 text-lg">
                        RECETAS SIMILARES
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relatedRecipes.slice(0, 4).map((relatedRecipe, index) => (
                          <motion.div
                            key={relatedRecipe.id}
                            className={`p-3 cursor-pointer transition-all duration-300 ${
                              selectedRecipe.id === relatedRecipe.id
                                ? 'bg-kikko-blue/10 border-kikko-blue/30'
                                : 'bg-white/70 hover:bg-white/90 border-gray-200/50'
                            } border backdrop-blur-sm`}
                            style={{ borderRadius: '16px' }}
                            onClick={() => handleRecipeSelect(relatedRecipe)}
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-12 h-12 bg-cover bg-center flex-shrink-0"
                                style={{ 
                                  backgroundImage: `url(${relatedRecipe.image})`,
                                  borderRadius: '12px'
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">
                                  {relatedRecipe.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  <span>{relatedRecipe.prepTime}</span>
                                  <Star className="w-3 h-3 fill-current text-kikko-yellow" />
                                  <span>{relatedRecipe.rating}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}