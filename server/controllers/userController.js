const Recipe = require("../models/Recipe");

// Save Recipe
exports.saveRecipe = async (req, res) => {
  try {
    const { userId, recipeId, title, image, ingredients } = req.body;
    const newRecipe = new Recipe({ userId, recipeId, title, image, ingredients });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

// Get Saved Recipes
exports.getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
};

// Delete Saved Recipe
exports.deleteSavedRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
