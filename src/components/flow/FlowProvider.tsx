
import React, { createContext, useContext } from 'react';
import { Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react';
import { NodeDefinition } from './types/NodeDefinition';
import { useFlowState, ProcessingStatus } from './hooks/useFlowState';
import { usePromptProcessor } from './hooks/usePromptProcessor';

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
  addNode: (nodeDefinition: NodeDefinition) => Node;
  moveNode: (nodeId: string, targetIndex: number) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    processingStatus,
    currentPrompt,
    removeNode,
    clearCanvas,
    addNode,
    moveNode,
    setProcessingStatus,
    setCurrentPrompt
  } = useFlowState();
  
  const { processPrompt } = usePromptProcessor({
    nodes,
    setNodes,
    setEdges,
    setProcessingStatus,
    setCurrentPrompt
  });

  const value: FlowContextType = {
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
