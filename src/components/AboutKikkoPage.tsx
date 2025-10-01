import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Building2,
  Star,
  History,
  Target,
  Users,
  ChefHat,
  Award,
  Heart,
  Globe,
  Shield,
  Clock,
  Sparkles,
  Package,
  Store,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Footer } from "./Footer";
import { GlobalScrollEffects } from "./GlobalScrollEffects";

// Importar imágenes existentes de Figma
import kikkoProductBottle from "figma:asset/8c4cb152f1dc6e82eea9f28ce155aad3f0ecab1e.png";

// Importar nuevas imágenes de los productos Kikko
import familyChildImage from "figma:asset/48521dc7fbdbe2070d95a08f55805c4147ccb9af.png";
import servingKikkoImage from "figma:asset/685578daa9d81e3b762b32dab1f02c65fd399c2b.png";
import productsTableImage from "figma:asset/23058a3505a4adf17dfda3c73a0dd6b46c52a4a6.png";

// Importar imagen histórica de tienda de abarrotes Lima 1957
import tiendaAbarrotesLima1957 from "figma:asset/aeff7a80991c647a64b221a32d7ac8a1a49214b4.png";

interface AboutKikkoPageProps {
  onNavigateToHome: () => void;
  onNavigateToRecipes?: () => void;
  onNavigateToNovedades?: () => void;
  onNavigateToProductos?: () => void;
}

export function AboutKikkoPage({
  onNavigateToHome,
  onNavigateToRecipes,
  onNavigateToNovedades,
  onNavigateToProductos,
}: AboutKikkoPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] =
    useState(true);
  const { scrollYProgress } = useScroll();

  // Efectos parallax con useTransform para mejor performance
  const heroParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -300],
  );
  const textParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -150],
  );
  const slowParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -50],
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Ocultar indicador después de hacer scroll
      if (currentScrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <GlobalScrollEffects />

      {/* Hero Section - HISTORIA DE KIKKO DESDE 1957 - EXACTO 100VH */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Background histórico - Tienda de Abarrotes Lima, Perú 1957 con parallax */}
        <motion.div
          className="absolute inset-0 h-banner-full"
          style={{ y: heroParallax, width: "100%" }}
        >
          <img
            src={tiendaAbarrotesLima1957}
            alt="Tienda de Abarrotes Lima, Perú 1957 - Época de fundación de KIKKO"
            className="w-full h-banner-full object-cover scale-110"
          />
          <div className="absolute inset-0 h-banner-full bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>

        {/* Contenido superpuesto - Diseño responsivo igual que Hero */}
        <div className="absolute inset-0 flex items-center justify-start z-20 pl-16 hero-container-responsive">
          <div className="w-full h-full relative">
            
            {/* Texto posicionado a la izquierda en desktop, centrado debajo del header en mobile */}
            <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-start justify-center text-left px-8 hero-text-right-responsive hero-text-container-mobile lg:w-1/2 lg:top-0 lg:left-0 lg:items-start lg:text-left max-lg:w-full max-lg:top-20 max-lg:left-0 max-lg:right-0 max-lg:items-center max-lg:text-center max-lg:px-4 relative z-10">
              {/* DESDE 1957 - igual que Hero */}
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
                  DESDE <span className="text-kikko-yellow">1957</span>
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
              
              {/* LA HISTORIA DE KIKKO - dividido en 2 líneas */}
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
                  la historia de <span className="text-kikko-yellow">KIKKO</span>
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

        {/* Indicador de Scroll - Flecha simple estilo ProductosPage */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-center cursor-pointer p-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showScrollIndicator ? 1 : 0,
            scale: showScrollIndicator ? 1 : 0.8,
          }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            pointerEvents: showScrollIndicator
              ? "auto"
              : "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            // Funcionalidad de scroll duplicada para area mayor
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Scroll a la primera sección parallax con lógica mejorada
              const firstSection = document.querySelector(
                "section:nth-of-type(2)",
              );
              if (firstSection) {
                firstSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              } else {
                // Fallback: scroll calculado considerando header
                const headerHeight = 80; // Altura del header
                const heroSectionHeight = window.innerHeight; // Hero ocupa 100vh
                const targetPosition =
                  headerHeight + heroSectionHeight;

                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }}
            onMouseEnter={() => {
              // Feedback visual adicional
              document.body.style.cursor = "pointer";
            }}
            onMouseLeave={() => {
              document.body.style.cursor = "auto";
            }}
          />
        </motion.div>
      </section>

      {/* Sección 1: La felicidad en familia con KIKKO */}
      <ParallaxSection
        title="LA FELICIDAD DE LAS FAMILIAS"
        subtitle="PERUANAS CON"
        highlight="KIKKO"
        content="Desde 1957, hemos sido testigos de miles de momentos familiares especiales. Ver la sonrisa de un niño disfrutando sus fideos con KIKKO nos recuerda por qué Don Alejandro Kamego fundó nuestra empresa: para crear momentos de felicidad auténtica en cada hogar peruano."
        imageUrl={familyChildImage}
        imageAlt="Niño feliz disfrutando fideos con KIKKO - Momentos familiares auténticos"
        stats={[
          { number: "66", text: "AÑOS DE TRADICIÓN" },
          { number: "1957", text: "AÑO DE FUNDACIÓN" },
        ]}
        backgroundColor="bg-gradient-to-br from-gray-100 to-white"
        isImageLeft={true}
      />

      {/* Separador decorativo */}
      <div className="h-6 bg-kikko-yellow"></div>

      {/* Sección 2: El momento perfecto para servir KIKKO */}
      <ParallaxSection
        title="EL MOMENTO PERFECTO"
        subtitle="PARA SERVIR"
        highlight="KIKKO"
        content="Cada gota cuenta. Cada momento es especial. KIKKO acompaña los platos más queridos de las familias peruanas, realzando sabores y creando memorias que duran toda la vida. Nuestro proceso de 90 días de fermentación natural garantiza esa calidad excepcional que las amas de casa reconocen y prefieren."
        imageUrl={servingKikkoImage}
        imageAlt="Sirviendo KIKKO sobre arroz chaufa - El momento perfecto"
        stats={[
          { number: "90", text: "DÍAS DE FERMENTACIÓN" },
          { number: "#1", text: "PREFERIDO POR FAMILIAS" },
        ]}
        backgroundColor="bg-gradient-to-br from-white to-gray-50"
        isImageLeft={false}
      />

      {/* Separador decorativo */}
      <div className="h-6 bg-kikko-red"></div>

      {/* Sección 3: Toda la línea de productos KIKKO */}
      <ParallaxSection
        title="¡DALE SABOR A TUS"
        highlight="COMIDAS!"
        subtitle="CON TODA LA LÍNEA KIKKO"
        content="Desde el Siyau original hasta nuestra innovadora línea de productos, KIKKO está presente en bodegas, mercados, supermercados y mayoristas de todo el Perú. Con presencia internacional en Chile, España, Estados Unidos, Italia y Japón, llevamos el sabor peruano al mundo."
        imageUrl={productsTableImage}
        imageAlt="Línea completa de productos KIKKO - Dale sabor a tus comidas"
        stats={[
          { number: "6", text: "PAÍSES" },
          { number: "1000+", text: "PUNTOS DE VENTA" },
        ]}
        backgroundColor="bg-gradient-to-br from-gray-100 to-white"
        isImageLeft={true}
      />

      {/* Separador decorativo */}
      <div className="h-6 bg-kikko-blue"></div>

      {/* Sección 4: El legado histórico de KIKKO */}
      <ParallaxSection
        title="UN LEGADO DE"
        highlight="SABOR AUTÉNTICO"
        subtitle="QUE TRASCIENDE GENERACIONES"
        content="Desde hace más de 65 años, KIKKO es el siyau original que no falta en las cocinas peruanas. Su secreto está en un proceso natural y paciente: frejol de soya cuidadosamente fermentado en salmuera durante 90 días, combinado con trigo seleccionado, siguiendo la receta original de Don Alejandro Kamego."
        imageUrl={familyChildImage}
        imageAlt="Familia disfrutando juntos con KIKKO - Tradición que se transmite"
        stats={[
          { number: "65+", text: "AÑOS EN COCINAS PERUANAS" },
          { number: "3", text: "GENERACIONES DE FAMILIAS" },
        ]}
        backgroundColor="bg-gradient-to-br from-white to-gray-50"
        isImageLeft={false}
      />

      {/* Separador decorativo */}
      <div className="h-6 bg-kikko-yellow"></div>

      {/* Sección 5: Calidad superior y ingredientes */}
      <QualitySection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Componente reutilizable para secciones con parallax
interface ParallaxSectionProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  stats: Array<{ number: string; text: string }>;
  backgroundColor: string;
  isImageLeft: boolean;
}

function ParallaxSection({
  title,
  subtitle,
  highlight,
  content,
  imageUrl,
  imageAlt,
  stats,
  backgroundColor,
  isImageLeft,
}: ParallaxSectionProps) {
  const { scrollYProgress } = useScroll();
  const imageParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 0],
  );
  const textParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 0],
  );

  return (
    <section
      className={`py-20 lg:py-32 ${backgroundColor} relative overflow-hidden`}
    >
      {/* Elementos decorativos de fondo */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-kikko-yellow/10 rounded-full blur-xl"
        style={{ y: imageParallax }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-kikko-blue/10 rounded-full blur-xl"
        style={{ y: textParallax }}
      />

      <div className="container mx-auto px-6">
        <div
          className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${!isImageLeft ? "lg:grid-flow-col-dense" : ""}`}
        >
          {/* Imagen con parallax */}
          <motion.div
            className={`relative ${!isImageLeft ? "lg:col-start-2" : ""}`}
            style={{ y: imageParallax }}
            initial={{
              opacity: 0,
              x: isImageLeft ? -100 : 100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden shadow-2xl group">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Badge histórico en lugar de botella flotante */}
              <motion.div
                className="absolute top-6 right-6 z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="bg-kikko-yellow/90 text-kikko-blue px-4 py-2 font-klein-bold text-sm tracking-wider shadow-xl">
                  DESDE 1957
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido de texto */}
          <motion.div
            className={`space-y-8 ${!isImageLeft ? "lg:col-start-1 lg:row-start-1" : ""}`}
            style={{ y: textParallax }}
            initial={{
              opacity: 0,
              x: isImageLeft ? 100 : -100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Título principal */}
            <div className="space-y-4">
              <motion.h2
                className="font-klein-bold text-kikko-blue leading-tight uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {title}{" "}
                {highlight && (
                  <span className="text-kikko-yellow">
                    {highlight}
                  </span>
                )}
              </motion.h2>

              {subtitle && (
                <motion.h3
                  className="font-klein-bold text-kikko-blue leading-tight uppercase"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {subtitle}
                </motion.h3>
              )}
            </div>

            {/* Contenido */}
            <motion.p
              className="text-gray-700 leading-relaxed"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              {content}
            </motion.p>

            {/* Estadísticas */}
            <motion.div
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-kikko-blue font-klein-bold mb-2"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm tracking-wider">
                    {stat.text}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Sección especial del legado histórico de KIKKO
function QualitySection() {
  const { scrollYProgress } = useScroll();
  const backgroundParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 0],
  );

  return (
    <section className="h-screen-minus-header relative overflow-hidden flex items-center">
      {/* Background con la imagen de productos KIKKO */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundParallax }}
      >
        <img
          src={productsTableImage}
          alt="Línea completa de productos KIKKO sobre mesa de madera"
          className="w-full h-screen-minus-header object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/50" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hitos históricos */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: History,
                title: "1957",
                subtitle: "FUNDACIÓN",
                description:
                  "Don Alejandro Kamego funda KIKKO en Lima",
              },
              {
                icon: Heart,
                title: "TRADICIÓN",
                subtitle: "FAMILIAR",
                description:
                  "Tres generaciones compartiendo KIKKO",
              },
              {
                icon: Globe,
                title: "EXPANSIÓN",
                subtitle: "INTERNACIONAL",
                description:
                  "Llevando el sabor peruano al mundo",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 bg-kikko-yellow/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-kikko-yellow" />
                </div>
                <h3 className="font-klein-bold text-white text-xl mb-2 tracking-wider">
                  {item.title}
                </h3>
                <h4 className="font-klein-bold text-kikko-yellow text-lg mb-4 tracking-wider">
                  {item.subtitle}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}