import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

interface FoodEntry {
  food: string;
  grams: string;
  carbs: number;
}

interface Props {
  entry: FoodEntry;
  foodData: Array<{ name: string; carbs: number }>;
  onChange: (entry: FoodEntry) => void;
}

const FoodEntry: React.FC<Props> = ({ entry, foodData, onChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFoodChange = useCallback((value: string) => {
    const food = foodData.find(f => f.name.toLowerCase() === value.toLowerCase());
    const carbs = food && entry.grams ? (food.carbs * Number(entry.grams)) / 100 : 0;
    onChange({ ...entry, food: value, carbs });
    setShowSuggestions(value.length > 0);
  }, [entry.grams, foodData, onChange]);

  const handleGramsChange = useCallback((value: string) => {
    const food = foodData.find(f => f.name.toLowerCase() === entry.food.toLowerCase());
    const carbs = food && value ? (food.carbs * Number(value)) / 100 : 0;
    onChange({ ...entry, grams: value, carbs });
  }, [entry.food, foodData, onChange]);

  const handleSuggestionClick = useCallback((foodName: string) => {
    handleFoodChange(foodName);
    setShowSuggestions(false);
  }, [handleFoodChange]);

  const filteredFoods = foodData
    .filter(f => f.name.toLowerCase().includes(entry.food.toLowerCase()))
    .slice(0, 8);

  return (
    <div className="flex gap-4 items-start">
      <div className="relative flex-grow">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={entry.food}
            onChange={(e) => handleFoodChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Buscar alimento..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="off"
          />
        </div>
        {showSuggestions && entry.food && filteredFoods.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {filteredFoods.map((food, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                onClick={() => handleSuggestionClick(food.name)}
              >
                <span className="font-medium">{food.name}</span>
                <span className="text-gray-500 text-sm ml-2">{food.carbs}g HC/100g</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-24">
        <input
          type="number"
          value={entry.grams}
          onChange={(e) => handleGramsChange(e.target.value)}
          placeholder="Gramos"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          step="1"
          inputMode="numeric"
        />
      </div>
      <div className="w-24 py-2 px-3 bg-gray-50 rounded-lg text-right">
        <span className="font-medium">{entry.carbs.toFixed(1)}</span>
        <span className="text-gray-500 ml-1">HC</span>
      </div>
    </div>
  );
};

export default FoodEntry;