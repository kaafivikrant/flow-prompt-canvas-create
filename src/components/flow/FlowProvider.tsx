
import React, { createContext, useContext, useState } from 'react';
import { Node, Edge, NodeChange, EdgeChange, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { initialNodes, initialEdges } from './initialElements';

type ProcessingStatus = 'idle' | 'processing' | 'error' | 'success';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  processPrompt: (prompt: string) => void;
  processingStatus: ProcessingStatus;
  currentPrompt: string;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  };

  const processPrompt = async (prompt: string) => {
    setCurrentPrompt(prompt);
    setProcessingStatus('processing');
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock flow generation based on prompt
      const newNodeId = `node-${nodes.length + 1}`;
      const lastNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id : null;
      
      const newNode: Node = {
        id: newNodeId,
        data: { 
          label: `Node from prompt: "${prompt.substring(0, 20)}${prompt.length > 20 ? '...' : ''}"`,
          type: 'api'
        },
        position: { 
          x: lastNodeId ? nodes.find(n => n.id === lastNodeId)!.position.x + 250 : 250, 
          y: lastNodeId ? nodes.find(n => n.id === lastNodeId)!.position.y : 100 
        },
        type: 'custom'
      };
      
      setNodes(nds => [...nds, newNode]);
      
      // If there's a previous node, connect it to the new node
      if (lastNodeId) {
        const newEdge: Edge = {
          id: `edge-${edges.length + 1}`,
          source: lastNodeId,
          target: newNodeId,
          animated: true,
        };
        
        setEdges(eds => [...eds, newEdge]);
      }
      
      setProcessingStatus('success');
    } catch (error) {
      console.error('Error processing prompt:', error);
      setProcessingStatus('error');
    }
  };

  const value = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    processPrompt,
    processingStatus,
    currentPrompt,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

export const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
