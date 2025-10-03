import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Guardar el estilo original
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
      
      // Cleanup: restaurar scroll
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
}