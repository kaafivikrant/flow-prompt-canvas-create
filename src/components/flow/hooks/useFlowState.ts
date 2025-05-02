
import { useState, useEffect } from 'react';
import { Node, Edge, NodeChange, EdgeChange, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { NodeDefinition } from '../types/NodeDefinition';
import { useToast } from '@/hooks/use-toast';
import { initialNodes, initialEdges } from '../initialElements';
import { saveToStorage, loadFromStorage, determineNodeType, createNodeFromDefinition } from '../utils/flowUtils';

export type ProcessingStatus = 'idle' | 'processing' | 'error' | 'success';

export const useFlowState = () => {
  const { toast } = useToast();
  const { nodes: initialLoadedNodes, edges: initialLoadedEdges } = loadFromStorage(initialNodes, initialEdges);
  
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
    const newNode = createNodeFromDefinition(
      nodeDefinition, 
      { 
        x: 250, 
        y: nodes.length > 0 ? nodes[nodes.length - 1].position.y + 150 : 100 
      }
    );
    
    setNodes(nds => [...nds, newNode]);
    
    // If there's another node, connect it to the new node
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
    
    toast({
      title: "Node added",
      description: `${nodeDefinition.nodeName} has been added to your workflow`
    });

    return newNode;
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

  return {
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
  };
};
