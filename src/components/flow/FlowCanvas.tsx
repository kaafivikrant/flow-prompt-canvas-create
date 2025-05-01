
import React from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  BackgroundVariant,
  NodeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlow } from './FlowProvider';
import CustomNode from './CustomNode';

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

  return (
    <div className="flex-1 h-[calc(100vh-160px)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
  );
};

export default FlowCanvas;
