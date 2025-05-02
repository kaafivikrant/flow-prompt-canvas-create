
import React, { useState } from 'react';
import { NodeDefinition } from './types/NodeDefinition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFlow } from './FlowProvider';
import { ArrowRight, X } from 'lucide-react';

interface NodeMapperProps {
  sourceNode?: NodeDefinition;
  targetNode?: NodeDefinition;
  onClose: () => void; // Add close handler
}

const NodeMapper: React.FC<NodeMapperProps> = ({ sourceNode, targetNode, onClose }) => {
  const { nodes, setNodes } = useFlow();
  const [mappings, setMappings] = useState<Record<string, string>>({});

  if (!sourceNode || !targetNode) {
    return (
      <Card className="bg-white/50 backdrop-blur-md border-gray-200">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">
            Select source and target nodes to create mappings
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleMappingChange = (sourceField: string, targetField: string) => {
    setMappings(prev => ({
      ...prev,
      [targetField]: sourceField
    }));
  };

  const applyMappings = () => {
    // Find the target node and update its request mappings
    setNodes(currentNodes => 
      currentNodes.map(node => {
        const nodeData = node.data;
        if (nodeData?.nodeDefinition && 
            (nodeData.nodeDefinition as NodeDefinition).nodeName === targetNode.nodeName) {
          
          // Create a new node with the updated mapping
          const updatedNode = { ...node };
          const typedDefinition = updatedNode.data.nodeDefinition as NodeDefinition;
          
          const updatedDefinition: NodeDefinition = { 
            ...typedDefinition,
            mapping: {
              ...typedDefinition.mapping,
              request: {
                ...typedDefinition.mapping.request,
                ...Object.fromEntries(
                  Object.entries(mappings).map(([targetField, sourceField]) => 
                    [targetField, sourceField]
                  )
                )
              }
            }
          };
          
          updatedNode.data = {
            ...updatedNode.data,
            nodeDefinition: updatedDefinition
          };
          
          return updatedNode;
        }
        return node;
      })
    );
    
    // Close the mapper after applying
    onClose();
  };

  // Extract response fields from source node
  const sourceFields = Object.keys(sourceNode?.mapping?.response || {});
  
  // Extract request fields from target node
  const targetFields = Object.keys(targetNode?.mapping?.request || {});

  return (
    <Card className="bg-white/50 backdrop-blur-md border-gray-200">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Node Mapper</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium">Source:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {sourceNode.nodeName}
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium">Target:</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {targetNode.nodeName}
            </span>
          </div>
          
          {targetFields.length === 0 && (
            <p className="text-sm text-gray-500">No request fields in target node</p>
          )}
          
          {sourceFields.length === 0 && (
            <p className="text-sm text-gray-500">No response fields in source node</p>
          )}
          
          {targetFields.length > 0 && sourceFields.length > 0 && (
            <>
              <div className="space-y-3">
                {targetFields.map(targetField => (
                  <div key={targetField} className="grid grid-cols-12 gap-2 items-center">
                    <Label htmlFor={targetField} className="col-span-5 text-xs">
                      {targetField}:
                    </Label>
                    <div className="col-span-7">
                      <select
                        id={targetField}
                        className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
                        value={mappings[targetField] || ''}
                        onChange={(e) => handleMappingChange(e.target.value, targetField)}
                      >
                        <option value="">Select a source field</option>
                        {sourceFields.map(sourceField => (
                          <option key={sourceField} value={sourceField}>
                            {sourceField}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={applyMappings} 
                className="w-full mt-2 text-xs h-8 bg-flow-primary hover:bg-flow-primary/90"
              >
                Apply Mappings
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeMapper;
