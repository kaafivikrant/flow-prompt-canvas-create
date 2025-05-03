
import React, { useState } from 'react';
import FlowCanvas from '@/components/flow/FlowCanvas';
import FloatingPrompt from '@/components/flow/FloatingPrompt';
import { FlowProvider } from '@/components/flow/FlowProvider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import NodeLibrary from '@/components/flow/NodeLibrary';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isMapping, setIsMapping] = useState<boolean>(false);

  return (
    <FlowProvider>
      <div className="min-h-screen bg-flow-background flex flex-col">
        <header className="p-4 bg-white/60 backdrop-blur-md border-b border-white/20 shadow-sm z-10 sticky top-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-flow-text flex items-center">
              <span className="bg-flow-primary text-white p-1 rounded mr-2">CX</span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">ConnectCX Flow</span>
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-purple-600 hidden md:block">Workflow Designer</div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <List className="h-4 w-4" />
                    <span className="hidden md:inline">Node Library</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <NodeLibrary />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        
        <div className="flex-1 relative flex flex-col">
          <FlowCanvas />
          <FloatingPrompt isVisible={!isMapping} />
        </div>
        
        <Toaster />
      </div>
    </FlowProvider>
  );
};

export default Index;
