import { motion } from 'motion/react';
import { ArrowLeft, Star, ChefHat, Award, Clock } from 'lucide-react';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { IMAGE_ASSETS } from '../constants/imageAssets';
import { KikkoImage } from './KikkoImage';
import { AnimatedTitle, AnimatedSubtitle, AnimatedText } from './AnimatedText';

interface ProductDetailPageProps {
  product: any;
  onBackToProductos: () => void;
  onNavigateToHome: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToNovedades?: () => void;
  onNavigateToProductos?: () => void;
}

export function ProductDetailPage({ 
  product, 
  onBackToProductos, 
  onNavigateToHome, 
  onNavigateToAbout, 
  onNavigateToNovedades, 
  onNavigateToProductos 
}: ProductDetailPageProps) {
  const [scrollY, setScrollY] = useState(0);

  // Hook para el efecto de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-klein-bold text-gray-800 mb-6">Producto no encontrado</h2>
          <Button onClick={onBackToProductos} className="bg-kikko-blue text-white px-8 py-3 rounded-xl">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a Productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Banner con mesa de verduras - MEJORADO RESPONSIVO */}
      <section className="relative min-h-screen product-detail-section">
        {/* Imagen de fondo - mesa con verduras */}
        <div className="absolute inset-0 product-detail-bg-container">
          <KikkoImage
            imageKey="KITCHEN_TABLE_BACKGROUND"
            alt="Mesa de cocina con verduras frescas"
            className="w-full h-full object-cover product-detail-hero-bg"
          />
          {/* Overlay sólido para legibilidad */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto product-detail-hero-content px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[80vh] product-detail-hero-grid">
            
            {/* Imagen del producto - RESPONSIVO MEJORADO */}
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="relative flex justify-center order-2 lg:order-1 product-detail-hero-image"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [0, 3, 0],
                  rotateZ: [0, -8, 0] // Inclinación sutil de la botella
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
                style={{ transform: 'rotateZ(-20deg)' }} // Inclinación base más pronunciada
              >
                <img
                  src={product.image}
                  alt={`KIKKO ${product.name}`}
                  className="h-72 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] w-auto object-contain drop-shadow-2xl max-w-full product-detail-bottle-image"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4)) brightness(1.1) contrast(1.05)'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Información principal del producto - RESPONSIVO MEJORADO */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="space-y-5 lg:space-y-7 order-1 lg:order-2 product-detail-hero-info"
            >
              {/* Título principal */}
              <div className="space-y-2 lg:space-y-3">
                <AnimatedTitle
                  text={`KIKKO ${product.name}`}
                  className="font-klein-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white leading-tight hero-text-solid-white product-detail-title"
                />
                <AnimatedSubtitle
                  text={product.subtitle}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-white font-medium hero-text-solid-white product-detail-subtitle"
                />
              </div>

              {/* Solo descripción del producto animada - SIN BADGES NI CARDS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-4 lg:space-y-5"
              >
                <AnimatedText 
                  text="Información"
                  className="text-white text-xl lg:text-2xl xl:text-3xl font-medium"
                  delay={0.5}
                  animationType="flash"
                  staggerDelay={0.06}
                  duration={0.4}
                />
                
                {/* Solo descripción del producto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="max-w-none lg:max-w-2xl"
                >
                  <AnimatedText 
                    text={product.description}
                    className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed font-medium"
                    delay={0.7}
                    animationType="typewriter"
                    staggerDelay={0.01}
                    duration={0.3}
                  />
                </motion.div>
              </motion.div>

              {/* Solo botón Volver - estilo botón crear */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="pt-2 lg:pt-4"
              >
                <button
                  onClick={onBackToProductos}
                  className="bg-kikko-blue text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium text-sm lg:text-base cursor-pointer transition-all duration-300 hover:bg-kikko-blue-dark shadow-md hover:shadow-lg product-detail-back-button"
                >
                  <div className="flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a Productos</span>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección Información - MEJORADA RESPONSIVA */}
      <section className="py-12 sm:py-16 lg:py-20 relative product-detail-section">
        {/* Imagen de fondo para información */}
        <div className="absolute inset-0 product-detail-bg-container">
          <img 
            src="https://images.unsplash.com/photo-1654245558428-fcea624bb7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmdyZWRpZW50cyUyMHNveSUyMHNhdWNlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTg0NTIwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ingredientes para salsa de soya"
            className="w-full h-full object-cover opacity-15 sm:opacity-20 product-detail-info-bg"
          />
          <div className="absolute inset-0 bg-white/85 sm:bg-white/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Título de sección */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-16"
          >
            <AnimatedText
              text="Información"
              className="text-3xl sm:text-4xl lg:text-5xl font-klein-bold text-black mb-2"
              animationType="wave"
              staggerDelay={0.1}
            />
            <div className="w-16 sm:w-20 h-1 bg-kikko-blue" />
          </motion.div>

          {/* Descripción principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-16"
          >
            <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed mb-6 lg:mb-8 font-medium">
              {product.description}
            </p>
            
            {/* Información de ingredientes */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-klein-bold text-black mb-3 sm:mb-4">
                INGREDIENTES:
              </h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                {product.ingredients}
              </p>
            </div>
          </motion.div>

          {/* Botón Ver recetas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="bg-kikko-blue hover:bg-kikko-blue-dark text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-medium text-base lg:text-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
              Ver recetas
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sección Tabla Nutricional - MEJORADA RESPONSIVA */}
      <section className="py-12 sm:py-16 lg:py-20 relative product-detail-section">
        {/* Imagen de fondo para tabla nutricional */}
        <div className="absolute inset-0 product-detail-bg-container">
          <img 
            src="https://images.unsplash.com/photo-1740560052706-fd75ee856b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBmYWN0cyUyMHRhYmxlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTg0NTIwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Tabla nutricional"
            className="w-full h-full object-cover opacity-8 sm:opacity-10 product-detail-nutrition-bg"
          />
          <div className="absolute inset-0 bg-kikko-blue/3 sm:bg-kikko-blue/5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <AnimatedText
              text="Tabla Nutricional"
              className="text-3xl sm:text-4xl lg:text-5xl font-klein-bold text-black mb-2"
              animationType="bounce"
              staggerDelay={0.08}
            />
            <div className="w-16 sm:w-20 h-1 bg-kikko-blue mb-6 sm:mb-8" />            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg font-medium text-black">
                Porciones de {product.nutritionalInfo.servingSize} por frasco: {product.nutritionalInfo.servingsPerContainer}
              </p>
              <p className="text-base sm:text-lg font-bold text-black">
                1 porción de {product.nutritionalInfo.servingSize} contiene:
              </p>
            </div>
          </motion.div>

          {/* Tabla nutricional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-kikko-blue">
                    <th className="text-left py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-bold text-white">
                      Información por:
                    </th>
                    <th className="text-center py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-bold text-white">
                      100 ml
                    </th>
                    <th className="text-center py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-bold text-white">
                      1 porción
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Energía (kcal)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {Math.round((product.nutritionalInfo.calories * 100) / 15)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.calories}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Proteínas (g)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {((product.nutritionalInfo.protein * 100) / 15).toFixed(1)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.protein}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Grasas Totales (g)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {((product.nutritionalInfo.totalFat * 100) / 15).toFixed(1)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.totalFat}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Grasas Saturadas (g)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.saturatedFat}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.saturatedFat}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Carbohidratos Disponibles (g)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {Math.round((product.nutritionalInfo.carbohydrates * 100) / 15)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.carbohydrates}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Sodio (mg)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {Math.round((product.nutritionalInfo.sodium * 100) / 15)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.sodium}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 font-medium text-black text-sm sm:text-base">
                      - Azúcares Totales (g)
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {((product.nutritionalInfo.sugars * 100) / 15).toFixed(1)}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-center font-medium text-black text-sm sm:text-base">
                      {product.nutritionalInfo.sugars}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Usos Sugeridos - MEJORADA RESPONSIVA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <AnimatedText
              text="Usos Sugeridos"
              className="text-3xl sm:text-4xl lg:text-5xl font-klein-bold text-kikko-blue mb-2"
              animationType="glow"
              staggerDelay={0.12}
            />
            <div className="w-16 sm:w-20 h-1 bg-kikko-blue" />
          </motion.div>

          {/* Lista de usos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {product.uses.map((use: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 sm:space-x-4 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="w-3 h-3 bg-kikko-blue flex-shrink-0" />
                <span className="text-black font-medium text-sm sm:text-base">{use}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección Recetas Relacionadas - MEJORADA RESPONSIVA */}
      <section className="py-12 sm:py-16 lg:py-20 relative product-detail-section">
        {/* Imagen de fondo para recetas */}
        <div className="absolute inset-0 product-detail-bg-container">
          <img 
            src="https://images.unsplash.com/photo-1605705712924-ab42d6bb9de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcmVjaXBlcyUyMGtpdGNoZW4lMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ1MjA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cocina y recetas"
            className="w-full h-full object-cover opacity-12 sm:opacity-15 product-detail-recipes-bg"
          />
          <div className="absolute inset-0 bg-white/92 sm:bg-white/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <AnimatedText
              text={`Recetas con ${product.name}`}
              className="text-3xl sm:text-4xl lg:text-5xl font-klein-bold text-kikko-blue mb-4"
              animationType="typewriter"
              staggerDelay={0.05}
            />
            <div className="w-16 sm:w-20 h-1 bg-kikko-blue mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {product.recipes.map((recipe: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 rounded-2xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-kikko-blue rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-kikko-blue-dark transition-colors duration-300">
                  <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-klein-bold text-lg sm:text-xl text-black mb-2 group-hover:text-kikko-blue transition-colors duration-300">
                  {recipe}
                </h3>
                <p className="text-black text-xs sm:text-sm">
                  Preparado con {product.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}