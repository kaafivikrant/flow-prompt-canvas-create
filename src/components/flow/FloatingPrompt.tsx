
import React from 'react';
import { PromptInput } from './PromptInput';

interface FloatingPromptProps {
  isVisible: boolean;
}

const FloatingPrompt: React.FC<FloatingPromptProps> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl z-20 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl shadow-lg p-4">
        <PromptInput />
      </div>
    </div>
  );
};

export default FloatingPrompt;
