import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(ingredients);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white shadow-md p-4 rounded-md">
      <input
        type="text"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border px-4 py-2 rounded-md w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
