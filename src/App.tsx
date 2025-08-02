import { useState } from 'react';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import MealCard from './components/MealCard';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';
import type { Meal } from './types/types.ts';
import { searchMealsByIngredients } from './services/spoonacularApi';

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (ingredients: string[]) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchMealsByIngredients(ingredients);
      setMeals(results);
      
      if (results.length === 0) {
        setError('No recipes found with those ingredients. Try different or fewer ingredients.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SearchSection onSearch={handleSearch} isLoading={isLoading} />
      
      {/* Results Section */}
      {hasSearched && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Oops!</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <p className="text-sm text-red-500">
                    Make sure you have a valid Spoonacular API key configured.
                  </p>
                </div>
              </div>
            ) : meals.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Found {meals.length} Delicious Recipe{meals.length > 1 ? 's' : ''}
                  </h2>
                  <p className="text-lg text-gray-600">
                    Here are some amazing meals you can make with your ingredients
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {meals.map((meal) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onViewRecipe={handleViewRecipe}
                    />
                  ))}
                </div>
              </>
            ) : !isLoading && (
              <div className="text-center py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">No Recipes Found</h3>
                  <p className="text-yellow-600 mb-4">
                    We couldn't find any recipes with those ingredients.
                  </p>
                  <p className="text-sm text-yellow-500">
                    Try using different or fewer ingredients, or check common pantry staples.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <RecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipeId={selectedRecipeId}
      />
      
      <Footer />
    </div>
  );
}

export default App;