import { Share2, Facebook, Twitter, Instagram, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface SocialShareProps {
  recipeTitle: string;
  recipeUrl: string;
  recipeImage: string;
  darkMode?: boolean;
}

export function SocialShare({ recipeTitle, recipeUrl, recipeImage, darkMode = false }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareText = `¡Mira esta deliciosa receta: ${recipeTitle}! Preparada con productos Kikko. #Kikko #Recetas #VaConTodo`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(recipeUrl)}`,
    instagram: `https://www.instagram.com/` // Instagram no permite links directos, solo placeholder
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${recipeUrl}`);
      toast.success('¡Enlace copiado al portapapeles!');
    } catch (err) {
      toast.error('Error al copiar el enlace');
    }
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      copyToClipboard();
    } else if (platform === 'instagram') {
      toast.info('Abre Instagram y comparte la imagen manualmente');
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-gray-100 border-gray-300 hover:bg-gray-200' 
            : 'bg-white/20 border-white/30 hover:bg-white/30'
        }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <Share2 className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-white'}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          className={`absolute top-full right-0 mt-2 p-3 rounded-lg shadow-xl border backdrop-blur-sm z-50 ${
            darkMode 
              ? 'bg-white/95 border-gray-200' 
              : 'bg-black/80 border-white/20'
          }`}
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-2 min-w-40">
            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-600' : 'text-white/80'}`}>
              Compartir receta
            </p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('facebook')}
              className={`justify-start gap-2 transition-all font-klein-bold ${
                darkMode 
                  ? 'text-white' 
                  : 'text-white'
              }`}
              style={{
                backgroundColor: 'var(--kikko-blue)',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue)';
              }}
            >
              <Facebook className="w-4 h-4" />
              FACEBOOK
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('twitter')}
              className={`justify-start gap-2 transition-all font-klein-bold ${
                darkMode 
                  ? 'text-white' 
                  : 'text-white'
              }`}
              style={{
                backgroundColor: 'var(--kikko-red)',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-red-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-red)';
              }}
            >
              <Twitter className="w-4 h-4" />
              TWITTER
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('instagram')}
              className={`justify-start gap-2 transition-all font-klein-bold ${
                darkMode 
                  ? 'text-white' 
                  : 'text-white'
              }`}
              style={{
                backgroundColor: 'var(--kikko-yellow)',
                color: 'var(--kikko-red)',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-yellow-dark)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-yellow)';
                e.currentTarget.style.color = 'var(--kikko-red)';
              }}
            >
              <Instagram className="w-4 h-4" />
              INSTAGRAM
            </Button>
            
            <hr className={`my-1 ${darkMode ? 'border-gray-200' : 'border-white/20'}`} />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('copy')}
              className={`justify-start gap-2 transition-all font-klein-bold ${
                darkMode 
                  ? 'text-white' 
                  : 'text-white'
              }`}
              style={{
                backgroundColor: 'var(--kikko-blue)',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--kikko-blue)';
              }}
            >
              <Copy className="w-4 h-4" />
              COPIAR ENLACE
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}