import { motion, useInView } from 'motion/react';
import { ChefHat, Clock, Star, TrendingUp, Users, Award } from 'lucide-react';
import { useRef } from 'react';
import { useAutoCountUp } from '../hooks/useAutoCountUp';

interface ModernStatisticsProps {
  className?: string;
  onShowPreview?: () => void;
}

export function ModernStatistics({ className = '', onShowPreview }: ModernStatisticsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Counters automáticos con valores específicos - forzar activación inmediata
  const recipesCounter = useAutoCountUp(100, { duration: 2000, enableOnScroll: false, delay: 500 });
  const ratingCounter = useAutoCountUp(48, { duration: 2200, enableOnScroll: false, delay: 700 }); // Se mostrará como 4.8
  const timeCounter = useAutoCountUp(25, { duration: 2400, enableOnScroll: false, delay: 900 });

  const statistics = [
    {
      id: 'recipes',
      icon: ChefHat,
      value: recipesCounter.value,
      suffix: '+',
      label: 'Recetas Únicas',
      description: 'Sabores auténticos peruanos',
      iconColor: 'var(--kikko-blue)',
      gradient: 'from-gray-700 to-gray-900',
      bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100'
    },
    {
      id: 'rating',
      icon: Star,
      value: ratingCounter.rawCount > 0 ? (ratingCounter.rawCount / 10).toFixed(1) : '4.8',
      suffix: '/5',
      label: 'Valoración Promedio',
      description: 'Calidad reconocida por familias',
      iconColor: 'var(--kikko-yellow)',
      gradient: 'from-gray-700 to-gray-900',
      bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100'
    },
    {
      id: 'time',
      icon: Clock,
      value: timeCounter.value,
      suffix: ' min',
      label: 'Tiempo Promedio',
      description: 'Preparación rápida y sencilla',
      iconColor: 'var(--kikko-red)',
      gradient: 'from-gray-700 to-gray-900',
      bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100'
    }
  ];

  return (
    <section 
      ref={ref}
      className={`py-20 relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm30 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-gray-200 mb-6"
          >
            <TrendingUp className="w-6 h-6" style={{ color: 'var(--kikko-blue)' }} />
            <span className="font-semibold text-lg" style={{ color: 'var(--kikko-blue)' }}>Estadísticas de Calidad</span>
          </motion.div>

          <h2 className="font-klein-bold text-kikko-blue text-4xl sm:text-5xl lg:text-6xl mb-4">
            Números que hablan por sí solos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La confianza de miles de familias peruanas que han hecho del siyau auténtico
            su <span className="font-klein-bold text-kikko-yellow mx-1">compañero culinario favorito</span>
          </p>
        </motion.div>

        {/* Statistics Grid - Diseño Compacto y Moderno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className={`
                  relative p-8 rounded-2xl bg-white border-2 border-gray-200 
                  hover:border-gray-300 hover:shadow-2xl transition-all duration-500
                  ${stat.bgGradient} hover:bg-gradient-to-br hover:from-white hover:to-gray-50
                  min-h-[280px] flex flex-col justify-between text-center
                `}>
                  {/* Glow Effect en Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(44, 44, 44, 0.05) 0%, transparent 100%)'
                    }}
                  />

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg"
                      style={{ backgroundColor: stat.iconColor }}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="flex-1">
                    <div className={`
                      font-klein-bold text-5xl lg:text-6xl mb-3
                      bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {stat.value}{stat.suffix}
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 text-lg lg:text-xl mb-2">
                      {stat.label}
                    </h3>
                    
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Progress Line */}
                  <div className="mt-6">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '100%' } : { width: 0 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 1.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stat.iconColor }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 space-y-6"
        >
          {/* Demo Button */}
          {onShowPreview && (
            <motion.button
              onClick={onShowPreview}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: 'var(--kikko-blue)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue)';
              }}
            >
              <ChefHat className="w-5 h-5" />
              <span className="font-semibold">Ver Receta Demo Completa</span>
              <div className="text-xl">✨</div>
            </motion.button>
          )}
          
          {/* Info Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 text-sm">Datos actualizados en tiempo real</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Award className="w-4 h-4 text-kikko-yellow" />
              <span className="text-gray-600 text-sm">Verificado por familias peruanas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}