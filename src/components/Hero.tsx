import React from 'react';
import { ChefHat } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 text-white py-20 px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
        }}
      />
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <ChefHat size={64} className="text-white drop-shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Find Delicious Meals<br />
          <span className="text-amber-300">With What You Have!</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
          Transform your ingredients into amazing recipes. Simply enter what's in your kitchen 
          and discover creative, delicious meals you can make right now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
            <span className="text-lg font-medium">✨ Powered by Spoonacular API</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;