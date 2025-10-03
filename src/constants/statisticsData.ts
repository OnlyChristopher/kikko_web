export interface StatisticData {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  pattern: string;
  color: string;
  bgGradient: string;
  benefits: string[];
}

export const createStatisticsData = (
  recipesCounter: { value: string; isComplete: boolean },
  ratingCounter: { value: string; isComplete: boolean },
  timeCounter: { value: string; isComplete: boolean }
): StatisticData[] => [
  {
    id: 'recipes',
    title: 'RECETAS ÚNICAS',
    subtitle: 'Variedad Infinita',
    emoji: '📚',
    pattern: '📖',
    color: 'var(--kikko-blue)',
    bgGradient: 'linear-gradient(135deg, #0595d3 0%, #3baee9 50%, #87ceeb 100%)',
    benefits: ['Sabores auténticos', 'Fáciles de seguir', 'Resultados garantizados']
  },
  {
    id: 'rating',
    title: 'RATING PROMEDIO',
    subtitle: 'Calidad Premium',
    emoji: '⭐',
    pattern: '✨',
    color: 'var(--kikko-yellow)',
    bgGradient: 'linear-gradient(135deg, #ffd700 0%, #f4d03f 50%, #fff5b4 100%)',
    benefits: ['Familias satisfechas', 'Sabores aprobados', 'Experiencia premium']
  },
  {
    id: 'time',
    title: 'MIN PROMEDIO',
    subtitle: 'Cocina Rápida',
    emoji: '⏱️',
    pattern: '⚡',
    color: 'var(--kikko-red)',
    bgGradient: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 50%, #ffb3ba 100%)',
    benefits: ['Preparación rápida', 'Tiempo optimizado', 'Resultados perfectos']
  }
];