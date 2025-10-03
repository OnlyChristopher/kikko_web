import { StatisticData } from '../constants/statisticsData';

interface StatisticsCardProps {
  stat: StatisticData;
  index: number;
  activeStatCard: string | null;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  value: string;
  isComplete: boolean;
}

export function StatisticsCard({ 
  stat, 
  index, 
  activeStatCard, 
  onHoverStart, 
  onHoverEnd, 
  value,
  isComplete 
}: StatisticsCardProps) {
  return (
    <div
      key={stat.id}
      className="group h-full"
      onMouseEnter={() => onHoverStart(stat.id)}
      onMouseLeave={onHoverEnd}
    >
      <div
        className="relative h-full min-h-[300px] md:min-h-[400px] cursor-pointer group hover:transform hover:scale-105 transition-all duration-300"
      >
        {/* Background principal con gradiente - sin animación */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden transition-all duration-300"
          style={{
            background: activeStatCard === stat.id ? stat.bgGradient : 'white',
            boxShadow: activeStatCard === stat.id 
              ? `0 30px 60px rgba(0,0,0,0.2), 0 0 40px ${stat.color}30`
              : '0 15px 35px rgba(0,0,0,0.1)'
          }}
        >
          {/* Elementos decorativos estáticos */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              background: `radial-gradient(circle at 50% 0%, ${stat.color} 0%, transparent 50%)`
            }} />
          </div>
          
          {/* Patrones decorativos estáticos */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl opacity-20"
                style={{
                  left: `${15 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
              >
                {stat.pattern}
              </div>
            ))}
          </div>
        </div>

        {/* Contenido del card responsive */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between text-center">
          {/* Emoji principal responsive */}
          <div className="mb-2 md:mb-4 relative">
            <div className="text-5xl md:text-7xl mb-2 md:mb-3 relative">
              {stat.emoji}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-grow flex flex-col justify-center">
            {/* Subtítulo responsive */}
            <p className="text-xs md:text-sm uppercase tracking-wide md:tracking-widest mb-1 md:mb-2 opacity-70 transition-colors duration-300" style={{ 
                color: activeStatCard === stat.id ? 'white' : stat.color
              }}>
              {stat.subtitle}
            </p>
            
            {/* Valor principal responsive */}
            <div className="font-klein-bold text-3xl md:text-5xl mb-1 md:mb-2 transition-all duration-300" style={{ 
                color: activeStatCard === stat.id ? 'white' : stat.color,
                transform: isComplete ? 'scale(1.05)' : 'scale(1)'
              }}>
              {value}
            </div>
            
            {/* Título principal responsive */}
            <h3 className="text-base md:text-lg lg:text-xl mb-2 md:mb-4 tracking-wide leading-tight transition-colors duration-300" style={{ 
                color: activeStatCard === stat.id ? 'white' : stat.color
              }}>
              {stat.title}
            </h3>

            {/* Lista de beneficios responsive */}
            <div className="space-y-1 transition-all duration-300" style={{
                opacity: activeStatCard === stat.id ? 1 : 0.7
              }}>
              {stat.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-1 md:gap-2 text-xs"
                  style={{
                    color: activeStatCard === stat.id ? 'rgba(255,255,255,0.8)' : '#6b7280'
                  }}
                >
                  <span className="text-xs">✨</span>
                  <span className="text-center leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decoración inferior responsive */}
          <div className="mt-2 md:mt-4 flex justify-center">
            <div
              className="w-12 md:w-16 h-0.5 md:h-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: activeStatCard === stat.id ? 'white' : stat.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}