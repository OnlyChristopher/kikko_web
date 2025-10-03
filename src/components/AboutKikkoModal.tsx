import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Award, MapPin, Users, Globe, Star } from 'lucide-react';
import { Button } from './ui/button';
import exampleImage from 'figma:asset/8da59b7841c9451d3c3d092f7f9b387b856c953a.png';

interface AboutKikkoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutKikkoModal({ isOpen, onClose }: AboutKikkoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative kikko-custom-scroll">
              {/* Botón de cerrar con nueva paleta Pantone */}
              <Button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:text-white transition-all duration-300 border-2"
                variant="ghost"
                size="sm"
                style={{
                  borderColor: '#d1d5db'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--pantone-orange)';
                  e.currentTarget.style.borderColor = 'var(--pantone-orange)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.color = '';
                }}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Contenido del modal */}
              <div className="p-8 sm:p-12">
                {/* Encabezado */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-kikko-blue/10 rounded-full mb-6">
                    <Building2 className="w-10 h-10 text-kikko-blue" />
                  </div>
                  
                  <h2 className="font-klein-bold text-kikko-blue mb-4 text-3xl sm:text-4xl">
                    TODO SOBRE KIKKO
                  </h2>
                  
                  <h3 className="text-2xl sm:text-3xl text-gray-800 mb-6">
                    SOMOS KIKKO, <span className="text-kikko-red">el siyau original</span>
                  </h3>
                </motion.div>

                {/* Contenido principal en grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Columna de texto */}
                  <div className="space-y-8">
                    {/* Historia y misión */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-kikko-blue/20"
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
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-kikko-yellow/20"
                    >
                      <div className="flex items-center mb-4">
                        <Star className="w-6 h-6 text-kikko-red mr-3" />
                        <h4 className="text-xl text-gray-800">Nuestro Compromiso</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Cada botella de KIKKO nace de un proceso cuidadoso, con los mejores ingredientes y un equipo que pone el corazón en lo que hace. Mejoramos todos los días y eso se nota en la confianza que las familias en el Perú y en distintos lugares del mundo nos tienen.
                      </p>
                    </motion.div>

                    {/* Presencia global */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-kikko-red/20"
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
                  </div>

                  {/* Columna de imagen */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
                      <img
                        src={exampleImage}
                        alt="Historia de Kikko desde 1957"
                        className="w-full h-auto rounded-2xl"
                      />
                      
                      {/* Overlay decorativo */}
                      <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Elementos decorativos flotantes */}
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
                        className="absolute top-8 right-8 w-12 h-12 bg-kikko-yellow/90 rounded-full flex items-center justify-center shadow-lg"
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
                        className="absolute bottom-8 left-8 w-10 h-10 bg-kikko-red/90 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Award className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Estadísticas flotantes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                    >
                      <div className="text-center">
                        <div className="text-2xl text-kikko-blue mb-1">65+</div>
                        <div className="text-sm text-gray-600">Años de historia</div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                    >
                      <div className="text-center">
                        <div className="text-2xl text-kikko-red mb-1">6</div>
                        <div className="text-sm text-gray-600">Países</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Mensaje final */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 bg-gradient-to-r from-kikko-blue to-kikko-red text-white rounded-2xl p-8 shadow-xl text-center"
                >
                  <p className="text-xl sm:text-2xl leading-relaxed mb-2">
                    Somos el <strong>siyau original</strong>, orgullosamente peruano,
                  </p>
                  <p className="text-xl sm:text-2xl leading-relaxed">
                    que conquistó al mundo con <strong>sabor y calidad</strong>.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}