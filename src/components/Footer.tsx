import { Facebook, Instagram, Youtube, Phone, Globe, Mail } from "lucide-react";
import kikkoLogo from 'figma:asset/fe8763c81b8f7a5a05335fc7692502253b0bb495.png';

export function Footer() {
  return (
    <footer 
      className="text-white relative z-20"
      style={{ background: `linear-gradient(135deg, var(--kikko-blue) 0%, var(--kikko-blue-dark) 100%)` }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={kikkoLogo} 
                alt="Kikko - Sazonador Oriental" 
                className="h-16 w-auto" // Aumenté también aquí el tamaño
              />
            </div>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              <strong style={{ color: 'white' }}>ES MÁS RICO CON <span style={{ color: 'var(--kikko-yellow)' }}>KIKKO</span>...¡Y VA CON TODO!</strong>
              <br /><br />
              Sabor oriental auténtico para tus comidas. Productos de calidad premium 
              que transforman cada plato en una experiencia culinaria única.
            </p>
            <div className="flex gap-3">
              <div 
                className="p-2 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
              >
                <Facebook className="w-4 h-4" />
              </div>
              <div 
                className="p-2 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
              >
                <Instagram className="w-4 h-4" />
              </div>
              <div 
                className="p-2 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
              >
                <Youtube className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-4" style={{ color: 'var(--kikko-yellow)' }}>Navegación</h3>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Productos
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Recetas
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Blog Culinario
                </a>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-lg mb-4" style={{ color: 'var(--kikko-yellow)' }}>Nuestros Productos</h3>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Salsa de Soya Kikko
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Salsa Shoyu
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Salsa Mensi
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Aceite de Ajonjolí
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
                >
                  Ver todo el catálogo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4" style={{ color: 'var(--kikko-yellow)' }}>Contacto</h3>
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm">Atención al Cliente</div>
                  <div className="text-white">01 618-4800</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm">Email</div>
                  <div className="text-white">info@kikko.com.pe</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
                >
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm">Web Corporativa</div>
                  <div className="text-white">www.kikkocorporation.com</div>
                </div>
              </div>
            </div>
            
            <div 
              className="mt-6 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--kikko-yellow)', color: 'var(--kikko-blue)' }}
            >
              <p className="text-sm">
                <strong>¡Síguenos en redes!</strong><br />
                @kikkoperú
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-blue-100 text-sm mb-2">
                © 2024 Kikko Corporation. Todos los derechos reservados.
              </p>
              <p className="text-xs" style={{ color: 'var(--kikko-yellow)' }}>
                "Transformando cocinas con sabor oriental desde 1985"
              </p>
            </div>
            <div className="flex gap-6 text-sm text-blue-100">
              <a 
                href="#" 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
              >
                Términos y Condiciones
              </a>
              <a 
                href="#" 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
              >
                Política de Privacidad
              </a>
              <a 
                href="#" 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kikko-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#dbeafe'}
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}