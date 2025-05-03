
/**
 * Node Definition Framework
 * This defines the structure of workflow nodes based on the PRD requirements
 */

export type NodeCategory = 'transaction' | 'verification' | 'payment' | 'notification' | 'compliance' | 'reporting' | 'anticipation' | 'party' | 'policy' | 'response' | 'reconciliation' | 'vault';

export interface NodeConfig {
  endpoint?: string;
  method?: string;
  validation?: string[];
  [key: string]: any;
}

export interface NodeMapping {
  request: Record<string, string>;
  response: Record<string, string>;
}

export interface NodePolicy {
  allowedNextNodes: string[];
  conditions?: string[];
  requiredPermissions?: string[];
}

export interface NodeDefinition {
  nodeName: string;
  description: string;
  category: NodeCategory;
  version: string;
  config: NodeConfig;
  mapping: NodeMapping;
  policy: NodePolicy;
}

// Node types for visual representation on the flow canvas
export type NodeType = 'start' | 'api' | 'verification' | 'payment' | 'notification' | 'end' | 'compliance';

// Extended data structure for flow nodes that includes visual attributes
export interface CustomNodeData {
  label: string;
  type: NodeType;
  nodeDefinition?: NodeDefinition;
}
