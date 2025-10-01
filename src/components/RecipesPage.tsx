import { motion } from 'motion/react';
import { ChefHat, Clock, Users, Star, Play, BookOpen, Utensils, Heart, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { RecipeCard } from './RecipeCard';
import { RecipeFilters } from './RecipeFilters';

import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { recipes } from '../constants/recipesData';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Importar imagen de referencia
import exampleImage from 'figma:asset/6534187726ffdcc0a05a64738efc962acb192fbd.png';

interface RecipesPageProps {
  onBackToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToNovedades: () => void;
  onNavigateToProductos: () => void;
  onNavigateToRecipeDetail: (recipe: any) => void;
}

// Componente de búsqueda integrado con el botón
function SearchInput({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);

  // Función para convertir a mayúsculas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);
  };

  return (
    <motion.div 
      className="relative w-full search-input-integrated"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Container del input separado */}
      <motion.div 
        className="relative bg-white/95 backdrop-blur-sm shadow-lg border-2 border-transparent overflow-hidden"
        style={{ borderRadius: '0px' }} // Bordes completos ya que está separado
        animate={{
          borderColor: isFocused ? '#0595d3' : 'transparent',
          boxShadow: isFocused 
            ? '0 12px 30px rgba(5, 149, 211, 0.2), 0 4px 16px rgba(0,0,0,0.1)'
            : '0 8px 20px rgba(0,0,0,0.08)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icono de búsqueda */}
        <motion.div
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10"
          animate={{
            color: isFocused ? '#0595d3' : '#64748b'
          }}
          transition={{ duration: 0.2 }}
        >
          <Search className="w-6 h-6" />
        </motion.div>

        {/* Input principal con altura uniforme al botón */}
        <Input
          type="text"
          placeholder="BUSCAR RECETAS CON KIKKO..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-16 pr-8 py-6 text-lg font-semibold border-0 bg-transparent text-gray-800 placeholder:text-gray-500 placeholder:font-normal focus:ring-0 focus:outline-none transition-all duration-200 uppercase h-[68px]" // Altura fija para igualar al botón
          style={{ borderRadius: '0px' }}
        />

        {/* Línea de progreso sutil cuando hay texto */}
        {searchTerm.length > 0 && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-kikko-blue"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* Efecto de shimmer sutil al hacer hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{
            translateX: isFocused ? ['100%', '100%'] : ['-100%', '-100%']
          }}
          whileHover={{
            translateX: ['-100%', '100%']
          }}
          transition={{ 
            translateX: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Contador de resultados cuando hay búsqueda */}
      {searchTerm.length > 2 && (
        <motion.div
          className="absolute -bottom-8 left-0 text-white/70 text-sm font-medium"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          Buscando "{searchTerm}"
        </motion.div>
      )}
    </motion.div>
  );
}

// Componente del carrusel de recetas - 3 cards por vista
function RecipeCarousel({ recipes, onRecipeClick, carouselId }: { recipes: any[]; onRecipeClick: (recipe: any) => void; carouselId: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (window.innerWidth < 768) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(3); // Desktop: 3 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, recipes.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const newIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(newIndex);
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition = newIndex * (containerWidth / itemsPerView);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  const scrollToPrev = () => {
    scrollToIndex(currentIndex - 1);
  };

  // Touch/Mouse events para swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest item
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / (containerWidth / itemsPerView));
      scrollToIndex(newIndex);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest item
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / (containerWidth / itemsPerView));
      scrollToIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full carousel-container">


      {/* Controles del carrusel */}
      <div className="flex justify-center items-center mb-8 gap-4">
        <Button
          onClick={scrollToPrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 bg-white border-2 border-kikko-blue text-kikko-blue hover:bg-kikko-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-kikko-blue font-semibold">{currentIndex + 1}</span>
          <span className="text-gray-400">-</span>
          <span className="text-kikko-blue font-semibold">{Math.min(currentIndex + itemsPerView, recipes.length)}</span>
          <span className="text-gray-400">de</span>
          <span className="text-kikko-blue font-semibold">{recipes.length}</span>
        </div>

        <Button
          onClick={scrollToNext}
          disabled={currentIndex >= maxIndex}
          className="w-12 h-12 bg-white border-2 border-kikko-blue text-kikko-blue hover:bg-kikko-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Carrusel con 3 items */}
      <div
        ref={carouselRef}
        className={`w-full overflow-hidden select-none transition-all duration-200 recipe-carousel-container ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollSnapType: 'x mandatory' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex" style={{ 
          width: '100%',
          gap: itemsPerView === 1 ? '0px' : '16px'
        }}>
          {recipes.map((recipe, index) => (
            <div
              key={`${carouselId}-${recipe.id}-${index}`}
              className="flex-shrink-0 carousel-item"
              style={{ 
                scrollSnapAlign: 'start',
                flex: itemsPerView === 1 ? '0 0 100%' : `0 0 calc(${100 / itemsPerView}% - ${16 * (itemsPerView - 1) / itemsPerView}px)`
              }}
            >
              <RecipeCard
                recipe={recipe}
                featured={recipe.featured}
                viewMode="grid"
                onViewRecipe={onRecipeClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de progreso simplificados */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(recipes.length / itemsPerView) }).map((_, index) => (
          <button
            key={`${carouselId}-indicator-${index}`}
            onClick={() => scrollToIndex(index)}
            className={`h-2 transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'bg-kikko-yellow w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-2'
            }`}
            style={{ borderRadius: '0px' }} // Indicadores rectangulares
          />
        ))}
      </div>
    </div>
  );
}

export function RecipesPage({ onBackToHome, onNavigateToAbout, onNavigateToNovedades, onNavigateToProductos, onNavigateToRecipeDetail }: RecipesPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeTime, setActiveTime] = useState<string>('todos');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Función para navegar al detalle de receta
  const handleRecipeClick = (recipe: any) => {
    onNavigateToRecipeDetail(recipe);
  };

  // Filtrar recetas según los filtros activos y búsqueda
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'todos' || recipe.category === activeCategory;
    const matchesTime = activeTime === 'todos' || recipe.time === activeTime;
    const matchesDifficulty = activeDifficulty === 'todos' || recipe.difficulty === activeDifficulty;
    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesTime && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Banner - Usando el componente Hero original */}
      <Hero />

      {/* Sección de Introducción Unificada */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-kikko-blue/10 backdrop-blur-sm px-8 py-4 border border-kikko-blue/20 mb-8">
              <ChefHat className="w-6 h-6 text-kikko-blue" />
              <span className="text-kikko-blue font-semibold text-lg">NUESTRAS RECETAS EXCLUSIVAS</span>
            </div>

            <h1 className="font-klein-bold text-kikko-blue mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.1' }}>
              COCINA CON <span className="text-kikko-yellow">KIKKO</span><br />
              <span style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>ES MÁS RICO CON KIKKO</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Descubre los sabores auténticos con nuestras recetas exclusivas preparadas con productos <strong className="text-kikko-yellow">KIKKO</strong>. 
              Cada receta está diseñada para destacar el sabor único de nuestros sazonadores orientales.
            </p>

            {/* Estadísticas mejoradas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center bg-gray-50 py-6 px-4 border border-gray-200" style={{ borderRadius: '20px' }}>
                <div className="font-klein-bold text-kikko-blue mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{recipes.length}</div>
                <div className="text-gray-600 font-semibold uppercase tracking-wide">Recetas Disponibles</div>
              </div>
              <div className="text-center bg-kikko-yellow/10 py-6 px-4 border border-kikko-yellow/30" style={{ borderRadius: '20px' }}>
                <div className="font-klein-bold text-kikko-yellow mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>4.7★</div>
                <div className="text-gray-600 font-semibold uppercase tracking-wide">Rating Promedio</div>
              </div>
              <div className="text-center bg-kikko-blue/10 py-6 px-4 border border-kikko-blue/30" style={{ borderRadius: '20px' }}>
                <div className="font-klein-bold text-kikko-blue mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{recipes.filter(r => r.featured).length}</div>
                <div className="text-gray-600 font-semibold uppercase tracking-wide">Recetas Destacadas</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Búsqueda y Filtros Unificados */}
      <section className="py-12 bg-kikko-blue">
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="container mx-auto px-6">
              {/* Sección de búsqueda integrada con filtros */}
              <div className="w-full">
                {/* Barra de búsqueda con botón filtros separado */}
                <div className="flex justify-center mb-8">
                  <div className="search-filter-separated w-full max-w-4xl">
                    {/* Botón toggle filtros - a la izquierda */}
                    <motion.button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`
                        filter-button-integrated flex items-center gap-2 px-6 font-bold text-lg border-2 shadow-lg transition-all duration-300 filter-button-hover
                        ${showFilters 
                          ? 'bg-kikko-yellow text-kikko-blue border-kikko-yellow hover:bg-kikko-yellow-light' 
                          : 'bg-white text-kikko-blue border-white hover:bg-kikko-blue hover:text-white hover:border-kikko-blue'
                        }
                      `}
                      style={{ borderRadius: '0px' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Filter className="w-5 h-5" />
                      <span className="whitespace-nowrap">FILTROS</span>
                      <motion.div
                        animate={{ rotate: showFilters ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    {/* Input de búsqueda - separado del botón */}
                    <div className="flex-1">
                      <SearchInput 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                      />
                    </div>
                  </div>
                </div>

                {/* Filtros integrados con animación */}
                <motion.div
                  initial={false}
                  animate={{
                    height: showFilters ? 'auto' : 0,
                    opacity: showFilters ? 1 : 0,
                    marginBottom: showFilters ? '2rem' : 0
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className="w-full">
                    <RecipeFilters
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      activeTime={activeTime}
                      setActiveTime={setActiveTime}
                      activeDifficulty={activeDifficulty}
                      setActiveDifficulty={setActiveDifficulty}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carruseles de Recetas - Tres Secciones */}
      <section id="recipes-grid" className="py-20 recipe-carousels-section">
        <div className="w-full">
{filteredRecipes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-8">
                <ChefHat className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-kikko-blue mb-4">NO SE ENCONTRARON RECETAS</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Intenta cambiar los filtros para descubrir más recetas con <span className="text-kikko-yellow font-semibold">KIKKO</span>
              </p>
            </motion.div>
          ) : (
            <>
              {/* PRIMER CARRUSEL - RECETAS POPULARES */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 bg-white py-12"
              >
                <div className="text-center mb-12">
                  <h2 className="font-klein-bold text-kikko-blue mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    RECETAS MÁS <span className="text-kikko-yellow">POPULARES</span>
                  </h2>
                  <div className="w-32 h-2 bg-kikko-yellow mx-auto"></div>
                  <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Las recetas favoritas de nuestra comunidad de cocineros • <strong>{filteredRecipes.slice(0, 12).length} recetas</strong>
                  </p>
                </div>
                <RecipeCarousel recipes={filteredRecipes.slice(0, 12)} onRecipeClick={handleRecipeClick} carouselId="popular" />
              </motion.div>

              {/* Separador visual */}
              <div className="carousel-separator"></div>

              {/* SEGUNDO CARRUSEL - RECETAS RÁPIDAS */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 bg-white py-12"
              >
                <div className="text-center mb-12">
                  <h2 className="font-klein-bold text-kikko-blue mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    RECETAS <span className="text-kikko-yellow">EXPRÉS</span>
                  </h2>
                  <div className="w-32 h-2 bg-kikko-yellow mx-auto"></div>
                  <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Deliciosas opciones listas en menos de 30 minutos • <strong>{filteredRecipes.filter(recipe => recipe.time === 'rápido').length} recetas exprés</strong>
                  </p>
                </div>
                <RecipeCarousel recipes={
                  filteredRecipes.filter(recipe => recipe.time === 'rápido').length > 0 
                    ? filteredRecipes.filter(recipe => recipe.time === 'rápido').slice(0, 12)
                    : filteredRecipes.slice(6, 18)
                } onRecipeClick={handleRecipeClick} carouselId="express" />
              </motion.div>

              {/* Separador visual */}
              <div className="carousel-separator"></div>

              {/* TERCER CARRUSEL - RECETAS GOURMET */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 bg-white py-12"
              >
                <div className="text-center mb-12">
                  <h2 className="font-klein-bold text-kikko-blue mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    RECETAS <span className="text-kikko-yellow">GOURMET</span>
                  </h2>
                  <div className="w-32 h-2 bg-kikko-yellow mx-auto"></div>
                  <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Platos especiales para ocasiones únicas • <strong>{filteredRecipes.filter(recipe => recipe.difficulty === 'difícil').length} recetas gourmet</strong>
                  </p>
                </div>
                <RecipeCarousel recipes={
                  filteredRecipes.filter(recipe => recipe.difficulty === 'difícil').length > 0 
                    ? filteredRecipes.filter(recipe => recipe.difficulty === 'difícil').slice(0, 12)
                    : filteredRecipes.slice(12, 24)
                } onRecipeClick={handleRecipeClick} carouselId="gourmet" />
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Sección Call to Action */}
      <section className="py-20 bg-gradient-to-br from-kikko-blue via-kikko-blue-dark to-kikko-blue relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1717465962260-d6d2fa73db5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NTc1MTYzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ingredientes frescos"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-klein-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              ¿LISTO PARA COCINAR COMO UN CHEF?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              ÚNETE A MÁS DE 1 MILLÓN DE COCINEROS QUE YA DESCUBRIERON EL SABOR AUTÉNTICO DE <span className="text-kikko-yellow font-semibold">KIKKO</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onNavigateToProductos}
                className="bg-kikko-yellow text-black hover:bg-kikko-yellow-light font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Utensils className="w-5 h-5 mr-2" />
                VER PRODUCTOS
              </Button>
              <Button
                onClick={onBackToHome}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-kikko-blue font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              >
                VOLVER AL INICIO
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}