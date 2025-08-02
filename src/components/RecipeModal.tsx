import React, { useEffect, useState } from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import type { RecipeDetails } from '../types/types.ts';
import { getRecipeDetails } from '../services/spoonacularApi';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: number | null;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipeId }) => {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && recipeId) {
      fetchRecipeDetails();
    }
  }, [isOpen, recipeId]);

  const fetchRecipeDetails = async () => {
    if (!recipeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const details = await getRecipeDetails(recipeId);
      setRecipe(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recipe details');
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Recipe Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchRecipeDetails}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {recipe && (
            <div>
              <div className="mb-6">
                <img
                  src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={recipe.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat size={20} />
                  <span>Easy to make</span>
                </div>
              </div>

              {recipe.summary && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Summary</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {stripHtml(recipe.summary)}
                  </p>
                </div>
              )}

              {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recipe.extendedIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt={ingredient.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                            className="w-8 h-8 object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{ingredient.original}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recipe.instructions && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {stripHtml(recipe.instructions)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close Recipe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;