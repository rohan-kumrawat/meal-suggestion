import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Meal Suggestion App</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover amazing recipes using ingredients you already have. 
            Built with React, TypeScript, and the Spoonacular API.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:developer@example.com"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            <Mail size={20} />
            <span>Contact</span>
          </a>
        </div>

        <div className="text-center border-t border-gray-700 pt-8">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-red-500" /> by a passionate developer
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            © 2025 Meal Suggestion App. Powered by Spoonacular API.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;