
import { useState } from 'react';
import { Edge, Node } from '@xyflow/react';
import { useToast } from '@/hooks/use-toast';
import { determineNodeType } from '../utils/flowUtils';
import { ProcessingStatus } from './useFlowState';

type PromptProcessorProps = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setProcessingStatus: React.Dispatch<React.SetStateAction<ProcessingStatus>>;
  setCurrentPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export const usePromptProcessor = ({
  nodes,
  setNodes,
  setEdges,
  setProcessingStatus,
  setCurrentPrompt
}: PromptProcessorProps) => {
  const { toast } = useToast();

  const processPrompt = async (prompt: string) => {
    setCurrentPrompt(prompt);
    setProcessingStatus('processing');
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate node based on prompt
      const newNodeId = `node-${Date.now()}`;
      const lastNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id : null;
      
      // Determine node type from prompt and create a label
      const nodeType = determineNodeType(prompt);
      const nodeLabel = prompt.length > 20 
        ? `${prompt.substring(0, 20)}...`
        : prompt;
      
      const newNode: Node = {
        id: newNodeId,
        data: { 
          label: nodeLabel,
          type: nodeType,
          // Create a basic node definition structure for the generated node
          nodeDefinition: {
            nodeName: nodeLabel,
            description: prompt,
            category: nodeType === 'payment' ? 'payment' : 
                     nodeType === 'verification' ? 'verification' : 
                     nodeType === 'notification' ? 'notification' : 'transaction',
            version: "1.0",
            config: {
              endpoint: `/api/${nodeType}`,
              method: "POST"
            },
            mapping: {
              request: {},
              response: {}
            },
            policy: {
              allowedNextNodes: []
            }
          }
        },
        position: { 
          x: lastNodeId ? nodes.find(n => n.id === lastNodeId)!.position.x : 250, 
          y: lastNodeId ? nodes.find(n => n.id === lastNodeId)!.position.y + 150 : 100 
        },
        type: 'custom'
      };
      
      setNodes(nds => [...nds, newNode]);
      
      // If there's a previous node, connect it to the new node
      if (lastNodeId) {
        const newEdge: Edge = {
          id: `edge-${Date.now()}`,
          source: lastNodeId,
          target: newNodeId,
          animated: true,
        };
        
        setEdges(eds => [...eds, newEdge]);
      }
      
      setProcessingStatus('success');
      toast({
        title: "Node created",
        description: "A new node has been created based on your prompt"
      });
    } catch (error) {
      console.error('Error processing prompt:', error);
      setProcessingStatus('error');
      toast({
        title: "Error",
        description: "Failed to process your prompt",
        variant: "destructive"
      });
    }
  };

  return { processPrompt };
};
