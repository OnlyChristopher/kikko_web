import { useState, useEffect } from 'react';
import { IMAGE_ASSETS, IMAGE_FALLBACKS, ImageAssetKey } from '../constants/imageAssets';

interface KikkoImageProps {
  imageKey: ImageAssetKey;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function KikkoImage({ imageKey, alt, className, style, onClick }: KikkoImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const primarySrc = IMAGE_ASSETS[imageKey];
  const fallbackSrc = IMAGE_FALLBACKS[imageKey as keyof typeof IMAGE_FALLBACKS];

  // Test image accessibility on component mount
  useEffect(() => {
    const testImage = new Image();
    testImage.onload = () => {
      // Image loaded successfully
    };
    testImage.onerror = () => {
      // If the main image fails pre-test, immediately switch to fallback
      if (fallbackSrc) {
        setHasError(true);
      }
    };
    testImage.src = primarySrc;
  }, [imageKey, primarySrc, fallbackSrc]);

  const handleError = () => {
    if (!hasError && fallbackSrc && retryCount < 2) {
      setHasError(true);
      setRetryCount(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : primarySrc;

  return (
    <div className="relative">
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        onClick={onClick}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      
      {/* Indicador de error final - Solo si hay error crítico */}
      {!isLoading && hasError && retryCount >= 2 && (
        <div className={`absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded flex items-center justify-center ${className || ''}`}>
          <div className="text-center p-4">
            <div className="text-red-600 text-sm font-medium mb-2">⚠️ Error de imagen</div>
            <div className="text-red-500 text-xs">{imageKey}</div>
          </div>
        </div>
      )}
    </div>
  );
}