import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Footer } from './Footer';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Star, Award, Package, Zap, Target, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGE_ASSETS } from '../constants/imageAssets';
import leafElement from 'figma:asset/10b22644f280f3acfb35244adb325721c2a50834.png';
import spicesElement from 'figma:asset/257364dd0795051b7f4094b570846655baec323e.png';
import wheatElement from 'figma:asset/b217ad9c0dbe833cec35515bb32611aefff14b6a.png';
import soybeanElement from 'figma:asset/a5a0c3166dd108bf659cea3479055311fd12b56c.png';

interface ProductosPageProps {
  onNavigateToHome: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToRecipes?: () => void;
  onNavigateToNovedades?: () => void;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  badges: string[];
  features: string[];
  nutritionalInfo: {
    servingSize: string;
    servingsPerContainer: string;
    calories: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    carbohydrates: number;
    sodium: number;
    sugars: number;
  };
  ingredients: string;
  uses: string[];
  recipes: string[];
  color: string; // Color temático para cada producto
}

// Productos KIKKO con colores temáticos
const productos: Product[] = [
  {
    id: 'siyau-original',
    name: 'Siyau Original',
    subtitle: 'Salsa de soya tradicional clásica',
    description: 'Nuestra salsa de soya clásica con el sabor auténtico que ha acompañado a las familias peruanas por más de 65 años. Elaborada con soya seleccionada y fermentada naturalmente para mantener la tradición y calidad que nos caracteriza.',
    image: IMAGE_ASSETS.SIYAU_IMAGE,
    category: 'Salsa de Soya',
    badges: ['Solo 1 Octógono', 'Receta Original', '65+ Años'],
    features: [
      'Fermentación natural de 90 días',
      'Sin aditivos artificiales',
      'Sabor umami auténtico',
      'Ideal para toda la familia'
    ],
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
    recipes: ['Pollo Saltado', 'Arroz Chaufa', 'Pescado a la Plancha', 'Wantán Frito'],
    color: '#0595d3'
  },
  {
    id: 'salsa-mensi',
    name: 'Salsa Mensi',
    subtitle: 'Salsa de soya aderezada especial',
    description: 'Un aderezo completo hecho a base de ingredientes seleccionados con un proceso especial que le otorga un sabor único y característico. Perfecta para realzar el sabor de tus platos favoritos.',
    image: IMAGE_ASSETS.SALSA_MENSI_IMAGE,
    category: 'Salsa Especial',
    badges: ['Especial', 'Sabor Único'],
    features: [
      'Proceso especial de elaboración',
      'Ingredientes seleccionados',
      'Sabor balanceado',
      'Calidad premium'
    ],
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
    recipes: ['Tallarín Especial', 'Carne Oriental', 'Verduras Premium', 'Pollo Gourmet'],
    color: '#ffd700'
  },
  {
    id: 'ajoikion',
    name: 'Ajoikion',
    subtitle: 'Salsa de soya aderezada con ajo y kion',
    description: 'Una fusión perfecta de salsa de soya tradicional con el sabor intenso del ajo y el kion, creando una salsa única con personalidad propia que realza cualquier plato con su sabor característico.',
    image: IMAGE_ASSETS.AJOIKION_IMAGE,
    category: 'Salsa Especial',
    badges: ['Sabor Intenso', 'Premium'],
    features: [
      'Sabor intenso y balanceado',
      'Combinación perfecta de ajo y kion',
      'Calidad garantizada',
      'Ideal para platos gourmet'
    ],
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
    recipes: ['Pollo a la Italiana', 'Verduras al Curry', 'Cerdo a la Parrilla', 'Platos Orientales'],
    color: '#dc3545'
  },
  {
    id: 'shoyu-premium',
    name: 'Shoyu Premium',
    subtitle: 'Salsa shoyu de calidad superior',
    description: 'Nuestra versión premium de la tradicional salsa shoyu japonesa, elaborada con ingredientes selectos y un proceso de fermentación extendido para un sabor más refinado y complejo.',
    image: IMAGE_ASSETS.SHOYU_IMAGE,
    category: 'Salsa Premium',
    badges: ['Premium', 'Fermentación Extendida', 'Sabor Refinado'],
    features: [
      'Proceso de fermentación premium',
      'Ingredientes selectos japoneses',
      'Sabor más refinado y complejo',
      'Presentación elegante'
    ],
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
    recipes: ['Sushi Casero', 'Salmón Teriyaki', 'Tempura de Verduras', 'Ramen Casero'],
    color: '#0595d3'
  },
  {
    id: 'salsa-wantan',
    name: 'Salsa Wantán',
    subtitle: 'Salsa agridulce de tamarindo',
    description: 'La salsa wantán, es la salsa agridulce de tamarindo que gracias a la combinación de ingredientes seleccionados cuidadosamente, brinda un sabor ácido natural con un sabor dulce, creando un contraste delicioso.',
    image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/wantan.PNG',
    category: 'Salsa Agridulce',
    badges: ['Sabor Agridulce', 'Natural', 'Versátil'],
    features: [
      'Sabor agridulce natural',
      'Base de tamarindo',
      'Ingredientes seleccionados',
      'Versatilidad culinaria'
    ],
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
    recipes: ['Wantán Frito', 'Pollo Glaseado', 'Spring Rolls', 'Aperitivos Orientales'],
    color: '#ffd700'
  },
  {
    id: 'salsa-oriental',
    name: 'Salsa Oriental',
    subtitle: 'Salsa de soya tradicional concentrada',
    description: 'Una salsa de soya concentrada con sabor intenso, perfecta para platos que requieren un toque oriental auténtico. Ideal para la cocina china y fusión.',
    image: IMAGE_ASSETS.PRODUCT_EXTRA_IMAGE,
    category: 'Salsa Tradicional',
    badges: ['Concentrada', 'Sabor Intenso', 'Auténtica'],
    features: [
      'Fórmula concentrada tradicional',
      'Sabor oriental auténtico',
      'Ideal para cocina china',
      'Rendimiento superior'
    ],
    nutritionalInfo: {
      servingSize: '10ml (2/3 cucharada)',
      servingsPerContainer: '35 aprox.',
      calories: 8,
      protein: 1.4,
      totalFat: 0.0,
      saturatedFat: 0.0,
      carbohydrates: 0.8,
      sodium: 1350,
      sugars: 0.3
    },
    ingredients: 'Agua, soya concentrada, trigo, sal, color caramelo natural',
    uses: [
      'Cocina china tradicional',
      'Salteados intensos',
      'Base para salsas',
      'Marinados profundos'
    ],
    recipes: ['Chijaukay Clásico', 'Kam Lu Wantán', 'Cerdo Agridulce', 'Verduras Salteadas'],
    color: '#dc3545'
  }
];

export function ProductosPage({ onNavigateToHome, onNavigateToAbout, onNavigateToRecipes, onNavigateToNovedades }: ProductosPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transforms para parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0.5]);

  // Smooth spring para suavizar las animaciones
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });
  const smoothY4 = useSpring(y4, { stiffness: 100, damping: 30 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Seguimiento del mouse para efectos adicionales
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Función para abrir el detalle horizontal
  const handleOpenProductDetail = (product: Product) => {
    console.log('=== handleOpenProductDetail DEBUG ===');
    console.log('isTransitioning:', isTransitioning);
    console.log('product received:', product);
    console.log('product.id:', product?.id);
    console.log('product.name:', product?.name);
    console.log('================================');
    
    if (isTransitioning || !product) {
      console.log('handleOpenProductDetail - Blocked:', { isTransitioning, hasProduct: !!product });
      return;
    }
    
    console.log('handleOpenProductDetail - Opening for:', product.name, product.id);
    
    // Bloquear el scroll del body inmediatamente
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
    
    // Configurar el estado inmediatamente
    setSelectedProduct(product);
    setIsDetailOpen(true);
    setIsTransitioning(true);
    
    console.log('States set - selectedProduct should be:', product);
    
    // Reset transitioning después de animación
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Función para cerrar el detalle
  const handleCloseDetail = () => {
    if (isTransitioning) return;
    
    console.log('Closing product detail');
    
    setIsTransitioning(true);
    setIsDetailOpen(false);
    
    // Desbloquear el scroll del body inmediatamente
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    setTimeout(() => {
      setSelectedProduct(null);
      setIsTransitioning(false);
    }, 400);
  };

  // Navegación entre productos en el detalle
  const handleNextProduct = () => {
    if (!selectedProduct || isTransitioning) return;
    
    setIsTransitioning(true);
    const currentIndex = productos.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % productos.length;
    setSelectedProduct(productos[nextIndex]);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevProduct = () => {
    if (!selectedProduct || isTransitioning) return;
    
    setIsTransitioning(true);
    const currentIndex = productos.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + productos.length) % productos.length;
    setSelectedProduct(productos[prevIndex]);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Effect para manejar el escape key y cleanup
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDetailOpen && !isTransitioning) {
        handleCloseDetail();
      }
    };

    if (isDetailOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isDetailOpen, isTransitioning]);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      // Cleanup del scroll cuando se desmonta el componente
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Header espaciado */}
      <div className="h-24"></div>

      {/* Sección Hero con productos flotantes */}
      <section className="relative overflow-hidden bg-white" style={{ height: '90vh' }}>
        {/* Fondo con gradiente dinámico */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(5, 149, 211, 0.1) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(220, 53, 69, 0.1) 100%)`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: '200% 200%'
          }}
        />

        {/* Productos flotantes distribuidos alrededor del título - NUEVA DISTRIBUCIÓN */}
        {productos.map((product, index) => {
          // Posiciones específicas alrededor del texto "Descubre KIKKO"
          const positions = [
            { x: 15, y: 20 }, // Arriba izquierda
            { x: 85, y: 25 }, // Arriba derecha
            { x: 10, y: 50 }, // Medio izquierda
            { x: 90, y: 55 }, // Medio derecha
            { x: 20, y: 80 }, // Abajo izquierda
            { x: 80, y: 75 }  // Abajo derecha
          ];
          
          const position = positions[index % positions.length];
          
          return (
            <motion.div
              key={`floating-product-${product.id}`}
              className="absolute cursor-pointer z-10"
              style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(index * 1.5) * 10, 0],
                rotate: [0, index % 2 === 0 ? 6 : -6, 0],
                scale: [0.95, 1.05, 1]
              }}
              transition={{
                duration: 6 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
              onClick={() => handleOpenProductDetail(product)}
              whileHover={{ 
                scale: 1.2, 
                rotate: index % 2 === 0 ? 10 : -10,
                y: -8
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Imagen del producto limpia - SIN fondos de color */}
              <motion.img
                src={product.image}
                alt={`KIKKO ${product.name}`}
                className="w-20 h-26 md:w-24 md:h-30 lg:w-28 lg:h-36 object-contain"
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              />

              {/* Badge limpio del nombre */}
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-xs font-medium bg-white text-gray-700 opacity-0 shadow-sm border border-gray-200"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {product.name}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Título principal con animación */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <motion.h1
              className="font-klein-bold text-6xl md:text-8xl lg:text-9xl text-gray-900 mb-6 uppercase"
              animate={{
                textShadow: [
                  "0 0 20px rgba(5, 149, 211, 0.3)",
                  "0 0 40px rgba(255, 215, 0, 0.3)",
                  "0 0 20px rgba(220, 53, 69, 0.3)",
                  "0 0 20px rgba(5, 149, 211, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Descubre <span className="text-kikko-yellow">KIKKO</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Una línea completa de sabores auténticos que transforman cada comida en una experiencia extraordinaria
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex justify-center"
            >
              <ChevronDown 
                className="w-12 h-12 text-kikko-blue animate-bounce cursor-pointer hover:text-kikko-blue-dark transition-colors duration-300"
                onClick={() => {
                  // Scroll al parallax de productos
                  const parallaxSection = document.querySelector('[data-parallax="true"]');
                  if (parallaxSection) {
                    parallaxSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  } else {
                    // Fallback: scroll calculado
                    const headerHeight = 96; 
                    const heroSectionHeight = window.innerHeight * 0.9;
                    const targetPosition = headerHeight + heroSectionHeight;
                    
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Secciones de productos con parallax */}
      {productos.map((product, index) => (
        <div key={product.id} data-parallax={index === 0 ? "true" : undefined}>
          <ProductSection
            product={product}
            index={index}
            onNavigateToProductDetail={handleOpenProductDetail}
            scrollY={scrollYProgress}
          />
        </div>
      ))}

      {/* Sección final con CTA */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <motion.div
          style={{ y: smoothY4 }}
          className="absolute inset-0 bg-gradient-to-br from-kikko-blue via-kikko-red to-kikko-yellow opacity-20"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h2 className="font-klein-bold text-5xl md:text-7xl mb-6 uppercase">
            Elige tu <span className="text-kikko-yellow">KIKKO</span> favorito
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Cada producto <span className="text-kikko-yellow font-bold">KIKKO</span> está diseñado para realzar tus platillos con sabor auténtico
          </p>
          
          <motion.button
            onClick={() => handleOpenProductDetail(productos[0])}
            className="bg-kikko-yellow text-pantone-black px-8 py-4 text-lg font-klein-bold uppercase tracking-wider hover:bg-kikko-yellow-dark transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar productos
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Panel de detalle horizontal */}
      {console.log('Modal render check:', { isDetailOpen, hasSelectedProduct: !!selectedProduct, selectedProductId: selectedProduct?.id, selectedProductName: selectedProduct?.name })}
      <AnimatePresence mode="wait">
        {isDetailOpen && selectedProduct && (
          <ProductDetailPanel
            key={`detail-${selectedProduct.id || selectedProduct.name || Date.now()}`}
            product={selectedProduct}
            isOpen={isDetailOpen}
            onClose={handleCloseDetail}
            onNext={handleNextProduct}
            onPrev={handlePrevProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente individual para cada sección de producto
interface ProductSectionProps {
  product: Product;
  index: number;
  onNavigateToProductDetail?: (product: any) => void;
  scrollY: any;
}

function ProductSection({ product, index, onNavigateToProductDetail, scrollY }: ProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Diferentes transforms para crear variedad
  const x = useTransform(scrollYProgress, [0, 1], isEven ? [-100, 100] : [100, -100]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], isEven ? [0, 5] : [0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}
    >
      {/* Fondo decorativo con el color temático del producto */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 50%, ${product.color} 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
          
          {/* Información del producto */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Badge de categoría */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider"
            >
              <Package className="w-4 h-4" />
              {product.category}
            </motion.div>

            {/* Título del producto */}
            <motion.h2
              className="font-klein-bold text-5xl lg:text-6xl text-gray-900 uppercase leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {product.name}
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {product.subtitle}
            </motion.p>

            {/* Badges del producto */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {product.badges.slice(0, 3).map((badge, badgeIndex) => (
                <motion.span
                  key={badgeIndex}
                  className="px-3 py-1 text-pantone-black text-sm font-medium uppercase"
                  style={{ backgroundColor: product.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Descripción */}
            <motion.p
              className="text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {product.description}
            </motion.p>

            {/* Features destacados */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {product.features.slice(0, 4).map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-center gap-2 p-3 bg-white border-l-4"
                  style={{ borderColor: product.color }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Star className="w-4 h-4" style={{ color: product.color }} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Botón de acción */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                onClick={() => {
                  console.log('=== BOTÓN VER DETALLES CLICKED ===');
                  console.log('onNavigateToProductDetail exists:', !!onNavigateToProductDetail);
                  console.log('product being passed:', product);
                  console.log('product.id:', product.id);
                  console.log('===============================');
                  onNavigateToProductDetail?.(product);
                }}
                className="bg-kikko-red text-white px-8 py-4 text-lg font-medium uppercase tracking-wider hover:bg-kikko-red-dark transition-colors duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-5 h-5" />
                Ver Detalles
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Imagen del producto con parallax y elementos flotantes */}
          <motion.div
            className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
            style={{ x, y: y, rotate, scale }}
          >
            <motion.div
              className="relative min-h-[500px] flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >

              {/* SOLO 1 Trigo por producto - EXTRA GRANDE */}
              <motion.img
                src={wheatElement}
                alt="Trigo decorativo"
                className="absolute top-6 left-6 w-40 h-40 z-5"
                initial={{ 
                  opacity: 0,
                  y: 50,
                  x: -30,
                  rotate: -45,
                  scale: 0.5
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
              />

              {/* SOLO 1 Soja por producto - EXTRA GRANDE */}
              <motion.img
                src={soybeanElement}
                alt="Soja decorativa"
                className="absolute bottom-6 right-6 w-36 h-36 z-5"
                initial={{ 
                  opacity: 0,
                  y: 60,
                  x: 40,
                  rotate: 60,
                  scale: 0.3
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                  delay: index * 0.15
                }}
                viewport={{ once: true }}
              />

              {/* MUCHAS hojas flotando cerca del producto */}
              <motion.img
                src={leafElement}
                alt="Hoja decorativa 1"
                className="absolute top-12 right-12 w-20 h-20 z-5"
                initial={{ 
                  opacity: 0,
                  y: -30,
                  x: 20,
                  rotate: -90,
                  scale: 0.2
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.3
                }}
                viewport={{ once: true }}
              />

              <motion.img
                src={leafElement}
                alt="Hoja decorativa 2"
                className="absolute bottom-12 left-12 w-18 h-18 z-5"
                initial={{ 
                  opacity: 0,
                  y: 40,
                  x: -25,
                  rotate: 120,
                  scale: 0.3
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.4
                }}
                viewport={{ once: true }}
              />

              <motion.img
                src={leafElement}
                alt="Hoja decorativa 3"
                className="absolute top-1/2 left-8 w-16 h-16 z-5"
                initial={{ 
                  opacity: 0,
                  y: 0,
                  x: -35,
                  rotate: -60,
                  scale: 0.4
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.5
                }}
                viewport={{ once: true }}
              />

              <motion.img
                src={leafElement}
                alt="Hoja decorativa 4"
                className="absolute top-1/3 right-8 w-14 h-14 z-5"
                initial={{ 
                  opacity: 0,
                  y: -25,
                  x: 30,
                  rotate: 90,
                  scale: 0.2
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.6
                }}
                viewport={{ once: true }}
              />

              <motion.img
                src={leafElement}
                alt="Hoja decorativa 5"
                className="absolute bottom-1/3 right-4 w-12 h-12 z-5"
                initial={{ 
                  opacity: 0,
                  y: 30,
                  x: 20,
                  rotate: 150,
                  scale: 0.1
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.7
                }}
                viewport={{ once: true }}
              />

              <motion.img
                src={leafElement}
                alt="Hoja decorativa 6"
                className="absolute top-20 left-4 w-10 h-10 z-5"
                initial={{ 
                  opacity: 0,
                  y: -20,
                  x: -15,
                  rotate: -120,
                  scale: 0.3
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05 + 0.8
                }}
                viewport={{ once: true }}
              />
              
              {/* Imagen principal del producto */}
              <motion.img
                src={product.image}
                alt={`KIKKO ${product.name}`}
                className="relative z-10 h-96 lg:h-[450px] w-auto object-contain cursor-pointer"
                initial={{ 
                  opacity: 0,
                  scale: 0.6,
                  y: 30
                }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeOut",
                  delay: index * 0.2
                }}
                viewport={{ once: true }}
                onClick={() => onNavigateToProductDetail?.(product)}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  filter: "brightness(1.1)"
                }}
              />

              {/* Partículas brillantes */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full z-15"
                  style={{
                    top: `${30 + i * 20}%`,
                    right: `${10 + i * 8}%`,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                    rotate: 0
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 0.8,
                    rotate: 360
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1 + i * 0.1 + 1.0
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elementos decorativos flotantes específicos por producto */}
      <motion.div
        className="absolute top-20 right-20 opacity-15 z-5"
        style={{ color: product.color }}
        initial={{
          opacity: 0,
          rotate: -180,
          scale: 0.3,
          y: 50
        }}
        whileInView={{
          opacity: 0.15,
          rotate: 0,
          scale: 1,
          y: 0
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: index * 0.15 + 0.8
        }}
        viewport={{ once: true }}
      >
        {index % 3 === 0 ? <Zap className="w-20 h-20" /> : 
         index % 3 === 1 ? <Target className="w-20 h-20" /> : 
         <Sparkles className="w-20 h-20" />}
      </motion.div>

      {/* Solo hojas flotantes en los márgenes - SIN ingredientes fuera del producto */}
      <motion.img
        src={leafElement}
        alt="Hoja margen"
        className="absolute top-16 left-8 w-24 h-24 z-5"
        initial={{
          opacity: 0,
          y: -40,
          x: -30,
          rotate: -180,
          scale: 0.2
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1
        }}
        transition={{
          duration: 1.0,
          ease: "easeOut",
          delay: index * 0.1 + 1.2
        }}
        viewport={{ once: true }}
      />

      <motion.img
        src={leafElement}
        alt="Hoja margen 2"
        className="absolute bottom-20 right-12 w-20 h-20 z-5"
        initial={{
          opacity: 0,
          y: 50,
          x: 40,
          rotate: 180,
          scale: 0.1
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: index * 0.1 + 1.3
        }}
        viewport={{ once: true }}
      />

      {/* Ondas de sabor */}
      <motion.div
        className="absolute top-1/2 left-8 w-32 h-1 opacity-20 z-5"
        style={{
          background: `linear-gradient(90deg, transparent, ${product.color}, transparent)`
        }}
        animate={{
          scaleX: [0, 1, 0],
          x: [0, 100, 200],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 1.2
        }}
      />

      <motion.div
        className="absolute top-1/3 right-16 w-24 h-1 opacity-15 z-5"
        style={{
          background: `linear-gradient(90deg, transparent, ${product.color}, transparent)`
        }}
        animate={{
          scaleX: [0, 1, 0],
          x: [200, 0, -100],
          opacity: [0, 0.4, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.9
        }}
      />
    </section>
  );
}

// Componente para el panel de detalle horizontal
interface ProductDetailPanelProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ProductDetailPanel({ product, isOpen, onClose, onNext, onPrev }: ProductDetailPanelProps) {
  // Validación simplificada
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-4">
      {/* Backdrop oscuro - clickeable para cerrar */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Panel principal simplificado */}
      <div className="relative w-full h-full max-w-4xl max-h-[80vh] bg-white shadow-2xl overflow-hidden z-50">
        {/* Header simple */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <h1 className="font-klein-bold text-xl text-gray-900 uppercase">
            {product.name}
          </h1>
          
          <button
            onClick={onClose}
            className="p-2 bg-kikko-red text-white hover:bg-kikko-red-dark transition-all"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido simple */}
        <div className="p-6 flex flex-col lg:flex-row gap-6 h-full">
          {/* Imagen del producto */}
          <div className="lg:w-1/2 flex items-center justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>
          
          {/* Información del producto */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="font-klein-bold text-2xl text-gray-900 uppercase">
              {product.name}
            </h2>
            
            <p className="text-lg text-gray-600">
              {product.subtitle}
            </p>
            
            <p className="text-gray-700">
              {product.description}
            </p>
            
            {/* Características */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-2">Características</h3>
                <ul className="space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-kikko-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

