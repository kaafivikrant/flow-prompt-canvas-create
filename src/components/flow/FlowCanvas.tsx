
import React from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlow } from './FlowProvider';
import CustomNode from './CustomNode';

// Custom node types
const nodeTypes = {
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
    <div className="flex-1">
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
        <Background color="#cbd5e1" variant="dots" gap={24} size={1} />
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
