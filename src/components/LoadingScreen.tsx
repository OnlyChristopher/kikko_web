import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Importar solo la imagen de siayu (soya) para el loading
import siyauImage from 'figma:asset/8c4cb152f1dc6e82eea9f28ce155aad3f0ecab1e.png';

// Producto único para el loading: Solo Siayu
const kikkoLoadingProduct = { 
  image: siyauImage, 
  name: "KIKKO Siyau",
  color: "5, 149, 211", // Azul Kikko
  glowColor: "rgba(5, 149, 211, 0.3)"
};

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export function LoadingScreen({ isLoading, progress = 0 }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0);
  // Usar siempre el producto siayu para el loading
  const currentProduct = kikkoLoadingProduct;

  // Prevenir scroll durante el loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading-no-scroll');
    } else {
      document.body.classList.remove('loading-no-scroll');
    }

    return () => {
      document.body.classList.remove('loading-no-scroll');
    };
  }, [isLoading]);

  // Contador animado sincronizado con 2 segundos
  useEffect(() => {
    if (isLoading) {
      setCounter(0);
      const duration = 2000; // 2 segundos - tiempo reducido
      const interval = 16; // ~60fps
      const steps = duration / interval;
      const increment = 100 / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep += 1;
        const newValue = Math.min(Math.round(currentStep * increment), 100);
        setCounter(newValue);
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center min-h-screen"
          style={{ backgroundColor: '#ffd700' }} // Fondo amarillo Kikko
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Botella Kikko con estructura de 2 divs - SIEMPRE VISIBLE */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Div 1: Contenedor con transition de opacity */}
            <div className="kikko-bottle-opacity-container relative">
              {/* Div 2: Contenedor con mask-image y mask-repeat */}
              <div
                className="kikko-bottle-mask-container w-auto h-full flex items-center justify-center animate-bottle-rise-up"
                style={{
                  marginBottom: '1.25rem', // margin-bottom 1.25rem
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 120%)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 120%)',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  animation: 'kikko-bottle-mask-reveal 2s ease-out forwards'
                }}
              >
                {/* Imagen de la botella */}
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="h-64 w-auto object-contain"
                />
              </div>
              
              {/* Efecto de resplandor dinámico por producto */}
              <div
                className="absolute inset-0 rounded-full blur-lg -z-10"
                style={{
                  background: `radial-gradient(circle, ${currentProduct.glowColor} 0%, transparent 60%)`
                }}
              />
            </div>
          </motion.div>
          
          {/* Contador animado de 0 a 100% - Solo versión negro medio */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Solo mantener: Negro medio */}
            <motion.p
              className="kikko-counter-negro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {counter}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}