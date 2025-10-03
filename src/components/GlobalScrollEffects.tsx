import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function GlobalScrollEffects() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular posiciones dinámicas basadas en el scroll
  const floatingElements = [
    {
      id: 1,
      size: 'w-4 h-4',
      color: 'bg-kikko-blue/10',
      initialPos: { top: '20%', left: '10%' },
      speed: 0.15,
      rotation: 0.3
    },
    {
      id: 2,
      size: 'w-6 h-6',
      color: 'bg-kikko-yellow/15',
      initialPos: { top: '40%', right: '15%' },
      speed: -0.12,
      rotation: -0.25
    },
    {
      id: 3,
      size: 'w-5 h-5',
      color: 'bg-kikko-red/12',
      initialPos: { top: '60%', left: '20%' },
      speed: 0.08,
      rotation: 0.4
    },
    {
      id: 4,
      size: 'w-3 h-3',
      color: 'bg-kikko-blue/20',
      initialPos: { top: '80%', right: '25%' },
      speed: -0.18,
      rotation: -0.15
    },
    {
      id: 5,
      size: 'w-7 h-7',
      color: 'bg-kikko-yellow/8',
      initialPos: { top: '30%', right: '5%' },
      speed: 0.22,
      rotation: 0.5
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.color} rounded-full blur-sm opacity-60`}
          style={{
            ...element.initialPos,
            transform: `translateY(${scrollY * element.speed}px) rotate(${scrollY * element.rotation}deg)`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4 + element.id,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.id * 0.5
          }}
        />
      ))}
      
      {/* Partículas adicionales que aparecen con scroll intenso */}
      {scrollY > 500 && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-kikko-blue/25 rounded-full blur-xs"
            style={{
              transform: `translate(-50%, -50%) translateY(${(scrollY - 500) * 0.1}px) rotate(${scrollY * 0.8}deg)`
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-[70%] left-[80%] w-3 h-3 bg-kikko-red/20 rounded-full blur-sm"
            style={{
              transform: `translateY(${(scrollY - 500) * -0.08}px) rotate(${scrollY * -0.6}deg)`
            }}
            animate={{
              scale: [0.7, 1.3, 0.7],
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
      
      {/* Efecto de "lluvia de partículas" cuando se scrollea mucho */}
      {scrollY > 1000 && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-kikko-yellow/40 rounded-full"
              style={{
                left: `${10 + i * 10}%`,
                top: `${Math.sin(scrollY * 0.01 + i) * 20 + 40}%`,
                transform: `translateY(${scrollY * (0.05 + i * 0.01)}px)`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}