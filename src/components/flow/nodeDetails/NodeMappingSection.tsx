
import React from 'react';
import { NodeDefinition } from '../types/NodeDefinition';
import NodeMapper from '../NodeMapper';

interface NodeMappingSectionProps {
  nodeDefinition: NodeDefinition;
  potentialTargets: NodeDefinition[];
  selectedMapTarget: string | null;
  setSelectedMapTarget: (target: string | null) => void;
  handleMapperClose: () => void;
}

const NodeMappingSection: React.FC<NodeMappingSectionProps> = ({
  nodeDefinition,
  potentialTargets,
  selectedMapTarget,
  setSelectedMapTarget,
  handleMapperClose
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-1">Request Mapping</h4>
        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
          <pre>{JSON.stringify(nodeDefinition.mapping.request, null, 2)}</pre>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-1">Response Mapping</h4>
        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
          <pre>{JSON.stringify(nodeDefinition.mapping.response, null, 2)}</pre>
        </div>
      </div>
      
      {potentialTargets.length > 0 && (
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-1">Map to Target Node</h4>
          <select
            className="w-full p-2 text-xs border border-gray-200 rounded"
            onChange={(e) => setSelectedMapTarget(e.target.value || null)}
            value={selectedMapTarget || ''}
          >
            <option value="">Select target node...</option>
            {potentialTargets.map((target) => (
              <option key={target.nodeName} value={target.nodeName}>
                {target.nodeName}
              </option>
            ))}
          </select>
          
          {selectedMapTarget && (
            <div className="mt-4">
              <NodeMapper 
                sourceNode={nodeDefinition}
                targetNode={potentialTargets.find(n => n.nodeName === selectedMapTarget)}
                onClose={handleMapperClose}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NodeMappingSection;
