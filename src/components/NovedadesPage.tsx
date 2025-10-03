import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, Tag, Share2, Eye, MessageCircle } from 'lucide-react';
import { Footer } from './Footer';
import { IMAGE_ASSETS } from '../constants/imageAssets';

// Importar la imagen de la señora para el artículo destacado
import senoraKikkoImage from 'figma:asset/907a9b749d787cda8195fbff3b5a664cf924dd18.png';

interface NovedadesPageProps {
  onNavigateToHome: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToRecipes?: () => void;
  onNavigateToProductos?: () => void;
}

// Datos de artículos del blog - notas de prensa
const blogPosts = [
  {
    id: 1,
    title: "Menos octógonos, más confianza: por qué KIKKO es diferente y mejor.",
    excerpt: "En el Perú, la Ley de Alimentación Saludable obliga a poner octógonos en los alimentos procesados que tienen exceso de azúcar, sodio o grasas. En productos como el siyau, el octógono más común es 'Alto en sodio', porque por naturaleza esta salsa es salada.",
    content: `
      En el Perú, la Ley de Alimentación Saludable obliga a poner octógonos en los alimentos procesados que tienen exceso de azúcar, sodio o grasas. En productos como el siyau, el octógono más común es "Alto en sodio", porque por naturaleza esta salsa es salada. Algunas marcas muestran más advertencias, porque agregan azúcar u otros ingredientes que superan los límites establecidos, y por eso aparecen con dos o más octógonos en la etiqueta.

      El siyau KIKKO solo tiene un octógono porque mantiene su receta original: trigo y soya seleccionados, fermentados naturalmente por más de 60 días, sin exceso de azúcares ni aditivos. Esto beneficia a las familias porque evita el consumo de calorías ocultas, ofreciendo una opción más natural y confiable dentro de su categoría. Así, al elegir KIKKO, el ama de casa sabe que está llevando a su mesa calidad verdadera, sabor único y menos advertencias en la etiqueta.
    `,
    image: senoraKikkoImage,
    date: "2024-03-15",
    author: "Equipo KIKKO",
    category: "Alimentación Saludable",
    readTime: "3 min",
    views: 1847,
    comments: 24,
    tags: ["Octógonos", "Alimentación Saludable", "Calidad", "Siyau"]
  },
  {
    id: 2,
    title: "KIKKO celebra 67 años siendo la salsa de soya favorita de las familias peruanas",
    excerpt: "Desde 1957, KIKKO ha mantenido su compromiso con la calidad y el sabor auténtico que caracteriza a la cocina peruana. Un recorrido por nuestra historia y valores.",
    content: `
      Desde 1957, KIKKO ha sido parte fundamental de la cocina peruana, acompañando a las familias en la preparación de sus platos favoritos. Durante estos 67 años, hemos mantenido nuestro compromiso inquebrantable con la calidad y el sabor auténtico.

      Nuestra receta original, basada en la fermentación natural de trigo y soya seleccionados por más de 60 días, ha sido el secreto de nuestro éxito. Sin aditivos artificiales ni exceso de azúcares, KIKKO se ha posicionado como la opción más confiable para las familias que buscan calidad y sabor en cada gota.

      A lo largo de estos años, hemos sido testigos de cómo las tradiciones culinarias peruanas han evolucionado, siempre con KIKKO como ingrediente esencial en recetas emblemáticas como el arroz chaufa, el tallarín saltado y el pollo a la plancha.
    `,
    image: IMAGE_ASSETS.SIYAU_IMAGE,
    date: "2024-03-10",
    author: "Comunicaciones KIKKO",
    category: "Historia",
    readTime: "5 min",
    views: 2156,
    comments: 18,
    tags: ["Historia", "Tradición", "67 años", "Familia"]
  },
  {
    id: 3,
    title: "Nuevas variantes KIKKO: Salsa Ajoikion y Salsa Mensi amplían la línea premium",
    excerpt: "Descubre las nuevas incorporaciones a la familia KIKKO: sabores únicos que mantienen la calidad tradicional con ingredientes especialmente seleccionados.",
    content: `
      La familia KIKKO se expande con el lanzamiento de dos nuevas variantes que prometen revolucionar la cocina peruana: Salsa Ajoikion y Salsa Mensi.

      La Salsa Ajoikion combina la tradicional receta KIKKO con el intenso sabor del ajo y el kion, creando una fusión perfecta para marinados y platos orientales. Por su parte, la Salsa Mensi es un aderezo completo elaborado con ingredientes especiales que le otorgan un sabor único e irresistible.

      Ambas variantes mantienen los estándares de calidad KIKKO, sin exceso de aditivos y con el proceso de fermentación natural que nos caracteriza. Estas nuevas opciones ofrecen a las familias peruanas mayor versatilidad en la cocina, manteniendo siempre el sabor auténtico que nos distingue.
    `,
    image: IMAGE_ASSETS.AJOIKION_IMAGE,
    date: "2024-03-05",
    author: "Desarrollo de Producto",
    category: "Lanzamientos",
    readTime: "4 min",
    views: 1923,
    comments: 31,
    tags: ["Nuevos Productos", "Ajoikion", "Mensi", "Premium"]
  },
  {
    id: 4,
    title: "KIKKO Shoyu Premium: La excelencia de la tradición japonesa llega al Perú",
    excerpt: "Nuestra versión premium de la tradicional salsa shoyu japonesa, elaborada con ingredientes selectos y fermentación extendida para paladares exigentes.",
    content: `
      KIKKO Shoyu Premium representa la culminación de décadas de experiencia en la elaboración de salsas de soya. Esta versión especial está diseñada para paladares exigentes que buscan la excelencia en cada detalle.

      Elaborada con soya y trigo de la más alta calidad, nuestra Salsa Shoyu Premium pasa por un proceso de fermentación extendida que desarrolla sabores complejos y refinados. El resultado es una salsa perfecta para sushi, sashimi, marinados premium y preparaciones gourmet.

      Con su perfil de sabor equilibrado y su textura sedosa, KIKKO Shoyu Premium eleva cualquier plato a una experiencia culinaria única, manteniendo siempre los valores de calidad y autenticidad que caracterizan a nuestra marca.
    `,
    image: IMAGE_ASSETS.SHOYU_IMAGE,
    date: "2024-02-28",
    author: "Chef Consultor KIKKO",
    category: "Premium",
    readTime: "6 min",
    views: 1654,
    comments: 27,
    tags: ["Shoyu", "Premium", "Gourmet", "Japonés"]
  },
  {
    id: 5,
    title: "Salsa Wantán KIKKO: El sabor agridulce que conquista la mesa peruana",
    excerpt: "La nueva Salsa Wantán de tamarindo combina lo ácido y lo dulce en perfecta armonía, ideal para aperitivos, glaseados y la cocina fusión moderna.",
    content: `
      La cocina fusión encuentra en la nueva Salsa Wantán KIKKO su aliado perfecto. Esta salsa agridulce de tamarindo, elaborada con ingredientes naturales cuidadosamente seleccionados, ofrece el equilibrio perfecto entre lo ácido y lo dulce.

      Perfecta para glasear carnes, acompañar frituras, crear dips únicos o como base para guisos especiales, la Salsa Wantán KIKKO se adapta a múltiples preparaciones. Su versatilidad la convierte en el ingrediente ideal para cocineros creativos que buscan sabores auténticos.

      Con su bajo contenido de sodio y su perfil natural, esta nueva incorporación a la familia KIKKO demuestra nuestro compromiso continuo con ofrecer productos de calidad que se adapten a las tendencias culinarias modernas sin comprometer el sabor tradicional.
    `,
    image: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/wantan.PNG',
    date: "2024-02-20",
    author: "Innovación Culinaria",
    category: "Nuevos Sabores",
    readTime: "4 min",
    views: 1432,
    comments: 19,
    tags: ["Wantán", "Agridulce", "Tamarindo", "Fusión"]
  }
];

export function NovedadesPage({ onNavigateToHome, onNavigateToAbout, onNavigateToRecipes, onNavigateToProductos }: NovedadesPageProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner para Blog */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-kikko-blue to-kikko-blue-dark">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-klein-bold text-white text-5xl lg:text-6xl mb-4">
              NOVEDADES <span className="text-kikko-yellow">KIKKO</span>
            </h1>
            <p className="text-white/90 text-xl lg:text-2xl max-w-3xl mx-auto">
              Mantente informado sobre las últimas noticias, lanzamientos y novedades de la familia KIKKO
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido Principal del Blog */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Artículo Destacado */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Imagen del artículo destacado */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-kikko-yellow text-kikko-blue px-3 py-1 rounded-full text-sm font-bold">
                      DESTACADO
                    </span>
                  </div>
                </div>
                
                {/* Contenido del artículo destacado */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-kikko-blue/10 text-kikko-blue px-3 py-1 rounded-full text-sm font-medium">
                      {blogPosts[0].category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blogPosts[0].date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <h2 className="font-klein-bold text-gray-900 text-2xl lg:text-3xl mb-4 leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blogPosts[0].readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {blogPosts[0].views}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-kikko-blue text-white px-6 py-2 rounded-full hover:bg-kikko-blue-dark transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>Leer más</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Lista de Artículos */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="font-klein-bold text-gray-900 text-3xl mb-2">
                Todas las Novedades
              </h2>
              <p className="text-gray-600">
                Descubre las últimas noticias y actualizaciones de KIKKO
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  {/* Imagen del artículo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-kikko-blue px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido del artículo */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('es-ES', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight group-hover:text-kikko-blue transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer del artículo */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {post.comments}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-kikko-blue hover:text-kikko-blue-dark transition-colors duration-300 flex items-center space-x-1 text-sm font-medium"
                      >
                        <span>Leer</span>
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Newsletter Subscription */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-kikko-blue to-kikko-blue-dark rounded-2xl p-8 lg:p-12 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-klein-bold text-white text-2xl lg:text-3xl mb-4">
                ¿Quieres estar al día con <span className="text-kikko-yellow">KIKKO</span>?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Suscríbete para recibir las últimas novedades, recetas exclusivas y tips culinarios directamente en tu correo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-kikko-yellow"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-kikko-yellow text-kikko-blue px-6 py-3 rounded-lg font-bold hover:bg-kikko-yellow-light transition-colors duration-300"
                >
                  Suscribirme
                </motion.button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToRecipes={onNavigateToRecipes}
        onNavigateToProductos={onNavigateToProductos}
      />
    </div>
  );
}