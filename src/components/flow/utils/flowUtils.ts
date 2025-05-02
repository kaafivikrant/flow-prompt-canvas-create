
import { Node, Edge } from '@xyflow/react';
import { NodeDefinition } from '../types/NodeDefinition';

// Storage key for local storage
export const STORAGE_KEY = 'connectCX-flow-data';

// Helper function to determine node type from prompt text
export const determineNodeType = (prompt: string): string => {
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
export const loadFromStorage = (initialNodes: Node[], initialEdges: Edge[]) => {
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
export const saveToStorage = (nodes: Node[], edges: Edge[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
  } catch (error) {
    console.error('Error saving flow data to localStorage:', error);
  }
};

// Helper to create a new node from definition
export const createNodeFromDefinition = (
  nodeDefinition: NodeDefinition,
  position: { x: number, y: number }
): Node => {
  const nodeType = nodeDefinition.category === 'payment' ? 'payment' : 
                  nodeDefinition.category === 'verification' ? 'verification' : 
                  nodeDefinition.category === 'notification' ? 'notification' : 'api';
  
  const newNodeId = `node-${Date.now()}`;
  
  return {
    id: newNodeId,
    data: { 
      label: nodeDefinition.nodeName,
      type: nodeType,
      nodeDefinition: nodeDefinition
    },
    position,
    type: 'custom'
  };
};
