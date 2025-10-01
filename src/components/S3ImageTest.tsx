import { ImageWithFallback } from './figma/ImageWithFallback';
import { IMAGE_ASSETS } from '../constants/imageAssets';

export function S3ImageTest() {
  const platos = [
    { name: 'Plato 1', url: IMAGE_ASSETS.PLATO_1_IMAGE },
    { name: 'Plato 2', url: IMAGE_ASSETS.PLATO_2_IMAGE },
    { name: 'Plato 3', url: IMAGE_ASSETS.PLATO_3_IMAGE },
    { name: 'Plato 4', url: IMAGE_ASSETS.PLATO_4_IMAGE }
  ];

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Test de Imágenes de Platos S3 - <span className="text-kikko-yellow">KIKKO</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {platos.map((plato, index) => (
          <div key={index} className="bg-gray-50 p-4 shadow-lg">
            <h3 className="font-bold text-center mb-3 text-kikko-blue">{plato.name}</h3>
            
            <div className="aspect-square overflow-hidden mb-3">
              <ImageWithFallback
                src={plato.url}
                alt={plato.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="text-xs bg-gray-100 p-2 break-all">
              <strong>URL:</strong> 
              <br />
              <a 
                href={plato.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kikko-blue hover:underline"
              >
                {plato.url}
              </a>
            </div>
            
            <div className="mt-2 text-center">
              <button
                onClick={() => window.open(plato.url, '_blank')}
                className="bg-kikko-blue text-white px-3 py-1 text-xs hover:bg-kikko-blue-dark transition-colors"
              >
                Probar Directamente
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          ✅ Si las imágenes se cargan correctamente, las URLs de S3 están funcionando
          <br />
          ❌ Si aparecen imágenes de fallback, las URLs de S3 necesitan verificación
        </p>
      </div>
    </div>
  );
}