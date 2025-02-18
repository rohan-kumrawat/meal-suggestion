const axios = require("axios");

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// 1. Get Recipes by Ingredients
exports.getRecipesByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.query;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${SPOONACULAR_API_KEY}`;

    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

// 2. Get Recipe Details
exports.getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;

    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
};

// 3. Get Random Recipe
exports.getRandomRecipe = async (req, res) => {
  try {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${SPOONACULAR_API_KEY}`;

    const { data } = await axios.get(url);
    res.json(data.recipes[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random recipe" });
  }
};
