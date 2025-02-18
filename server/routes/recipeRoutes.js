const express = require("express");
const { getRecipesByIngredients, getRecipeDetails, getRandomRecipe } = require("../controllers/recipeController");
const router = express.Router();

router.get("/by-ingredients", getRecipesByIngredients);
router.get("/details/:id", getRecipeDetails);
router.get("/random", getRandomRecipe);

module.exports = router;
