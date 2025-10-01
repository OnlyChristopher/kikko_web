import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, Star, ChefHat, Search, Filter, ArrowRight, Eye, Heart, BookOpen, Calendar, ChevronLeft, ChevronRight, Mail, Coffee, Utensils, Soup, Cookie, Sun, Moon } from 'lucide-react';
import { Footer } from './Footer';
import { IMAGE_ASSETS } from '../constants/imageAssets';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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
  calories: number;
  views: number;
  likes: number;
  author: string;
  date: string;
  featured?: boolean;
  ingredients?: string[];
}

interface RecipesPageV2Props {
  onBackToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToNovedades: () => void;
  onNavigateToProductos: () => void;
  onNavigateToRecipeDetail: (recipe: Recipe) => void;
}

// Componente individual de RecipeCard con animación progresiva
function RecipeCard({ 
  recipe, 
  index, 
  isGridVisible,
  onNavigateToRecipeDetail 
}: { 
  recipe: Recipe; 
  index: number;
  isGridVisible: boolean;
  onNavigateToRecipeDetail: (recipe: Recipe) => void;
}) {

  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 150, 
        scale: 0.3,
        rotateY: -90,
        rotateX: -45,
        filter: "blur(10px)"
      }}
      animate={isGridVisible ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        filter: "blur(0px)"
      } : {
        opacity: 0, 
        y: 150, 
        scale: 0.3,
        rotateY: -90,
        rotateX: -45,
        filter: "blur(10px)"
      }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.3, // Delay mucho más notable
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      className="bg-white shadow-lg hover:shadow-xl cursor-pointer group"
      style={{ 
        backgroundColor: isGridVisible ? '#ffffff' : '#f0f0f0',
        borderRadius: '0px',
        overflow: 'hidden'
      }}
      onClick={() => onNavigateToRecipeDetail(recipe)}
    >
      {/* Imagen cuadrada */}
      <div className="relative aspect-square overflow-hidden">
        
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge de categoría */}
        <motion.div 
          className="absolute top-4 left-4"
          initial={{ opacity: 0, scale: 0, rotate: -360, x: -100 }}
          animate={isGridVisible ? { 
            opacity: 1, 
            scale: 1,
            rotate: 0,
            x: 0
          } : { opacity: 0, scale: 0, rotate: -360, x: -100 }}
          transition={{ 
            duration: 0.8, 
            delay: (index * 0.3) + 0.6,
            type: "spring",
            stiffness: 120
          }}
        >
          <Badge className="bg-kikko-yellow text-kikko-blue font-bold text-xs px-2 py-1">
            {recipe.category.toUpperCase()}
          </Badge>
        </motion.div>

        {/* Rating overlay - ÚNICO INDICADOR */}
        <motion.div 
          className="absolute top-4 right-4 masonry-rating-bg px-2 py-1"
          initial={{ opacity: 0, scale: 0, x: 100, rotate: 360 }}
          animate={isGridVisible ? { 
            opacity: 1, 
            scale: 1,
            x: 0,
            rotate: 0
          } : { opacity: 0, scale: 0, x: 100, rotate: 360 }}
          transition={{ 
            duration: 0.8, 
            delay: (index * 0.3) + 0.8,
            type: "spring"
          }}
        >
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-bold">{recipe.rating}</span>
          </div>
        </motion.div>
      </div>

      {/* Contenido de la tarjeta */}
      <motion.div 
        className="p-6"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isGridVisible ? { 
          opacity: 1, 
          y: 0,
          scale: 1
        } : { opacity: 0, y: 50, scale: 0.8 }}
        transition={{ 
          duration: 0.8, 
          delay: (index * 0.3) + 0.4,
          ease: "easeOut",
          type: "spring"
        }}
      >
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        {/* Meta información simplificada */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-3 h-3" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Componente GridMasonrySection
function GridMasonrySection({
  filteredRecipes,
  clearFilters,
  onNavigateToRecipeDetail
}: {
  filteredRecipes: Recipe[];
  clearFilters: () => void;
  onNavigateToRecipeDetail: (recipe: Recipe) => void;
}) {
  
  // Hook para detectar cuando la sección entra en viewport
  const { ref: sectionRef, isInView } = useIntersectionObserver({
    threshold: 0.01, // Muy bajo threshold para activar fácilmente
    rootMargin: '200px', // Margen generoso
    triggerOnce: true
  });

  // Debug log para verificar que funciona
  // console.log('GridMasonrySection isInView:', isInView);

  // Estado interno para forzar animación después de un delay (para testing)
  const [forceAnimation, setForceAnimation] = useState(false);
  
  useEffect(() => {
    // Forzar animación después de 500ms si no se detecta intersección
    const timer = setTimeout(() => {
      if (!isInView) {
        // console.log('Forzando animación por timeout - 500ms');
        setForceAnimation(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isInView]);

  // NUEVO: Forzar animación automáticamente después de 2 segundos
  useEffect(() => {
    const autoTimer = setTimeout(() => {
      // console.log('Forzando animación automática después de 2s');
      setForceAnimation(true);
    }, 2000);
    
    return () => clearTimeout(autoTimer);
  }, []);

  const shouldAnimate = isInView || forceAnimation;

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-white/85" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          
          <motion.h2 
            className="font-klein-bold text-3xl lg:text-4xl text-gray-900 mb-4"
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.5 }}
            transition={{ duration: 1.0, ease: "easeOut", type: "spring", stiffness: 100 }}
          >
            Explora Nuestras <span className="text-kikko-yellow">Recetas</span>
          </motion.h2>
          
        </div>

        {/* Grid de recetas - ANIMACIÓN PROGRESIVA */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                isGridVisible={shouldAnimate}
                onNavigateToRecipeDetail={onNavigateToRecipeDetail}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className="culinary-no-results text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos recetas</h3>
            <p className="text-gray-600 mb-4">
              Intenta con diferentes palabras clave o categorías
            </p>
            <Button onClick={clearFilters} className="bg-kikko-blue hover:bg-kikko-blue-dark text-white">
              Ver todas las recetas
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function RecipesPageV2({
  onBackToHome,
  onNavigateToAbout,
  onNavigateToNovedades,
  onNavigateToProductos,
  onNavigateToRecipeDetail
}: RecipesPageV2Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Recetas principales para el slider hero - USANDO IMÁGENES REALES DE S3
  const featuredRecipes: Recipe[] = [
    {
      id: 'pasta-con-queso-extra',
      title: 'Pasta con Queso Extra y Toppings',
      description: 'Una deliciosa combinación de pasta con queso fundido y toppings frescos, realzada con el sabor único de KIKKO',
      image: IMAGE_ASSETS.PLATO_1_IMAGE,
      time: '25 min',
      servings: 4,
      rating: 4.8,
      difficulty: 'Intermedio',
      category: 'lunch',
      calories: 420,
      views: 2847,
      likes: 234,
      author: 'Chef María González',
      date: '15 Ene 2025',
      featured: true,
      ingredients: ['Pasta penne', 'Queso mozzarella', 'Salsa KIKKO', 'Tomates cherry']
    },
    {
      id: 'pollo-grillado-vegetales',
      title: 'Pollo Grillado con Vegetales Frescos',
      description: 'Pechuga de pollo perfectamente grillada acompañada de vegetales de temporada con marinado KIKKO',
      image: IMAGE_ASSETS.PLATO_2_IMAGE,
      time: '35 min',
      servings: 3,
      rating: 4.9,
      difficulty: 'Intermedio',
      category: 'dinner',
      calories: 380,
      views: 3156,
      likes: 287,
      author: 'Chef Carlos Mendoza',
      date: '12 Ene 2025',
      featured: true,
      ingredients: ['Pechuga de pollo', 'Brócoli', 'Zanahoria', 'Salsa soya KIKKO']
    },
    {
      id: 'pescado-filete-vegetales',
      title: 'Filete de Pescado con Vegetales',
      description: 'Filete de pescado fresco al horno con una selección de vegetales mediterráneos y toque de KIKKO',
      image: IMAGE_ASSETS.PLATO_3_IMAGE,
      time: '30 min',
      servings: 2,
      rating: 4.7,
      difficulty: 'Fácil',
      category: 'lunch',
      calories: 320,
      views: 1923,
      likes: 156,
      author: 'Chef Isabella Romano',
      date: '10 Ene 2025',
      featured: true,
      ingredients: ['Filete de pescado', 'Espárragos', 'Tomates', 'Aceite de oliva', 'KIKKO']
    },
    {
      id: 'bowl-arroz-asiatico',
      title: 'Bowl de Arroz Asiático',
      description: 'Bowl completo de arroz con vegetales frescos, proteína y salsa especial KIKKO al estilo asiático',
      image: IMAGE_ASSETS.PLATO_4_IMAGE,
      time: '20 min',
      servings: 1,
      rating: 4.6,
      difficulty: 'Fácil',
      category: 'breakfast',
      calories: 350,
      views: 2234,
      likes: 198,
      author: 'Chef Hiroshi Tanaka',
      date: '08 Ene 2025',
      featured: true,
      ingredients: ['Arroz integral', 'Edamame', 'Pepino', 'Zanahoria', 'Salsa KIKKO']
    }
  ];

  // Recetas populares para el grid masonry
  const popularRecipes: Recipe[] = [
    {
      id: 'res-parrilla-vegetales',
      title: 'Res a la Parrilla con Vegetales',
      description: 'Jugoso corte de res a la parrilla acompañado de vegetales frescos realzados con el sabor único de KIKKO',
      image: 'https://images.unsplash.com/photo-1676300184878-02199c0d02f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwYmVlZiUyMHN0ZWFrJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTg2Mzk0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '25 min',
      servings: 2,
      rating: 4.5,
      difficulty: 'Intermedio',
      category: 'lunch',
      calories: 380,
      views: 1567,
      likes: 123,
      author: 'Chef Roberto Méndez',
      date: '05 Ene 2025'
    },
    {
      id: 'crispy-manzana-helado',
      title: 'Crispy de Manzana con Helado',
      description: 'Postre tradicional de manzana crujiente servido con helado de vainilla artesanal',
      image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhcHBsZSUyMGNyaXNwJTIwaWNlJTIwY3JlYW0lMjB0b3BwaW5nfGVufDF8fHx8MTc1ODYyMzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '45 min',
      servings: 6,
      rating: 4.8,
      difficulty: 'Intermedio',
      category: 'dessert',
      calories: 380,
      views: 2103,
      likes: 198,
      author: 'Chef Marie Claire',
      date: '03 Ene 2025'
    },
    {
      id: 'pescado-picante-toppings',
      title: 'Pescado Picante con Toppings Extra',
      description: 'Pescado marinado en especias picantes con variedad de toppings frescos realzados con KIKKO',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGZpc2glMjBleHRyYSUyMHRvcHBpbmd8ZW58MXx8fHwxNzU4NjIzOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '25 min',
      servings: 3,
      rating: 4.6,
      difficulty: 'Intermedio',
      category: 'dinner',
      calories: 340,
      views: 1834,
      likes: 145,
      author: 'Chef Rodriguez',
      date: '01 Ene 2025'
    },
    {
      id: 'tacos-mexicanos-frescos',
      title: 'Tacos Mexicanos con Vegetales Frescos',
      description: 'Auténticos tacos mexicanos con vegetales frescos y especias tradicionales realzados con KIKKO',
      image: 'https://images.unsplash.com/photo-1606168159202-1f3fca458c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwbWV4aWNhbiUyMGZvb2QlMjBmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU4NjM5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '15 min',
      servings: 4,
      rating: 4.9,
      difficulty: 'Fácil',
      category: 'starter',
      calories: 280,
      views: 2876,
      likes: 267,
      author: 'Chef Diego Hernández',
      date: '28 Dic 2024'
    },
    {
      id: 'pasta-carbonara-italiana',
      title: 'Pasta Carbonara Italiana',
      description: 'Auténtica pasta carbonara italiana con ingredientes tradicionales y el toque especial de KIKKO',
      image: 'https://images.unsplash.com/photo-1655662844229-d2c2a81f09ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGl0YWxpYW58ZW58MXx8fHwxNzU4NjE2MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '20 min',
      servings: 2,
      rating: 4.7,
      difficulty: 'Fácil',
      category: 'lunch',
      calories: 420,
      views: 1456,
      likes: 187,
      author: 'Chef Marco Rossi',
      date: '30 Dic 2024'
    },
    {
      id: 'salmon-grillado-vegetales',
      title: 'Salmón Grillado con Vegetales de Temporada',
      description: 'Filete de salmón perfectamente grillado acompañado de vegetales de temporada con marinado KIKKO',
      image: 'https://images.unsplash.com/photo-1598179862468-a96f7287bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTg2MzMwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '30 min',
      servings: 3,
      rating: 4.8,
      difficulty: 'Intermedio',
      category: 'dinner',
      calories: 380,
      views: 2134,
      likes: 245,
      author: 'Chef Andrea Silva',
      date: '27 Dic 2024'
    },
    {
      id: 'paella-espanola-vegetales',
      title: 'Paella Española con Vegetales',
      description: 'Tradicional paella española con arroz bomba, vegetales frescos y el toque único de KIKKO',
      image: 'https://images.unsplash.com/photo-1588077699842-b906a1c3ff23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWVsbGElMjBzcGFuaXNoJTIwcmljZSUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU4NjM5Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '35 min',
      servings: 4,
      rating: 4.6,
      difficulty: 'Intermedio',
      category: 'dinner',
      calories: 380,
      views: 1789,
      likes: 203,
      author: 'Chef Carmen López',
      date: '25 Dic 2024'
    }
  ];

  // Función para filtrar recetas
  const filteredRecipes = popularRecipes.filter(recipe => {
    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesCategory = searchTerm !== '' ? true : (selectedCategory === 'all' || recipe.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  // Chefs destacados
  const featuredChefs = [
    {
      id: 'master-chef',
      name: 'Master Chef',
      specialty: 'Cocina Internacional',
      recipes: 45,
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBjaGVmc3xlbnwxfHx8fDE3NTg2MjQwNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'christina-manganess',
      name: 'Christina Manganess',
      specialty: 'Postres y Repostería',
      recipes: 32,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpbmElMjBtYW5nYW5lc3N8ZW58MXx8fHwxNzU4NjI0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'christina-stoner',
      name: 'Christina Stoner',
      specialty: 'Nutrición Experta',
      recipes: 28,
      image: 'https://images.unsplash.com/photo-1594824980330-96794ac643ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpbmElMjBzdG9uZXJ8ZW58MXx8fHwxNzU4NjI0MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  // Productos Kikko relacionados con cada receta
  const recipeProducts = {
    'pasta-con-queso-extra': {
      name: 'Siyau Original',
      image: IMAGE_ASSETS.SIYAU_IMAGE,
      description: 'Salsa de soya perfecta para potenciar el sabor de pastas'
    },
    'pollo-grillado-vegetales': {
      name: 'Shoyu Premium',
      image: IMAGE_ASSETS.SHOYU_IMAGE,
      description: 'Marinado especial para carnes y vegetales'
    },
    'pescado-filete-vegetales': {
      name: 'Salsa Mensi',
      image: IMAGE_ASSETS.SALSA_MENSI_IMAGE,
      description: 'Condimento ideal para pescados y vegetales'
    },
    'bowl-arroz-asiatico': {
      name: 'Ajoikion',
      image: IMAGE_ASSETS.AJOIKION_IMAGE,
      description: 'Salsa asiática perfecta para bowls de arroz'
    }
  };

  // Navegación del slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredRecipes.length) % featuredRecipes.length);
  };

  // Auto-play del slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  // Categorías para el buscador horizontal
  const searchCategories = [
    {
      id: 'all',
      name: 'Todas',
      icon: Search,
      color: 'bg-gray-100 text-gray-700',
      activeColor: 'bg-kikko-blue text-white'
    },
    {
      id: 'breakfast',
      name: 'Desayuno',
      icon: Coffee,
      color: 'bg-amber-100 text-amber-700',
      activeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'starter',
      name: 'Entrada', 
      icon: Soup,
      color: 'bg-green-100 text-green-700',
      activeColor: 'bg-green-500 text-white'
    },
    {
      id: 'lunch',
      name: 'Almuerzo',
      icon: Sun,
      color: 'bg-blue-100 text-blue-700',
      activeColor: 'bg-blue-500 text-white'
    },
    {
      id: 'dinner',
      name: 'Cena',
      icon: Moon,
      color: 'bg-red-100 text-red-700',
      activeColor: 'bg-red-500 text-white'
    },
    {
      id: 'dessert',
      name: 'Postre',
      icon: Cookie,
      color: 'bg-pink-100 text-pink-700',
      activeColor: 'bg-pink-500 text-white'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section Tipo Blog Culinario con fondo global */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Overlay para mejorar legibilidad del contenido */}
        <div className="culinary-bg-overlay absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center mt-40">
            
            {/* Imagen Principal del Plato - Izquierda */}
            <div className="relative order-1 lg:order-1">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="recipe-hero-image aspect-square max-w-md mx-auto lg:max-w-none"
              >
                <ImageWithFallback
                  src={featuredRecipes[currentSlide].image}
                  alt={featuredRecipes[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge de Categoría */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-kikko-yellow text-kikko-blue font-bold text-sm px-3 py-2">
                    {featuredRecipes[currentSlide].category.toUpperCase()}
                  </Badge>
                </div>

                {/* Controles de navegación */}
                <button
                  onClick={prevSlide}
                  className="recipe-hero-nav-button absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 shadow-2xl border-3 border-kikko-blue z-50 hover:bg-kikko-blue hover:text-white transition-all duration-300"
                  style={{ borderWidth: '3px', fontSize: '0', lineHeight: '0' }}
                >
                  <ChevronLeft className="w-8 h-8 text-kikko-blue" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="recipe-hero-nav-button absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 shadow-2xl border-3 border-kikko-blue z-50 hover:bg-kikko-blue hover:text-white transition-all duration-300"
                  style={{ borderWidth: '3px', fontSize: '0', lineHeight: '0' }}
                >
                  <ChevronRight className="w-8 h-8 text-kikko-blue" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredRecipes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`recipe-hero-indicator w-2 h-2 ${
                        index === currentSlide ? 'active' : 'inactive'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Información del Plato - Derecha */}
            <div className="lg:pl-8 order-2 lg:order-2 text-center lg:text-left bg-white h-full p-6 lg:p-8">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 lg:space-y-6"
              >
                {/* Título Principal */}
                <h1 className="font-klein-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
                  {featuredRecipes[currentSlide].title}
                </h1>

                {/* Meta Información */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {featuredRecipes[currentSlide].author?.split(' ').map(name => name[0]).join('') || 'CK'}
                    </div>
                    <span className="text-sm font-medium">{featuredRecipes[currentSlide].author || 'Chef KIKKO'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <ChefHat className="w-4 h-4" />
                      <span>{featuredRecipes[currentSlide].difficulty}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{featuredRecipes[currentSlide].time}</span>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {featuredRecipes[currentSlide].description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="recipe-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`recipe-rating-star w-5 h-5 ${
                          star <= Math.floor(featuredRecipes[currentSlide].rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ({featuredRecipes[currentSlide].rating} out of 5)
                  </span>
                </div>

                {/* Similar Recipes & Kikko Product */}
                <div className="pt-4 lg:pt-6 space-y-6">
                  {/* Recetas Similares */}
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-4 tracking-wider text-center">
                      RECETAS SIMILARES
                    </h3>
                    <div className="flex justify-center gap-3">
                      {featuredRecipes.filter((_, index) => index !== currentSlide).slice(0, 3).map((recipe, index) => {
                        const originalIndex = featuredRecipes.findIndex(r => r.id === recipe.id);
                        return (
                          <button
                            key={recipe.id}
                            onClick={() => setCurrentSlide(originalIndex)}
                            className="similar-recipe-thumb w-20 h-20 lg:w-24 lg:h-24 group"
                          >
                            <ImageWithFallback
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            
                            {/* Tooltip al hover - solo desktop */}
                            <div className="hidden lg:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                              {recipe.title.length > 20 ? recipe.title.substring(0, 20) + '...' : recipe.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Producto Kikko Recomendado */}
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-4 tracking-wider text-center">
                      <span className="text-kikko-yellow font-klein-bold">KIKKO</span> RECOMENDADO
                    </h3>
                    <div className="flex justify-center">
                      <button
                        onClick={() => onNavigateToProductos()}
                        className="kikko-product-simple w-28 h-32 lg:w-32 lg:h-36 relative"
                      >
                        <ImageWithFallback
                          src={recipeProducts[featuredRecipes[currentSlide].id as keyof typeof recipeProducts]?.image}
                          alt={recipeProducts[featuredRecipes[currentSlide].id as keyof typeof recipeProducts]?.name}
                          className="w-full h-full object-contain bg-white p-2"
                        />
                        
                        {/* Badge del producto */}
                        <div className="absolute -top-1 -right-1 bg-kikko-yellow text-kikko-blue text-xs font-bold px-1 py-0.5">
                          NUEVO
                        </div>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-2 px-2">
                      {recipeProducts[featuredRecipes[currentSlide].id as keyof typeof recipeProducts]?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Buscador Horizontal */}
      <section className="py-0 bg-white">
        <div className="w-full">
          <div className="bg-kikko-yellow p-4 lg:p-6 w-full border-none shadow-lg">
            <div className="search-horizontal-layout flex flex-col lg:flex-row items-center gap-4 lg:gap-6 max-w-7xl mx-auto">
              
              {/* Sección izquierda: Buscar + Input */}
              <div className="flex items-center gap-4 flex-1 min-w-0 w-full lg:w-auto">
                <span className="text-black font-bold text-lg whitespace-nowrap font-klein-bold">Buscar</span>
                <input
                  type="text"
                  placeholder="palabra clave"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value !== '') {
                      setSelectedCategory('all');
                    }
                  }}
                  className="search-horizontal-input flex-1 px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-kikko-yellow-dark focus:border-kikko-yellow-dark outline-none font-medium border border-gray-200"
                />
              </div>
              
              {/* Texto O central */}
              <div className="text-black font-bold text-lg px-2 hidden lg:block font-klein-bold">
                o
              </div>
              
              {/* Categorías horizontales */}
              <div className="search-categories-mobile flex items-center gap-2 lg:gap-3 flex-wrap lg:flex-nowrap">
                {searchCategories.slice(1).map((category) => {
                  const IconComponent = category.icon;
                  const isActive = selectedCategory === category.id && searchTerm === '';
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSearchTerm('');
                      }}
                      className={`search-category-horizontal flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 border transition-all duration-300 ${
                        isActive 
                          ? 'bg-kikko-blue text-white border-kikko-blue shadow-md' 
                          : 'bg-white text-black border-kikko-blue hover:bg-kikko-blue hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </button>
                  );
                })}
                
                {/* Botón limpiar filtros */}
                {(searchTerm !== '' || selectedCategory !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="search-category-horizontal flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 border border-kikko-red bg-kikko-red text-white hover:bg-red-600 transition-all duration-300"
                  >
                    <Filter className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">Limpiar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Masonry de Recetas - CON ANIMACIÓN PROGRESIVA */}
      <GridMasonrySection 
        filteredRecipes={filteredRecipes}
        clearFilters={clearFilters}
        onNavigateToRecipeDetail={onNavigateToRecipeDetail}
      />

      {/* Sección de Chefs Destacados */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-klein-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Nuestros <span className="text-kikko-blue">Chefs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredChefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{chef.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{chef.specialty}</p>
                <p className="text-kikko-blue text-xs font-bold">{chef.recipes} recetas</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}