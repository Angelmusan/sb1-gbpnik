import React from 'react';
import { Activity } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="text-center text-white animate-fade-in">
        <Activity className="w-20 h-20 mx-auto mb-4 animate-pulse" />
        <h1 className="text-5xl font-bold tracking-wider">HC</h1>
      </div>
    </div>
  );
};

export default SplashScreen;