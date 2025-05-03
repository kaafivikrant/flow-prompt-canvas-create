
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
    
    // Truncate description if it's too long
    const truncatedDescription = label.length > 30 
      ? label.substring(0, 30) + "..." 
      : label;
    
    return {
      id: nodeId,
      data: { 
        label,
        type: nodeType,
        nodeDefinition: {
          nodeName: label,
          description: truncatedDescription,
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

  const handleAddNode = (nodeName: string) => {
    const baseY = nodes.length > 0 
      ? Math.max(...nodes.map(node => node.position.y)) + 150 
      : 100;
    
    const newNode = createNode(
      nodeName,
      { x: 250, y: baseY }
    );
    
    setNodes(nds => [...nds, newNode]);
    
    // Connect with the last node if exists
    if (nodes.length > 0) {
      const lastNodeId = nodes[nodes.length - 1].id;
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: lastNodeId,
        target: newNode.id,
        animated: true,
      };
      
      setEdges(eds => [...eds, newEdge]);
    }
    
    return newNode;
  };

  const handleRemoveNode = (nodeName: string) => {
    // Find node with this name
    const nodeToRemove = nodes.find(node => 
      node.data?.nodeDefinition && node.data.nodeDefinition.nodeName === nodeName
    );
    
    if (nodeToRemove) {
      // Find incoming and outgoing edges
      const incomingEdges = edges.filter(edge => edge.target === nodeToRemove.id);
      const outgoingEdges = edges.filter(edge => edge.source === nodeToRemove.id);
      
      // Create connections between nodes that were connected to the removed node
      const newEdges: Edge[] = [];
      
      incomingEdges.forEach(incoming => {
        outgoingEdges.forEach(outgoing => {
          newEdges.push({
            id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            source: incoming.source,
            target: outgoing.target,
            animated: true
          });
        });
      });
      
      // Remove the node
      setNodes(nds => nds.filter(node => node.id !== nodeToRemove.id));
      
      // Remove related edges and add new connections
      setEdges(eds => [
        ...eds.filter(edge => edge.source !== nodeToRemove.id && edge.target !== nodeToRemove.id),
        ...newEdges
      ]);
      
      return true;
    }
    
    return false;
  };

  const processPrompt = async (prompt: string) => {
    setCurrentPrompt(prompt);
    setProcessingStatus('processing');
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check for command patterns
      const addMatch = prompt.match(/^add\s*->\s*(.+)$/i);
      const removeMatch = prompt.match(/^remove\s*->\s*(.+)$/i);
      
      if (addMatch && addMatch[1]) {
        // Add command
        const nodeName = addMatch[1].trim();
        handleAddNode(nodeName);
        toast({
          title: "Node added",
          description: `Added node "${nodeName}" to the flow`
        });
      } 
      else if (removeMatch && removeMatch[1]) {
        // Remove command
        const nodeName = removeMatch[1].trim();
        const removed = handleRemoveNode(nodeName);
        
        if (removed) {
          toast({
            title: "Node removed",
            description: `Removed node "${nodeName}" and reconnected the flow`
          });
        } else {
          toast({
            title: "Node not found",
            description: `Could not find node "${nodeName}" to remove`,
            variant: "destructive"
          });
          setProcessingStatus('error');
          return;
        }
      }
      // Check if the prompt contains "->" indicating multiple nodes
      else if (prompt.includes('->')) {
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
        handleAddNode(prompt);
        toast({
          title: "Node added",
          description: "A new node has been added to your flow"
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
