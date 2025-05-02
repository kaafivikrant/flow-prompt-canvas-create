
import React, { useState } from 'react';
import { NodeDefinition } from './types/NodeDefinition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NodeMapper from './NodeMapper';
import { useFlow } from './FlowProvider';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NodeDetailsProps {
  nodeDefinition?: NodeDefinition;
  onEditMapping: (isMapping: boolean) => void;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ nodeDefinition, onEditMapping }) => {
  const { nodes, setNodes, removeNode } = useFlow();
  const [selectedMapTarget, setSelectedMapTarget] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedConfig, setEditedConfig] = useState<{endpoint?: string, method?: string}>({});
  
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
      (node.data.nodeDefinition as NodeDefinition).nodeName !== nodeDefinition.nodeName
    )
    .map(node => node.data.nodeDefinition as NodeDefinition)
    .filter((def): def is NodeDefinition => !!def);

  const handleMapperClose = () => {
    setSelectedMapTarget(null);
    onEditMapping(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedConfig({
      endpoint: nodeDefinition.config.endpoint,
      method: nodeDefinition.config.method
    });
  };

  const handleSaveConfig = () => {
    setNodes(currentNodes =>
      currentNodes.map(node => {
        const nodeData = node.data;
        if (nodeData?.nodeDefinition && 
            (nodeData.nodeDefinition as NodeDefinition).nodeName === nodeDefinition.nodeName) {
          
          const updatedNode = { ...node };
          const typedDefinition = updatedNode.data.nodeDefinition as NodeDefinition;
          
          const updatedDefinition: NodeDefinition = {
            ...typedDefinition,
            config: {
              ...typedDefinition.config,
              endpoint: editedConfig.endpoint || typedDefinition.config.endpoint,
              method: editedConfig.method || typedDefinition.config.method
            }
          };
          
          updatedNode.data = {
            ...updatedNode.data,
            nodeDefinition: updatedDefinition
          };
          
          return updatedNode;
        }
        return node;
      })
    );
    setIsEditing(false);
  };

  const handleDeleteNode = () => {
    if (nodeDefinition) {
      // Find the node ID by the nodeDefinition
      const nodeToDelete = nodes.find(node => 
        node.data?.nodeDefinition && 
        (node.data.nodeDefinition as NodeDefinition).nodeName === nodeDefinition.nodeName
      );
      
      if (nodeToDelete) {
        removeNode(nodeToDelete.id);
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded-md bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <div>
          <h3 className="font-medium text-lg mb-1">{nodeDefinition.nodeName}</h3>
          <p className="text-gray-600 text-sm">{nodeDefinition.description}</p>
          
          <div className="mt-3 flex gap-2 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">v{nodeDefinition.version}</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{nodeDefinition.category}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={handleDeleteNode}
            aria-label="Delete node"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="mapping">Mapping</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="p-4">
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Endpoint:</label>
                  <Input 
                    value={editedConfig.endpoint || ''} 
                    onChange={(e) => setEditedConfig({...editedConfig, endpoint: e.target.value})}
                    className="text-xs h-8"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Method:</label>
                  <select 
                    value={editedConfig.method || ''}
                    onChange={(e) => setEditedConfig({...editedConfig, method: e.target.value})}
                    className="w-full p-2 text-xs border border-gray-200 rounded h-8"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSaveConfig}
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Configuration</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 p-2"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                  <pre>{JSON.stringify(nodeDefinition.config, null, 2)}</pre>
                </div>
              </>
            )}
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
                  onChange={(e) => {
                    setSelectedMapTarget(e.target.value);
                    if (e.target.value) {
                      onEditMapping(true);
                    }
                  }}
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
