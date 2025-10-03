import { useState, useEffect, useRef } from 'react';

interface UseAutoCountUpOptions {
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'bounce';
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  enableOnScroll?: boolean;
}

export function useAutoCountUp(
  target: number, 
  options: UseAutoCountUpOptions = {}
) {
  const {
    duration = 2500,
    delay = 800,
    easing = 'easeOut',
    decimals = 0,
    separator = '',
    prefix = '',
    suffix = '',
    enableOnScroll = true
  } = options;

  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!enableOnScroll);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Funciones de easing
  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 4),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    bounce: (t: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) {
        return n1 * t * t;
      } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    }
  };

  // Intersection Observer para trigger al hacer scroll
  useEffect(() => {
    if (!enableOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [enableOnScroll, hasStarted]);

  // Animación del contador
  useEffect(() => {
    if (!isVisible || hasStarted) return;

    let startTime: number;
    let animationFrame: number;
    let timeoutId: NodeJS.Timeout;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentCount = target * easedProgress;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    const startAnimation = () => {
      animationFrame = requestAnimationFrame(animate);
      setHasStarted(true);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [target, duration, delay, easing, isVisible, hasStarted]);

  // Formatear el número
  const formatNumber = (num: number) => {
    // Asegurar que el número no sea menor a 0
    const safeNum = Math.max(0, num);
    let formatted = safeNum.toFixed(decimals);
    
    if (separator && safeNum >= 1000) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      formatted = parts.join('.');
    }
    
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    value: formatNumber(count),
    rawCount: count,
    isVisible,
    hasStarted,
    isComplete,
    elementRef
  };
}

// Hook simplificado para uso rápido (compatibilidad hacia atrás)
export function useCountUp(target: number, duration?: number, suffix?: string) {
  const { value, isComplete } = useAutoCountUp(target, { duration, suffix });
  return { value, isComplete };
}