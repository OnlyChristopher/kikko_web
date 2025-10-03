import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BrandValues() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const values = [
    {
      id: 'origen',
      title: 'EL SIYAU ORIGINAL',
      subtitle: 'Tradición Auténtica',
      description: 'Se elabora naturalmente, con la mejor selección de trigo y soya que fermentan por más de 60 días, manteniendo así su inconfundible calidad.',
      color: 'var(--kikko-blue)',
      emoji: '🏮',
      image: 'https://images.unsplash.com/photo-1677132529121-3ea5b62ac9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGNvb2tpbmclMjBraXRjaGVuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU3NDgwNzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      pattern: '🌾',
      benefits: ['60+ días de fermentación', 'Ingredientes premium', 'Sabor auténtico'],
      bgGradient: 'linear-gradient(135deg, #0595d3 0%, #3baee9 50%, #87ceeb 100%)'
    },
    {
      id: 'versatilidad',
      title: 'VARIEDAD Y SABOR',
      subtitle: 'Múltiples Usos',
      description: 'Con Kikko puedes preparar muchos más deliciosos platos y sorprender a tu familia. Anímate a transformar tu menú con el mejor color y sabor.',
      color: 'var(--kikko-yellow)',
      emoji: '🍜',
      image: 'https://images.unsplash.com/photo-1556645427-571dea4aa9a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNvb2tpbmclMjBhc2lhbiUyMGZvb2QlMjBqb3lmdWx8ZW58MXx8fHwxNzU3NDgwNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      pattern: '✨',
      benefits: ['Para toda receta', 'Realza el sabor', 'Fácil de usar'],
      bgGradient: 'linear-gradient(135deg, #ffd700 0%, #f4d03f 50%, #fff5b4 100%)'
    },
    {
      id: 'alegria',
      title: 'ALEGRÍA EN LA COCINA',
      subtitle: 'Experiencia Feliz',
      description: 'La alegría es el ingrediente fundamental para que todo salga más rico. Disfruta preparando cada plato con Kikko.',
      color: 'var(--kikko-red)',
      emoji: '🎉',
      image: 'https://images.unsplash.com/photo-1550303566-65b3ed7db550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbiUyMG1vdGhlciUyMGRhdWdodGVyJTIwY29va2luZyUyMHRvZ2V0aGVyJTIwc21pbGluZ3xlbnwxfHx8fDE3NTc0ODA3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      pattern: '💝',
      benefits: ['Momentos felices', 'Comidas especiales', 'Sonrisas garantizadas'],
      bgGradient: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 50%, #ffb3ba 100%)'
    }
  ];

  return (
    <section id="brand-values-section" className="py-35 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative z-10 overflow-hidden">
      {/* Elementos decorativos eliminados para diseño limpio */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header simplificado */}
        <div className="text-center mb-16">
          {/* Título principal con fuente Klein bold */}
          <div className="relative inline-block mb-6">
            <h2 className="font-klein-bold text-4xl md:text-6xl tracking-wider relative z-10" style={{ color: 'var(--kikko-blue)' }}>
              KIKKO ES MÁS RICO...
              <span className="block text-3xl md:text-5xl mt-2" style={{ color: 'var(--kikko-red)' }}>
                ¡Y VA CON TODO!
              </span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre los <span style={{ color: 'var(--kikko-blue)' }}>tres pilares</span> que convierten cada comida en una <span style={{ color: 'var(--kikko-red)' }}>experiencia especial</span> para ti y tu familia
          </p>
        </div>

        {/* Grid de valores compacto */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group h-full"
              onMouseEnter={() => setActiveCard(value.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className="relative h-full min-h-[180px] cursor-pointer group transition-all duration-300"
                style={{
                  transform: activeCard === value.id ? 'scale(1.01) translateY(-4px)' : 'scale(1) translateY(0px)'
                }}
              >
                {/* Background principal simplificado */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'white',
                    boxShadow: activeCard === value.id 
                      ? '0 12px 30px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)'
                      : '0 4px 15px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
                    border: activeCard === value.id ? `2px solid ${value.color}30` : '1px solid #e5e7eb'
                  }}
                >
                  {/* Elementos decorativos sutiles sin emojis */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-5 overflow-hidden">
                    <div className="absolute inset-0" style={{
                      background: `radial-gradient(circle at 50% 100%, ${value.color} 0%, transparent 70%)`
                    }} />
                  </div>
                </div>

                {/* Contenido del card */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Imagen principal ocupando la mitad superior con degradado */}
                  <div className="relative h-1/2 overflow-hidden rounded-t-2xl">
                    <ImageWithFallback
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{
                        filter: activeCard === value.id 
                          ? 'brightness(1.1) contrast(1.1) saturate(1.2)' 
                          : 'brightness(1) contrast(1) saturate(1.05)',
                        transform: activeCard === value.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    
                    {/* Overlay con degradado sutil - sin efectos de color en hover */}
                    <div 
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: `linear-gradient(180deg, 
                          ${value.color}08 0%, 
                          ${value.color}15 40%, 
                          ${value.color}25 70%, 
                          ${value.color}40 100%
                        )`
                      }}
                    />
                    
                    {/* Degradado principal hacia transparencia */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-12 transition-all duration-300"
                      style={{
                        background: `linear-gradient(180deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.4) 30%,
                          rgba(255,255,255,0.8) 70%,  
                          rgba(255,255,255,0.95) 100%
                        )`
                      }}
                    />
                    
                    {/* Elementos decorativos eliminados para diseño limpio */}
                  </div>
                  {/* Contenido principal - mitad inferior */}
                  <div className="h-1/2 p-4 flex flex-col justify-center text-center relative">
                    {/* Efecto de transición suave entre imagen y contenido */}
                    <div 
                      className="absolute -top-4 left-0 right-0 h-8 pointer-events-none transition-all duration-300"
                      style={{
                        background: `linear-gradient(180deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.4) 30%,
                          rgba(255,255,255,0.8) 70%,
                          rgba(255,255,255,0.95) 100%
                        )`
                      }}
                    />

                    {/* Subtítulo pequeño */}
                    <p className="text-xs uppercase tracking-widest mb-1 opacity-80 transition-all duration-300 font-medium" style={{ 
                        color: activeCard === value.id ? value.color : '#6b7280'
                      }}>
                      {value.subtitle}
                    </p>
                    
                    {/* Título principal con fuente Klein bold */}
                    <h3 className="font-klein-bold text-lg md:text-xl mb-2 tracking-wide leading-tight transition-all duration-300" style={{ 
                        color: activeCard === value.id ? value.color : '#1f2937'
                      }}>
                      {value.title}
                    </h3>
                    
                    {/* Descripción */}
                    <p className="text-xs leading-relaxed mb-2 transition-colors duration-300" style={{ 
                        color: activeCard === value.id ? '#374151' : '#6b7280'
                      }}>
                      {value.description}
                    </p>

                    {/* Lista de beneficios sin emojis */}
                    <div className="space-y-1 mb-2 transition-all duration-300">
                      {value.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center gap-2 text-xs transition-all duration-300"
                          style={{
                            color: activeCard === value.id ? value.color : '#6b7280'
                          }}
                        >
                          <div 
                            className="w-1 h-1 rounded-full"
                            style={{
                              backgroundColor: activeCard === value.id ? value.color : '#6b7280'
                            }}
                          />
                          <span className="font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Decoración inferior simplificada */}
                    <div className="flex justify-center">
                      <div
                        className="w-12 h-0.5 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: activeCard === value.id ? value.color : '#e5e7eb'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* CTA final simplificado estilo Kikko */}
        <div className="text-center">
          <div className="relative max-w-4xl mx-auto">
            {/* Background con estilo corporativo Kikko compacto */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-3" style={{ borderColor: 'var(--kikko-blue)' }}>
              {/* Elementos decorativos corporativos */}
              <div className="absolute top-6 left-6 w-12 h-12 rounded-full opacity-20" style={{ backgroundColor: 'var(--kikko-yellow)' }}></div>
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: 'var(--kikko-red)' }}></div>
              <div className="absolute bottom-6 left-12 w-6 h-6 rounded-full opacity-20" style={{ backgroundColor: 'var(--kikko-blue)' }}></div>
              <div className="absolute bottom-6 right-12 w-10 h-10 rounded-full opacity-20" style={{ backgroundColor: 'var(--kikko-yellow)' }}></div>
              
              <div className="relative z-10">
                
                {/* Título principal con fuente Klein bold */}
                <h3 className="font-klein-bold text-2xl md:text-3xl mb-4 tracking-wide" style={{ color: 'var(--kikko-blue)' }}>
                  ¿PREPARADA PARA DESCUBRIR 
                  <span className="block mt-1" style={{ color: 'var(--kikko-red)' }}>
                    EL MUNDO DE SABOR DE KIKKO?
                  </span>
                </h3>
                
                {/* Descripción compacta */}
                <div className="max-w-2xl mx-auto mb-6">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Transforma tu cocina en un lugar de <span className="font-bold" style={{ color: 'var(--kikko-yellow)' }}>alegría</span>, 
                    descubre la <span className="font-bold" style={{ color: 'var(--kikko-red)' }}>versatilidad</span> del siyau auténtico, 
                    y conecta con el <span className="font-bold" style={{ color: 'var(--kikko-blue)' }}>origen</span> de los sabores orientales
                  </p>
                </div>
                
                {/* Botón CTA rectangular moderno Kikko */}
                <button
                  className="inline-flex items-center gap-3 px-10 py-5 text-lg md:text-xl font-klein-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-xl text-white"
                  style={{ 
                    backgroundColor: 'var(--kikko-red)',
                    borderRadius: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--kikko-red-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--kikko-red)';
                  }}
                  onClick={() => {
                    document.getElementById('recipes-section')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start' 
                    });
                  }}
                >
                  <span>VER TODAS LAS RECETAS</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                {/* Mensaje adicional */}
                <p className="mt-4 text-sm text-gray-500 italic">
                  "ES MÁS RICO CON KIKKO... ¡Y VA CON TODO!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}