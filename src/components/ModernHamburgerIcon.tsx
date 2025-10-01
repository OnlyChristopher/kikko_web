import { motion } from "motion/react";

interface ModernHamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  size?: number;
}

export function ModernHamburgerIcon({ 
  isOpen, 
  onClick, 
  className = "", 
  size = 24 
}: ModernHamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className={`modern-hamburger-button relative focus:outline-none transition-all duration-300 ${isOpen ? 'open' : ''} ${className}`}
      style={{
        width: size + 16,
        height: size + 16,
        padding: 8,
        borderRadius: 12,
        background: isOpen 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
      }}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Línea superior */}
        <motion.span
          initial={false}
          animate={{
            rotateZ: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
            scaleX: isOpen ? 1.2 : 1,
            backgroundColor: isOpen ? '#ffd700' : '#ffffff'
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="absolute block h-0.5 w-6 transform transition-colors"
          style={{
            top: 4,
            left: '50%',
            marginLeft: -12,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />

        {/* Línea media */}
        <motion.span
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
            backgroundColor: isOpen ? '#ffd700' : '#ffffff'
          }}
          transition={{ 
            duration: 0.2, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="absolute block h-0.5 w-6 transform transition-colors"
          style={{
            top: 11,
            left: '50%',
            marginLeft: -12,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />

        {/* Línea inferior */}
        <motion.span
          initial={false}
          animate={{
            rotateZ: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
            scaleX: isOpen ? 1.2 : 1,
            backgroundColor: isOpen ? '#ffd700' : '#ffffff'
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="absolute block h-0.5 w-6 transform transition-colors"
          style={{
            top: 18,
            left: '50%',
            marginLeft: -12,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />

        {/* Efecto de pulso cuando está abierto */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute inset-0 border border-kikko-yellow rounded-full"
          />
        )}
      </div>

      {/* Partículas decorativas cuando está activo */}
      {isOpen && (
        <>
          <motion.div
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              x: [0, -20, -30],
              y: [0, -10, -15]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.2
            }}
            className="absolute w-1 h-1 bg-kikko-yellow rounded-full"
            style={{ top: 8, left: 8 }}
          />
          
          <motion.div
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              x: [0, 25, 35],
              y: [0, -8, -12]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.8
            }}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
            style={{ top: 12, right: 8 }}
          />

          <motion.div
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 0.8, 0],
              x: [0, -15, -25],
              y: [0, 20, 30]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.5
            }}
            className="absolute w-1 h-1 bg-kikko-yellow rounded-full opacity-80"
            style={{ bottom: 6, left: 10 }}
          />
        </>
      )}
    </button>
  );
}