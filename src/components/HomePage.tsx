import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ChevronRight, 
  Star, 
  Clock, 
  Users, 
  Award, 
  ChefHat, 
  Package,
  Eye,
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Globe
} from 'lucide-react';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { GlobalScrollEffects } from './GlobalScrollEffects';
import { KikkoImage } from './KikkoImage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { IMAGE_ASSETS } from '../constants/imageAssets';

interface HomePageProps {
  onNavigateToAbout: () => void;
  onNavigateToRecipes: () => void;
  onNavigateToNovedades: () => void;
  onNavigateToProductos: () => void;
}

// Datos para las secciones
const productos = [
  {
    id: 'siyau-original',
    name: 'Siyau Original',
    description: 'La salsa de soya clásica que ha acompañado a las familias peruanas por más de 65 años',
    image: IMAGE_ASSETS.SIYAU_IMAGE,
    badge: 'Clásico',
    features: ['Solo 1 Octógono', 'Fermentación Natural', '65+ Años de Tradición']
  },
  {
    id: 'salsa-mensi',
    name: 'Salsa Mensi',
    description: 'Salsa especial con proceso único que le otorga un sabor característico',
    image: IMAGE_ASSETS.SALSA_MENSI_IMAGE,
    badge: 'Especial',
    features: ['Sabor Único', 'Ingredientes Seleccionados', 'Proceso Especial']
  },
  {
    id: 'ajoikion',
    name: 'Ajoikion',
    description: 'Fusión perfecta de salsa de soya con el sabor intenso del ajo y kion',
    image: IMAGE_ASSETS.AJOIKION_IMAGE,
    badge: 'Premium',
    features: ['Sabor Intenso', 'Ajo y Kion', 'Receta Especial']
  }
];

const recetasDestacadas = [
  {
    id: 1,
    title: 'Pasta con Queso Extra',
    description: 'Deliciosa pasta con queso fundido y el toque especial de KIKKO',
    image: IMAGE_ASSETS.PLATO_1_IMAGE,
    time: '25 min',
    difficulty: 'Intermedio',
    rating: 4.8,
    category: 'Principal'
  },
  {
    id: 2,
    title: 'Pollo Grillado con Vegetales',
    description: 'Pechuga de pollo perfectamente grillada con marinado KIKKO',
    image: IMAGE_ASSETS.PLATO_2_IMAGE,
    time: '35 min',
    difficulty: 'Intermedio',
    rating: 4.9,
    category: 'Principal'
  },
  {
    id: 3,
    title: 'Bowl de Arroz Asiático',
    description: 'Bowl completo con vegetales frescos y salsa especial KIKKO',
    image: IMAGE_ASSETS.PLATO_4_IMAGE,
    time: '20 min',
    difficulty: 'Fácil',
    rating: 4.6,
    category: 'Saludable'
  }
];

const novedadesRecientes = [
  {
    id: 1,
    title: 'Menos octógonos, más confianza: por qué KIKKO es diferente',
    excerpt: 'El siyau KIKKO solo tiene un octógono porque mantiene su receta original sin exceso de azúcares ni aditivos.',
    date: '15 Mar 2024',
    category: 'Alimentación Saludable',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
    readTime: '3 min'
  },
  {
    id: 2,
    title: 'KIKKO celebra 67 años siendo la salsa favorita de las familias peruanas',
    excerpt: 'Desde 1957, KIKKO ha mantenido su compromiso con la calidad y el sabor auténtico de la cocina peruana.',
    date: '10 Mar 2024',
    category: 'Historia',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=250&fit=crop',
    readTime: '4 min'
  }
];

export function HomePage({ onNavigateToAbout, onNavigateToRecipes, onNavigateToNovedades, onNavigateToProductos }: HomePageProps) {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  // Efectos parallax
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const parallaxMedium = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <GlobalScrollEffects />
      
      {/* Hero Section */}
      <Hero />

      {/* Sección: Todo sobre KIKKO */}
      <section className="relative section-full-height overflow-hidden">
        {/* Fondo con parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: parallaxSlow }}
        >
          <KikkoImage
            imageKey="KITCHEN_TABLE_BACKGROUND"
            alt="Mesa con verduras frescas"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <motion.div 
            className="text-center text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              style={{ y: parallaxMedium }}
            >
              <Badge className="bg-kikko-yellow text-kikko-blue font-bold text-lg px-6 py-2">
                DESDE 1957
              </Badge>
            </motion.div>
            <h2 className="font-klein-bold text-5xl lg:text-6xl mb-6">
              TODO SOBRE{' '}
              <span className="text-kikko-yellow">KIKKO</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Más de 65 años creando sabores auténticos que transforman cada comida en una experiencia única. 
              Conoce nuestra historia, valores y el compromiso que nos une con las familias peruanas.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Historia */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm p-8 border border-white/20 shadow-2xl hover:transform hover:scale-105 transition-all duration-300 group"
              whileHover={{ y: -8 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kikko-blue text-white mb-6 group-hover:bg-kikko-blue-dark transition-colors">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-klein-bold text-2xl text-gray-900 mb-4">67 Años de Historia</h3>
                <p className="text-gray-600 mb-6">
                  Desde 1957, mantenemos nuestra receta original y el compromiso con la calidad que nos caracteriza.
                </p>
                <div className="flex justify-center">
                  <span className="text-kikko-blue font-bold text-4xl">1957</span>
                </div>
              </div>
            </motion.div>

            {/* Calidad */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm p-8 border border-white/20 shadow-2xl hover:transform hover:scale-105 transition-all duration-300 group"
              whileHover={{ y: -8 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kikko-yellow text-kikko-blue mb-6 group-hover:bg-kikko-yellow-dark transition-colors">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="font-klein-bold text-2xl text-gray-900 mb-4">Solo 1 Octógono</h3>
                <p className="text-gray-600 mb-6">
                  Mantenemos nuestra receta original sin exceso de azúcares ni aditivos artificiales.
                </p>
                <div className="flex justify-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">Más Saludable</Badge>
                </div>
              </div>
            </motion.div>

            {/* Familia */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm p-8 border border-white/20 shadow-2xl hover:transform hover:scale-105 transition-all duration-300 group"
              whileHover={{ y: -8 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kikko-red text-white mb-6 group-hover:bg-kikko-red-dark transition-colors">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-klein-bold text-2xl text-gray-900 mb-4">Familias Peruanas</h3>
                <p className="text-gray-600 mb-6">
                  Presente en los hogares peruanos, acompañando tradiciones culinarias por generaciones.
                </p>
                <div className="flex justify-center">
                  <Badge className="bg-kikko-red text-white px-4 py-2">Tradición</Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={onNavigateToAbout}
              className="bg-kikko-blue hover:bg-kikko-blue-dark text-white px-8 py-4 text-lg font-bold border-0 hover:scale-105 transition-all duration-300"
            >
              CONOCE NUESTRA HISTORIA COMPLETA
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sección: Nuestros Productos */}
      <section className="relative section-full-height bg-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-50"
          style={{ y: parallaxMedium }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-kikko-blue/10 via-transparent to-kikko-yellow/10" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-kikko-yellow text-kikko-blue font-bold text-lg px-6 py-2 mb-6">
              PRODUCTOS
            </Badge>
            <h2 className="font-klein-bold text-5xl lg:text-6xl text-gray-900 mb-6">
              NUESTRA GAMA DE{' '}
              <span className="text-kikko-blue">PRODUCTOS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Descubre toda nuestra línea de productos diseñados para realzar el sabor de tus comidas favoritas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {productos.map((producto, index) => (
              <motion.div
                key={producto.id}
                className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={producto.image}
                    alt={producto.name}
                    className="w-full h-full object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-kikko-yellow text-kikko-blue font-bold">
                      {producto.badge}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-klein-bold text-2xl text-gray-900 mb-3">{producto.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{producto.description}</p>
                  <div className="space-y-2">
                    {producto.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <Sparkles className="w-4 h-4 text-kikko-yellow mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={onNavigateToProductos}
              className="bg-kikko-yellow hover:bg-kikko-yellow-dark text-kikko-blue px-8 py-4 text-lg font-bold border-0 hover:scale-105 transition-all duration-300"
            >
              VER TODOS LOS PRODUCTOS
              <Package className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sección: Recetas */}
      <section className="relative section-full-height overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: parallaxFast }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop')] bg-cover bg-center" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <motion.div 
            className="text-center text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-kikko-yellow text-kikko-blue font-bold text-lg px-6 py-2 mb-6">
              RECETAS
            </Badge>
            <h2 className="font-klein-bold text-5xl lg:text-6xl mb-6">
              DESCUBRE{' '}
              <span className="text-kikko-yellow">RECETAS</span>
              {' '}ÚNICAS
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              Explora nuestra colección de recetas creadas especialmente para sacar el máximo provecho del sabor KIKKO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {recetasDestacadas.map((receta, index) => (
              <motion.div
                key={receta.id}
                className="relative h-[30rem] lg:h-[32rem] shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Imagen de fondo completa */}
                <ImageWithFallback
                  src={receta.image}
                  alt={receta.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay gradient base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Badge y rating en la parte superior */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-kikko-blue text-white font-bold">
                    {receta.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 z-10">
                  <div className="flex items-center text-white text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    {receta.rating}
                  </div>
                </div>
                
                {/* Contenido de texto superpuesto en la parte inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="font-klein-bold text-xl mb-2 group-hover:text-kikko-yellow transition-colors duration-300">
                    {receta.title}
                  </h3>
                  <p className="text-white/90 mb-4 line-clamp-2 group-hover:text-white transition-colors duration-300">
                    {receta.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {receta.time}
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-1" />
                      {receta.difficulty}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={onNavigateToRecipes}
              className="bg-kikko-yellow hover:bg-kikko-yellow-dark text-kikko-blue px-8 py-4 text-lg font-bold border-0 hover:scale-105 transition-all duration-300"
            >
              EXPLORAR TODAS LAS RECETAS
              <ChefHat className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sección: Novedades */}
      <section className="relative section-full-height bg-gray-50 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: parallaxSlow }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-kikko-blue/5 via-transparent to-kikko-red/5" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-kikko-blue text-white font-bold text-lg px-6 py-2 mb-6">
              NOVEDADES
            </Badge>
            <h2 className="font-klein-bold text-5xl lg:text-6xl text-gray-900 mb-6">
              ÚLTIMAS{' '}
              <span className="text-kikko-red">NOVEDADES</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Mantente al día con las últimas noticias, consejos y novedades del mundo KIKKO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {novedadesRecientes.map((novedad, index) => (
              <motion.article
                key={novedad.id}
                className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={novedad.image}
                    alt={novedad.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-kikko-red text-white font-bold">
                      {novedad.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-klein-bold text-xl text-gray-900 mb-3 line-clamp-2">{novedad.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{novedad.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {novedad.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {novedad.readTime}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={onNavigateToNovedades}
              className="bg-kikko-red hover:bg-kikko-red-dark text-white px-8 py-4 text-lg font-bold border-0 hover:scale-105 transition-all duration-300"
            >
              VER TODAS LAS NOVEDADES
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}