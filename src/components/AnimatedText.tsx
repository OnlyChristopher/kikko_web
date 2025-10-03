import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  animationType?: 'fadeInUp' | 'typewriter' | 'wave' | 'bounce' | 'glow' | 'flash';
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  duration = 0.3,
  staggerDelay = 0.02,
  animationType = 'fadeInUp'
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Dividir el texto en palabras y letras
  const words = text.split(' ');
  
  const getLetterAnimation = (letterIndex: number, wordIndex: number) => {
    const totalDelay = delay + (wordIndex * 0.1) + (letterIndex * staggerDelay);
    
    const animations = {
      fadeInUp: {
        initial: { opacity: 0, y: 50, scale: 0.8 },
        animate: isVisible ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: totalDelay,
            duration: duration,
            ease: "easeOut"
          }
        } : {}
      },
      typewriter: {
        initial: { opacity: 0, width: 0 },
        animate: isVisible ? { 
          opacity: 1, 
          width: 'auto',
          transition: { 
            delay: totalDelay,
            duration: duration * 0.3,
            ease: "easeOut"
          }
        } : {}
      },
      wave: {
        initial: { opacity: 0, y: 20, rotateZ: -10 },
        animate: isVisible ? { 
          opacity: 1, 
          y: [20, -10, 0], 
          rotateZ: [-10, 5, 0],
          transition: { 
            delay: totalDelay,
            duration: duration,
            ease: "easeInOut"
          }
        } : {}
      },
      bounce: {
        initial: { opacity: 0, scale: 0, y: -100 },
        animate: isVisible ? { 
          opacity: 1, 
          scale: [0, 1.2, 1], 
          y: [-100, 10, 0],
          transition: { 
            delay: totalDelay,
            duration: duration,
            ease: "easeOut"
          }
        } : {}
      },
      glow: {
        initial: { opacity: 0, scale: 0.5, filter: 'brightness(0.5)' },
        animate: isVisible ? { 
          opacity: 1, 
          scale: 1,
          filter: 'brightness(1)',
          transition: { 
            delay: totalDelay,
            duration: duration,
            ease: "easeOut"
          }
        } : {}
      },
      flash: {
        initial: { opacity: 0, scale: 0.3, rotateZ: -15, filter: 'brightness(2) blur(5px)' },
        animate: isVisible ? { 
          opacity: 1, 
          scale: [0.3, 1.3, 1],
          rotateZ: [-15, 10, 0],
          filter: ['brightness(2) blur(5px)', 'brightness(1.5) blur(0px)', 'brightness(1) blur(0px)'],
          transition: { 
            delay: totalDelay,
            duration: duration,
            ease: "easeOut"
          }
        } : {}
      }
    };
    
    return animations[animationType];
  };

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              className="inline-block"
              {...getLetterAnimation(letterIndex, wordIndex)}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

// Componente especializado para títulos con efectos especiales
export function AnimatedTitle({ 
  text, 
  className = '', 
  delay = 0,
  glowColor = 'rgba(255, 215, 0, 0.5)' 
}: {
  text: string;
  className?: string;
  delay?: number;
  glowColor?: string;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      transition={{ 
        delay: delay,
        duration: 0.5,
        ease: "easeOut"
      }}
      className={`${className} relative`}
      style={{
        textShadow: `
          0 0 20px ${glowColor},
          0 0 40px ${glowColor},
          0 8px 32px rgba(0,0,0,0.3)
        `
      }}
    >
      <AnimatedText 
        text={text}
        delay={delay + 0.1}
        staggerDelay={0.015}
        animationType="glow"
        duration={0.3}
      />
    </motion.h1>
  );
}

// Componente para subtítulos con animación más sutil
export function AnimatedSubtitle({ 
  text, 
  className = '', 
  delay = 0 
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30, letterSpacing: '0em' }}
      animate={{ 
        opacity: 1, 
        y: 0,
        letterSpacing: '0.05em'
      }}
      transition={{ 
        delay: delay,
        duration: 0.4,
        ease: "easeOut"
      }}
      className={className}
    >
      <AnimatedText 
        text={text}
        delay={delay + 0.1}
        staggerDelay={0.01}
        animationType="fadeInUp"
        duration={0.25}
      />
    </motion.h2>
  );
}