
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

  // Helper function to create a single node
  const createNode = (label: string, position: { x: number, y: number }): Node => {
    const nodeType = determineNodeType(label);
    const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: nodeId,
      data: { 
        label,
        type: nodeType,
        nodeDefinition: {
          nodeName: label,
          description: label,
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
      position,
      type: 'custom'
    };
  };

  const processPrompt = async (prompt: string) => {
    setCurrentPrompt(prompt);
    setProcessingStatus('processing');
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the prompt contains "->" indicating multiple nodes
      if (prompt.includes('->')) {
        const nodeLabels = prompt.split('->').map(label => label.trim());
        
        if (nodeLabels.length > 1) {
          const newNodes: Node[] = [];
          const newEdges: Edge[] = [];
          const baseY = nodes.length > 0 
            ? Math.max(...nodes.map(node => node.position.y)) + 150 
            : 100;
          
          // Create nodes
          nodeLabels.forEach((label, index) => {
            if (!label) return; // Skip empty labels
            
            const newNode = createNode(
              label,
              { 
                x: 250, 
                y: baseY + (index * 150)
              }
            );
            newNodes.push(newNode);
            
            // Connect with previous node if exists
            if (index > 0 && newNodes[index-1]) {
              const newEdge: Edge = {
                id: `edge-${Date.now()}-${index}`,
                source: newNodes[index-1].id,
                target: newNode.id,
                animated: true,
              };
              newEdges.push(newEdge);
            }
          });
          
          // Add all new nodes and edges
          setNodes(nds => [...nds, ...newNodes]);
          setEdges(eds => [...eds, ...newEdges]);
          
          toast({
            title: "Flow created",
            description: `Created ${newNodes.length} nodes with connections`
          });
        }
      } else {
        // Original single node creation logic
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
        
        toast({
          title: "Node created",
          description: "A new node has been created based on your prompt"
        });
      }
      
      setProcessingStatus('success');
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
