const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipeId: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  ingredients: { type: [String], required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
