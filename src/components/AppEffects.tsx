import { useEffect } from 'react';

interface AppEffectsProps {
  currentPage: string;
  isLoading: boolean;
}

export function AppEffects({ currentPage, isLoading }: AppEffectsProps) {
  
  // Efectos globales para optimización de rendimiento
  useEffect(() => {
    // Configuración global para smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimizaciones para rendimiento en mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
    }

    // Preconnect a Google Fonts para mejor rendimiento
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnectLink);

    const preconnectGstaticLink = document.createElement('link');
    preconnectGstaticLink.rel = 'preconnect';
    preconnectGstaticLink.href = 'https://fonts.gstatic.com';
    preconnectGstaticLink.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectGstaticLink);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Efectos específicos por página
  useEffect(() => {
    // Actualizar el título de la página según la sección actual
    const pageTitles = {
      home: 'KIKKO - Es más rico con KIKKO',
      about: 'Sobre KIKKO - Nuestra Historia',
      recipes: 'Recetas KIKKO - Deliciosas Ideas',
      'recipe-detail': 'Receta KIKKO - Detalles',
      novedades: 'Novedades KIKKO - Últimas Noticias',
      productos: 'Productos KIKKO - Nuestra Gama'
    };

    document.title = pageTitles[currentPage as keyof typeof pageTitles] || 'KIKKO';

    // Meta description dinámico
    const metaDescriptions = {
      home: 'Descubre KIKKO, la marca que hace que todo sea más rico. Productos de calidad y recetas deliciosas.',
      about: 'Conoce la historia de KIKKO, nuestra misión y valores que nos han convertido en tu marca de confianza.',
      recipes: 'Explora nuestras deliciosas recetas con productos KIKKO. Ideas fáciles y sabrosas para toda la familia.',
      'recipe-detail': 'Descubre los detalles de esta deliciosa receta con productos KIKKO.',
      novedades: 'Mantente al día con las últimas novedades, promociones y noticias de KIKKO.',
      productos: 'Conoce toda nuestra gama de productos KIKKO. Calidad y sabor en cada uno de ellos.'
    };

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescriptions[currentPage as keyof typeof metaDescriptions] || 'KIKKO - Es más rico con KIKKO');
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = metaDescriptions[currentPage as keyof typeof metaDescriptions] || 'KIKKO - Es más rico con KIKKO';
      document.head.appendChild(newMetaDesc);
    }

    // Canonical URL (si fuera una web real)
    const canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      canonicalUrl.setAttribute('href', `https://kikko.com/${currentPage === 'home' ? '' : currentPage}`);
    }

  }, [currentPage]);

  // Efectos durante el loading
  useEffect(() => {
    if (isLoading) {
      // Detener todas las animaciones CSS durante el loading para mejor rendimiento
      document.body.style.setProperty('--animation-play-state', 'paused');
      
      // Reducir calidad de imágenes durante la transición
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.imageRendering = 'optimizeSpeed';
      });
    } else {
      // Restaurar animaciones
      document.body.style.removeProperty('--animation-play-state');
      
      // Restaurar calidad de imágenes
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.imageRendering = 'auto';
      });
    }
  }, [isLoading]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      // Limpiar cualquier timer o listener que pueda quedar
      document.body.style.removeProperty('--animation-play-state');
      document.body.classList.remove('loading-no-scroll');
    };
  }, []);

  return null; // Este componente no renderiza nada, solo maneja efectos
}