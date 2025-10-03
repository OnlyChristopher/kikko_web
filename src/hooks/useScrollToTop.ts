import { useEffect } from 'react';

export function useScrollToTop(dependency: any) {
  useEffect(() => {
    // Función para scroll al top más suave y menos interferente
    const scrollToTop = () => {
      // Solo hacer scroll si realmente es necesario
      const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      if (currentScroll > 10) { // Solo si hay scroll significativo
        
        // Scroll inmediato para evitar flash
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto' // Cambié de 'smooth' para ser menos interferente
        });
        
        // Asegurar que está en 0
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // Delay más corto para reducir interferencia
    const timer = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timer);
  }, [dependency]);
}

// Hook adicional para scroll inmediato (sin animación)
export function useScrollToTopImmediate(dependency: any) {
  useEffect(() => {
    // Scroll inmediato sin animación
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [dependency]);
}