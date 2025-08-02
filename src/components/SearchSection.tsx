import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (ingredients: string[]) => void;
  isLoading: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients.filter(ing => ing.trim()), inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSearch = () => {
    const validIngredients = ingredients.filter(ing => ing.trim());
    if (validIngredients.length > 0) {
      onSearch(validIngredients);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What's in Your Kitchen?
          </h2>
          <p className="text-lg text-gray-600">
            Add your ingredients and we'll find the perfect recipes for you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="ingredient-input" className="block text-sm font-medium text-gray-700 mb-2">
              Add Ingredients
            </label>
            <div className="flex gap-2">
              <input
                id="ingredient-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter an ingredient (e.g., chicken, rice, tomato)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              />
              <button
                onClick={addIngredient}
                disabled={!inputValue.trim()}
                className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {ingredients.filter(ing => ing.trim()).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Your Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.filter(ing => ing.trim()).map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(index)}
                      className="hover:text-emerald-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={ingredients.filter(ing => ing.trim()).length === 0 || isLoading}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Searching for Recipes...
              </>
            ) : (
              <>
                <Search size={20} />
                Find My Recipes
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;