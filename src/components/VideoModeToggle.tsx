import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Image, Eye, EyeOff } from 'lucide-react';

// Contexto para el modo de video
interface VideoModeContextType {
  isCleanMode: boolean;
  toggleMode: () => void;
}

const VideoModeContext = createContext<VideoModeContextType | undefined>(undefined);

// Hook para usar el contexto
export function useVideoMode() {
  const context = useContext(VideoModeContext);
  if (context === undefined) {
    // Devolver valores por defecto si no hay contexto
    return {
      isCleanMode: false,
      toggleMode: () => {}
    };
  }
  return context;
}

// Provider del contexto
interface VideoModeProviderProps {
  children: ReactNode;
}

export function VideoModeProvider({ children }: VideoModeProviderProps) {
  const [isCleanMode, setIsCleanMode] = useState(false);

  const toggleMode = () => {
    setIsCleanMode(prev => !prev);
  };

  return (
    <VideoModeContext.Provider value={{ isCleanMode, toggleMode }}>
      {children}
    </VideoModeContext.Provider>
  );
}

// Componente del botón flotante para alternar modo
export function VideoModeToggle() {
  const { isCleanMode, toggleMode } = useVideoMode();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {/* Botón principal */}
      <motion.button
        onClick={toggleMode}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          relative overflow-hidden rounded-full p-4 shadow-2xl backdrop-blur-sm transition-all duration-300
          ${isCleanMode 
            ? 'bg-kikko-blue/90 hover:bg-kikko-blue text-white border-2 border-kikko-blue-light' 
            : 'bg-kikko-yellow/90 hover:bg-kikko-yellow text-kikko-blue border-2 border-kikko-yellow-dark'
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isCleanMode ? "Activar modo video" : "Activar modo imagen"}
      >
        {/* Efecto de onda al hacer hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Icono que cambia según el modo */}
        <motion.div
          key={isCleanMode ? 'image' : 'video'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isCleanMode ? (
            <Video className="w-6 h-6" />
          ) : (
            <Image className="w-6 h-6" />
          )}
        </motion.div>

        {/* Indicador de pulso */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isCleanMode ? 'bg-kikko-blue' : 'bg-kikko-yellow'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Tooltip informativo */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {isCleanMode ? "Activar modo video" : "Activar modo imagen"}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de estado */}
      <motion.div
        className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white shadow-md ${
          isCleanMode ? 'bg-kikko-blue' : 'bg-kikko-yellow'
        }`}
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white/30"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Efectos de partículas decorativas */}
      {!isCleanMode && (
        <>
          <motion.div
            className="absolute -top-8 -left-8 w-2 h-2 bg-kikko-yellow rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-1.5 h-1.5 bg-kikko-red rounded-full"
            animate={{
              y: [0, 15, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
    </motion.div>
  );
}