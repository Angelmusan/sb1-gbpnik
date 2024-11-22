import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, X } from 'lucide-react';
import FoodEntry from './components/FoodEntry';
import { foodData } from './data/foods';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [entries, setEntries] = useState(Array(5).fill({ food: '', grams: '', carbs: 0 }));
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const calculateTotalCarbs = () => {
    return entries.reduce((sum, entry) => sum + (entry.carbs || 0), 0).toFixed(1);
  };

  const resetCalculator = () => {
    setEntries(Array(5).fill({ food: '', grams: '', carbs: 0 }));
  };

  const updateEntry = (index: number, newEntry: any) => {
    const newEntries = [...entries];
    newEntries[index] = newEntry;
    setEntries(newEntries);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Calculadora HC</h1>
          <p className="text-blue-600">Calcula los hidratos de carbono de tu comida</p>
        </header>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <FoodEntry
              key={index}
              entry={entry}
              foodData={foodData}
              onChange={(newEntry) => updateEntry(index, newEntry)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-800">Total HC:</span>
            <span className="text-2xl font-bold text-blue-900">{calculateTotalCarbs()}g</span>
          </div>
          <button
            onClick={resetCalculator}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;