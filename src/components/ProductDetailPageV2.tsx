import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Star, Award, Clock, Heart, Share2, X, CheckCircle, Shield, Zap, Sparkles, Eye, EyeOff, Monitor } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { IMAGE_ASSETS } from '../constants/imageAssets';
import { KikkoImage } from './KikkoImage';
import { AnimatedTitle, AnimatedSubtitle, AnimatedText } from './AnimatedText';

interface ProductDetailPageV2Props {
  product: any;
  onBackToProductos: () => void;
  onNavigateToHome: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToNovedades?: () => void;
  onNavigateToProductos?: () => void;
}

// Lista de todos los productos para el slider
const allProducts = [
  {
    id: 'siyau-original',
    name: 'Siyau',
    subtitle: 'Salsa de soya tradicional clásica',
    description: 'Nuestra salsa de soya clásica con el sabor auténtico que ha acompañado a las familias peruanas por más de 65 años.',
    image: IMAGE_ASSETS.SIYAU_IMAGE,
    category: 'Salsa de Soya',
    badges: ['Solo 1 Octógono', 'Receta Original', '65+ Años'],
    nutritionalInfo: {
      servingSize: '15ml (1 cucharada)',
      servingsPerContainer: '23 aprox.',
      calories: 10,
      protein: 1.8,
      totalFat: 0.0,
      saturatedFat: 0.0,
      carbohydrates: 1.0,
      sodium: 1200,
      sugars: 0.5
    },
    ingredients: 'Agua, soya, trigo, sal',
    uses: [
      'Aderezo para carnes y pescados',
      'Base para marinadas',
      'Condimento para salteados',
      'Complemento para arroz chaufa'
    ],
    recipes: ['Pollo Saltado', 'Arroz Chaufa', 'Pescado a la Plancha', 'Wantán Frito']
  },
  {
    id: 'salsa-mensi',
    name: 'Salsa Mensi',
    subtitle: 'Salsa de soya aderezada especial',
    description: 'Un aderezo completo hecho a base de ingredientes seleccionados con un proceso especial que le otorga un sabor único.',
    image: IMAGE_ASSETS.SALSA_MENSI_IMAGE,
    category: 'Salsa Especial',
    badges: ['Especial', 'Sabor Único'],
    nutritionalInfo: {
      servingSize: '15ml (1 cucharada)',
      servingsPerContainer: '23 aprox.',
      calories: 13,
      protein: 0.8,
      totalFat: 0.1,
      saturatedFat: 0.0,
      carbohydrates: 2.1,
      sodium: 673,
      sugars: 2.1
    },
    ingredients: 'Salsa de soya (Agua, sal, soya, trigo), ingredientes especiales, conservantes naturales',
    uses: [
      'Marinado especial de carnes',
      'Salteado de verduras gourmet',
      'Aderezo para platos orientales',
      'Dip para aperitivos'
    ],
    recipes: ['Tallarín Especial', 'Carne Oriental', 'Verduras Premium', 'Pollo Gourmet']
  },
  {
    id: 'ajoikion',
    name: 'Salsa Ajoikion',
    subtitle: 'Salsa de soya aderezada con ajo y kion',
    description: 'Una fusión perfecta de salsa de soya tradicional con el sabor intenso del ajo y el kion.',
    image: IMAGE_ASSETS.AJOIKION_IMAGE,
    category: 'Salsa Especial',
    badges: ['Sabor Intenso', 'Premium'],
    nutritionalInfo: {
      servingSize: '15ml (1 cucharada)',
      servingsPerContainer: '23 aprox.',
      calories: 15,
      protein: 1.0,
      totalFat: 0.0,
      saturatedFat: 0.0,
      carbohydrates: 2.5,
      sodium: 1500,
      sugars: 2.0
    },
    ingredients: 'Salsa de soya (Agua, sal, soya, trigo), ajo, kion, conservantes naturales',
    uses: [
      'Marinado de carnes',
      'Salteado de verduras',
      'Aderezo para platos orientales',
      'Dip para aperitivos'
    ],
    recipes: ['Pollo a la Italiana', 'Verduras al Curry', 'Cerdo a la Parrilla', 'Platos Orientales']
  },
  {
    id: 'shoyu-premium',
    name: 'Salsa Shoyu',
    subtitle: 'Salsa shoyu de calidad superior',
    description: 'Nuestra versión premium de la tradicional salsa shoyu japonesa, elaborada con ingredientes selectos.',
    image: IMAGE_ASSETS.SHOYU_IMAGE,
    category: 'Salsa Premium',
    badges: ['Premium', 'Fermentación Extendida', 'Sabor Refinado'],
    nutritionalInfo: {
      servingSize: '15ml (1 cucharada)',
      servingsPerContainer: '23 aprox.',
      calories: 12,
      protein: 1.5,
      totalFat: 0.0,
      saturatedFat: 0.0,
      carbohydrates: 1.5,
      sodium: 1100,
      sugars: 0.8
    },
    ingredients: 'Agua, soya, trigo, sal marina, koji',
    uses: [
      'Sushi y sashimi',
      'Marinado premium',
      'Salsa para tempura',
      'Condimento gourmet'
    ],
    recipes: ['Sushi Casero', 'Salmón Teriyaki', 'Tempura de Verduras', 'Ramen Casero']
  },
  {
    id: 'salsa-wantan',
    name: 'Salsa Wantan',
    subtitle: 'Salsa agridulce de tamarindo',
    description: 'La salsa wantán, es la salsa agridulce de tamarindo que gracias a la combinación de ingredientes seleccionados cuidadosamente, brinda un sabor ácido natural con un sabor dulce, creando un contraste delicioso.',
    image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/wantan.PNG',
    category: 'Salsa Agridulce',
    badges: ['Sabor Agridulce', 'Natural', 'Versatil'],
    nutritionalInfo: {
      servingSize: '15ml (1 cucharada grande)',
      servingsPerContainer: '23 aprox.',
      calories: 21,
      protein: 0.0,
      totalFat: 0.1,
      saturatedFat: 0.0,
      carbohydrates: 5.2,
      sodium: 9,
      sugars: 4.6
    },
    ingredients: 'Tamarindo, azúcar, sal, conservantes naturales, especias seleccionadas',
    uses: [
      'Ingrediente en adobos y base de guisos',
      'Glaseado para carnes',
      'Dip para frituras y aperitivos',
      'Complemento para verduras'
    ],
    recipes: ['Wantán Frito', 'Pollo Glaseado', 'Spring Rolls', 'Aperitivos Orientales']
  }
];

export function ProductDetailPageV2({ 
  product: initialProduct, 
  onBackToProductos, 
  onNavigateToHome, 
  onNavigateToAbout, 
  onNavigateToNovedades, 
  onNavigateToProductos 
}: ProductDetailPageV2Props) {
  // Encontrar el índice del producto inicial
  const initialIndex = allProducts.findIndex(p => p.id === initialProduct?.id) || 0;
  const [currentProductIndex, setCurrentProductIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  
  // Estados para video de fondo
  const [videoMode, setVideoMode] = useState<'clear' | 'blur' | 'overlay'>('clear');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Estado para los selectores de tags
  const [selectedTags, setSelectedTags] = useState({
    category: true,
    premium: true,
    tradicional: false,
    kikko: true,
    gourmet: false,
    special: true
  });

  // Estados para funcionalidad touch
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const currentProduct = allProducts[currentProductIndex];

  // Función para toggle de tags
  const toggleTag = (tagKey: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [tagKey]: !prev[tagKey as keyof typeof prev]
    }));
  };

  // Función para cambiar modo de video
  const toggleVideoMode = () => {
    const modes: ('clear' | 'blur' | 'overlay')[] = ['clear', 'blur', 'overlay'];
    const currentIndex = modes.indexOf(videoMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setVideoMode(modes[nextIndex]);
  };

  // Efecto para manejar el video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };
      
      // Evento para garantizar el loop en navegadores que podrían tener problemas
      const handleVideoEnded = () => {
        video.currentTime = 0;
        video.play().catch((error) => {
          console.log('Video replay failed:', error);
        });
      };
      
      // Evento adicional para detectar si el video se pausa inesperadamente
      const handleVideoPause = () => {
        // Solo reiniciar si no estamos en una pausa intencional
        if (!video.ended && video.currentTime > 0) {
          setTimeout(() => {
            if (video.paused && !video.ended) {
              video.play().catch((error) => {
                console.log('Video resume failed:', error);
              });
            }
          }, 100);
        }
      };
      
      // Evento para verificar el progreso del video
      const handleTimeUpdate = () => {
        // Si está cerca del final y no está haciendo loop automáticamente
        if (video.duration - video.currentTime < 0.5 && !video.loop) {
          video.loop = true;
        }
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleVideoEnded);
      video.addEventListener('pause', handleVideoPause);
      video.addEventListener('timeupdate', handleTimeUpdate);
      
      // Configuración adicional para garantizar el loop
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      
      // Forzar reproducción en navegadores modernos
      video.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('ended', handleVideoEnded);
        video.removeEventListener('pause', handleVideoPause);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  // Obtener clase de filtro para video
  const getVideoFilterClass = () => {
    switch(videoMode) {
      case 'blur': return 'blur-medium';
      case 'overlay': return '';
      default: return '';
    }
  };

  // Obtener clase de overlay para video
  const getVideoOverlayClass = () => {
    switch(videoMode) {
      case 'overlay': return 'darker';
      case 'blur': return 'dark';
      default: return 'none';
    }
  };

  // Obtener icono para botón de control
  const getVideoControlIcon = () => {
    switch(videoMode) {
      case 'clear': return Eye;
      case 'blur': return EyeOff;
      case 'overlay': return Monitor;
      default: return Eye;
    }
  };

  // Obtener texto para tooltip
  const getVideoControlText = () => {
    switch(videoMode) {
      case 'clear': return 'Video Claro';
      case 'blur': return 'Video Blur';
      case 'overlay': return 'Video Overlay';
      default: return 'Cambiar Modo';
    }
  };

  // Función para navegar al siguiente producto
  const goToNextProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Cerrar modal si está abierto para evitar confusión
    setShowNutritionModal(false);
    setTimeout(() => {
      setCurrentProductIndex((prev) => (prev + 1) % allProducts.length);
      // Resetear selecciones de tags para el nuevo producto
      setSelectedTags({
        category: true,
        premium: true,
        tradicional: false,
        kikko: true,
        gourmet: false,
        special: true
      });
      setIsTransitioning(false);
    }, 300);
  };

  // Función para navegar al producto anterior
  const goToPreviousProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Cerrar modal si está abierto para evitar confusión
    setShowNutritionModal(false);
    setTimeout(() => {
      setCurrentProductIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);
      // Resetear selecciones de tags para el nuevo producto
      setSelectedTags({
        category: true,
        premium: true,
        tradicional: false,
        kikko: true,
        gourmet: false,
        special: true
      });
      setIsTransitioning(false);
    }, 300);
  };

  // Función para ir a un producto específico
  const goToProduct = (index: number) => {
    if (isTransitioning || index === currentProductIndex) return;
    setIsTransitioning(true);
    // Cerrar modal si está abierto para evitar confusión
    setShowNutritionModal(false);
    setTimeout(() => {
      setCurrentProductIndex(index);
      // Resetear selecciones de tags para el nuevo producto
      setSelectedTags({
        category: true,
        premium: true,
        tradicional: false,
        kikko: true,
        gourmet: false,
        special: true
      });
      setIsTransitioning(false);
    }, 300);
  };

  // Funciones para manejar gestos touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const touchDiff = touchStartX - touchEndX;
    const minSwipeDistance = 50; // Distancia mínima para activar swipe
    
    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        // Swipe left - siguiente producto
        goToNextProduct();
      } else {
        // Swipe right - producto anterior
        goToPreviousProduct();
      }
    }
  };

  // Configuración de tags con íconos personalizados
  const tagConfig = [
    { 
      key: 'category', 
      label: currentProduct.category.toUpperCase(), 
      icon: Shield, 
      gradient: 'from-kikko-blue to-kikko-blue-light',
      bgOpacity: 'bg-white/90'
    },
    { 
      key: 'premium', 
      label: 'PREMIUM', 
      icon: Star, 
      gradient: 'from-kikko-yellow to-kikko-yellow-light',
      bgOpacity: 'bg-white/80'
    },
    { 
      key: 'tradicional', 
      label: 'TRADICIONAL', 
      icon: Award, 
      gradient: 'from-gray-600 to-gray-700',
      bgOpacity: 'bg-white/70'
    },
    { 
      key: 'kikko', 
      label: 'KIKKO', 
      icon: Sparkles, 
      gradient: 'from-kikko-red to-kikko-red-light',
      bgOpacity: 'bg-white/85'
    },
    { 
      key: 'gourmet', 
      label: 'GOURMET', 
      icon: Zap, 
      gradient: 'from-purple-600 to-purple-700',
      bgOpacity: 'bg-white/75'
    },
    { 
      key: 'special', 
      label: currentProduct.badges[0]?.toUpperCase() || 'ESPECIAL', 
      icon: CheckCircle, 
      gradient: 'from-green-600 to-green-700',
      bgOpacity: 'bg-white/90'
    }
  ];

  if (!currentProduct) {
    return (
      <div className="h-screen bg-kikko-blue flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-klein-bold text-gray-800 mb-6">Producto no encontrado</h2>
          <button 
            onClick={onBackToProductos} 
            className="bg-kikko-blue text-white px-8 py-3 rounded-xl font-medium hover:bg-kikko-blue-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 inline-block" />
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen overflow-hidden relative">
        
        {/* Video de fondo con controles */}
        <video
          ref={videoRef}
          className={`video-background ${getVideoFilterClass()} ${isTransitioning ? 'video-transitioning' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          data-loop="true"
        >
          <source src="https://mybucketkikko.s3.us-east-1.amazonaws.com/intro2.mp4" type="video/mp4" />
          {/* Fallback para navegadores que no soportan video */}
          <div className="absolute inset-0 bg-gradient-to-br from-kikko-blue via-kikko-blue to-white/20" />
        </video>

        {/* Overlay de color sobre el video */}
        <div className={`video-overlay ${getVideoOverlayClass()}`} />

        {/* Botón de control de video */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVideoMode}
          className={`video-control-button ${videoMode}`}
        >
          <div className="relative flex items-center justify-center">
            {(() => {
              const IconComponent = getVideoControlIcon();
              return <IconComponent className="w-6 h-6" strokeWidth={2} />;
            })()}
            <div className="video-control-tooltip">
              {getVideoControlText()}
            </div>
          </div>
        </motion.button>

        {/* Loading indicator para video */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-kikko-blue flex items-center justify-center video-loading">
            <div className="text-white text-lg font-medium">Cargando video...</div>
          </div>
        )}

        {/* Indicadores de productos - MÁS PEQUEÑOS EN MOBILE */}
        <div className="absolute top-6 right-6 z-50">
          <div className="flex space-x-1.5 md:space-x-2">
            {allProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProduct(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentProductIndex 
                    ? 'bg-white scale-110 md:scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navegación lateral izquierda - FLECHAS MÁS PEQUEÑAS EN MOBILE */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPreviousProduct}
          disabled={isTransitioning}
          className="absolute top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-kikko-blue via-kikko-blue-light to-kikko-blue-dark text-white border-2 border-white/30 shadow-2xl hover:shadow-kikko-blue/50 transition-all duration-300 disabled:opacity-50 z-50 kikko-nav-button
                     p-2 md:p-3 lg:p-4"
          style={{
            left: '0px',
            background: 'linear-gradient(135deg, #0595d3 0%, #3baee9 50%, #047bb8 100%)',
            boxShadow: '0 8px 32px rgba(5, 149, 211, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          <div className="relative flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" strokeWidth={3} />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 bg-kikko-blue-light rounded-full border border-white/50 animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-kikko-blue/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            {/* Marca KIKKO en pequeño - más pequeña en mobile */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[4px] md:text-[5px] lg:text-[6px] font-bold tracking-widest text-white/60">K</div>
          </div>
        </motion.button>

        {/* Navegación lateral derecha - FLECHAS MÁS PEQUEÑAS EN MOBILE */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNextProduct}
          disabled={isTransitioning}
          className="absolute top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-kikko-blue via-kikko-blue-light to-kikko-blue-dark text-white border-2 border-white/30 shadow-2xl hover:shadow-kikko-blue/50 transition-all duration-300 disabled:opacity-50 z-50 kikko-nav-button
                     p-2 md:p-3 lg:p-4"
          style={{
            right: '0px',
            background: 'linear-gradient(135deg, #0595d3 0%, #3baee9 50%, #047bb8 100%)',
            boxShadow: '0 8px 32px rgba(5, 149, 211, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
        >
          <div className="relative flex items-center justify-center">
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" strokeWidth={3} />
            <div className="absolute -top-1 -left-1 w-1.5 h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 bg-kikko-blue-light rounded-full border border-white/50 animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-kikko-blue/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            {/* Marca KIKKO en pequeño - más pequeña en mobile */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[4px] md:text-[5px] lg:text-[6px] font-bold tracking-widest text-white/60">O</div>
          </div>
        </motion.button>

        {/* Contenido principal - LAYOUT HORIZONTAL CON TOUCH GESTURES */}
        <div 
          className="h-full flex items-center justify-center w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full max-w-7xl mx-auto">
            {/* GRID SIEMPRE 2 COLUMNAS - MOBILE MANTIENE 2 COLUMNAS */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-16 xl:gap-20 items-center h-full">
              
              {/* Columna izquierda - Imagen del producto AGRANDADA EN MOBILE */}
              <motion.div
                key={`product-image-${currentProductIndex}`}
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: isTransitioning ? 0 : 1, x: 0, scale: isTransitioning ? 0.8 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex justify-center items-center"
              >
                {/* Contenedor simple SIN efectos visuales */}
                <div className="relative">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative"
                  >
                    <img
                      src={currentProduct.image}
                      alt={`KIKKO ${currentProduct.name}`}
                      className="h-72 sm:h-80 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[550px] w-auto object-contain max-w-full"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Columna derecha - Información del producto COMPACTA EN MOBILE */}
              <motion.div
                key={`product-info-${currentProductIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: isTransitioning ? 0 : 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="space-y-3 md:space-y-6 lg:space-y-8 max-w-2xl text-white"
              >
                {/* Nombre del producto en script */}
                <div className="product-name-container">
                  <h1 
                    className="text-white mb-2 md:mb-4 product-name-single-line"
                    style={{ 
                      fontFamily: 'Brush Script MT, cursive, system-ui',
                      transform: 'rotate(-3deg)',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)',
                      fontSize: 'clamp(2.5rem, 8vw, 6rem)' // MÁS GRANDE en mobile
                    }}
                  >
                    {currentProduct.name}
                  </h1>
                </div>

                {/* Tags/Categorías con íconos interactivos */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-wrap gap-1 md:gap-1.5 sm:gap-2 kikko-tags-single-line">
                    {tagConfig.map((tag) => {
                      const IconComponent = tag.icon;
                      const isSelected = selectedTags[tag.key as keyof typeof selectedTags];
                      
                      return (
                        <motion.button
                          key={tag.key}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleTag(tag.key)}
                          className={`
                            px-1.5 md:px-2 sm:px-3 py-0.5 md:py-1 sm:py-1.5 border-2 text-[10px] md:text-xs font-medium tracking-wider
                            transition-all duration-300 flex items-center gap-0.5 md:gap-1 sm:gap-1.5 rounded-md
                            backdrop-blur-md
                            ${isSelected 
                              ? `border-white text-white bg-white/20 shadow-lg kikko-tag-selected` 
                              : 'border-white/50 text-white/80 bg-white/10 hover:bg-white/20 kikko-tag-unselected'
                            }
                          `}
                        >
                          <IconComponent className={`w-2 h-2 md:w-3 md:h-3 transition-colors duration-300 ${
                            isSelected ? 'text-white' : 'text-white/70'
                          }`} />
                          <span className="whitespace-nowrap">{tag.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Descripción */}
                <div className="max-w-2xl">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed backdrop-blur-sm bg-black/20 p-2 md:p-4 rounded-lg"
                     style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                    {currentProduct.description} Esta salsa premium combina la tradición 
                    con ingredientes seleccionados para crear un sabor único que realza cada platillo.
                  </p>
                </div>

                {/* Botón Ver información nutricional */}
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNutritionModal(true)}
                    className="px-3 md:px-6 sm:px-8 py-1.5 md:py-2 sm:py-3 text-xs md:text-sm bg-white/20 backdrop-blur-md border-2 border-white text-white font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                  >
                    VER INFORMACIÓN NUTRICIONAL
                  </motion.button>
                </div>

                {/* Certificaciones/Logos - OCULTOS EN MOBILE */}
                <div className="hidden md:flex items-center space-x-4 sm:space-x-6 lg:space-x-8 pt-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white/80" />
                    <span className="text-xs sm:text-sm text-white/90 font-medium">Certificado de Calidad</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg">
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white/80" />
                    <span className="text-xs sm:text-sm text-white/90 font-medium">Premium Quality</span>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal de información nutricional */}
      {showNutritionModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
          onClick={() => setShowNutritionModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto kikko-custom-scroll shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-klein-bold text-gray-800">
                Información Nutricional - {currentProduct.name}
              </h2>
              <button
                onClick={() => setShowNutritionModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6">
              {/* Tabla nutricional */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información por porción</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Tamaño de porción</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.servingSize}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Porciones por envase</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.servingsPerContainer}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Calorías</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.calories} kcal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Proteínas</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.protein}g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Grasa total</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.totalFat}g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Carbohidratos</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.carbohydrates}g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Sodio</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.sodium}mg</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Azúcares</span>
                    <span className="font-medium">{currentProduct.nutritionalInfo.sugars}g</span>
                  </div>
                </div>
              </div>

              {/* Ingredientes */}
              <div className="bg-kikko-blue/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Ingredientes</h3>
                <p className="text-gray-700 leading-relaxed">{currentProduct.ingredients}</p>
              </div>

              {/* Usos recomendados */}
              <div className="bg-kikko-yellow/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Usos recomendados</h3>
                <ul className="space-y-2">
                  {currentProduct.uses.map((use: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-kikko-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recetas sugeridas */}
              <div className="bg-kikko-red/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recetas sugeridas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentProduct.recipes.map((recipe: string, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <span className="text-gray-700 text-sm font-medium">{recipe}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}