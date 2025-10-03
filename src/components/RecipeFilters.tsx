import { Button } from './ui/button';
import { Filter, X, ChefHat, Clock, Utensils } from 'lucide-react';

interface RecipeFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeTime: string;
  setActiveTime: (time: string) => void;
  activeDifficulty: string;
  setActiveDifficulty: (difficulty: string) => void;
}

const categories = [
  { value: 'todos', label: 'Todos', icon: Utensils },
  { value: 'platos principales', label: 'Principales', icon: ChefHat },
  { value: 'aperitivos', label: 'Aperitivos', icon: Utensils },
  { value: 'vegetarianos', label: 'Vegetarianos', icon: Utensils },
  { value: 'postres', label: 'Postres', icon: Utensils },
  { value: 'sopas', label: 'Sopas', icon: Utensils }
];

const timeFilters = [
  { value: 'todos', label: 'Cualquiera' },
  { value: 'rápido', label: '< 30 min' },
  { value: 'medio', label: '30-60 min' },
  { value: 'largo', label: '> 60 min' }
];

const difficultyFilters = [
  { value: 'todos', label: 'Todas' },
  { value: 'fácil', label: 'Fácil' },
  { value: 'medio', label: 'Medio' },
  { value: 'difícil', label: 'Difícil' }
];

export function RecipeFilters({ 
  activeCategory, 
  setActiveCategory, 
  activeTime, 
  setActiveTime, 
  activeDifficulty, 
  setActiveDifficulty 
}: RecipeFiltersProps) {
  const hasActiveFilters = activeCategory !== 'todos' || activeTime !== 'todos' || activeDifficulty !== 'todos';

  const clearAllFilters = () => {
    setActiveCategory('todos');
    setActiveTime('todos');
    setActiveDifficulty('todos');
  };

  return (
    <div className="w-full">
      {/* Botón limpiar filtros integrado */}
      {hasActiveFilters && (
        <div className="text-center mb-6">
          <Button
            onClick={clearAllFilters}
            className="bg-kikko-red hover:bg-kikko-red-dark text-white border-0 px-6 py-3 font-bold shadow-lg"
            style={{ borderRadius: '0px' }}
          >
            <X className="w-4 h-4 mr-2" />
            LIMPIAR TODOS LOS FILTROS
          </Button>
        </div>
      )}

      {/* Grid de filtros full width - 3 secciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* CATEGORÍAS */}
        <div className="bg-white/95 backdrop-blur-sm p-6 border border-gray-200 shadow-lg">
          <h4 className="font-klein-bold text-kikko-blue text-center mb-4 text-lg">CATEGORÍAS</h4>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;
              
              return (
                <Button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`
                    py-3 px-4 font-semibold text-sm transition-all duration-300 h-auto
                    ${isActive 
                      ? 'bg-kikko-blue text-white border-kikko-blue shadow-lg hover:bg-kikko-blue-dark' 
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-kikko-blue hover:text-kikko-blue hover:bg-kikko-blue/5'
                    }
                  `}
                  style={{ borderRadius: '0px' }}
                >
                  <Icon className="w-4 h-4 mb-1 mx-auto block" />
                  <span className="block text-center">{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* TIEMPO DE PREPARACIÓN */}
        <div className="bg-white/95 backdrop-blur-sm p-6 border border-gray-200 shadow-lg">
          <h4 className="font-klein-bold text-kikko-blue text-center mb-4 text-lg">TIEMPO</h4>
          <div className="grid grid-cols-2 gap-3">
            {timeFilters.map((time) => {
              const isActive = activeTime === time.value;
              
              return (
                <Button
                  key={time.value}
                  onClick={() => setActiveTime(time.value)}
                  className={`
                    py-3 px-4 font-semibold text-sm transition-all duration-300 h-auto
                    ${isActive 
                      ? 'bg-kikko-yellow text-kikko-blue border-kikko-yellow shadow-lg hover:bg-kikko-yellow-dark' 
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-kikko-yellow hover:text-kikko-yellow-dark hover:bg-kikko-yellow/5'
                    }
                  `}
                  style={{ borderRadius: '0px' }}
                >
                  <Clock className="w-4 h-4 mb-1 mx-auto block" />
                  <span className="block text-center">{time.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* DIFICULTAD */}
        <div className="bg-white/95 backdrop-blur-sm p-6 border border-gray-200 shadow-lg">
          <h4 className="font-klein-bold text-kikko-blue text-center mb-4 text-lg">DIFICULTAD</h4>
          <div className="grid grid-cols-2 gap-3">
            {difficultyFilters.map((difficulty) => {
              const isActive = activeDifficulty === difficulty.value;
              
              return (
                <Button
                  key={difficulty.value}
                  onClick={() => setActiveDifficulty(difficulty.value)}
                  className={`
                    py-3 px-4 font-semibold text-sm transition-all duration-300 h-auto
                    ${isActive 
                      ? 'bg-kikko-blue text-white border-kikko-blue shadow-lg hover:bg-kikko-blue-dark' 
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-kikko-blue hover:text-kikko-blue hover:bg-kikko-blue/5'
                    }
                  `}
                  style={{ borderRadius: '0px' }}
                >
                  <ChefHat className="w-4 h-4 mb-1 mx-auto block" />
                  <span className="block text-center">{difficulty.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}