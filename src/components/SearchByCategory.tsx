import React, { useState } from "react";
import { CATEGORIES } from "@/constants";

interface SearchByCategoryProps {
  onCategorySelect: (category: string) => void;
}

const SearchByCategory: React.FC<SearchByCategoryProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Buscar por categoría
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Todas las categorías</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchByCategory;