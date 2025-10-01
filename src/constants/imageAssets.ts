// Constantes para URLs de imágenes - Sistema robusto con imágenes reales de S3 ACTUALIZADAS
export const IMAGE_ASSETS = {
  // Fondos principales - usando tus imágenes reales de S3
  SUPERMERCADO_BACKGROUND: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/gondola.png', // Tu imagen real de S3
  KITCHEN_TABLE_BACKGROUND: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/mesa_verduras.png', // Tu mesa con verduras real
  
  // Productos - usando tus imágenes finales ACTUALIZADAS de S3
  SIYAU_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/siyau.png', // Siyau Original - NUEVA URL
  SALSA_MENSI_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/mensi.PNG', // Salsa Mensi - NUEVA URL
  AJOIKION_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/ajoikion.PNG', // Ajoikion - NUEVA URL
  SHOYU_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/shoyu.PNG', // Shoyu Premium - NUEVA URL
  
  // Platos de comida para recetas - NUEVAS IMÁGENES S3
  PLATO_1_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_1.png', // Plato 1 - Imagen real S3
  PLATO_2_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_2.PNG', // Plato 2 - Imagen real S3
  PLATO_3_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_3.png', // Plato 3 - Imagen real S3
  PLATO_4_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/plato_4.png', // Plato 4 - Imagen real S3
  
  // Imagen adicional disponible (usando Shoyu como extra)
  PRODUCT_EXTRA_IMAGE: 'https://mybucketkikko.s3.us-east-1.amazonaws.com/shoyu.PNG' // Imagen extra para otros usos
} as const;

// Sistema de fallbacks redundante para máxima confiabilidad
export const IMAGE_FALLBACKS = {
  SUPERMERCADO_BACKGROUND: 'https://images.unsplash.com/photo-1652518892062-7dab3e60aa0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHN1cGVybWFya2V0JTIwc2hlbHZlcyUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU4NDQ4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', // Fallback: Empty supermarket shelves si S3 falla
  KITCHEN_TABLE_BACKGROUND: 'https://images.unsplash.com/photo-1696527018080-07e02cab468d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGFibGUlMjB2ZWdldGFibGVzJTIwY29va2luZyUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU4NDQ4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', // Fallback: Kitchen table with vegetables
  SIYAU_IMAGE: 'https://images.unsplash.com/photo-1547552129-972ef656a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZSUyMGlzb2xhdGVkJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0ODA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  SALSA_MENSI_IMAGE: 'https://images.unsplash.com/photo-1547552129-972ef656a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZSUyMGlzb2xhdGVkJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0ODA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  AJOIKION_IMAGE: 'https://images.unsplash.com/photo-1547552129-972ef656a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZSUyMGlzb2xhdGVkJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0ODA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  SHOYU_IMAGE: 'https://images.unsplash.com/photo-1547552129-972ef656a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZSUyMGlzb2xhdGVkJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0ODA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  PRODUCT_EXTRA_IMAGE: 'https://images.unsplash.com/photo-1547552129-972ef656a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZSUyMGlzb2xhdGVkJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0ODA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
  // Fallbacks para platos de comida - usando imágenes de Unsplash similares
  PLATO_1_IMAGE: 'https://images.unsplash.com/photo-1708782340354-46c48848a3de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBmb29kJTIwcGxhdG98ZW58MXx8fHwxNzU4NjI1MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', // Fallback: Pasta dish
  PLATO_2_IMAGE: 'https://images.unsplash.com/photo-1736952332338-44dc07283462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHZlZ2V0YWJsZXMlMjBwbGF0ZXxlbnwxfHx8fDE3NTg2MjUyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', // Fallback: Grilled chicken
  PLATO_3_IMAGE: 'https://images.unsplash.com/photo-1619046213817-2d28af9ddaae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwZmlsbGV0JTIwdmVnZXRhYmxlcyUyMGRpbm5lcnxlbnwxfHx8fDE3NTg2MjUyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', // Fallback: Fish fillet
  PLATO_4_IMAGE: 'https://images.unsplash.com/photo-1679279726937-122c49626802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYm93bCUyMGFzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NTg2MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' // Fallback: Rice bowl asian
} as const;

// Tipo para autocompletado
export type ImageAssetKey = keyof typeof IMAGE_ASSETS;

// TODO: Para migrar a sistema local, crear esta estructura de carpetas:
// /public/images/
//   ├── backgrounds/
//   │   ├── supermercado-background.jpg
//   │   └── kitchen-table-background.jpg
//   ├── products/
//   │   ├── siyau-bottle.jpg
//   │   ├── ajoikion-bottle.jpg
//   │   ├── salsa-mensi-bottle.jpg
//   │   └── shoyu-bottle.jpg
//   └── icons/
//       └── kikko-logo.svg

// Sistema de imágenes locales (para usar en el futuro):
export const LOCAL_IMAGE_ASSETS = {
  // Fondos principales
  SUPERMERCADO_BACKGROUND: '/images/backgrounds/supermercado-background.jpg',
  KITCHEN_TABLE_BACKGROUND: '/images/backgrounds/kitchen-table-background.jpg',
  
  // Productos
  SIYAU_IMAGE: '/images/products/siyau-bottle.jpg',
  AJOIKION_IMAGE: '/images/products/ajoikion-bottle.jpg',
  SALSA_MENSI_IMAGE: '/images/products/salsa-mensi-bottle.jpg',
  SHOYU_IMAGE: '/images/products/shoyu-bottle.jpg',
  
  // Iconos y logos
  KIKKO_LOGO: '/images/icons/kikko-logo.svg'
} as const;

// Helper function para verificar si una imagen está disponible
export const getImageUrl = (key: ImageAssetKey): string => {
  return IMAGE_ASSETS[key];
};

// Helper function para obtener imagen con fallback
export const getImageWithFallback = (key: ImageAssetKey, fallback?: string): string => {
  const url = IMAGE_ASSETS[key];
  return url || fallback || '';
};