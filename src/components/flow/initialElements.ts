
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Start Node',
      type: 'start'
    },
  },
];

export const initialEdges: Edge[] = [];
