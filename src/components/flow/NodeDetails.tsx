
import React from 'react';
import { NodeDefinition } from './types/NodeDefinition';

interface NodeDetailsProps {
  nodeDefinition?: NodeDefinition;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ nodeDefinition }) => {
  if (!nodeDefinition) {
    return (
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-gray-500 text-sm">Select a node to view its details</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white">
      <h3 className="font-medium text-lg mb-2">{nodeDefinition.nodeName}</h3>
      <p className="text-gray-600 text-sm mb-4">{nodeDefinition.description}</p>
      
      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-700 mb-1">Configuration</h4>
        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
          <pre>{JSON.stringify(nodeDefinition.config, null, 2)}</pre>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-700 mb-1">Data Mapping</h4>
        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
          <pre>{JSON.stringify(nodeDefinition.mapping, null, 2)}</pre>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-1">Policy</h4>
        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
          <pre>{JSON.stringify(nodeDefinition.policy, null, 2)}</pre>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2 text-xs">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">v{nodeDefinition.version}</span>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{nodeDefinition.category}</span>
      </div>
    </div>
  );
};

export default NodeDetails;
