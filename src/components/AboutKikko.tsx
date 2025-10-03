import { motion } from 'motion/react';
import { Building2, Award, MapPin, Users, Globe, Star } from 'lucide-react';
import exampleImage from 'figma:asset/8da59b7841c9451d3c3d092f7f9b387b856c953a.png';

export function AboutKikko() {
  return (
    <section 
      id="about-kikko-section" 
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-kikko-blue via-kikko-blue/70 to-white relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-kikko-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-kikko-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-kikko-red/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center p-2 bg-kikko-blue/10 rounded-full mb-6"
          >
            <Building2 className="w-8 h-8 text-kikko-blue" />
          </motion.div>
          
          <motion.h2 
            className="font-klein-bold text-kikko-blue mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            TODO SOBRE KIKKO
          </motion.h2>
          
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            SOMOS KIKKO, <span className="text-kikko-red">el siyau original</span>
          </motion.h3>
        </motion.div>

        {/* Contenido principal en grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Columna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Historia y misión */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50"
            >
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-kikko-yellow mr-3" />
                <h4 className="text-xl text-gray-800">Nuestra Historia</h4>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Desde <strong className="text-kikko-blue">1957</strong>, cuando Don Alejandro Kamego fundó Kikko, nuestra misión ha sido la misma: <strong className="text-kikko-red">llevar sabor original y calidad de verdad a las cocinas peruanas</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Han pasado más de <strong className="text-kikko-blue">65 años</strong> y seguimos firmes con ese compromiso que empezó en una pequeña fábrica y hoy vive en nuestra moderna planta en <strong className="text-kikko-red">Ate</strong>.
              </p>
            </motion.div>

            {/* Proceso y calidad */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50"
            >
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-kikko-yellow mr-3" />
                <h4 className="text-xl text-gray-800">Nuestro Compromiso</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Cada botella de KIKKO nace de un proceso cuidadoso, con los mejores ingredientes y un equipo que pone el corazón en lo que hace. Mejoramos todos los días y eso se nota en la confianza que las familias en el Perú y en distintos lugares del mundo nos tienen.
              </p>
            </motion.div>

            {/* Presencia global */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50"
            >
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-kikko-blue mr-3" />
                <h4 className="text-xl text-gray-800">Nuestra Presencia</h4>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hoy estamos en <strong className="text-kikko-blue">bodegas, mercados, supermercados y mayoristas</strong> de todo el Perú, porque KIKKO es parte de la vida diaria de millones de hogares.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Y no solo aquí: también nos encuentran en <strong className="text-kikko-red">Chile, España, Estados Unidos, Italia y Japón</strong>.
              </p>
            </motion.div>

            {/* Mensaje final */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-r from-kikko-blue to-kikko-red text-white rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <div className="text-center">
                <p className="text-lg sm:text-xl leading-relaxed mb-2">
                  Somos el <strong>siyau original</strong>, orgullosamente peruano,
                </p>
                <p className="text-lg sm:text-xl leading-relaxed">
                  que conquistó al mundo con <strong>sabor y calidad</strong>.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna de imagen - Ama de casa feliz */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4"
            >
              <img
                src="https://images.unsplash.com/photo-1752652016426-b0a1b6856282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3lmdWwlMjBtb3RoZXIlMjBraXRjaGVuJTIwY29va2luZyUyMGhhcHBpbmVzcyUyMGZhY2V8ZW58MXx8fHwxNzU3NDg2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ama de casa feliz cocinando con siyau Kikko - mostrando su cara sonriente de frente"
                className="w-full h-auto rounded-2xl"
              />
              
              {/* Elementos decorativos flotantes - sin overlay de texto */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-8 right-8 w-12 h-12 bg-kikko-yellow/90 rounded-full flex items-center justify-center shadow-lg brand-float-element"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-10 h-10 bg-kikko-red/90 rounded-full flex items-center justify-center shadow-lg brand-float-element"
              >
                <Award className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            {/* Estadísticas flotantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-2xl text-kikko-blue mb-1">65+</div>
                <div className="text-sm text-gray-600">Años de historia</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-2xl text-kikko-red mb-1">6</div>
                <div className="text-sm text-gray-600">Países</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}