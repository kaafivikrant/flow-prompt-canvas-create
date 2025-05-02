
import React from 'react';
import { useFlow } from './FlowProvider';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { NodeDefinition } from './types/NodeDefinition';

const NodeOrderManager: React.FC = () => {
  const { nodes, moveNode } = useFlow();

  const handleMoveUp = (nodeId: string, currentIndex: number) => {
    if (currentIndex > 0) {
      moveNode(nodeId, currentIndex - 1);
    }
  };

  const handleMoveDown = (nodeId: string, currentIndex: number) => {
    if (currentIndex < nodes.length - 1) {
      moveNode(nodeId, currentIndex + 1);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md bg-white p-4">
      <h3 className="font-medium text-lg mb-3">Node Order</h3>
      <div className="space-y-2">
        {nodes.length === 0 ? (
          <p className="text-gray-500 text-sm">No nodes in the workflow</p>
        ) : (
          nodes.map((node, index) => {
            const nodeData = node.data;
            const definition = nodeData && 'nodeDefinition' in nodeData 
              ? nodeData.nodeDefinition as NodeDefinition 
              : undefined;
            
            return (
              <div key={node.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <span className="font-mono text-xs bg-gray-200 px-1.5 py-0.5 rounded mr-2">
                    {index + 1}
                  </span>
                  <span className="text-sm">{definition?.nodeName || 'Unknown Node'}</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    disabled={index === 0}
                    onClick={() => handleMoveUp(node.id, index)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    disabled={index === nodes.length - 1}
                    onClick={() => handleMoveDown(node.id, index)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NodeOrderManager;
