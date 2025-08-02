import type { Meal, RecipeDetails } from '../types/types.ts';

const API_KEY = 'bc6aed15b4014992bdc376858950185d';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchMealsByIngredients = async (ingredients: string[]): Promise<Meal[]> => {
  const ingredientsQuery = ingredients.join(',');
  const url = `${BASE_URL}/findByIngredients?ingredients=${encodeURIComponent(ingredientsQuery)}&number=12&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meals by ingredients:', error);
    throw new Error('Failed to fetch meal suggestions. Please check your API key and try again.');
  }
};

export const getRecipeDetails = async (recipeId: number): Promise<RecipeDetails> => {
  const url = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to fetch recipe details. Please try again.');
  }
};