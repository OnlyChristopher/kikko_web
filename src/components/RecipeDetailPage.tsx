import { motion } from 'motion/react';
import { Star, Clock, ChefHat, Heart, Bookmark, Eye, Users, Utensils, Play, Share2, ArrowLeft, Timer, Sparkles, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Footer } from './Footer';
import { SocialShare } from './SocialShare';
import { useState, useEffect } from 'react';
import backgroundWood from 'figma:asset/892a335c8296809d0cf54ac882858bf613fbbabe.png';
import chefImage from 'figma:asset/1096192608eadce5588b4158b544b568e8269fb9.png';
import preparationBg from 'figma:asset/7f2861779d3dfa8c803af112ec6a27db193148ef.png';

interface RecipeDetailPageProps {
  recipe?: any;
  onBackToRecipes: () => void;
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToNovedades: () => void;
  onNavigateToProductos: () => void;
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

export function RecipeDetailPage({ 
  recipe, 
  onBackToRecipes, 
  onNavigateToHome, 
  onNavigateToAbout, 
  onNavigateToNovedades, 
  onNavigateToProductos 
}: RecipeDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);
  const cookingProgress = useCookingProgress();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Banner principal simplificado - SOLO TÍTULO */}
      <section className="relative h-screen overflow-hidden">
        {/* Video de fondo como banner principal */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={currentRecipe.image}
          >
            <source 
              src="https://mybucketkikko.s3.us-east-1.amazonaws.com/preparacion.mp4" 
              type="video/mp4" 
            />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>

        {/* Overlay gradient minimal para mejor visualización del video */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.2) 100%)'
          }}
        />
        
        {/* Título principal centrado - SOLO TÍTULO */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="container mx-auto px-6">
            <motion.h1 
              className="font-klein-bold leading-tight text-white max-w-5xl mx-auto hero-mobile-text hero-mobile-spacing text-center"
              style={{ 
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                textShadow: '0 8px 32px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {currentRecipe.title.toUpperCase()}
            </motion.h1>
          </div>
        </div>

        {/* Botón flotante discreto para regresar */}
        <motion.button
          onClick={onBackToRecipes}
          className="absolute bottom-8 left-8 z-20 bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/20 hover:bg-white/25 transition-all duration-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER</span>
        </motion.button>

        {/* Scroll indicator sutil */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowLeft className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contenido principal - 2 COLUMNAS - TODO EL ANCHO CON FONDO DE MADERA */}
      <section 
        className="relative py-16 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundWood})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay con menos opacidad para la imagen de fondo */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
        
        <div className="relative w-full px-4 lg:px-8 z-10">
          
          {/* Header simplificado sin KIKKO */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 mb-6 uppercase tracking-wide leading-tight">
              MAESTRÍA <span className="text-kikko-blue">CULINARIA</span>
            </h2>
            
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              {currentRecipe.description}
            </p>
          </motion.div>

          {/* LAYOUT 2 COLUMNAS - Video + Acordeón */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* COLUMNA IZQUIERDA - VIDEO MÁS GRANDE */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* IMAGEN DEL PLATO PRINCIPAL AMPLIADO */}
              <motion.div 
                className="relative bg-white shadow-2xl overflow-hidden border border-gray-100 mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[16/9] relative">
                  <img
                    src="https://images.unsplash.com/photo-1541963058-f6a81ac19b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBmb29kJTIwcGxhdGUlMjBnb3VybWV0JTIwZGlzaHxlbnwxfHx8fDE3NTc1MzQ4NDB8MA&ixlib=rb-4.1.0&q=80&w=1200&h=675&fit=crop&crop=center"
                    alt={currentRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay con información del plato */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="p-6 text-white w-full">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="text-lg font-bold">{currentRecipe.rating}/5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-5 h-5 text-kikko-yellow" />
                            <span className="text-lg font-bold">{currentRecipe.prepTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-kikko-blue" />
                            <span className="text-lg font-bold">{currentRecipe.servings} PERSONAS</span>
                          </div>
                        </div>
                        
                        <motion.button
                          className="bg-kikko-red hover:bg-kikko-red-dark text-white px-6 py-3 font-bold text-lg shadow-xl transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-5 h-5 mr-2 inline" />
                          VER VIDEO
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* ACCIONES DE USUARIO */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <SocialShare
                  recipeTitle={currentRecipe.title}
                  recipeUrl={`https://kikko.com/recetas/${currentRecipe.id}`}
                  recipeImage={currentRecipe.image}
                  darkMode={false}
                />
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`${isSaved ? 'bg-kikko-yellow text-kikko-blue' : 'bg-white text-gray-600 hover:bg-gray-50'} border border-gray-200 transition-all px-6 py-3 font-bold uppercase`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'GUARDADO' : 'GUARDAR'}
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  animate={isLiked ? { scale: [1, 1.1, 1] } : {}}
                >
                  <Button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'bg-kikko-red text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} border border-gray-200 transition-all px-6 py-3 font-bold uppercase`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'ME GUSTA' : 'ME GUSTA'}
                  </Button>
                </motion.div>
              </motion.div>

              {/* SECCIÓN CHEF - DEBAJO DEL VIDEO */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div 
                  className="bg-kikko-yellow shadow-xl border-2 border-kikko-yellow-dark p-6 rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="w-24 h-20 overflow-hidden rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={chefImage}
                        alt="Chef"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-800 mb-2 uppercase">{currentRecipe.author}</h3>
                      <p className="text-lg text-gray-700 mb-3 font-medium">ESPECIALISTA EN COCINA ORIENTAL</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-600 fill-current" />
                          <span className="text-lg font-bold text-gray-800">{currentRecipe.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-gray-600" />
                          <span className="text-lg font-bold text-gray-800">{currentRecipe.reviews} RESEÑAS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* COLUMNA DERECHA - ACORDEÓN */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Accordion type="multiple" defaultValue={["ingredientes"]} className="space-y-4">
                  
                  {/* INFORMACIÓN NUTRICIONAL */}
                  <AccordionItem value="info" className="bg-white shadow-lg border-2 border-gray-100 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-kikko-red to-kikko-red-dark flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-800 uppercase tracking-wide">INFORMACIÓN NUTRICIONAL</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 text-center border border-red-200">
                          <div className="text-3xl font-black text-kikko-red mb-1">{currentRecipe.nutrition?.calories || '380'}</div>
                          <div className="text-gray-600 font-bold uppercase text-sm">Calorías</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center border border-blue-200">
                          <div className="text-3xl font-black text-kikko-blue mb-1">{currentRecipe.prepTime}</div>
                          <div className="text-gray-600 font-bold uppercase text-sm">Tiempo</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-center border border-yellow-200">
                          <div className="text-3xl font-black text-kikko-yellow mb-1">{currentRecipe.servings}</div>
                          <div className="text-gray-600 font-bold uppercase text-sm">Porciones</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 text-center border border-emerald-200">
                          <div className="text-lg font-black text-emerald-600 mb-1 uppercase">{currentRecipe.difficulty}</div>
                          <div className="text-gray-600 font-bold uppercase text-sm">Dificultad</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* INGREDIENTES - ACTIVO POR DEFECTO */}
                  <AccordionItem value="ingredientes" className="bg-white shadow-lg border-2 border-gray-100 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-kikko-blue to-kikko-blue-dark flex items-center justify-center">
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-700 uppercase tracking-wide">INGREDIENTES</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-3 mt-4">
                        {(currentRecipe.ingredients || []).map((ingredient, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-all cursor-pointer group border border-gray-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <motion.div 
                              className="w-5 h-5 border-2 border-kikko-blue flex items-center justify-center group-hover:bg-kikko-blue transition-colors flex-shrink-0"
                              whileHover={{ rotate: 360 }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-white rounded-sm opacity-0 group-hover:opacity-100"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                              />
                            </motion.div>
                            <span className="text-gray-700 group-hover:text-kikko-blue transition-colors font-medium">{ingredient}</span>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* PREPARACIÓN */}
                  <AccordionItem value="preparacion" className="bg-white shadow-lg border-2 border-gray-100 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                          <ChefHat className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-700 uppercase tracking-wide">PREPARACIÓN</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="px-6 pb-6 relative"
                      style={{
                        backgroundImage: `url(${preparationBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      {/* Overlay con opacidad para la imagen de fondo */}
                      <div className="absolute inset-0 bg-white/75 backdrop-blur-sm"></div>
                      <div className="relative z-10 space-y-4 mt-4">
                        {(currentRecipe.instructions || []).map((instruction, index) => (
                          <motion.div
                            key={index}
                            className={`relative p-4 border-2 transition-all cursor-pointer ${
                              activeStep === index 
                                ? 'bg-gradient-to-r from-kikko-blue/10 to-kikko-blue/20 border-kikko-blue shadow-lg' 
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveStep(index)}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex gap-4">
                              <motion.div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 ${
                                  activeStep === index 
                                    ? 'bg-kikko-blue text-white shadow-lg' 
                                    : 'bg-gray-300 text-gray-600'
                                }`}
                                animate={activeStep === index ? { 
                                  scale: [1, 1.1, 1],
                                  boxShadow: [
                                    "0 0 0 0 rgba(5, 149, 211, 0.4)", 
                                    "0 0 0 8px rgba(5, 149, 211, 0)"
                                  ]
                                } : {}}
                                transition={{ duration: 1.5, repeat: activeStep === index ? Infinity : 0 }}
                              >
                                {index + 1}
                              </motion.div>
                              
                              <div className="flex-1">
                                <p className={`leading-relaxed font-medium ${
                                  activeStep === index ? 'text-kikko-blue' : 'text-gray-700'
                                }`}>
                                  {instruction}
                                </p>
                                
                                {activeStep === index && (
                                  <motion.div 
                                    className="mt-2 flex items-center gap-2 text-kikko-blue text-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                      <Sparkles className="w-4 h-4" />
                                    </motion.div>
                                    <span className="font-bold uppercase">PASO ACTIVO</span>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* TIPS DEL CHEF */}
                  <AccordionItem value="tips" className="bg-white shadow-lg border-2 border-gray-100 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-kikko-yellow to-kikko-yellow-dark flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-700 uppercase tracking-wide">TIPS DEL CHEF <span className="text-kikko-yellow">KIKKO</span></span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 mt-4">
                        {(currentRecipe.tips || []).map((tip, index) => (
                          <motion.div
                            key={index}
                            className="bg-gradient-to-br from-yellow-50 via-white to-blue-50 p-4 border-2 border-kikko-yellow/30 hover:shadow-lg transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                          >
                            <div className="flex gap-3">
                              <motion.div 
                                className="w-8 h-8 bg-gradient-to-br from-kikko-blue to-kikko-blue-dark rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                              >
                                💡
                              </motion.div>
                              <p className="text-gray-700 font-medium leading-relaxed">{tip}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </motion.div>
            </motion.div>
          </div>


        </div>
      </section>

      <Footer />
    </div>
  );
}