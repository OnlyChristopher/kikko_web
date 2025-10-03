import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ 
          opacity: 0, 
          y: 20,
          filter: 'blur(4px)',
          scale: 0.95
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          scale: 1
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          filter: 'blur(4px)',
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          opacity: { duration: 0.4 },
          y: { duration: 0.6 },
          filter: { duration: 0.5 },
          scale: { duration: 0.6 }
        }}
        className="w-full"
      >
        {/* Overlay sutil durante la transición */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ 
            background: 'linear-gradient(45deg, rgba(5, 149, 211, 0.1) 0%, rgba(255, 215, 0, 0.05) 50%, rgba(220, 53, 69, 0.1) 100%)',
            opacity: 0.3
          }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Contenido de la página */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}