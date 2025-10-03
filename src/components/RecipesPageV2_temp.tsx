export const FINAL_GRID_PART = `
          )) : (
            // Estado sin resultados
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No se encontraron recetas
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-kikko-blue text-white hover:bg-kikko-blue-dark"
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Ver más recetas */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-kikko-blue text-white hover:bg-kikko-blue-dark px-8 py-3"
          >
            Ver Todas las Recetas
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
}`;