// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const RecipeDetails = () => {
//     const { id } = useParams();
//     const [recipe, setRecipe] = useState(null);

//     useEffect(() => {
//         if (id) {
//             axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`)
//                 .then(res => {
//                     console.log("API Response:", res.data);
//                     setRecipe(res.data);
//                 })
//                 .catch(err => console.error("API Error:", err));
//         }
//     }, [id]);

//     return (
//         <div className="p-6">
//             {recipe ? (
//                 <div>
//                     <h1 className="text-2xl font-bold">{recipe.title}</h1>
//                     <img src={recipe.image} alt={recipe.title} className="w-full max-w-md my-4" />
                    
//                     <h2 className="text-lg font-semibold mt-4">Instructions:</h2>
//                     <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="text-gray-700" />
//                 </div>
//             ) : <p>Loading...</p>}
//         </div>
//     );
// };

// export default RecipeDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams(); // 🔹 URL se recipe ID le rahe hain
  console.log(id);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/recipes/details/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]); // 🔹 ID change hone par API call karega

  if (loading) return <div className="text-center">Loading...</div>;
  if (!recipe) return <div className="text-center text-red-500">Recipe not found!</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-w-md mx-auto" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="mt-2 text-gray-700"></div>
      </div>
    </div>
  );
};

export default RecipeDetails;
