import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, List, Filter, Search, ChefHat, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RecipeCard } from './RecipeCard';
import { RecipeFilters } from './RecipeFilters';
import { RecipePreview } from './RecipePreview';
import { ModernStatistics } from './ModernStatistics';
import { recipes, categories } from '../constants/recipesData';

interface RecipesSectionProps {
  onNavigateToRecipes?: () => void;
}

export function RecipesSection({ onNavigateToRecipes }: RecipesSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category.toLowerCase() === selectedCategory);

  return (
    <>
      {/* Sección de estadísticas modernas */}
      <ModernStatistics 
        className="bg-gradient-to-b from-gray-50 via-white to-gray-50" 
        onShowPreview={() => setShowPreview(true)}
      />

      {/* Contenido principal de recetas */}
      <section id="recipes-section" className="py-16 bg-white relative z-15">
        <div className="container mx-auto px-4">
        
        {/* Título de la sección de recetas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="relative inline-block mb-6">
            <h1 className="font-klein-bold text-5xl md:text-6xl tracking-wider relative z-10" style={{ color: 'var(--kikko-blue)' }}>
              NUESTRAS RECETAS
            </h1>
            
            {/* Decoración detrás del título */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-10"
              style={{ 
                background: 'linear-gradient(45deg, var(--kikko-blue) 0%, var(--kikko-yellow) 50%, var(--kikko-red) 100%)'
              }}
            />
          </motion.div>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span style={{ color: 'var(--kikko-red)' }}>Pollo</span>, 
            <span style={{ color: 'var(--kikko-blue)' }}> pescado</span>, 
            <span style={{ color: 'var(--kikko-yellow)' }}> carnes</span>, 
            <span style={{ color: 'var(--kikko-red)' }}> cerdo</span>… 
            <span style={{ color: 'var(--kikko-blue)' }}> ¡con Kikko todo es más rico!</span>
          </motion.p>
        </motion.div>


        {/* Filtros de categorías simplificados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-3 transition-all text-lg bg-white shadow-lg font-klein-bold"
                style={selectedCategory === category.id ? {
                  backgroundColor: 'var(--kikko-blue)',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none'
                } : {
                  backgroundColor: 'white',
                  color: 'var(--kikko-blue)',
                  borderRadius: '8px',
                  border: '2px solid var(--kikko-blue)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'var(--kikko-blue)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'var(--kikko-blue)';
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                <Badge 
                  className="ml-2 text-xs"
                  style={selectedCategory === category.id ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  } : {
                    backgroundColor: 'var(--kikko-blue)',
                    color: 'white'
                  }}
                >
                  {category.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Controles de vista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl text-gray-800 uppercase tracking-wide">
              {selectedCategory === 'all' ? 'TODAS LAS RECETAS' : categories.find(c => c.id === selectedCategory)?.name?.toUpperCase()}
              <span className="text-gray-500 ml-2">({filteredRecipes.length})</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Toggle de vista */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Botón de filtros - Estilo rectangular moderno Kikko */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2 transition-all px-6 py-3 font-klein-bold"
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
              <Filter className="w-4 h-4" />
              FILTROS
            </Button>
          </div>
        </motion.div>

        {/* Panel de filtros avanzados */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <RecipeFilters onFiltersChange={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de recetas con animaciones */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          <AnimatePresence mode="wait">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100 
                }}
                layout
              >
                <RecipeCard 
                  recipe={recipe} 
                  viewMode={viewMode}
                  onViewRecipe={() => onNavigateToRecipes?.()}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to action final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 py-16"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h3 
              className="text-3xl md:text-4xl mb-6 tracking-wide"
              style={{ color: 'var(--kikko-blue)' }}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              ¿NO ENCUENTRAS LO QUE BUSCAS?
            </motion.h3>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Tenemos <span style={{ color: 'var(--kikko-red)' }}>cientos de recetas más</span> esperándote. 
              Explora todo nuestro catálogo y descubre nuevos sabores para sorprender a tu familia.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={onNavigateToRecipes}
                className="px-12 py-6 text-xl shadow-xl hover:shadow-2xl transition-all font-klein-bold"
                style={{ 
                  backgroundColor: 'var(--kikko-yellow)',
                  color: 'var(--kikko-red)',
                  borderRadius: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kikko-yellow-dark)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kikko-yellow)';
                  e.currentTarget.style.color = 'var(--kikko-red)';
                }}
              >
                <Search className="w-6 h-6 mr-3" />
                EXPLORAR TODAS LAS RECETAS
              </Button>
            </motion.div>
          </div>
        </motion.div>
        </div>

        {/* Modal de preview */}
        <RecipePreview 
          isOpen={showPreview} 
          onClose={() => setShowPreview(false)} 
        />
      </section>
    </>
  );
}