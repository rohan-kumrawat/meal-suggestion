// import React, { useState } from "react";
// import axios from "axios";
// import SearchBar from "../components/SearchBar";
// import RecipeCard from "../components/RecipeCard";

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);

//   const fetchRecipes = async (ingredients) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/recipes/by-ingredients?ingredients=${ingredients}`);
//       setRecipes(response.data);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <SearchBar onSearch={fetchRecipes} />
//       <div className="grid grid-cols-3 gap-6 mt-6">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // 🔹 Page reload hone par sessionStorage se data wapas lao
  useEffect(() => {
    const savedRecipes = sessionStorage.getItem("searchResults");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  const fetchRecipes = async (ingredients) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/by-ingredients?ingredients=${ingredients}`);
      setRecipes(response.data);
      sessionStorage.setItem("searchResults", JSON.stringify(response.data)); // 🔹 Search results store karo
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={fetchRecipes} />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
