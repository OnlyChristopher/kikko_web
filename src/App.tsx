import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { AboutKikkoPage } from "./components/AboutKikkoPage";
import { RecipesPage } from "./components/RecipesPage";
import { RecipesPageV2 } from "./components/RecipesPageV2";
import { RecipeDetailPage } from "./components/RecipeDetailPage";
import { RecipeDetailPageV2 } from "./components/RecipeDetailPageV2";
import { NovedadesPage } from "./components/NovedadesPage";
import { ProductosPage } from "./components/ProductosPage";
import { ProductDetailPage } from "./components/ProductDetailPage";

import { LoadingScreen } from "./components/LoadingScreen";
import { PageTransition } from "./components/PageTransition";
import { AppEffects } from "./components/AppEffects";
import { Header } from "./components/Header";
import { useScrollToTop } from "./hooks/useScrollToTop";
import "./styles/recipe-hero-styles.css";

type PageType = 'home' | 'about' | 'recipes' | 'recipes-v2' | 'recipe-detail' | 'recipe-detail-v2' | 'novedades' | 'productos' | 'product-detail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Scroll al top cuando cambia la página
  useScrollToTop(currentPage);

  // Manejo de carga inicial - LOADING FUNCIONANDO NORMALMENTE
  useEffect(() => {
    if (isInitialLoad) {
      setIsLoading(true);
      // El loading se oculta automáticamente después de la animación completa
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 2000); // 2 segundos - tiempo reducido

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Función helper para navegación con loading - FUNCIONANDO NORMALMENTE
  const navigateWithLoading = (page: PageType, data?: any) => {
    if (page === currentPage) return; // No recargar si es la misma página

    setIsLoading(true);
    
    // Delay para mostrar el loading con botella en CADA navegación
    setTimeout(() => {
      if (data && page === 'recipe-detail') setSelectedRecipe(data);
      if (data && (page === 'product-detail' || page === 'product-detail-v2')) setSelectedProduct(data);
      setCurrentPage(page);
      
      // Ocultar loading después de completar la animación de la botella
      setTimeout(() => {
        setIsLoading(false);
      }, 1800); // 1.8 segundos - tiempo reducido para navegación
    }, 200);
  };

  // Funciones de navegación actualizadas con loading
  const navigateToHome = () => navigateWithLoading('home');
  const navigateToAbout = () => navigateWithLoading('about');
  const navigateToRecipes = () => navigateWithLoading('recipes');
  const navigateToRecipesV2 = () => navigateWithLoading('recipes-v2');
  const navigateToRecipeDetail = (recipe: any) => navigateWithLoading('recipe-detail', recipe);
  const navigateToRecipeDetailV2 = (recipe: any) => navigateWithLoading('recipe-detail-v2', recipe);
  const navigateToNovedades = () => navigateWithLoading('novedades');
  const navigateToProductos = () => navigateWithLoading('productos');
  const navigateToProductDetail = (product: any) => navigateWithLoading('product-detail', product);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToAbout={navigateToAbout}
            onNavigateToRecipes={navigateToRecipesV2}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
          />
        );
      case 'about':
        return (
          <AboutKikkoPage 
            onNavigateToHome={navigateToHome}
            onNavigateToRecipes={navigateToRecipesV2}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
          />
        );
      case 'recipes':
        return (
          <RecipesPage 
            onBackToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
            onNavigateToRecipeDetail={navigateToRecipeDetail}
          />
        );
      case 'recipes-v2':
        return (
          <RecipesPageV2 
            onBackToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
            onNavigateToRecipeDetail={navigateToRecipeDetailV2}
          />
        );
      case 'recipe-detail':
        return (
          <RecipeDetailPage 
            recipe={selectedRecipe}
            onBackToRecipes={navigateToRecipes}
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
          />
        );
      case 'recipe-detail-v2':
        return (
          <RecipeDetailPageV2 
            recipe={selectedRecipe}
            onBackToRecipes={navigateToRecipesV2}
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
            onNavigateToRecipeDetail={navigateToRecipeDetailV2}
          />
        );
      case 'novedades':
        return (
          <NovedadesPage 
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToRecipes={navigateToRecipes}
            onNavigateToProductos={navigateToProductos}
          />
        );
      case 'productos':
        return (
          <ProductosPage 
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToRecipes={navigateToRecipes}
            onNavigateToNovedades={navigateToNovedades}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailPage 
            product={selectedProduct}
            onBackToProductos={navigateToProductos}
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
          />
        );

      default:
        return (
          <HomePage 
            onNavigateToAbout={navigateToAbout}
            onNavigateToRecipes={navigateToRecipes}
            onNavigateToNovedades={navigateToNovedades}
            onNavigateToProductos={navigateToProductos}
          />
        );
    }
  };

  return (
    <>
      {/* Efectos globales de la aplicación */}
      <AppEffects currentPage={currentPage} isLoading={isLoading} />
      
      {/* Pantalla de carga - SIEMPRE con botella */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Header Global - SIEMPRE MONTADO */}
      <Header 
        onNavigateToHome={navigateToHome}
        onNavigateToAbout={navigateToAbout}
        onNavigateToRecipes={navigateToRecipesV2}
        onNavigateToNovedades={navigateToNovedades}
        onNavigateToProductos={navigateToProductos}

        currentPage={currentPage}
        isLoading={isLoading}
      />
      
      {/* Contenido principal con transiciones */}
      {!isLoading && (
        <PageTransition pageKey={currentPage}>
          {renderCurrentPage()}
        </PageTransition>
      )}
    </>
  );
}