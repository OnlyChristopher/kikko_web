import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, Star, ChefHat, ArrowLeft, Heart, Share2, Download, Play, ShoppingCart, ArrowRight, Eye, BookOpen, Timer, ThumbsUp, MessageCircle, Bookmark, ChevronRight, Printer, ChefHat as ChefIcon, Utensils, Target, Award, Coffee, Instagram, Twitter, Facebook } from 'lucide-react';
import { Footer } from './Footer';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  rating: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  category: string;
  calories?: number;
  views?: number;
  likes?: number;
  author?: string;
  date?: string;
  featured?: boolean;
  ingredients?: string[];
}

interface RecipeDetailPageV2Props {
  recipe: Recipe | null;
  onBackToRecipes: () => void;
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToNovedades: () => void;
  onNavigateToProductos: () => void;
  onNavigateToRecipeDetail: (recipe: Recipe) => void;
}

export function RecipeDetailPageV2({
  recipe,
  onBackToRecipes,
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToNovedades,
  onNavigateToProductos,
  onNavigateToRecipeDetail
}: RecipeDetailPageV2Props) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [servings, setServings] = useState(recipe?.servings || 4);

  // Recipe data - adaptado al nuevo diseño tipo blog culinario
  const recipeData = recipe || {
    id: 'pasta-con-queso-extra',
    title: 'Pasta con Queso Extra y Toppings',
    description: 'Una deliciosa combinación de pasta con queso extra y toppings frescos. Preparada con el toque especial de KIKKO para un sabor único e irresistible que conquistará tu paladar y el de toda tu familia.',
    image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_1.png',
    time: '25 min',
    servings: 4,
    rating: 4.8,
    difficulty: 'Intermedio' as const,
    category: 'principal',
    calories: 420,
    views: 2847,
    likes: 234,
    author: 'Chef María González',
    date: '15 Ene 2025'
  };

  const ingredients = [
    { name: 'Pasta penne', amount: '400g', essential: true },
    { name: 'Queso mozzarella rallado', amount: '200g', essential: true },
    { name: 'Salsa soya KIKKO', amount: '3 cucharadas', essential: true, highlight: true },
    { name: 'Tomates cherry', amount: '250g', essential: true },
    { name: 'Queso parmesano', amount: '100g', essential: false },
    { name: 'Albahaca fresca', amount: '15 hojas', essential: false },
    { name: 'Ajo picado', amount: '4 dientes', essential: true },
    { name: 'Cebolla mediana', amount: '1 unidad', essential: true },
    { name: 'Aceite de oliva extra virgen', amount: '3 cucharadas', essential: true },
    { name: 'Crema de leche', amount: '200ml', essential: true },
    { name: 'Sal y pimienta negra', amount: 'Al gusto', essential: false },
    { name: 'Orégano seco', amount: '1 cucharadita', essential: false }
  ];

  const instructions = [
    {
      step: 1,
      title: 'Preparar los Ingredientes',
      description: 'Corta la cebolla y el ajo finamente. Corta los tomates cherry por la mitad y ralla los quesos. Ten todos los ingredientes listos antes de comenzar.',
      time: '5 min',
      tip: 'Tener todos los ingredientes preparados hace que la cocción sea más fluida y exitosa'
    },
    {
      step: 2,
      title: 'Cocinar la Pasta',
      description: 'Hierve agua con sal abundante en una olla grande. Cocina la pasta penne según las instrucciones del paquete hasta que esté al dente.',
      time: '8 min',
      tip: 'Reserva 1 taza del agua de cocción de la pasta antes de escurrirla, te ayudará con la salsa'
    },
    {
      step: 3,
      title: 'Preparar el Sofrito Base',
      description: 'En una sartén grande, calienta el aceite de oliva a fuego medio. Sofríe la cebolla y el ajo hasta que estén dorados y aromáticos.',
      time: '6 min',
      tip: 'No dejes que el ajo se queme, debe dorarse ligeramente para aportar sabor sin amargor'
    },
    {
      step: 4,
      title: 'Añadir Tomates y KIKKO',
      description: 'Incorpora los tomates cherry y cocina hasta que se ablanden. Añade las 3 cucharadas de salsa soya KIKKO y mezcla bien.',
      time: '4 min',
      tip: 'La salsa KIKKO aporta un umami único que transforma completamente el sabor del plato',
      highlight: true
    },
    {
      step: 5,
      title: 'Crear la Salsa Cremosa',
      description: 'Reduce el fuego a bajo y añade la crema de leche gradualmente. Incorpora la pasta escurrida y mezcla suavemente.',
      time: '3 min',
      tip: 'Si la salsa está muy espesa, añade un poco del agua de cocción reservada'
    },
    {
      step: 6,
      title: 'Finalizar y Servir',
      description: 'Añade los quesos rallados y mezcla hasta que se derritan. Ajusta sazón, decora con albahaca fresca y sirve inmediatamente.',
      time: '2 min',
      tip: 'Sirve en platos precalentados para mantener la temperatura perfecta'
    }
  ];

  const nutritionInfo = [
    { label: 'Calorías', value: '420 kcal', icon: '🔥' },
    { label: 'Proteínas', value: '18g', icon: '💪' },
    { label: 'Carbohidratos', value: '52g', icon: '🌾' },
    { label: 'Grasas', value: '16g', icon: '🥑' },
    { label: 'Fibra', value: '3g', icon: '🌿' },
    { label: 'Sodio', value: '720mg', icon: '🧂' }
  ];

  const relatedRecipes: Recipe[] = [
    {
      id: 'pollo-grillado-vegetales',
      title: 'Pollo Grillado con Vegetales',
      description: 'Pechuga de pollo perfectamente grillada con vegetales frescos',
      image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_2.PNG',
      time: '35 min',
      servings: 3,
      rating: 4.9,
      difficulty: 'Intermedio',
      category: 'principal',
      author: 'Chef Carlos Mendoza',
      date: '12 Ene 2025'
    },
    {
      id: 'pescado-filete-vegetales',
      title: 'Filete de Pescado con Vegetales',
      description: 'Filete de pescado fresco al horno con vegetales mediterráneos',
      image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_3.png',
      time: '30 min',
      servings: 2,
      rating: 4.7,
      difficulty: 'Fácil',
      category: 'principal',
      author: 'Chef Isabella Romano',
      date: '10 Ene 2025'
    },
    {
      id: 'bowl-arroz-asiatico',
      title: 'Bowl de Arroz Asiático',
      description: 'Bowl completo de arroz con vegetales y salsa KIKKO',
      image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_4.png',
      time: '20 min',
      servings: 1,
      rating: 4.6,
      difficulty: 'Fácil',
      category: 'bowl',
      author: 'Chef Hiroshi Tanaka',
      date: '08 Ene 2025'
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipeData.title,
        text: recipeData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const adjustServings = (newServings: number) => {
    if (newServings >= 1 && newServings <= 12) {
      setServings(newServings);
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(https://mybucketkikko.s3.us-east-1.amazonaws.com/mesa_verduras.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay culinario mejorado */}
      <div className="culinary-bg-overlay absolute inset-0 z-0"></div>

      {/* Hero Section estilo blog culinario */}
      <section className="relative z-10 min-h-screen flex items-center py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagen principal del plato */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[4/5] relative">
                  <ImageWithFallback
                    src={recipeData.image}
                    alt={recipeData.title}
                    className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badge de tiempo flotante */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-kikko-yellow text-pantone-black font-bold">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipeData.time}
                    </Badge>
                  </div>
                  
                  {/* Badge de dificultad */}
                  <div className="absolute top-6 right-6">
                    <Badge className={`text-white font-bold ${
                      recipeData.difficulty === 'Fácil' ? 'bg-green-600' :
                      recipeData.difficulty === 'Intermedio' ? 'bg-kikko-blue' : 'bg-kikko-red'
                    }`}>
                      <Target className="w-3 h-3 mr-1" />
                      {recipeData.difficulty}
                    </Badge>
                  </div>

                  {/* Stats inferiores */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 p-4 border border-kikko-yellow">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Eye className="w-4 h-4 text-kikko-blue mr-1" />
                          </div>
                          <div className="font-bold text-gray-900">{recipeData.views}</div>
                          <div className="text-xs text-gray-600">Vistas</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Heart className="w-4 h-4 text-kikko-red mr-1" />
                          </div>
                          <div className="font-bold text-gray-900">{recipeData.likes}</div>
                          <div className="text-xs text-gray-600">Me gusta</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Star className="w-4 h-4 text-kikko-yellow fill-current mr-1" />
                          </div>
                          <div className="font-bold text-gray-900">{recipeData.rating}</div>
                          <div className="text-xs text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Información de la receta */}
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/95 p-8 border border-kikko-yellow">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <button
                    onClick={onBackToRecipes}
                    className="hover:text-kikko-blue transition-colors font-medium"
                  >
                    ← Volver a Recetas
                  </button>
                </div>

                {/* Header con badges */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-kikko-red text-white font-bold">DESTACADA</Badge>
                  <Badge variant="outline" className="border-kikko-blue text-kikko-blue font-bold">
                    {recipeData.category.toUpperCase()}
                  </Badge>
                </div>

                <h1 className="font-klein-bold text-3xl lg:text-4xl text-gray-900 mb-4 leading-tight culinary-text-enhanced">
                  {recipeData.title}
                </h1>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed culinary-text-enhanced">
                  {recipeData.description}
                </p>

                {/* Stats principales estilo blog */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="text-center p-3 bg-white border border-kikko-blue">
                    <Users className="w-5 h-5 mx-auto mb-2 text-kikko-blue" />
                    <div className="font-bold text-gray-900">{recipeData.servings}</div>
                    <div className="text-xs text-gray-600">Porciones</div>
                  </div>
                  <div className="text-center p-3 bg-white border border-kikko-yellow">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-kikko-blue" />
                    <div className="font-bold text-gray-900">{recipeData.time}</div>
                    <div className="text-xs text-gray-600">Tiempo</div>
                  </div>
                  <div className="text-center p-3 bg-white border border-kikko-yellow">
                    <Star className="w-5 h-5 mx-auto mb-2 text-kikko-yellow fill-current" />
                    <div className="font-bold text-gray-900">{recipeData.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-white border border-kikko-red">
                    <div className="text-lg mb-2">🔥</div>
                    <div className="font-bold text-gray-900">{recipeData.calories}</div>
                    <div className="text-xs text-gray-600">kcal</div>
                  </div>
                </div>

                {/* Información del autor estilo blog */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white border border-kikko-blue">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-kikko-blue text-white font-bold flex items-center justify-center">
                      <ChefIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{recipeData.author}</div>
                      <div className="text-sm text-gray-600">{recipeData.date}</div>
                      <div className="text-xs text-kikko-blue">Chef Profesional</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{recipeData.likes}</span>
                    <MessageCircle className="w-4 h-4 ml-2" />
                    <span>18</span>
                  </div>
                </div>

                {/* Botones de acción principales */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button
                    size="lg"
                    className="bg-kikko-blue text-white hover:bg-kikko-blue-dark font-bold py-3"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Comenzar a Cocinar
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-kikko-yellow text-kikko-blue hover:bg-kikko-yellow font-bold py-3"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir Receta
                  </Button>
                </div>

                {/* Botones secundarios */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'bg-white border-kikko-red text-kikko-red' : 'border-gray-300 hover:bg-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`${isBookmarked ? 'bg-white border-kikko-blue text-kikko-blue' : 'border-gray-300 hover:bg-white'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-gray-300 hover:bg-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de contenido con pestañas - Estilo blog culinario */}
      <section className="relative z-10 py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Navigation tabs estilo blog */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/95 p-2 flex gap-2 border border-kikko-yellow">
              {[
                { id: 'ingredients', label: 'Ingredientes', icon: BookOpen },
                { id: 'instructions', label: 'Preparación', icon: Timer },
                { id: 'nutrition', label: 'Nutrición', icon: Heart }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-bold transition-all duration-300 ${
                    activeTab === id
                      ? 'bg-kikko-blue text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content con fondo culinario */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 p-8 border border-kikko-yellow"
          >
            {activeTab === 'ingredients' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-klein-bold text-2xl culinary-text-enhanced">Lista de Ingredientes</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">Porciones:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustServings(servings - 1)}
                        className="w-8 h-8 bg-kikko-blue text-white hover:bg-kikko-blue-dark flex items-center justify-center font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-xl w-8 text-center">{servings}</span>
                      <button
                        onClick={() => adjustServings(servings + 1)}
                        className="w-8 h-8 bg-kikko-blue text-white hover:bg-kikko-blue-dark flex items-center justify-center font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ingredients.map((ingredient, index) => {
                    const adjustedAmount = ingredient.amount.includes('g') || ingredient.amount.includes('ml') 
                      ? `${Math.round(parseInt(ingredient.amount) * (servings / (recipeData.servings || 4)))}${ingredient.amount.slice(-1)}`
                      : ingredient.amount;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`flex items-center justify-between p-3 border transition-all duration-300 ${
                          ingredient.highlight 
                            ? 'border-kikko-yellow bg-kikko-yellow/20' 
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {ingredient.highlight && (
                            <div className="w-3 h-3 bg-kikko-yellow"></div>
                          )}
                          <span className="font-medium text-gray-700">
                            {ingredient.name}
                            {ingredient.highlight && (
                              <span className="text-kikko-yellow ml-2 font-bold text-lg">★</span>
                            )}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900">{adjustedAmount}</span>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-6 bg-kikko-yellow/20 border border-kikko-yellow">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-kikko-yellow text-xl">★</span>
                    Ingrediente Estrella <span className="font-klein-bold text-kikko-yellow">KIKKO</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    La <span className="font-bold text-kikko-yellow">Salsa Soya KIKKO</span> es el ingrediente que 
                    transformará esta receta, aportando un sabor único y auténtico que marca la diferencia.
                    <span className="font-klein-bold text-kikko-blue ml-1">ES MÁS RICO CON KIKKO</span>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h3 className="font-klein-bold text-2xl mb-6 text-center culinary-text-enhanced">
                  Instrucciones Paso a Paso
                </h3>
                <div className="space-y-6">
                  {instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`flex gap-6 p-4 transition-all duration-300 hover:bg-gray-50 ${
                        instruction.highlight ? 'bg-kikko-yellow/10 border-l-4 border-kikko-yellow' : ''
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 ${
                          instruction.highlight 
                            ? 'bg-kikko-yellow text-pantone-black' 
                            : 'bg-kikko-blue text-white'
                        } font-bold text-lg flex items-center justify-center`}>
                          {instruction.step}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h4 className="font-bold text-xl text-gray-900">{instruction.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {instruction.time}
                          </Badge>
                          {instruction.highlight && (
                            <Badge className="bg-kikko-yellow text-pantone-black font-bold">
                              <span className="text-kikko-yellow mr-1">★</span>
                              CON KIKKO
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {instruction.description}
                        </p>
                        
                        <div className="bg-blue-50 border-l-4 border-kikko-blue p-3">
                          <p className="text-sm text-kikko-blue-dark font-medium">
                            💡 <strong>Tip del Chef:</strong> {instruction.tip}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="font-klein-bold text-2xl mb-6 text-center culinary-text-enhanced">
                  Información Nutricional
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {nutritionInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white to-gray-50 p-4 text-center hover:bg-gradient-to-br hover:from-kikko-blue/5 hover:to-kikko-yellow/5 transition-all duration-300 border border-gray-200 hover:border-kikko-blue/30"
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="font-bold text-xl text-gray-900 mb-1">{item.value}</div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                  <h4 className="font-bold text-lg mb-4 text-center">Beneficios Nutricionales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Alto en proteínas</p>
                        <p className="text-sm text-gray-600">Ideal para el desarrollo muscular</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Fuente de energía</p>
                        <p className="text-sm text-gray-600">Carbohidratos complejos saludables</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Rico en umami</p>
                        <p className="text-sm text-gray-600">Gracias a la salsa KIKKO</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Bajo en sodio</p>
                        <p className="text-sm text-gray-600">Equilibrio perfecto de sabores</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Recetas relacionadas estilo masonry */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-klein-bold text-3xl text-white mb-2 culinary-text-enhanced">
              Recetas Relacionadas
            </h2>
            <p className="text-gray-200 culinary-text-enhanced">
              Otras recetas que podrían interesarte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="masonry-card cursor-pointer group"
                onClick={() => onNavigateToRecipeDetail(recipe)}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Badge de tiempo */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-700 font-bold">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.time}
                    </Badge>
                  </div>
                  
                  {/* Badge de dificultad */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`text-white font-bold ${
                      recipe.difficulty === 'Fácil' ? 'bg-green-600' :
                      recipe.difficulty === 'Intermedio' ? 'bg-orange-500' : 'bg-red-600'
                    }`}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Rating flotante */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-bold text-gray-900">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-kikko-blue transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ChefIcon className="w-3 h-3" />
                      <span>{recipe.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{recipe.servings} personas</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botón ver más */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="bg-white/90 border-2 border-kikko-yellow hover:bg-kikko-yellow text-kikko-blue font-bold px-8 py-3 transition-all duration-300 hover:scale-105"
              onClick={onBackToRecipes}
            >
              Ver Todas las Recetas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10">
        <Footer 
          onNavigateToHome={onNavigateToHome}
          onNavigateToAbout={onNavigateToAbout}
          onNavigateToRecipes={onBackToRecipes}
          onNavigateToNovedades={onNavigateToNovedades}
          onNavigateToProductos={onNavigateToProductos}
        />
      </div>
    </div>
  );
}