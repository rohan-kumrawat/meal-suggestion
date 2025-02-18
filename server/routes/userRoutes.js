const express = require("express");
const { saveRecipe, getSavedRecipes, deleteSavedRecipe } = require("../controllers/userController");
const router = express.Router();

router.post("/save-recipe", saveRecipe);
router.get("/saved-recipes/:userId", getSavedRecipes);
router.delete("/delete-recipe/:id", deleteSavedRecipe);

module.exports = router;
