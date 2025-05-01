
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
  {
    id: 'process',
    type: 'custom',
    position: { x: 250, y: 250 },
    data: { 
      label: 'Process Data',
      type: 'api'
    },
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'edge-start-process',
    source: 'start',
    target: 'process',
    animated: true
  }
];
