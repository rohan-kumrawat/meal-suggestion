import React from 'react';
import { Clock, Users, Eye } from 'lucide-react';
import type { Meal } from '../types/types.ts';

interface MealCardProps {
  meal: Meal;
  onViewRecipe: (mealId: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onViewRecipe }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img
          src={meal.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={meal.title}
          onError={handleImageError}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          <span className="text-emerald-600">{meal.usedIngredientCount}</span>
          <span className="text-gray-500"> match</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {meal.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>~30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>4 servings</span>
          </div>
        </div>

        {meal.missedIngredientCount > 0 && (
          <div className="mb-4">
            <p className="text-sm text-amber-600 font-medium mb-2">
              Missing {meal.missedIngredientCount} ingredient{meal.missedIngredientCount > 1 ? 's' : ''}:
            </p>
            <div className="flex flex-wrap gap-1">
              {meal.missedIngredients.slice(0, 3).map((ingredient, index) => (
                <span
                  key={index}
                  className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
                >
                  {ingredient.name}
                </span>
              ))}
              {meal.missedIngredients.length > 3 && (
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                  +{meal.missedIngredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onViewRecipe(meal.id)}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Eye size={18} />
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default MealCard;