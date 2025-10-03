import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Search, Menu, X, ChefHat, Home, Info, ShoppingBag, BookOpen, Newspaper, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModernHamburgerIcon } from "./ModernHamburgerIcon";
import kikkoLogo from 'figma:asset/fe8763c81b8f7a5a05335fc7692502253b0bb495.png';

interface HeaderProps {
  onNavigateToHome?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToRecipes?: () => void;
  onNavigateToNovedades?: () => void;
  onNavigateToProductos?: () => void;
  currentPage?: 'home' | 'about' | 'recipes' | 'recipes-v2' | 'recipe-detail' | 'recipe-detail-v2' | 'novedades' | 'productos' | 'product-detail';
  isLoading?: boolean;
}

export function Header({ onNavigateToHome, onNavigateToAbout, onNavigateToRecipes, onNavigateToNovedades, onNavigateToProductos, currentPage = 'home', isLoading = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        setScrollY(currentScrollY);
      });
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // Efecto para manejar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevenir scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restaurar scroll
      const scrollTo = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollTo);
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen, scrollY]);

  // Estado del scroll con threshold normal
  const isScrolled = scrollY > 50;
  
  // Estilo del header
  const headerStyle = {
    backgroundColor: isMobileMenuOpen 
      ? '#0595d3' 
      : isScrolled 
        ? '#0595d3' 
        : 'transparent',
    boxShadow: isScrolled || isMobileMenuOpen 
      ? '0 8px 32px rgba(5, 149, 211, 0.3)' 
      : 'none',
    borderBottom: isScrolled || isMobileMenuOpen 
      ? '1px solid rgba(255, 255, 255, 0.2)' 
      : 'none',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 9999
  };

  return (
    <header 
      className={`transition-all duration-300 ease-out ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isScrolled ? 'header-scrolled' : ''}`}
      style={headerStyle}
    >
      {/* Navegación principal en una línea optimizada */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="header-mobile-layout py-3 md:py-4 lg:py-3">
          {/* Logo compacto */}
          <div className="header-logo-mobile flex items-center flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={kikkoLogo} 
                alt="Kikko - Sazonador Oriental" 
                className="kikko-logo-responsive w-auto cursor-pointer transition-all duration-300"
                style={{
                  filter: isScrolled 
                    ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' 
                    : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8))'
                }}
                onClick={onNavigateToHome}
              />
            </motion.div>
          </div>

          {/* Navegación central */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-6">
              {[
                { name: "Inicio", active: currentPage === 'home', onClick: onNavigateToHome },
                { name: "Todo sobre Kikko", active: currentPage === 'about', onClick: onNavigateToAbout },
                { name: "Nuestros Productos", active: currentPage === 'productos', onClick: onNavigateToProductos },

                { name: "Recetas", active: currentPage === 'recipes' || currentPage === 'recipes-v2' || currentPage === 'recipe-detail' || currentPage === 'recipe-detail-v2', onClick: onNavigateToRecipes },
                { name: "Novedades", active: currentPage === 'novedades', onClick: onNavigateToNovedades },
                { name: "Contacto", active: false, onClick: null },
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={item.onClick || (() => {})}
                  className="px-3 py-2 text-sm relative transition-all duration-300 menu-kikko whitespace-nowrap bg-transparent border-none cursor-pointer"
                  style={{
                    color: item.active ? '#fde047' : 'white',
                    textShadow: isScrolled 
                      ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
                      : '2px 2px 8px rgba(0, 0, 0, 0.9)',
                    fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    fontSize: '14px',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.color = '#fef08a';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {item.active && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ 
                        background: 'linear-gradient(90deg, var(--kikko-yellow), var(--kikko-yellow-light))',
                        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.5)'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Acciones a la derecha */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Búsqueda */}
            <div className="hidden lg:flex items-center">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "180px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center bg-white/10 backdrop-blur-sm overflow-hidden border border-white/20"
                  >
                    <Search className="w-3.5 h-3.5 ml-2 text-white/70" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="px-2 py-1.5 bg-transparent outline-none text-white placeholder-white/80 flex-1 text-xs"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-1 text-white/70 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-white hover:bg-white/20 transition-all duration-300"
                    style={{
                      filter: isScrolled 
                        ? 'none' 
                        : 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.9))'
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Botón CTA con tooltip */}
            <motion.div 
              className="hidden lg:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    className="shadow-lg hover:shadow-xl transition-all px-3 py-1.5 text-xs font-bold menu-kikko cursor-pointer inline-flex items-center justify-center gap-2"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--kikko-yellow) 0%, var(--kikko-yellow-light) 100%)',
                      color: 'var(--pantone-black)',
                      filter: isScrolled
                        ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                        : 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.8))',
                      fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    <ChefHat className="w-3.5 h-3.5 mr-1.5" />
                    Crear
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  sideOffset={8}
                  className="tooltip-kikko overflow-visible relative z-50"
                >
                  <p 
                    className="font-bold text-sm"
                    style={{ 
                      fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif',
                      color: '#1e3a8a'
                    }}
                  >
                    🍽️ CREAR NUEVA RECETA
                  </p>
                  <p 
                    className="text-xs mt-1" 
                    style={{ color: '#374151' }}
                  >
                    Comparte tus mejores recetas con <strong style={{ color: '#0595d3' }}>Kikko</strong>
                  </p>
                </TooltipContent>
              </Tooltip>
            </motion.div>



            {/* Botón menú móvil moderno - Centrado en mobile */}
            <div className="header-hamburger-mobile lg:hidden">
              <ModernHamburgerIcon
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="transition-all duration-300"
                size={20}
              />
            </div>

            {/* Spacer para mantener balance en mobile */}
            <div className="header-spacer-mobile lg:hidden"></div>
          </div>
        </div>

        {/* Menú móvil moderno - Full screen overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50"
              style={{ top: '80px' }} // Espacio para el header
            >
              {/* Background overlay con blur */}
              <motion.div
                initial={{ backdropFilter: 'blur(0px)' }}
                animate={{ backdropFilter: 'blur(20px)' }}
                exit={{ backdropFilter: 'blur(0px)' }}
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(5, 149, 211, 0.95) 0%, rgba(5, 149, 211, 0.98) 50%, rgba(2, 120, 174, 0.95) 100%)'
                }}
              />

              {/* Contenido del menú */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative h-full overflow-y-auto mobile-menu-scroll"
              >
                <div className="px-6 py-6 min-h-full">

                  {/* Búsqueda móvil moderna */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        placeholder="Buscar recetas, productos..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 outline-none focus:border-kikko-yellow focus:ring-2 focus:ring-kikko-yellow/30 transition-all"
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif'
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Enlaces de navegación con iconos y cards modernas */}
                  <div className="space-y-4 mb-6">
                    {[
                      { 
                        name: "Inicio", 
                        description: "Página principal",
                        icon: Home, 
                        active: currentPage === 'home', 
                        onClick: onNavigateToHome ? () => { onNavigateToHome(); setIsMobileMenuOpen(false); } : null 
                      },
                      { 
                        name: "Todo sobre Kikko", 
                        description: "Nuestra historia y valores",
                        icon: Info, 
                        active: currentPage === 'about', 
                        onClick: onNavigateToAbout ? () => { onNavigateToAbout(); setIsMobileMenuOpen(false); } : null 
                      },
                      { 
                        name: "Nuestros Productos", 
                        description: "Línea completa de productos",
                        icon: ShoppingBag, 
                        active: currentPage === 'productos', 
                        onClick: onNavigateToProductos ? () => { onNavigateToProductos(); setIsMobileMenuOpen(false); } : null 
                      },
                      { 
                        name: "Recetas", 
                        description: "Deliciosas recetas con Kikko",
                        icon: BookOpen, 
                        active: currentPage === 'recipes' || currentPage === 'recipes-v2' || currentPage === 'recipe-detail' || currentPage === 'recipe-detail-v2', 
                        onClick: onNavigateToRecipes ? () => { onNavigateToRecipes(); setIsMobileMenuOpen(false); } : null 
                      },
                      { 
                        name: "Novedades", 
                        description: "Últimas noticias y eventos",
                        icon: Newspaper, 
                        active: currentPage === 'novedades', 
                        onClick: onNavigateToNovedades ? () => { onNavigateToNovedades(); setIsMobileMenuOpen(false); } : null 
                      },
                      { 
                        name: "Contacto", 
                        description: "Ponte en contacto con nosotros",
                        icon: Phone, 
                        active: false, 
                        onClick: null 
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <motion.button
                          onClick={item.onClick || (() => {})}
                          className={`mobile-menu-card-hover w-full p-5 rounded-2xl transition-all duration-300 text-left relative overflow-hidden border-none cursor-pointer ${
                            item.active 
                              ? 'bg-gradient-to-r from-kikko-yellow/20 to-kikko-yellow-light/20 border-2 border-kikko-yellow/50' 
                              : 'mobile-menu-glass hover:bg-white/20'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Fondo decorativo para el item activo */}
                          {item.active && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-gradient-to-r from-kikko-yellow/10 to-transparent"
                            />
                          )}

                          <div className="relative flex items-center">
                            <div className={`mobile-menu-icon-glow p-3 rounded-xl mr-4 ${
                              item.active 
                                ? 'bg-kikko-yellow text-pantone-black' 
                                : 'bg-white/20 text-white'
                            }`}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className={`font-bold text-lg mb-1 ${
                                item.active ? 'text-kikko-yellow' : 'text-white'
                              }`}
                              style={{
                                fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif',
                                letterSpacing: '0.5px'
                              }}>
                                {item.name}
                              </h3>
                              <p className="text-white/70 text-sm"
                              style={{
                                fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif'
                              }}>
                                {item.description}
                              </p>
                            </div>

                            <ArrowRight className={`w-5 h-5 transition-transform ${
                              item.active ? 'text-kikko-yellow' : 'text-white/50'
                            }`} />
                          </div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA móvil moderno */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-6"
                  >
                    <motion.button
                      className="animate-mobile-menu-cta-pulse w-full p-6 rounded-2xl relative overflow-hidden border-none cursor-pointer"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--kikko-yellow) 0%, var(--kikko-yellow-light) 50%, var(--kikko-yellow) 100%)',
                        boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)'
                      }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Efecto de brillo animado */}
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3, 
                          ease: 'linear',
                          repeatDelay: 2 
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ skewX: '-20deg' }}
                      />
                      
                      <div className="relative flex items-center justify-center">
                        <div className="p-2 bg-white/20 rounded-xl mr-4">
                          <ChefHat className="w-7 h-7 text-pantone-black" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-xl text-pantone-black mb-1"
                          style={{
                            fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif',
                            letterSpacing: '1px'
                          }}>
                            CREAR RECETA
                          </h3>
                          <p className="text-pantone-black/80 text-sm"
                          style={{
                            fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif'
                          }}>
                            Comparte tu receta favorita
                          </p>
                        </div>
                        <Sparkles className="w-6 h-6 text-pantone-black" />
                      </div>
                    </motion.button>
                  </motion.div>

                  {/* Footer del menú */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-white/60 text-sm mb-4"
                    style={{
                      fontFamily: 'Acumin Variable Concept, Inter, system-ui, -apple-system, sans-serif'
                    }}>
                      Es más rico con <span className="text-kikko-yellow font-bold">KIKKO</span>
                    </p>
                    
                    {/* Logo pequeño */}
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="inline-block"
                    >
                      <img 
                        src={kikkoLogo} 
                        alt="Kikko" 
                        className="h-12 w-auto opacity-80"
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}