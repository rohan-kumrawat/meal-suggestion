import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-72">
      <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">Missing Ingredients: {recipe.missedIngredientCount}</p>
        <button onClick={handleViewDetails} className="bg-indigo-500 text-white px-3 py-1 mt-2 rounded-md">View Details</button>
      </div>
    </div>
  );
};

export default RecipeCard;
