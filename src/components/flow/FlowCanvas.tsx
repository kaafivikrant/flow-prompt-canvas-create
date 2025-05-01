
import React, { useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  OnNodeClick,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlow } from './FlowProvider';
import CustomNode from './CustomNode';
import NodeDetails from './NodeDetails';
import { NodeDefinition } from './types/NodeDefinition';

// Define node types with correct typing
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const FlowCanvas = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect
  } = useFlow();

  const [selectedNodeDefinition, setSelectedNodeDefinition] = useState<NodeDefinition | undefined>(undefined);

  // Handle node click to show node details
  const handleNodeClick: OnNodeClick = (_, node) => {
    setSelectedNodeDefinition(node.data?.nodeDefinition);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-160px)]">
      <div className="flex-1 border border-gray-200 rounded-md overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#cbd5e1" variant={BackgroundVariant.Dots} gap={24} size={1} />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            maskColor="rgb(245, 243, 255, 0.6)"
          />
        </ReactFlow>
      </div>
      <div className="w-full md:w-96">
        <NodeDetails nodeDefinition={selectedNodeDefinition} />
      </div>
    </div>
  );
};

export default FlowCanvas;
