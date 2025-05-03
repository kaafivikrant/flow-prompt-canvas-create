import React from 'react';
import { useFlow } from './FlowProvider';
import { bankingNodes } from './library/BankingNodes';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NodeCategory, NodeDefinition } from './types/NodeDefinition';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea component

const NodeLibrary: React.FC = () => {
  const { addNode } = useFlow();

  // Group nodes by category
  const groupedNodes: Record<NodeCategory, NodeDefinition[]> = bankingNodes.reduce((acc, node) => {
    if (!acc[node.category]) {
      acc[node.category] = [];
    }
    acc[node.category].push(node);
    return acc;
  }, {} as Record<NodeCategory, NodeDefinition[]>);

  const handleAddNode = (definition: NodeDefinition) => {
    addNode(definition);
  };

  return (
    <ScrollArea className="h-full"> {/* Add ScrollArea with full height */}
      <div className="space-y-6">
        <SheetHeader>
          <SheetTitle>Node Library</SheetTitle>
          <SheetDescription>
            Select a node to add to your workflow
          </SheetDescription>
        </SheetHeader>

        {Object.entries(groupedNodes).map(([category, nodes]) => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm capitalize">{category}</h3>
            <div className="border rounded-md divide-y">
              {nodes.map((node) => (
                <div 
                  key={node.nodeName} 
                  className="p-3 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-medium text-sm">{node.nodeName}</h4>
                    <p className="text-xs text-gray-500">{node.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAddNode(node)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NodeLibrary;
