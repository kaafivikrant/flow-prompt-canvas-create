
import React, { createContext, useContext, useState } from 'react';
import { Node, Edge, NodeChange, EdgeChange, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { initialNodes, initialEdges } from './initialElements';
import { getNodeDefinitionByName } from './library/BankingNodes';

type ProcessingStatus = 'idle' | 'processing' | 'error' | 'success';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  processPrompt: (prompt: string) => void;
  processingStatus: ProcessingStatus;
  currentPrompt: string;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

// Helper function to determine node type from prompt text
const determineNodeType = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes('payment') || promptLower.includes('transaction')) {
    return 'payment';
  } else if (promptLower.includes('verify') || promptLower.includes('kyc') || promptLower.includes('validate')) {
    return 'verification';
  } else if (promptLower.includes('notification') || promptLower.includes('email') || promptLower.includes('sms')) {
    return 'notification';
  } else if (promptLower.includes('compliance') || promptLower.includes('aml') || promptLower.includes('check')) {
    return 'compliance';
  } else {
    return 'api';
  }
};

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
    } catch (error) {
      console.error('Error processing prompt:', error);
      setProcessingStatus('error');
    }
  };

  const value = {
    nodes,
    edges,
    setNodes,
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
