
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Node, Edge, NodeChange, EdgeChange, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { initialNodes, initialEdges } from './initialElements';
import { getNodeDefinitionByName } from './library/BankingNodes';
import { NodeDefinition } from './types/NodeDefinition';
import { useToast } from '@/hooks/use-toast';

type ProcessingStatus = 'idle' | 'processing' | 'error' | 'success';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  processPrompt: (prompt: string) => void;
  processingStatus: ProcessingStatus;
  currentPrompt: string;
  removeNode: (nodeId: string) => void;
  clearCanvas: () => void;
  addNode: (nodeDefinition: NodeDefinition) => void;
  moveNode: (nodeId: string, targetIndex: number) => void;
}

const STORAGE_KEY = 'connectCX-flow-data';

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

// Helper to load data from localStorage
const loadFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        nodes: parsedData.nodes || initialNodes,
        edges: parsedData.edges || initialEdges
      };
    }
  } catch (error) {
    console.error('Error loading flow data from localStorage:', error);
  }
  return { nodes: initialNodes, edges: initialEdges };
};

// Helper to save data to localStorage
const saveToStorage = (nodes: Node[], edges: Edge[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
  } catch (error) {
    console.error('Error saving flow data to localStorage:', error);
  }
};

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { nodes: initialLoadedNodes, edges: initialLoadedEdges } = loadFromStorage();
  
  const [nodes, setNodes] = useState<Node[]>(initialLoadedNodes);
  const [edges, setEdges] = useState<Edge[]>(initialLoadedEdges);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  // Save to localStorage whenever nodes or edges change
  useEffect(() => {
    saveToStorage(nodes, edges);
  }, [nodes, edges]);

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  };

  const removeNode = (nodeId: string) => {
    // Remove the node
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Remove connected edges
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    
    toast({
      title: "Node removed",
      description: "The node and its connections have been removed from the flow"
    });
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
    toast({
      title: "Canvas cleared",
      description: "All nodes and connections have been removed"
    });
  };

  const addNode = (nodeDefinition: NodeDefinition) => {
    const nodeType = nodeDefinition.category === 'payment' ? 'payment' : 
                    nodeDefinition.category === 'verification' ? 'verification' : 
                    nodeDefinition.category === 'notification' ? 'notification' : 'api';
    
    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      data: { 
        label: nodeDefinition.nodeName,
        type: nodeType,
        nodeDefinition: nodeDefinition
      },
      position: { 
        x: 250, 
        y: nodes.length > 0 ? nodes[nodes.length - 1].position.y + 150 : 100 
      },
      type: 'custom'
    };
    
    setNodes(nds => [...nds, newNode]);
    
    // If there's another node, connect it to the new node
    if (nodes.length > 0) {
      const lastNodeId = nodes[nodes.length - 1].id;
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: lastNodeId,
        target: newNodeId,
        animated: true,
      };
      
      setEdges(eds => [...eds, newEdge]);
    }
    
    toast({
      title: "Node added",
      description: `${nodeDefinition.nodeName} has been added to your workflow`
    });
  };

  const moveNode = (nodeId: string, targetIndex: number) => {
    setNodes(currentNodes => {
      // Find the node to move
      const nodeIndex = currentNodes.findIndex(node => node.id === nodeId);
      if (nodeIndex === -1 || targetIndex < 0 || targetIndex >= currentNodes.length) {
        return currentNodes;
      }
      
      // Create a copy of the nodes array
      const newNodes = [...currentNodes];
      
      // Remove the node from its current position
      const [movedNode] = newNodes.splice(nodeIndex, 1);
      
      // Insert it at the target position
      newNodes.splice(targetIndex, 0, movedNode);
      
      // Adjust positions of nodes to maintain vertical flow
      return newNodes.map((node, idx) => ({
        ...node,
        position: {
          x: node.position.x,
          y: 100 + idx * 150
        }
      }));
    });

    // Update edges to maintain proper connections
    setEdges(currentEdges => {
      // Remove all edges
      const newEdges: Edge[] = [];
      
      // Create new edges between consecutive nodes
      for (let i = 0; i < nodes.length - 1; i++) {
        newEdges.push({
          id: `edge-${i}-${i+1}-${Date.now()}`,
          source: nodes[i].id,
          target: nodes[i+1].id,
          animated: true,
        });
      }
      
      return newEdges;
    });
    
    toast({
      title: "Node reordered",
      description: "The workflow order has been updated"
    });
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

  const value = {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    processPrompt,
    processingStatus,
    currentPrompt,
    removeNode,
    clearCanvas,
    addNode,
    moveNode,
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
