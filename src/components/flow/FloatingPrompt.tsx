
import React from 'react';
import { PromptInput } from './PromptInput';

const FloatingPrompt: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl z-20">
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl shadow-lg p-4">
        <PromptInput />
      </div>
    </div>
  );
};

export default FloatingPrompt;
