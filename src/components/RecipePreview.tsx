import { motion } from 'motion/react';
import { Star, Clock, ChefHat, Heart, Bookmark, Eye, Users, Utensils, Play, Share2, X, Timer, Sparkles, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SocialShare } from './SocialShare';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface RecipePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  recipe?: any;
}

// Hook para animación de progreso de cocción
function useCookingProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 2);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  return progress;
}

export function RecipePreview({ isOpen, onClose, recipe }: RecipePreviewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);
  const cookingProgress = useCookingProgress();

  // Efecto simple para prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Receta por defecto si no se pasa ninguna
  const defaultRecipe = {
    id: 1,
    title: "Fideos Yakisoba Especial con Kikko",
    image: "https://images.unsplash.com/photo-1706263483885-476743c4b0a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx5YWtpc29iYSUyMG5vb2RsZXMlMjBzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTc1MzA1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 234,
    prepTime: "25 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "medio",
    category: "platos principales",
    kikkoProduct: "Sazonador Original",
    author: "Chef María González",
    description: "Una deliciosa receta de yakisoba que combina fideos frescos con vegetales crujientes y el inconfundible sabor del sazonador Kikko.",
    ingredients: [
      "400g de fideos yakisoba frescos",
      "2 cucharadas de Sazonador Kikko Original", 
      "200g de pechuga de pollo en tiras",
      "1 pimiento rojo en juliana",
      "1 zanahoria en juliana",
      "100g de col china cortada",
      "2 dientes de ajo picados",
      "2 cucharadas de aceite vegetal",
      "1 cucharada de salsa de soja",
      "1 cucharadita de aceite de sésamo",
      "Cebollín picado para decorar"
    ],
    instructions: [
      "Cocina los fideos yakisoba según las instrucciones del paquete. Escurre y reserva.",
      "Calienta 1 cucharada de aceite en un wok o sartén grande a fuego alto.", 
      "Saltea el pollo hasta que esté dorado. Añade el sazonador Kikko y mezcla bien.",
      "Agrega el ajo, pimiento y zanahoria. Saltea por 3 minutos.",
      "Incorpora la col china y cocina 2 minutos más.",
      "Añade los fideos, salsa de soja y aceite de sésamo. Mezcla todo durante 2 minutos.",
      "Sirve caliente decorado con cebollín picado. ¡Disfruta!"
    ],
    tips: [
      "Para mejores resultados, usa fideos yakisoba frescos en lugar de secos.",
      "El wok debe estar muy caliente para lograr el 'wok hei' característico.", 
      "No sobrecuines los vegetales para mantener su textura crujiente."
    ],
    nutrition: {
      calories: 380,
      protein: "28g", 
      carbs: "45g",
      fat: "12g"
    }
  };

  // Usar la receta pasada como prop o la receta por defecto
  // Asegurar que todos los campos necesarios estén presentes
  const currentRecipe = recipe ? {
    ...defaultRecipe,
    ...recipe,
    // Asegurar que los arrays siempre existan
    ingredients: recipe.ingredients || defaultRecipe.ingredients,
    instructions: recipe.instructions || defaultRecipe.instructions,
    tips: recipe.tips || defaultRecipe.tips,
    nutrition: recipe.nutrition || defaultRecipe.nutrition,
    // Asegurar campos básicos
    author: recipe.author || defaultRecipe.author,
    kikkoProduct: recipe.kikkoProduct || defaultRecipe.kikkoProduct,
    cookTime: recipe.cookTime || recipe.prepTime || defaultRecipe.cookTime,
    reviews: recipe.reviews || Math.floor(Math.random() * 300) + 50,
    servings: recipe.servings || 4
  } : defaultRecipe;

  if (!isOpen) return null;

  const modalContent = (
    <motion.div
      className="recipe-modal-overlay bg-black/85 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        isolation: 'isolate'
      }}
    >
      <motion.div
        className="recipe-modal-content kikko-custom-scroll bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.8, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 60, opacity: 0 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          duration: 0.4
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          zIndex: 2147483647,
          position: 'relative'
        }}
      >
        {/* Efectos de partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
            />
          ))}
        </div>

        {/* Header de imagen con efectos dinámicos - Estilo KIKKO */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <motion.img 
            src={currentRecipe.image} 
            alt={currentRecipe.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay gradient corporativo KIKKO */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(5,149,211,0.1) 50%, rgba(0,0,0,0.4) 100%)'
            }}
          />
          
          {/* Decoración superior corporativa */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-kikko-blue via-kikko-yellow to-kikko-red"></div>
          
          {/* Botón cerrar mejorado estilo Kikko */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="kikko-close-button-enhanced text-gray-800 hover:text-white transition-all cursor-pointer"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  aria-label="Cerrar modal"
                  title="Cerrar (Esc)"
                >
                  <X className="w-8 h-8" strokeWidth={3} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent 
                side="left" 
                sideOffset={8}
                className="tooltip-kikko bg-white border-2 border-red-200 text-gray-800 px-3 py-2 rounded-lg shadow-lg"
                style={{ zIndex: 2147483647 }}
              >
                <div className="flex items-center gap-2">
                  <span>Cerrar receta</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Badges animados estilo KIKKO */}
          <div className="absolute top-8 left-6 flex gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge 
                className="text-sm px-5 py-2 border-2 shadow-xl backdrop-blur-md font-semibold"
                style={{ 
                  backgroundColor: 'var(--kikko-yellow)', 
                  color: 'var(--kikko-blue)',
                  borderColor: 'var(--kikko-blue)'
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {currentRecipe.difficulty}
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge 
                className="text-sm px-5 py-2 text-white border-2 shadow-xl backdrop-blur-md font-semibold"
                style={{ 
                  backgroundColor: 'var(--kikko-red)', 
                  borderColor: 'white'
                }}
              >
                <Award className="w-4 h-4 mr-2" />
                Popular
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Badge 
                className="text-sm px-5 py-2 text-white border-2 shadow-xl backdrop-blur-md font-semibold"
                style={{ 
                  backgroundColor: 'var(--kikko-blue)', 
                  borderColor: 'white'
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Con Video
              </Badge>
            </motion.div>
          </div>

          {/* Barra de progreso de cocción animada */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: cookingProgress / 100 }}
            style={{ originX: 0 }}
          />

          {/* Información superpuesta con animaciones */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <motion.h1 
              className="font-klein-bold mb-4 leading-tight text-white"
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentRecipe.title}
            </motion.h1>
            
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i}>
                        <Star 
                          className={`w-5 h-5 ${
                            i < Math.floor(currentRecipe.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-white/40'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-lg">{currentRecipe.rating} ({currentRecipe.reviews} reseñas)</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Timer className="w-5 h-5 text-yellow-300" />
                    <span>{currentRecipe.prepTime}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users className="w-5 h-5 text-blue-300" />
                    <span>{currentRecipe.servings} personas</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Eye className="w-5 h-5 text-green-300" />
                    <span>1.2K vistas</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <SocialShare
                  recipeTitle={currentRecipe.title}
                  recipeUrl={`https://kikko.com/recetas/${currentRecipe.id}`}
                  recipeImage={currentRecipe.image}
                  darkMode={false}
                />
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={() => setIsSaved(!isSaved)}
                    className="border-white text-white hover:text-white transition-all"
                    style={{
                      backgroundColor: isSaved ? 'var(--pantone-yellow)' : 'transparent',
                      borderColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--pantone-yellow)';
                      e.currentTarget.style.color = 'var(--pantone-black)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isSaved ? 'var(--pantone-yellow)' : 'transparent';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Guardado' : 'Guardar'}
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                >
                  <Button
                    onClick={() => setIsLiked(!isLiked)}
                    className="text-white border-0 transition-all"
                    style={{
                      backgroundColor: isLiked ? 'var(--pantone-orange)' : 'rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isLiked ? 'var(--pantone-orange-dark)' : 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isLiked ? 'var(--pantone-orange)' : 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Te gusta' : 'Me gusta'}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contenido principal con efectos */}
        <div className="p-8">
          {/* Información del autor con diseño KIKKO */}
          <motion.div 
            className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl border-2 shadow-lg"
            style={{ borderColor: 'var(--kikko-blue)' }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 15px 40px rgba(5,149,211,0.15)" 
            }}
          >
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--kikko-blue) 0%, var(--kikko-blue-dark) 100%)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <ChefHat className="w-8 h-8" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-kikko-blue">Chef {currentRecipe.author}</h3>
                <p className="text-gray-600">Especialista en cocina oriental</p>
              </div>
            </div>
            
            <motion.div 
              className="flex items-center gap-3 text-lg bg-kikko-yellow/10 px-4 py-2 rounded-xl border border-kikko-yellow/30"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: 'var(--kikko-yellow)' }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(255, 215, 0, 0.6)",
                    "0 0 0 10px rgba(255, 215, 0, 0)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-kikko-blue font-semibold">
                Preparado con <span className="text-kikko-yellow">KIKKO</span> {currentRecipe.kikkoProduct}
              </span>
            </motion.div>
          </motion.div>

          {/* Info nutricional interactiva con colores KIKKO */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { value: currentRecipe.nutrition?.calories || '380', label: "Calorías", color: "kikko-red", bgColor: "rgba(220, 53, 69, 0.1)", icon: "🔥" },
              { value: currentRecipe.prepTime, label: "Preparación", color: "kikko-blue", bgColor: "rgba(5, 149, 211, 0.1)", icon: "⏱️" },
              { value: currentRecipe.cookTime || currentRecipe.prepTime, label: "Cocción", color: "kikko-yellow", bgColor: "rgba(255, 215, 0, 0.1)", icon: "🍳" },
              { value: currentRecipe.servings, label: "Porciones", color: "kikko-blue", bgColor: "rgba(5, 149, 211, 0.1)", icon: "👥" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl cursor-pointer group border-2 border-transparent hover:shadow-lg transition-all"
                style={{ 
                  backgroundColor: item.bgColor,
                  borderColor: 'transparent'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  borderColor: `var(--${item.color})`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNutrition(!showNutrition)}
              >
                <motion.div 
                  className="text-4xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <div 
                  className="text-2xl mb-2 group-hover:scale-110 transition-transform font-bold"
                  style={{ color: `var(--${item.color})` }}
                >
                  {item.value}
                </div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredientes con checkboxes animados */}
            <div>
              <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-3">
                <Utensils className="w-6 h-6 text-blue-600" />
                Ingredientes
              </h2>
              <div className="space-y-3">
                {(currentRecipe.ingredients || []).map((ingredient, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all cursor-pointer group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-5 h-5 border-2 border-blue-500 rounded flex items-center justify-center group-hover:bg-blue-500 transition-colors"
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      />
                    </motion.div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-colors">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Instrucciones con progreso */}
            <div>
              <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-3">
                <ChefHat className="w-6 h-6 text-blue-600" />
                Preparación
              </h2>
              <div className="space-y-4">
                {(currentRecipe.instructions || []).map((instruction, index) => (
                  <motion.div
                    key={index}
                    className={`flex gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                      activeStep === index ? 'bg-blue-100 shadow-lg' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                        activeStep === index 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'bg-gray-300 text-gray-600'
                      }`}
                      animate={activeStep === index ? { 
                        scale: [1, 1.1, 1],
                        boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)"]
                      } : {}}
                      transition={{ duration: 1, repeat: activeStep === index ? Infinity : 0 }}
                    >
                      {index + 1}
                    </motion.div>
                    <p className={`leading-relaxed ${
                      activeStep === index ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {instruction}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips del chef con diseño KIKKO */}
          <motion.div 
            className="mt-8 p-6 rounded-2xl border-2 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(5, 149, 211, 0.05) 100%)',
              borderColor: 'var(--kikko-yellow)'
            }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Efecto de brillo KIKKO */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-kikko-yellow/20 to-transparent"
              animate={{ x: [-200, 400] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <h3 className="text-xl mb-4 flex items-center gap-3 relative z-10 font-semibold" style={{ color: 'var(--kikko-blue)' }}>
              <motion.div
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--kikko-yellow)' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-kikko-blue" />
              </motion.div>
              Tips del Chef <span className="text-kikko-yellow">KIKKO</span>
            </h3>
            <div className="space-y-3 relative z-10">
              {(currentRecipe.tips || []).map((tip, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-kikko-yellow/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    💡
                  </motion.span>
                  <span className="text-kikko-blue font-medium">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video de Preparación Centrado - SECCIÓN PRINCIPAL */}
          <motion.div 
            className="mt-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.h2 
                className="font-klein-bold text-kikko-blue mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                VIDEO DE <span className="text-kikko-yellow">PREPARACIÓN</span>
              </motion.h2>
              <div className="w-24 h-1 bg-kikko-yellow mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Aprende paso a paso cómo preparar esta deliciosa receta con <strong className="text-kikko-yellow">KIKKO</strong>
              </p>
            </div>

            {/* Contenedor del video centrado */}
            <motion.div 
              className="relative max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decoración superior del video */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-kikko-blue via-kikko-yellow to-kikko-red"></div>
              
              {/* Video principal */}
              <motion.video
                controls
                className="w-full h-auto aspect-video"
                poster={currentRecipe.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <source 
                  src="https://mybucketkikko.s3.us-east-1.amazonaws.com/preparacion.mp4" 
                  type="video/mp4" 
                />
                Tu navegador no soporta videos HTML5.
              </motion.video>

              {/* Overlay de información sobre el video */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-kikko-yellow" />
                      <span className="text-sm">Preparación completa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-kikko-yellow" />
                      <span className="text-sm">{currentRecipe.prepTime} de duración</span>
                    </div>
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 bg-kikko-yellow/20 backdrop-blur-sm px-3 py-1 rounded-full border border-kikko-yellow/40"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="w-4 h-4 text-kikko-yellow" />
                    <span className="text-sm font-semibold">Con KIKKO</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Badges de información del video */}
            <motion.div 
              className="flex justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <motion.div 
                className="flex items-center gap-2 bg-white border-2 border-kikko-blue/20 px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05, borderColor: 'var(--kikko-blue)' }}
              >
                <Eye className="w-4 h-4 text-kikko-blue" />
                <span className="text-sm text-gray-700">HD Quality</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-white border-2 border-kikko-yellow/20 px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05, borderColor: 'var(--kikko-yellow)' }}
              >
                <Users className="w-4 h-4 text-kikko-yellow" />
                <span className="text-sm text-gray-700">Fácil de seguir</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-white border-2 border-kikko-red/20 px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05, borderColor: 'var(--kikko-red)' }}
              >
                <ChefHat className="w-4 h-4 text-kikko-red" />
                <span className="text-sm text-gray-700">Paso a paso</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Separador visual elegante */}
          <motion.div 
            className="flex items-center justify-center my-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-kikko-blue to-transparent w-full max-w-md"></div>
            <motion.div 
              className="mx-4 p-3 bg-white border-2 border-kikko-yellow rounded-full shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Utensils className="w-5 h-5 text-kikko-yellow" />
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-kikko-blue to-transparent w-full max-w-md"></div>
          </motion.div>

          {/* Botones de acción con efectos modernos */}
          <motion.div 
            className="flex justify-center gap-4 mt-8 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="text-white shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg rounded-xl relative overflow-hidden border-0"
                style={{ 
                  background: 'linear-gradient(135deg, var(--kikko-blue) 0%, var(--kikko-blue-dark) 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--kikko-blue-light) 0%, var(--kikko-blue) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--kikko-blue) 0%, var(--kikko-blue-dark) 100%)';
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <Bookmark className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10">Guardar Receta</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-xl border-3 hover:shadow-lg transition-all"
                style={{ 
                  borderColor: 'var(--kikko-yellow)',
                  color: 'var(--kikko-blue)',
                  backgroundColor: 'transparent',
                  borderWidth: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kikko-yellow)';
                  e.currentTarget.style.color = 'var(--kikko-blue)';
                  e.currentTarget.style.borderColor = 'var(--kikko-yellow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--kikko-blue)';
                  e.currentTarget.style.borderColor = 'var(--kikko-yellow)';
                }}
              >
                <Share2 className="w-5 h-5 mr-3" />
                Compartir Receta
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Usar portal para renderizar el modal directamente en el body
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}