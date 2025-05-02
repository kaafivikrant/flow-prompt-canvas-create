
import React, { useState } from 'react';
import { NodeDefinition } from './types/NodeDefinition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NodeMapper from './NodeMapper';
import { useFlow } from './FlowProvider';

interface NodeDetailsProps {
  nodeDefinition?: NodeDefinition;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ nodeDefinition }) => {
  const { nodes } = useFlow();
  const [selectedMapTarget, setSelectedMapTarget] = useState<string | null>(null);
  
  if (!nodeDefinition) {
    return (
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-gray-500 text-sm">Select a node to view its details</p>
      </div>
    );
  }

  // Find potential map targets (nodes that this node can connect to)
  const potentialTargets = nodes
    .filter(node => 
      node.data?.nodeDefinition && 
      node.data.nodeDefinition.nodeName !== nodeDefinition.nodeName
    )
    .map(node => node.data.nodeDefinition);

  return (
    <div className="border border-gray-200 rounded-md bg-white">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-lg mb-1">{nodeDefinition.nodeName}</h3>
        <p className="text-gray-600 text-sm">{nodeDefinition.description}</p>
        
        <div className="mt-3 flex gap-2 text-xs">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">v{nodeDefinition.version}</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{nodeDefinition.category}</span>
        </div>
      </div>
      
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="mapping">Mapping</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="p-4">
          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
            <pre>{JSON.stringify(nodeDefinition.config, null, 2)}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="mapping" className="p-4">
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
                  onChange={(e) => setSelectedMapTarget(e.target.value)}
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
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="policy" className="p-4">
          <div className="bg-gray-50 p-2 rounded text-xs font-mono">
            <pre>{JSON.stringify(nodeDefinition.policy, null, 2)}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NodeDetails;
