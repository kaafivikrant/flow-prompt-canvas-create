
import { Node, Edge } from '@xyflow/react';
import { getNodeDefinitionByName } from './library/BankingNodes';

// Create nodes with actual banking node definitions
export const initialNodes: Node[] = [
  {
    id: 'initiate-transaction',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Initiate Transaction',
      type: 'start',
      nodeDefinition: getNodeDefinitionByName('Initiate Transaction')
    },
  },
  {
    id: 'validate-kyc',
    type: 'custom',
    position: { x: 250, y: 250 },
    data: { 
      label: 'Validate KYC',
      type: 'verification',
      nodeDefinition: getNodeDefinitionByName('Validate KYC')
    },
  },
  {
    id: 'check-balance',
    type: 'custom',
    position: { x: 250, y: 400 },
    data: { 
      label: 'Check Wallet Balance',
      type: 'api',
      nodeDefinition: getNodeDefinitionByName('Check Wallet Balance')
    },
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'edge-initiate-validate',
    source: 'initiate-transaction',
    target: 'validate-kyc',
    animated: true
  },
  {
    id: 'edge-validate-check',
    source: 'validate-kyc',
    target: 'check-balance',
    animated: true
  }
];
