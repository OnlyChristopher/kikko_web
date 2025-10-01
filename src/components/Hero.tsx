import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { KikkoImage } from './KikkoImage';

export function Hero() {
  const [isVideoMode, setIsVideoMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular efectos de parallax
  const parallaxOffset = scrollY * 0.5;
  const textParallax = scrollY * 0.3;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo dinámico: Video o Imagen con efecto parallax */}
      <div className="absolute inset-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        {isVideoMode ? (
          // Modo Video - Sin overlay
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={() => setIsVideoMode(false)}
            >
              <source 
                src="https://mybucketkikko.s3.us-east-1.amazonaws.com/intro3.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        ) : (
          // Modo Imagen (fallback) con tu mesa de verduras
          <div className="absolute inset-0">
            <KikkoImage
              imageKey="KITCHEN_TABLE_BACKGROUND"
              alt="Mesa con verduras - KIKKO"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-kikko-blue/80 via-kikko-blue/70 to-kikko-blue-dark/80" />
          </div>
        )}
      </div>

      {/* Contenido superpuesto - Diseño responsivo */}
      <div className="absolute inset-0 flex items-center justify-start z-20 pl-16 hero-container-responsive" style={{ transform: `translateY(-${textParallax}px)` }}>
        <div className="w-full h-full relative">
          
          {/* Texto posicionado a la izquierda en desktop, centrado debajo del header en mobile */}
          <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-start justify-center text-left px-8 hero-text-right-responsive hero-text-container-mobile lg:w-1/2 lg:top-0 lg:left-0 lg:items-start lg:text-left max-lg:w-full max-lg:top-20 max-lg:left-0 max-lg:right-0 max-lg:items-center max-lg:text-center max-lg:px-4 relative z-10">
            
            {/* DESCUBRE RECETAS */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="mb-6 relative overflow-hidden"
            >
              <h1 
                className="font-klein-bold leading-tight tracking-tighter text-white relative z-10 hero-text-solid-white hero-text-align-responsive"
                style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  lineHeight: '0.9'
                }}
              >
                DESCUBRE <br />RECETAS
              </h1>
              {/* Franja celeste animada */}
              <motion.div
                className="absolute inset-0 bg-kikko-blue opacity-60"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  delay: 1.0, 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{ zIndex: 1 }}
              />
            </motion.div>
            
            {/* Y TODO LO QUE PUEDES - dividido en 2 líneas */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative overflow-hidden"
            >
              <h2 
                className="font-klein leading-tight tracking-tighter text-white relative z-10 hero-text-solid-white hero-text-align-responsive"
                style={{ 
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  lineHeight: '1.2'
                }}
              >
                y todo lo que puedes<br />
                preparar con tu siyau
              </h2>
              {/* Franja celeste animada */}
              <motion.div
                className="absolute inset-0 bg-kikko-blue opacity-60"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  delay: 1.3, 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{ zIndex: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </div>



      {/* Indicador de Scroll - Flecha simple estilo AboutKikko */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-center cursor-pointer p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          // Scroll a la primera sección después del hero
          const firstSection = document.querySelector(
            "section:nth-of-type(2)",
          );
          if (firstSection) {
            firstSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            const headerHeight = 80;
            const heroSectionHeight = window.innerHeight;
            const targetPosition =
              headerHeight + heroSectionHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown
          className="w-12 h-12 text-white animate-bounce cursor-pointer hover:text-kikko-yellow transition-all duration-300 hover:scale-110 active:scale-95"
        />
      </motion.div>

      {/* Elementos decorativos flotantes con efectos dinámicos */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 bg-kikko-yellow/20 rounded-full blur-xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-kikko-red/20 rounded-full blur-xl"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Elementos adicionales que responden al scroll */}
      <motion.div
        className="absolute top-1/2 left-10 w-12 h-12 bg-kikko-blue/30 rounded-full blur-lg"
        style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.5}deg)` }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-10 w-14 h-14 bg-kikko-yellow/25 rounded-full blur-lg"
        style={{ transform: `translateY(${scrollY * -0.12}px) rotate(${scrollY * -0.3}deg)` }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.25, 0.65, 0.25]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Elementos adicionales tipo burbujas que flotan con el scroll */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-8 h-8 bg-kikko-red/20 rounded-full blur-md"
        style={{ transform: `translateY(${scrollY * 0.08}px) translateX(${scrollY * 0.02}px)` }}
        animate={{
          scale: [0.7, 1.2, 0.7],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      
      <motion.div
        className="absolute bottom-[25%] left-[25%] w-10 h-10 bg-kikko-blue/15 rounded-full blur-lg"
        style={{ transform: `translateY(${scrollY * -0.06}px) translateX(${scrollY * -0.03}px)` }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
      
      <motion.div
        className="absolute top-[65%] right-[30%] w-6 h-6 bg-kikko-yellow/30 rounded-full blur-sm"
        style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.4}deg)` }}
        animate={{
          scale: [0.9, 1.3, 0.9],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
      />
    </section>
  );
}