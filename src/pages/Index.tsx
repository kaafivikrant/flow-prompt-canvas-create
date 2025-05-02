
import React, { useState } from 'react';
import FlowCanvas from '@/components/flow/FlowCanvas';
import FloatingPrompt from '@/components/flow/FloatingPrompt';
import { FlowProvider } from '@/components/flow/FlowProvider';

const Index = () => {
  const [isMapping, setIsMapping] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-flow-background flex flex-col">
      <div className="p-4 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-flow-text flex items-center">
            <span className="bg-flow-primary text-white p-1 rounded mr-2">CX</span>
            ConnectCX Flow
          </h1>
          <div className="text-sm text-purple-600">Workflow Designer</div>
        </div>
      </div>
      
      <FlowProvider>
        <div className="flex-1 relative flex flex-col">
          <FlowCanvas />
          <FloatingPrompt isVisible={!isMapping} />
        </div>
      </FlowProvider>
    </div>
  );
};

export default Index;
