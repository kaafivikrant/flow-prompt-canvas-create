
import FlowCanvas from '@/components/flow/FlowCanvas';
import { PromptInput } from '@/components/flow/PromptInput';
import { FlowProvider } from '@/components/flow/FlowProvider';

const Index = () => {
  return (
    <div className="min-h-screen bg-flow-background flex flex-col">
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm z-10">
        <h1 className="text-2xl font-bold text-flow-text flex items-center">
          <span className="bg-flow-primary text-white p-1 rounded mr-2">CX</span>
          ConnectCX Flow
        </h1>
      </div>
      
      <FlowProvider>
        <div className="flex-1 relative flex flex-col">
          <PromptInput />
          <FlowCanvas />
        </div>
      </FlowProvider>
    </div>
  );
};

export default Index;
